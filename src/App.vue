<script setup>
import { onMounted } from 'vue'

import { useAuthStore } from '../src/stores/storeAuth'
import NavBar from './components/layout/NavBar.vue'

const storeAuth = useAuthStore()

onMounted(() => {
  storeAuth.init()
})

</script>

<template>
  <NavBar />
  <section class="container is-max-desktop px-2 py-4">
    <RouterView />
  </section>
</template>

<style>
@import 'bulma/css/bulma.min.css'
</style>
