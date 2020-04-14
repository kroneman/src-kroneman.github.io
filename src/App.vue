<template>
  <div>
    <Header />
    <div class="container">
      <!-- <div id="nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>
      </div> -->
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
