<template>
  <div class="card-container">
    <div class="card">
      <img
        src="https://scontent.fsal5-1.fna.fbcdn.net/v/t39.30808-6/464324892_950813893754770_4848616014093840837_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE_BkqzctWJtSi-2Tn-_hVpUKDwmCxbthlQoPCYLFu2GfqGS4fCVJUZDV9hBfGAPkOPUGBVKEhY5889hwFgbN4v&_nc_ohc=CD3yhXcXbKAQ7kNvgGNCwfg&_nc_zt=23&_nc_ht=scontent.fsal5-1.fna&_nc_gid=ApccQyGM0Std8x1Omb-lYAt&oh=00_AYBsJFZt48kdSkO42yn_EGSvjXrm8Xkj2BE0YkabfoPtgw&oe=67472632"
        alt="Card Image"
        class="card-image"/>
      <div class="card-content">
        <button>
        <router-link to="/agri" class="action-button">Ir a carrera</router-link>
      </button>
      </div>
    </div>
  </div>
  <div class="card-container">
    <div class="card">
      <img
        src="https://scontent.fsal5-1.fna.fbcdn.net/v/t39.30808-6/464399754_950768523759307_7624636869461307538_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG7ArCph3y7dFY9p3xLhW2CH36VbhLdD-gffpVuEt0P6KeYrBi0latwS5uXrhmmE_cuhQIIl-Et-GcKiu1MiW5D&_nc_ohc=xiXAhmzzvh8Q7kNvgFZkJ1n&_nc_zt=23&_nc_ht=scontent.fsal5-1.fna&_nc_gid=Azz90NIlL3QnFVkiTucixh_&oh=00_AYB-2nl7lJVEzXAaPkLQ-YbtzWtWAF5KbwLwUlujRRVFbw&oe=674719B0"
        alt="Card Image"
        class="card-image"/>
      <div class="card-content">
        <button>
        <router-link to="/social" class="action-button">Ir a carrera</router-link>
      </button>
      </div>
    </div>
  </div>
  <div class="card-container">
    <div class="card">
      <img
        src="https://scontent.fsal5-1.fna.fbcdn.net/v/t39.30808-6/464076299_950776450425181_2739963234830591985_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFN_nvGmT9Vgm2VowJFnELuqLMvXku-lRWosy9eS76VFdqhQVL1nMfksh_YuF7G6cgeTOHw87usWh_BFLm6gDom&_nc_ohc=k5XWhox2TNwQ7kNvgHrUzdQ&_nc_zt=23&_nc_ht=scontent.fsal5-1.fna&_nc_gid=Al6TvuF_9oaKqlJD2uvo0by&oh=00_AYDkg4_c-gsswkwAEhSq8ORnd0cTuZEIR9xHQ_KENicdwA&oe=67473F51"
        alt="Card Image"
        class="card-image"/>
      <div class="card-content">
        <button>
        <router-link to="/juri" class="action-button">Ir a carrera</router-link>
      </button>
      </div>
    </div>
  </div>
    <div class="card-container">
    <div class="card">
      <img
        src="https://scontent.fsal1-1.fna.fbcdn.net/v/t39.30808-6/464316176_950776473758512_8839604362453402543_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEVNx0GWkZdykU0cgMxXTGkfBRnEIZvKwJ8FGcQhm8rAqdoG2PAEvOczC5B-l7T9XUuRv_bFQii_aENStsG9I_h&_nc_ohc=APqibT54B-gQ7kNvgHp7zHs&_nc_zt=23&_nc_ht=scontent.fsal1-1.fna&_nc_gid=ANqFbD2qcL1EicKM7NzqNlC&oh=00_AYAgI58wJru43y3AXWBzO6jZm-6ENfNQ9WJyKjDznaYiAw&oe=67473E2A"
        alt="Card Image"
        class="card-image"/>
      <div class="card-content">
        <button>
        <router-link to="/CienciasComp" class="action-button">Ir a carrera</router-link>
      </button>
      </div>
    </div>
  </div>
</template>

<style>
.card-container {
  margin: 20px;
  display: inline-block;
  perspective: 1000px; /* Añade perspectiva para un mejor efecto 3D */
}

.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: rotateY(10deg); /* Rota ligeramente la tarjeta */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transición suave */
}

.card:hover {
  transform: rotateY(0deg) translateY(-10px); /* Efecto de rotación al pasar el cursor */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* Aumenta la sombra al hacer hover */
}

.card img {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.card:hover img {
  transform: scale(1.05); /* Aumenta ligeramente el tamaño de la imagen en hover */
}

.card-content {
  padding: 15px;
  text-align: center;
}

.action-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #45a049;
}

</style>