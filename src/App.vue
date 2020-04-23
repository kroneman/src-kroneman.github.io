<template>
  <div>
    <Header />
    <div class="app-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '@/sections/Header.vue';

export default {
  components: { Header },
};
</script>

<style lang="scss">
@import "./App.scss";
</style>
