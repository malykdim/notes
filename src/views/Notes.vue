<script setup>
import { ref } from 'vue'

import { useNotesStore } from '../stores/storeNotes'
import { useWatchCharacters } from '../use/useWatchCharacters'

import Note from './notes/Note.vue'
import AddEditNote from './notes/AddEditNote.vue'

const storeNotes = useNotesStore()

const newNote = ref('')
const addEditNoteRef = ref(null)

const onAddNote = () => {    
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    addEditNoteRef.value.focusTextarea()
}

useWatchCharacters(newNote, 100)

</script>

<template>
    <div class="notes">

        <AddEditNote
            v-model="newNote"
            placeholder="Add a new note"
            ref="addEditNoteRef"
        >
            <!-- <template v-slot:buttons> -->
            <template #buttons>
                <button 
                    @click="onAddNote" 
                    :disabled="!newNote" 
                    class="button is-link has-background-success"
                >
                    Add New Note
                </button>
            </template>
        </AddEditNote>

        <!-- <pre>
            {{ newNote }}
        </pre> -->

        <progress 
            v-if="!storeNotes.notesLoaded"
            class="progress is-large is-success" 
            max="100" 
        />

        <template v-else>
            <Note  
                v-for="note in storeNotes.notes" 
                :key="note.id" 
                :note="note" 
            />

            <div 
                v-if="!storeNotes.notes.length"
                class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
            >
                No notes here yet...
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>

</style>