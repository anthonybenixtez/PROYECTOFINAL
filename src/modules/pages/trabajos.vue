<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="card w-96 bg-white rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
      <figure class="overflow-hidden">
        <img
          class="w-full h-64 object-cover rounded-t-lg"
          src="https://scontent.fsal1-1.fna.fbcdn.net/v/t39.30808-6/462243083_937603341742492_6245099774094448540_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEvFzb_XVvxHrCTIGkxsb5s2yl1laFuTf3bKXWVoW5N_X9kCv5WkIhaMEDe_ofAqsR3dCN-7Qwvifdb8JjYAFFU&_nc_ohc=GgbmGOorxMUQ7kNvgERtzQj&_nc_ht=scontent.fsal1-1.fna&_nc_gid=AB3XS-laptjA_DoNWCseUVi&oh=00_AYCgnL78xTS4Rec4iYBsDI_Z92bV1wMiMPKdg-GfyI0tkQ&oe=670A450F"
          alt="Feria de Salud"
        />
      </figure>
      <div class="card-body p-6 text-center">
        <h2 class="card-title text-2xl font-bold text-gray-800">
          Feria de Salud!
          <div class="badge badge-secondary ml-2">Nuevo!!</div>
        </h2>
        <p class="text-gray-600 mt-2">
          ¡Ven y descubre los beneficios proporcionados en nuestra Feria de Salud! Te esperamos con ansias.
        </p>
        <div class="mt-4">
          <p class="text-sm text-gray-500">Fecha: <strong>5 de Octubre de 2024</strong></p>
          <p class="text-sm text-gray-500">Hora: <strong>9:00 AM - 1:00 PM</strong></p>
          <p class="text-sm text-gray-500">Lugar: <strong>Universidad Luterana Salvadoreña, San Salvador</strong></p>
        </div>
        <div class="card-actions mt-4 justify-center">
          <div class="badge badge-outline text-blue-500 border-blue-500">
            Trabajo Social
          </div>
          <div class="badge badge-outline text-purple-500 border-purple-500 ml-2">Salud y Bienestar</div>
        </div>
        <button class="btn btn-primary mt-6" onclick="my_modal_4.showModal()">Ver Dirección</button>
        
      </div>

      <!-- Modal -->
      <dialog id="my_modal_4" class="modal">
        <div class="modal-box w-11/12 max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <h4 class="text-2xl font-semibold text-gray-800 text-center mb-4">Departamento de Ciencias Jurídicas</h4>
          <figure class="w-full flex justify-center">
            <img
              class="rounded-lg shadow-lg"
              src="https://uls.edu.sv/sitioweb/images/2022/IMG_5547.JPG"
              alt="Edificio ULS"
            />
          </figure>
          <p class="text-gray-600 mt-4 text-center">
            Ven a informarte sobre servicios de salud, bienestar, y más. ¡No te lo pierdas!
          </p>
          <div class="modal-action justify-center mt-6">
            <button class="btn btn-secondary" onclick="my_modal_4.close()">Cerrar</button>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.card:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}
.btn-primary {
  background-color: #22c55e;
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.3s ease-in-out;
}
.btn-primary:hover {
  background-color: #16a34a;
}
.btn-secondary {
  background-color: #6366f1;
  color: white;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
}
.btn-secondary:hover {
  background-color: #4f46e5;
}
.modal-box {
  border-radius: 1rem;
}
</style>
