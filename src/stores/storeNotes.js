import { defineStore } from 'pinia'
import { 
    collection, onSnapshot, 
    doc, deleteDoc, updateDoc, addDoc,
    query, orderBy
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuthStore } from './storeAuth'

let notesCollectionRef 
let notesCollectionQuery 

let getNotesSnapshot = null

export const useNotesStore = defineStore('useNotesStore', {
    state: () => {
        return {
            notes: [
                // { id: 'id1', content: 'Hello'},
                // { id: 'id2', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quo voluptate praesentium numquam. Consectetur, esse odit.'},
                // { id: 'id3', content: 'Dolor quo voluptate praesentium numquam. Consectetur, esse odit.'}            
            ],
            notesLoaded: false
        }
    },
    getters: {
        getNoteContent: (state) => {
            return (id) => {
                return state.notes.filter(note => note.id === id)[0].content
            }
        },
        totalNotesCount: (state) => {
            return state.notes.length
        },
        totalCharactersCount: (state) => {
            let count = 0
            state.notes.forEach(note => {
                count += note.content.length
            })
            return count
        }
    },
    actions: {
        init() {
            const storeAuth = useAuthStore()
            // initialize database refs
            notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
            notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))

            this.getNotes()
        },
        async getNotes() {
            this.notesLoaded = false

            // if (getNotesSnapshot) getNotesSnapshot() // unsubscribe from any active listener

            getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
                let notes = []
                querySnapshot.forEach((doc) => {
                    let note = {
                        id: doc.id,
                        content: doc.data().content,
                        date: doc.data().date
                    }
                    notes.push(note)
                })
                this.notes = notes
                this.notesLoaded = true
            }, error => {
                console.log('error.message: ', error.message)
            })
        },
        clearNotes() {
            this.notes = []
            if (getNotesSnapshot) getNotesSnapshot() // unsubscribe from any active listener
        },
        async addNote(newNoteContent) {
            let currentDate = new Date().getTime(),
                date = currentDate.toString()
           
            await addDoc(notesCollectionRef, {
                content: newNoteContent,
                date
            })
        },
        async deleteNote(idToDelete) {
            await deleteDoc(doc(notesCollectionRef, idToDelete))
        },
        async updateNote(id, content) {
            await updateDoc(doc(notesCollectionRef, id), {
                content
            })
        }
    }
})