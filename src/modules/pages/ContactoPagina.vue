<template>
  <section class="text-gray-600 body-font relative bg-gradient-to-b from-red-500 to-black min-h-screen">
    <!-- Mapa en pantalla completa sin márgenes -->
    <div class="relative w-full h-screen">
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title="map"
        scrolling="no"
        src="https://maps.google.com/maps?q=Universidad%20Luterana%20Salvadore%C3%B1a&z=14&ie=UTF8&iwloc=&output=embed"
      ></iframe>

      <!-- Formulario más estrecho y alineado a la derecha -->
      <div
        class="absolute top-1/2 right-10 transform -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-1/4"
      >
        <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
        <p class="leading-relaxed mb-5 text-gray-600">Busca tus tiendas más cercanas</p>
        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class="relative mb-4">
          <label for="message" class="leading-7 text-sm text-gray-600">Mensaje</label>
          <textarea
            v-model="message"
            id="message"
            name="message"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
        <button
          @click="sendEmail"
          class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Enviar
        </button>
        <p class="text-xs text-gray-500 mt-3">The Pokemon Company.</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      message: '',
    };
  },
  methods: {
    async sendEmail() {
      try {
        const response = await axios.post('http://localhost:3000/send-email', {
          email: this.email,
          message: this.message,
        });
        console.log('Correo enviado:', response.data);
        alert('Correo enviado correctamente'); // Alerta de éxito
        this.email = ''; // Limpiar campo de correo
        this.message = ''; // Limpiar campo de mensaje
      } catch (error) {
        console.error('Error al enviar el correo:', error);
        alert('Error al enviar el correo'); // Alerta de error
      }
    },
  },
};
</script>

<style scoped>
/* Sin márgenes ni padding adicionales */
body, html {
  margin: 0;
  padding: 0;
}

iframe {
  display: block;
  width: 100%;
  height: 100%;
}

/* Estilos para la tarjeta más estrecha */
.absolute {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
