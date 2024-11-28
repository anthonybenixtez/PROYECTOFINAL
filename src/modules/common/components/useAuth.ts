import { ref } from 'vue';
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

export const useAuth = () => {
  const isLoggedIn = ref(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      isLoggedIn.value = false;  // Actualiza el estado a false cuando se cierra sesión
      router.push('/home');  // Redirige a la página de login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return {
    isLoggedIn,
    handleSignOut
  };
};
