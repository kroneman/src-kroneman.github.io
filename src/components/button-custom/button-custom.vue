<template>
  <button
    class="button"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
};
</script>

<style lang="scss">
@import './button-custom.scss';
</style>
