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
          src="https://scontent.fsal11-1.fna.fbcdn.net/v/t39.30808-6/457744783_913642797471880_1842477282168815156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHsDQ_pFbebDxHNeqBGD7AbjTKAXgXNrSeNMoBeBc2tJyNXPM8QCGf88TiAWi6rILz7EMmTrqeFOCJn9Qd6inaq&_nc_ohc=P3uuKokd2FwQ7kNvgG5S1Xs&_nc_ht=scontent.fsal11-1.fna&_nc_gid=Aq7VFme67o7YYp1kX0Im6Ml&oh=00_AYAhuWGx-n-Edd_0lpQ-YQchnc1sJcKWwhBPlxZTvknABg&oe=67109E67"
          class="w-full"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://scontent.fsal2-2.fna.fbcdn.net/v/t39.30808-6/455660202_900863035416523_7696907116150566736_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEQpEwcwVZ4bXkoiRqB4DIFPYZ-S6X_gsE9hn5Lpf-CwYNYocSn3Il0OHCIdvDelxBNuFKR4pkho9AZ8v0-dr7y&_nc_ohc=ayftvl1W0-kQ7kNvgHLTFmC&_nc_ht=scontent.fsal2-2.fna&_nc_gid=AD1iVY7eU1j7QELZw2WYk7i&oh=00_AYAUiqeXxiP3aqXcqUtm6XD6R2KRUQ5YprQo5NdH2Bpfnw&oe=6710A19E"
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
