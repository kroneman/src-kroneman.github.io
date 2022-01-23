<template>
  <div>
    <div class="endless-scroll-container">
      <div class="endless-scroll-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EndlessHorizontalScroll',
};
</script>

<style lang="scss">
@import './endless-horizontal-scroll.scss';
</style>
