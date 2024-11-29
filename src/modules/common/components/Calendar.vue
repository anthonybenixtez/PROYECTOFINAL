<template>
  <div class="flex flex-col h-screen w-full">
    <h2 class="text-center text-3xl font-bold mb-4 mt-4">Calendario</h2>
    <div class="flex justify-between items-center mb-4 px-4">
      <button @click="prevMonth" class="bg-gray-300 px-4 py-2 rounded flex items-center">
        <img src="@/assets/images/arrow-left.svg" alt="Anterior" class="w-6 h-6" />
      </button>
      <span class="font-semibold text-xl">{{ monthYear }}</span>
      <button @click="nextMonth" class="bg-gray-300 px-4 py-2 rounded flex items-center">
        <img src="@/assets/images/arrow-right.svg" alt="Siguiente" class="w-6 h-6" />
      </button>
    </div>

    <div class="grid grid-cols-7 gap-2 text-center flex-grow w-full">
      <div v-for="(day, index) in days" :key="index" class="font-semibold">
        {{ day }}
      </div>
      <div v-for="(day, index) in emptyDays" :key="index" class="h-16"></div>
      <div
        v-for="(date, index) in daysInMonth"
        :key="index"
        @click="openModal(date)"
        class="h-16 flex items-center justify-center cursor-pointer rounded-lg transition-colors relative"
        :class="{
          'bg-primary text-white': isSelected(date),
          'bg-sky-300': isToday(date),
          'hover:bg-sky-200': !isToday(date) && !isSelected(date)
        }"
      >
        {{ date }}
        <!-- Notificaciones para notas -->
        <span
          v-if="noteCounts[date]"
          class="absolute top-0 right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {{ noteCounts[date] }}
        </span>
        <!-- Notificaciones para eventos -->
        <span
          v-if="eventCounts[date]"
          class="absolute top-0 right-0 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {{ eventCounts[date] }}
        </span>
      </div>
    </div>

    <!-- Modal de notas y eventos -->
    <notasEventos
      v-if="showModal"
      :show-modal="showModal"
      :selected-date="formattedSelectedDate"
      :eventos="eventosDelDia"
      @close="closeModal"
    />
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import NotasEventos from '@/modules/common/components/notasEventos.vue';
import { db } from '@/modules/common/components/firebase';
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default defineComponent({
  components: { NotasEventos },
  data() {
    return {
      today: new Date(),
      selectedDate: null,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      showModal: false,
      noteCounts: {} as { [key: number]: number }, // Contador de notas por fecha
      eventCounts: {} as { [key: number]: number }, // Contador de eventos por fecha
      eventosDelDia: [], // Array para guardar eventos del día
    };
  },
  computed: {
    days() {
      return ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    },
    emptyDays() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      return Array.from({ length: firstDay });
    },
    daysInMonth() {
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      return Array.from({ length: lastDay }, (_, i) => i + 1);
    },
    monthYear() {
      const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      return `${monthNames[this.currentMonth]} ${this.currentYear}`;
    },
    formattedSelectedDate() {
      return `${this.selectedDate}/${this.currentMonth + 1}/${this.currentYear}`;
    },
  },
  methods: {
    openModal(date: number) {
      this.selectedDate = date;
      this.showModal = true;

      // Formatear la fecha seleccionada para buscar los eventos
      const formattedDate = `${date}/${this.currentMonth + 1}/${this.currentYear}`;
      
      // Obtener eventos de la fecha seleccionada
      this.obtenerEventosPorFecha(formattedDate);
    },

    async obtenerEventosPorFecha(fecha: string) {
      const eventos = await this.fetchEventosPorFecha(fecha);
      this.eventosDelDia = eventos;
    },

    async fetchEventosPorFecha(fecha: string) {
      const eventosRef = collection(db, "eventos");
      const q = query(eventosRef, where("fecha", "==", fecha));
      const querySnapshot = await getDocs(q);
      const eventos = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      return eventos;
    },

    closeModal() {
      this.showModal = false;
      this.selectedDate = null;
      this.eventosDelDia = []; // Limpiar eventos al cerrar modal
    },

    isSelected(date: number) {
      return this.selectedDate === date;
    },

    isToday(date: number) {
      return date === this.today.getDate() && 
             this.currentMonth === new Date().getMonth() && 
             this.currentYear === new Date().getFullYear();
    },

    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.fetchNoteCounts();
    },

    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.fetchNoteCounts();
    },

    async fetchNoteCounts() {
      const auth = getAuth();
      const user = auth.currentUser;
      this.noteCounts = {}; // Reiniciar contador de notas
      this.eventCounts = {}; // Reiniciar contador de eventos

      if (user) {
        const notesCollection = collection(db, 'notes');
        const eventsCollection = collection(db, 'eventos');
        const userQuery = where("userId", "==", user.uid);

        // Escucha cambios en tiempo real para notas
        onSnapshot(query(notesCollection, userQuery), (querySnapshot) => {
          this.noteCounts = {};
          querySnapshot.docs.forEach((doc) => {
            const noteData = doc.data();
            const [noteDay, noteMonth, noteYear] = noteData.date.split('/').map(Number);
            if (noteYear === this.currentYear && noteMonth - 1 === this.currentMonth) {
              this.noteCounts[noteDay] = (this.noteCounts[noteDay] || 0) + 1;
            }
          });
        });

        // Escucha cambios en tiempo real para eventos
        onSnapshot(query(eventsCollection, userQuery), (querySnapshot) => {
          this.eventCounts = {};
          querySnapshot.docs.forEach((doc) => {
            const eventData = doc.data();
            const [eventDay, eventMonth, eventYear] = eventData.fecha.split('/').map(Number);
            if (eventYear === this.currentYear && eventMonth - 1 === this.currentMonth) {
              this.eventCounts[eventDay] = (this.eventCounts[eventDay] || 0) + 1;
            }
          });
        });
      }
    },
  },
  mounted() {
    this.fetchNoteCounts();
  },
});
</script>


<style scoped>
.max-w-md {
  max-width: 300px;
}
.max-h-[85vh] {
  max-height: 85vh;
}
.overflow-y-auto {
  overflow-y: auto;
}
</style>
