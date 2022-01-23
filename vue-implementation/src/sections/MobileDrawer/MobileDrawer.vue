<template>
  <div
    class="mobile-drawer"
    :class="{
      'is-open': isOpen
    }"
  >
    <div class="mobile-drawer_content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileDrawer',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import "./MobileDrawer.scss";
</style>
