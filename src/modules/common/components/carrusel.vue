<template>
  <div class="carousel-container">
    <div class="carousel rounded-box">
      <div class="carousel-item">
        <img
          src="https://scontent.fsal5-1.fna.fbcdn.net/v/t39.30808-6/410798158_748607273975434_908789241794777055_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHma8j0Qtcx-s02BZyEr-GHZosisKYql0RmiyKwpiqXRJqqpMrCZZ01p185Wehnb1bGcOssvVuFqln5k1Ls5P_2&_nc_ohc=mP4OawfcU3gQ7kNvgEP3vIi&_nc_ht=scontent.fsal5-1.fna&_nc_gid=A5Mllevke_mknfshO8-7iSp&oh=00_AYD1zMweOYyabfdK6lCPFXSuSaX1pW2xHz-bzPyj8VyScQ&oe=670A524F"
          class="w-full"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://scontent.fsal5-1.fna.fbcdn.net/v/t39.30808-6/462322193_939229288246564_2852822842127252778_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHG8pafqKTYCPmuFhn-wm-ATkT3o0t4wktORPejS3jCS8apfZk80CP2jjvXqKvy3CVWLx3PYjme2EObh90_RvWa&_nc_ohc=2l9gRejMCy0Q7kNvgFaea-P&_nc_ht=scontent.fsal5-1.fna&_nc_gid=ABBCjlXN-SHQwGgm0YIJHFG&oh=00_AYCKlKZ27oFeM34PNNu-LcJE9Vr1rGZ6ZL3_UJ63hQE0gQ&oe=670A30DB"
          class="w-full"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://scontent.fsal5-1.fna.fbcdn.net/v/t39.30808-6/462315196_937614798408013_675090123674714916_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHu67WRUEISXD5e0LZzM3ZE_RTQFFjBXJz9FNAUWMFcnMO50zHG1HYLl3AC8QoBsPgdgSCMq6iYvH1hikfPVeVx&_nc_ohc=PRqHpa8u84kQ7kNvgE0UZUv&_nc_ht=scontent.fsal5-1.fna&_nc_gid=A7iJWM_WVYViGr8tEENPtOZ&oh=00_AYDfbW3BezibrCII3Ujluw0sZi4piOJbEuR54X8BLrq1Gw&oe=670A2A58"
          class="w-full"
        />
      </div>

    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  display: flex;
  justify-content: center; /* Centrar el contenido horizontalmente */
}

.carousel {
  display: flex;
  justify-content: center;
  gap: 10px; /* Espacio entre las imágenes */
  max-width: 100%; /* Asegurar que el contenedor ocupe el 100% del ancho */
}

.carousel-item {
  flex: 1 0 auto; /* Ajustar los items según su tamaño */
  max-width: 30%; /* Ajusta el ancho de cada imagen al 30% del contenedor */
}

.carousel img {
  width: 100%;
  object-fit: cover;
}
</style>
