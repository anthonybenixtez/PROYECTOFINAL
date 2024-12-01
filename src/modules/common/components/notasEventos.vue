<template>
  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-blue-500 p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg relative">
      <h3 class="text-lg font-bold mb-4 text-white">Invitaciones y notas del día {{ selectedDate }}</h3>

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
          <li v-for="(evento, index) in eventos" :key="index" class="flex flex-col bg-gray-100 p-2 rounded-lg text-sm">
            <div class="text-black">
              <span class="font-semibold">{{ evento.titulo }}</span>
              <p class="italic text-gray-600">Categoría: {{ evento.categoria }}</p>
              <p class="text-gray-800">{{ evento.descripcion }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Sección de Notas -->
      <div>
        <h4 class="text-md font-semibold mb-3 text-white">Notas del día</h4>
        <ul class="space-y-2">
          <li v-for="(note, index) in notes" :key="index" class="flex items-start justify-between bg-gray-100 p-2 rounded-lg text-sm">
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
import { defineComponent, ref, watch, onMounted } from 'vue';
import { db } from '@/modules/common/components/firebase';
import { collection, addDoc, updateDoc, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';

export default defineComponent({
  props: {
    showModal: Boolean,
    selectedDate: String,
    eventos: Array,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const newNote = ref('');
    const notes = ref<{ text: string; id: string }[]>([]);
    const editingIndex = ref<number | null>(null);
    const editNoteText = ref('');

    const closeModal = () => {
      emit('close');
      newNote.value = '';
      editingIndex.value = null;
      editNoteText.value = '';
    };

    const fetchNotes = () => {
      if (props.selectedDate) {
        const notesCollection = collection(db, 'notes');
        const q = query(notesCollection, where('date', '==', props.selectedDate));

        onSnapshot(q, (querySnapshot) => {
          notes.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().note,
          }));
        });
      }
    };

    const saveNote = async () => {
      if (newNote.value && props.selectedDate) {
        try {
          await addDoc(collection(db, 'notes'), {
            note: newNote.value,
            date: props.selectedDate,
          });
          newNote.value = '';
        } catch (error) {
          console.error('Error al guardar la nota: ', error);
        }
      }
    };

    const startEditing = (index: number) => {
      editingIndex.value = index;
      editNoteText.value = notes.value[index].text;
    };

    const saveEdit = async (noteId: string) => {
      if (editNoteText.value) {
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
      const noteDoc = doc(db, 'notes', noteId);
      await deleteDoc(noteDoc);
    };

    watch(() => props.selectedDate, fetchNotes);

    onMounted(fetchNotes);

    return {
      newNote,
      notes,
      closeModal,
      saveNote,
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
  max-width: 500px;
}
.bg-blue-500 {
  background-color: #3b82f6;
}
</style>
