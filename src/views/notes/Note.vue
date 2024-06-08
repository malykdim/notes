<script setup>
import { computed, reactive } from 'vue'
import { RouterLink } from 'vue-router';
import { useDateFormat } from '@vueuse/core';

import { useNotesStore } from '../../stores/storeNotes';
import ModalDeleteNote from '../../components/ModalDeleteNote.vue'

const props = defineProps({
    note: {
        type: Object,
        required: true
    }
})

const storeNotes = useNotesStore()

const dateFormatted = computed(() => {
    let date = new Date(parseInt(props.note.date))
    let formattedDate = useDateFormat(date, 'DD-MM-YYYY @ HH:mm')
    return formattedDate.value
})

const characterLength = computed(() => { 
    let length = props.note.content.length
    let description = length > 1 ? 'characters' : 'character'
    return `${length} ${description}` 
})

/* Modal */
const modals = reactive({
    /* this reactive object gives us a place where can manage all of our modals together */
    deleteNote: false /* this will determine whether or not the modal is shown */
})
</script>

<template>
    <div class="card mb-4">
        <div class="card-content">
            <div class="content">
                {{ note.content}}
                <div class="columns is-mobile has-text-grey-light mt-2">
                    <small class="column">{{ dateFormatted }}</small>
                    <small class="column has-text-right">{{ characterLength }} </small>
                </div>
            </div>
        </div>
        <footer class="card-footer">
            <RouterLink 
                :to="`/edit/${note.id}`" 
                class="card-footer-item"
            >
                Edit
            </RouterLink>

            <a 
                @click.prevent="modals.deleteNote = true"
                href="#" 
                class="card-footer-item"
            >
                Delete
            </a>
        </footer>
        <ModalDeleteNote  
            v-if="modals.deleteNote"
            v-model="modals.deleteNote"
            :noteId="note.id"
        />
    </div>
</template>

<style lang="scss" scoped>

</style>