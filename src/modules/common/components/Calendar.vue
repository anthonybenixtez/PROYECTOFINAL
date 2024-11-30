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
        <!-- Globito de notificación si hay eventos -->
        <div v-if="eventosDelDia[date]" class="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          {{ eventosDelDia[date] }}
        </div>
      </div>
    </div>

    <!-- Modal de notas y eventos -->
    <notasEventos
      v-if="showModal"
      :show-modal="showModal"
      :selected-date="formattedSelectedDate"
      :eventos="eventosModal"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NotasEventos from '@/modules/common/components/notasEventos.vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/modules/common/components/firebase';

export default defineComponent({
  components: { NotasEventos },
  data() {
    return {
      today: new Date(),
      selectedDate: null,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      showModal: false,
      eventosDelDia: {}, // Cantidad de eventos por día para los globos
      eventosModal: [], // Eventos específicos para el modal
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
      const formattedDate = `${date}/${this.currentMonth + 1}/${this.currentYear}`;
      this.obtenerEventosPorFecha(formattedDate); // Llenar eventosModal
    },
    async fetchEventosCount() {
      const eventosRef = collection(db, "eventos");
      const querySnapshot = await getDocs(eventosRef);
      const eventos = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      // Crear un objeto con la cantidad de eventos por día
      const count: { [key: number]: number } = {};
      eventos.forEach(evento => {
        const [day, month, year] = evento.fecha.split('/').map(Number);
        if (month - 1 === this.currentMonth && year === this.currentYear) {
          count[day] = count[day] ? count[day] + 1 : 1;
        }
      });
      this.eventosDelDia = count; // Actualizar datos para los globos
    },
    async obtenerEventosPorFecha(fecha: string) {
      const eventos = await this.fetchEventosPorFecha(fecha);
      this.eventosModal = eventos; // Llenar eventos para el modal
    },
    async fetchEventosPorFecha(fecha: string) {
      const eventosRef = collection(db, "eventos");
      const q = query(eventosRef, where("fecha", "==", fecha));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    },
    closeModal() {
      this.showModal = false;
      this.selectedDate = null;
      this.eventosModal = []; // Limpiar solo los eventos del modal
    },
    isSelected(date: number) {
      return this.selectedDate === date;
    },
    isToday(date: number) {
      return date === this.today.getDate() &&
             this.currentMonth === this.today.getMonth() &&
             this.currentYear === this.today.getFullYear();
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.fetchEventosCount(); // Actualizar eventos del nuevo mes
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.fetchEventosCount(); // Actualizar eventos del nuevo mes
    },
  },
  mounted() {
    this.fetchEventosCount(); // Inicializar los globos al cargar la página
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
