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
  padding: 50px; 
  background: linear-gradient(135deg, #ff6f61, #ffca28); 
  color: #fff;
  border-radius: 15px; 
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); 
  transition: transform 0.3s ease; 
}

.welcome-container:hover {
  transform: scale(1.05); /* Aumentar tamaño al pasar el cursor */
}

.welcome-title {
  font-size: 3.5rem; 
  font-weight: 900; 
  margin: 0;
  text-transform: uppercase; 
  letter-spacing: 3px; }

.welcome-subtitle {
  font-size: 1.75rem;
  margin-top: 20px;
  font-weight: 400; 
  color: #fffde7; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); 
}

</style>
