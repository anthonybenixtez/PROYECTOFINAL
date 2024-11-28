<template>
  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-blue-500 p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg relative">
      <h3 class="text-lg font-bold mb-4 text-white">Añadir una invitación pública para el día {{ selectedDate }}</h3>
      
      <!-- Sección de Nota -->
      <div class="mb-4">
        <input 
          v-model="newNote" 
          type="text" 
          placeholder="Escribe una nota" 
          class="w-full p-2 border border-gray-300 rounded mb-3 text-sm text-black bg-white" 
        />
        <div class="flex justify-start space-x-2 mb-4">
          <img @click="saveNote" src="@/assets/images/save.svg" alt="Guardar" class="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      <img @click="closeModal" src="@/assets/images/close.svg" alt="Cerrar" class="absolute top-4 right-4 w-6 h-6 cursor-pointer" />

      <!-- Sección de Eventos -->
      <div class="mb-4">
        <h4 class="text-md font-semibold mb-3 text-white">Eventos del día</h4>
        <ul class="space-y-2 mb-4">
          <li v-for="(evento, index) in eventos" :key="evento.id" class="flex flex-col bg-gray-100 p-2 rounded-lg text-sm">
            <div class="text-black">
              <span class="font-semibold">{{ evento.nombre }}</span>
              <p>{{ evento.descripcion }}</p>
              <!-- Se eliminó la hora del evento -->
            </div>
          </li>
        </ul>
      </div>

      <!-- Sección de Notas -->
      <div>
        <h4 class="text-md font-semibold mb-3 text-white">Notas del día</h4>
        <ul class="space-y-2">
          <li v-for="(note, index) in notes" :key="note.id" class="flex items-start justify-between bg-gray-100 p-2 rounded-lg text-sm">
            <div class="flex-1 mr-2 overflow-hidden text-black overflow-ellipsis">
              <span v-if="editingIndex !== index" class="block whitespace-pre-wrap break-words max-h-20 overflow-y-auto">
                {{ note.text }}
              </span>
              <input 
                v-if="editingIndex === index" 
                v-model="editNoteText" 
                class="w-full p-1 border border-gray-300 rounded text-sm bg-white text-black" 
              />
            </div>
            
            <div class="flex space-x-1">
              <img 
                v-if="editingIndex !== index" 
                @click="startEditing(index)" 
                src="@/assets/images/edit.svg" 
                alt="Editar" 
                class="w-6 h-6 cursor-pointer" 
              />
              <img 
                v-if="editingIndex === index" 
                @click="saveEdit(note.id)" 
                src="@/assets/images/check.svg" 
                alt="Guardar" 
                class="w-6 h-6 cursor-pointer" 
              />
              <img 
                v-if="editingIndex === index" 
                @click="cancelEdit" 
                src="@/assets/images/cancel.svg" 
                alt="Cancelar" 
                class="w-6 h-6 cursor-pointer" 
              />
              <img 
                v-if="editingIndex !== index" 
                @click="deleteNote(note.id)" 
                src="@/assets/images/delete.svg" 
                alt="Eliminar" 
                class="w-6 h-6 cursor-pointer" 
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { db } from '@/modules/common/components/firebase';
import { collection, addDoc, updateDoc, deleteDoc, query, where, doc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default defineComponent({
  props: {
    showModal: Boolean,
    selectedDate: String,
    eventos: Array,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const auth = getAuth();
    const user = auth.currentUser;
    const newNote = ref('');
    const notes = ref<{ id: string; text: string }[]>([]);
    const editingIndex = ref<number | null>(null);
    const editNoteText = ref('');

    const closeModal = () => {
      emit('close');
      newNote.value = '';
      editingIndex.value = null;
      editNoteText.value = '';
    };

    const fetchNotes = () => {
      if (props.selectedDate && user) {
        const notesCollection = collection(db, 'notes');
        const q = query(
          notesCollection,
          where("date", "==", props.selectedDate),
          where("userId", "==", user.uid)
        );

        onSnapshot(q, (querySnapshot) => {
          notes.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            text: doc.data().note,
          }));
        });
      }
    };

    const saveNote = async () => {
      if (newNote.value && props.selectedDate && user) {
        try {
          await addDoc(collection(db, 'notes'), {
            note: newNote.value,
            date: props.selectedDate, 
            userId: user.uid,
          });
          newNote.value = '';
          // No actualizamos el icono de notificación para notas
        } catch (error) {
          console.error("Error al guardar la nota: ", error);
        }
      }
    };

    const startEditing = (index: number) => {
      editingIndex.value = index;
      editNoteText.value = notes.value[index].text;
    };

    const saveEdit = async (noteId: string) => {
      if (editNoteText.value && user) {
        const noteDoc = doc(db, 'notes', noteId);
        await updateDoc(noteDoc, { note: editNoteText.value });
        editingIndex.value = null;
        editNoteText.value = '';
      }
    };

    const cancelEdit = () => {
      editingIndex.value = null;
      editNoteText.value = '';
    };

    const deleteNote = async (noteId: string) => {
      if (user) {
        const noteDoc = doc(db, 'notes', noteId);
        await deleteDoc(noteDoc);
        // No actualizamos el icono de notificación para notas
      }
    };

    const saveEvent = async (evento) => {
      if (props.selectedDate && user) {
        try {
          // Guardamos el evento en Firebase
          await addDoc(collection(db, 'events'), {
            nombre: evento.nombre,
            descripcion: evento.descripcion,
            fecha: props.selectedDate, 
            userId: user.uid,
          });
          // Actualizamos el icono de notificación solo cuando se agrega un evento
          updateNotificationIcon();
        } catch (error) {
          console.error("Error al guardar el evento: ", error);
        }
      }
    };

    const updateNotificationIcon = () => {
      // Solo actualizamos el icono de notificación cuando se agrega un evento
      const eventDate = props.selectedDate;
      const eventIndex = props.eventos.findIndex(event => event.fecha === eventDate);
      if (eventIndex >= 0) {
        // Aquí puedes cambiar el estado de un ícono para indicar que hay eventos en ese día
        console.log("¡Notificación activada para el evento!");
      }
    };

    watch(() => props.selectedDate, fetchNotes);

    onMounted(fetchNotes);

    return {
      newNote,
      notes,
      closeModal,
      saveNote,
      saveEvent,
      editingIndex,
      editNoteText,
      startEditing,
      saveEdit,
      cancelEdit,
      deleteNote,
    };
  },
});
</script>

<style scoped>
.max-w-lg {
  max-width: 500px; /* Aumentar el tamaño del modal */
}
.max-h-[90vh] {
  max-height: 90vh; /* Hacer el modal más grande */
}
.bg-blue-500 {
  background-color: #3b82f6; /* Cambiar el color de fondo del modal */
}
.overflow-y-auto {
  overflow-y: auto;
}
</style>
