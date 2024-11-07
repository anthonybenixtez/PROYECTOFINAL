<template>
  <div class="welcome-container">
    <h1 class="welcome-title">¡Bienvenido a nuestra Página web!</h1>
    <p class="welcome-subtitle">
      Explora los eventos de nuestra universidad de forma rápida y sencilla
    </p>
  </div>
</template>

<style scoped>
.welcome-container {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
}

.welcome-title {
  font-size: 3rem;
  font-weight: bold;
  color: #4caf50; /* Verde llamativo */
  margin: 0;
  animation: fadeIn 2s ease-out, slideUp 1s ease-out 0.5s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.welcome-subtitle {
  font-size: 1.25rem;
  color: #ffa726; /* Naranja vibrante */
  margin: 10px 0;
  animation: fadeIn 2s ease-out, slideUp 1s ease-out 1s;
  opacity: 0;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
}

.welcome-container:hover .welcome-title,
.welcome-container:hover .welcome-subtitle {
  color: #ff4081; /* Color de énfasis en hover */
}

.welcome-title::after {
  content: '🎓'; /* Icono del birrete */
  font-size: 2rem;
  display: inline-block;
  margin-left: 10px;
  animation: bounce 1s infinite ease-in-out;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Rebote hacia arriba */
  }
}
</style>
