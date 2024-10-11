<template>
  <div class="card bg-base-100 w-96 shadow-xl">
    <figure>
      <img
        src="https://scontent.fsal1-1.fna.fbcdn.net/v/t39.30808-6/462243083_937603341742492_6245099774094448540_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEvFzb_XVvxHrCTIGkxsb5s2yl1laFuTf3bKXWVoW5N_X9kCv5WkIhaMEDe_ofAqsR3dCN-7Qwvifdb8JjYAFFU&_nc_ohc=GgbmGOorxMUQ7kNvgERtzQj&_nc_ht=scontent.fsal1-1.fna&_nc_gid=AB3XS-laptjA_DoNWCseUVi&oh=00_AYCgnL78xTS4Rec4iYBsDI_Z92bV1wMiMPKdg-GfyI0tkQ&oe=670A450F"
        alt="Shoes"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        Feria de Salud!
        <div class="badge badge-secondary">Nuevo!!</div>
      </h2>
      <p>
        Ven y descubre los beneficios proporcionados en nuestra Feria de salud te esperamos con
        ansias
      </p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">Trabajo Social</div>
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
</template>
