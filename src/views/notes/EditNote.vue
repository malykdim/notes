<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useNotesStore } from '../../stores/storeNotes'
import AddEditNote from './AddEditNote.vue'

const storeNotes = useNotesStore()

const route = useRoute()
const router = useRouter()


const noteContent = ref('')

noteContent.value = storeNotes.getNoteContent(route.params.id)

const handleEdit = () => {
    storeNotes.updateNote(route.params.id, noteContent.value)
    router.push('/')
}

</script>

<template>
    <div class="edit-note">
        <div class="edit-note">
            <h2>Edit Note with an id of: {{ $route.params.id }}</h2>
        </div>

        <AddEditNote
            v-model="noteContent"
            bgColor="link"
            placeholder="Edit note"
            label="Edit note"
            ref="addEditNoteRef"
        >
            <!-- <template v-slot:buttons> -->
            <template #buttons>
                <button 
                    @click="$router.back()" 
                    class="button is-link is-light mr-2"
                >
                    Cancel
                </button>
                <button 
                    @click="handleEdit" 
                    :disabled="!noteContent" 
                    class="button is-link has-background-link"
                >
                    Save Note
                </button>
            </template>
        </AddEditNote>

    </div>
</template>

<style lang="scss" scoped>

</style>