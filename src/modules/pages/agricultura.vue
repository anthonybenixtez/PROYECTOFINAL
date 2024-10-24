<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="card w-96 bg-white rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
      <figure class="overflow-hidden">
        <img
          class="w-full h-64 object-cover rounded-t-lg"
          src="https://scontent.fsal1-1.fna.fbcdn.net/v/t39.30808-6/457564266_912162964286530_5356393626390497866_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEcRAd80zJOrr840twgbxa1YUczCXJKpQlhRzMJckqlCd_m6j1Uif1exFQuujimatu2zb044mQ5ntSjOvFirVaF&_nc_ohc=E0aIC354Mw4Q7kNvgF9DSXd&_nc_ht=scontent.fsal1-1.fna&_nc_gid=AFBzLBVXy4GY-2PSXA-ZMYr&oh=00_AYDANvE0z45rsCE8APay5kgW5Vo5eaBVbFBwzKCBoGBRpA&oe=670B9C1E"
          alt="Evento ecológico"
        />
      </figure>
      <div class="card-body p-6 text-center">
        <h2 class="card-title text-2xl font-bold text-gray-800">
          Salva el planeta, planta un árbol hoy!
          <div class="badge badge-secondary ml-2">Nuevo!!</div>
        </h2>
        <p class="text-gray-600 mt-2">
          Ven y ayúdanos a cuidar nuestro planeta, plantando un árbol. Únete a nosotros el 
          <strong>07 de Septiembre de 2024</strong>, en el campus ULS. ¡Hacemos la diferencia juntos!
        </p>
        <div class="mt-4">
          <p class="text-sm text-gray-500">Hora: <strong>8:00 AM - 12:00 PM</strong></p>
          <p class="text-sm text-gray-500">Lugar: <strong>Universidad Luterana Salvadoreña, San Salvador</strong></p>
        </div>
        <div class="card-actions mt-4 justify-center">
          <div class="badge badge-outline text-green-500 border-green-500">Agricultura</div>
          <div class="badge badge-outline text-blue-500 border-blue-500 ml-2">Medio Ambiente</div>
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
            El evento se llevará a cabo en los jardines del edificio del Departamento de Ciencias Jurídicas.
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
