<template>
  <div class="carousel-container">
    <div class="carousel rounded-box">
      <!-- Carrusel de Eventos -->
      <div v-for="(evento, index) in eventos" :key="evento.id" class="carousel-item" @click="redirectToEvent(evento.id)">
        <div class="event-card">
          <figure>
            <img :src="evento.imagen" :alt="evento.titulo" class="event-image" />
          </figure>
          <div class="event-body">
            <h2 class="event-title">{{ evento.titulo }}</h2>
            <p class="event-description">
              {{ evento.descripcion }}
            </p>
            <div class="event-badge">Evento</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { obtenerEventosFirestore } from '@/modules/common/components/firebase'; // Asegúrate de tener esta función

export default {
  data() {
    return {
      eventos: [], // Para almacenar los eventos obtenidos de Firebase
    };
  },
  methods: {
    async fetchEventos() {
      this.eventos = await obtenerEventosFirestore(); // Obtener eventos desde Firebase
    },
    redirectToEvent(eventId) {
      // Redirige al evento usando su id (modifica si tu ruta es diferente)
      this.$router.push({ name: 'evento', params: { id: eventId } });
    },
  },
  mounted() {
    this.fetchEventos(); // Cargar los eventos cuando el componente se monte
  },
};
</script>

<style scoped>
.carousel-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.carousel {
  display: flex;
  justify-content: center;
  gap: 20px;
  max-width: 90%;
  transition: transform 0.3s ease-in-out;
}

.carousel-item {
  flex: 0 0 33%;
  max-width: 33%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.carousel-item:hover {
  transform: scale(1.05);
}

.event-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.event-image {
  width: 100%;
  object-fit: cover;
  height: 250px;
}

.event-body {
  padding: 20px;
}

.event-title {
  font-size: 1.75rem;
  color: #4caf50; /* Verde vibrante */
  font-weight: bold;
}

.event-description {
  font-size: 1rem;
  color: #555;
  margin: 10px 0;
}

.event-badge {
  display: inline-block;
  background-color: #ffa726; /* Naranja vibrante */
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-top: 10px;
}
</style>
