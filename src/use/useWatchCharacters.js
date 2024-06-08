import { watch } from 'vue'

export function useWatchCharacters(valueToWatch, maxChars = 10) {
    watch(valueToWatch, (newValue) => {
        if (newValue.length === maxChars) {
            alert(`Only ${maxChars} characters allowed`)
        }
    })    
}