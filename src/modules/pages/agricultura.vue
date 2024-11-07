<template>
  <div class="card bg-base-100 w-96 shadow-xl">
    <figure>
      <img
        src="https://scontent.fsal1-1.fna.fbcdn.net/v/t39.30808-6/457564266_912162964286530_5356393626390497866_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEcRAd80zJOrr840twgbxa1YUczCXJKpQlhRzMJckqlCd_m6j1Uif1exFQuujimatu2zb044mQ5ntSjOvFirVaF&_nc_ohc=E0aIC354Mw4Q7kNvgF9DSXd&_nc_ht=scontent.fsal1-1.fna&_nc_gid=AFBzLBVXy4GY-2PSXA-ZMYr&oh=00_AYDANvE0z45rsCE8APay5kgW5Vo5eaBVbFBwzKCBoGBRpA&oe=670B9C1E"
        alt="Shoes"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        Salva el planeta, planta un arbol hoy!
        <div class="badge badge-secondary">Nuevo!!</div>
      </h2>
      <p>Ven y ayudanos a cuidar a nuestro planeta, plantando un arbol</p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">Agricultura</div>
      </div>
      <li>
        <button class="btn" onclick="my_modal_4.showModal()">Direccion</button>
        <dialog id="my_modal_4" class="modal">
          <div class="modal-box w-11/12 max-w-5xl">
            <div>
              <h4 class="text-center">Departamento de ciencias juridicas</h4>
            </div>
            <br />
            <br />
            <figure>
              <img src="https://uls.edu.sv/sitioweb/images/2022/IMG_5547.JPG" alt="Shoes" />
            </figure>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </li>
    </div>
  </div>
</template>
