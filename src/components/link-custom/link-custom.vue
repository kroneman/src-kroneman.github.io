<template>
  <span>
    <a v-if="external" :href="href" target="_blank">
      <slot />
    </a>
    <a v-else-if="email" :href="href">
      <slot />
    </a>
    <router-link v-else :to="href">
      <slot />
    </router-link>
  </span>
</template>

<script>
export default {
  name: 'Customlink',
  props: {
    external: { type: Boolean, default: false },
    email: { type: Boolean, default: false },
    href: { type: String, required: true },
  },
};
</script>

<style lang="scss">
@import '@/style/variables';
</style>
