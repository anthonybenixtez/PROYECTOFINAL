<template>
  <div>
    <button class="btn">
      <router-link to="/forciencias" active-class="active-link">AGREGAR EVENTO</router-link>
    </button>
  </div>
  <br>
  <br>
  <br>

  <div class="flex gap-10">
    <div class="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src="https://scontent.fsal1-1.fna.fbcdn.net/v/t39.30808-6/462181395_937686878400805_1867204664736058242_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHTPFwGezw9Abo1X4ExkdnmxhXFZ7ZqUj3GFcVntmpSPQh6Bm-I090y0btome4Wm6KRdJ6htgyhdL_k3b0e_064&_nc_ohc=pzK_lglJ16sQ7kNvgFoxzbU&_nc_ht=scontent.fsal1-1.fna&_nc_gid=AVxb8CwM0wEmkx7NOUBxVsL&oh=00_AYD9tECRWiIuMGlzkYYdVaF7FmbDOx3_3lmnrjg246P95Q&oe=670A0356"
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          Bodas!
          <div class="badge badge-secondary">Nuevo!!</div>
        </h2>
        <p>Quieres estar unido con la persona que amar?</p>
        <p>puedes hacerlo realidad ven y aprende como</p>
        <div class="card-actions justify-end">
          <div class="badge badge-outline">Licenciatura en ciencas juridicas</div>
        </div>
        <li>
          <button class="btn" onclick="my_modal_4.showModal()">Direccion</button>
          <dialog id="my_modal_4" class="modal">
            <div class="modal-box w-11/12 max-w-5xl">
              <p> <H2>Departamento de ciencias juridicas</H2> </p>
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

  </div>
</template>
