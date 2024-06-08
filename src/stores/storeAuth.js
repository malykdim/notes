import { defineStore } from 'pinia'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth }from '../config/firebase'

import { useNotesStore } from './storeNotes'

export const useAuthStore = defineStore('useAuthStore', {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        init() {
            const storeNotes = useNotesStore()

            onAuthStateChanged(auth, user => {
                if (user) {
                    console.log('user logged in: ', user)
                    this.user.id = user.uid
                    this.user.email = user.email
                    this.user.accessToken = user.accessToken
                    this.router.push('/')
                    storeNotes.init()
                } else {
                    this.user = {}
                    this.router.replace('/auth')
                    storeNotes.clearNotes()
                }
            })
        },
        registerUser(credentials) {
            createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
                    const user = userCredential.user
                    // console.log('user: ', user)
                }).catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.log('errorMessage: ', errorMessage)
                })
        },
        loginUser(credentials) {
            signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
                const user = userCredential.user
                // console.log('user: ', user)
            }).catch(error => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log('Error: ', errorMessage)
            })
        },
        logoutUser() {
            signOut(auth).then(() => {
                // console.log('User signed out')
            }).catch(error => {
                // console.log('Error: ', error.message)
            })
        }
    }
})

/* test@test.com */