<script setup>
import { ref } from 'vue'
import { useNotesStore } from '../stores/storeNotes'
import { vAutofocus } from '../directives/vAutofocus'
import { useWatchCharacters } from '../use/useWatchCharacters'

const storeNotes = useNotesStore()

const someQuestion = ref('')
useWatchCharacters(someQuestion, 20)
</script>

<template>
    <div class="stats">

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Number of Notes</td>
                    <td>{{ storeNotes.totalNotesCount }}</td>
                </tr>
                <tr>
                    <td>Number of Characters (of all notes)</td>
                    <td>{{ storeNotes.totalCharactersCount}}</td>
                </tr>
            </tbody>
        </table>

        <input 
            v-model="someQuestion"
            type="text" 
            placeholder="some question" class="input" 
            v-autofocus  
        />
    </div>
</template>

<style lang="scss" scoped>

</style>