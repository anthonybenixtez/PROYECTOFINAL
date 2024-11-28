// src/services/authState.ts
import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/modules/common/components/firebase";

const isLoggedIn = ref(false);

// Escucha cambios de estado en la autenticación
onAuthStateChanged(auth, (user) => {
  isLoggedIn.value = !!user; // True si hay un usuario autenticado
});

export function useAuthState() {
  return { isLoggedIn };
}
