<script setup>
import {ref} from 'vue'
import { onClickOutside } from '@vueuse/core'

import { useAuthStore } from '../../stores/storeAuth'

const storeAuth = useAuthStore()


// mobile nav
const showMobileNav = ref(false)

const navbarMenuRef = ref(null)
const navbarBurgerRef = ref(null)
onClickOutside(navbarMenuRef, () => {
    showMobileNav.value = false
}, {
    ignore: [navbarBurgerRef]
})
const onLogout = () => {
    showMobileNav.value = false
    storeAuth.logoutUser()
}
</script>

<template>
    <nav class="navbar is-success" role="navigation" aria-label="main navigation">
        <div class="container is-max-desktop px-2">

            <div class="navbar-brand">
                <div class="navbar-item is-size-3 is-family-monospace">
                    Notes
                </div>
    
                <a @click.prevent="showMobileNav = !showMobileNav" role="button" class="navbar-burger" :class="{'is-active': showMobileNav }" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" ref="navbarBurgerRef">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>
    
            <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': showMobileNav }" ref="navbarMenuRef">
                <div clas="navbar-start">
                    <button 
                        v-if="storeAuth.user.id"
                        @click="onLogout"
                        class="button is-small is-info mt-3 ml-3"
                    >
                        Logout {{ storeAuth.user.email }}
                    </button>
                </div>
                <div class="navbar-end">
                    <RouterLink @click="showMobileNav = false" to="/" class="navbar-item" active-class="is-active">
                        Notes
                    </RouterLink>
                    <RouterLink @click="showMobileNav = false" to="/stats" class="navbar-item" active-class="is-active">
                        Stats
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 1023px) {
    .navbar-menu {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>