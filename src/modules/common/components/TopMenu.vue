<template>
  <div class="navbar bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-white text-gray-700 rounded-lg z-10 mt-3 w-52 p-2 shadow-lg"
        >
          <li>
            <router-link to="/" active-class="active-link">Inicio</router-link>
          </li>
          <li>
            <details open>
              <summary>Carreras</summary>
              <ul class="pl-4">
                <li>
                  <router-link to="/agri" active-class="active-link">Agricultura</router-link>
                </li>
                <li>
                  <router-link to="/juri" active-class="active-link">Lic. en ciencias jurídicas</router-link>
                </li>
                <li>
                  <router-link to="/social" active-class="active-link">Lic. trabajo social</router-link>
                </li>
              </ul>
            </details>
          </li>
          <li><a href="#">Item 3</a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <a class="text-2xl font-bold">ULS Eventos</a> 
    </div>
    <div class="navbar-end flex items-center space-x-3">
      <button class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  padding: 1rem;
}

.dropdown-content {
  transition: all 0.3s ease-in-out; 
}

.dropdown:hover .dropdown-content {
  transform: scale(1.05); 
}

.active-link {
  color: #1d4ed8;
  font-weight: bold;
}

.btn-circle:hover {
  background-color: rgba(255, 255, 255, 0.1); 
}
</style>
