<template>
  <div class="mobile-drawer_icon" @click="$emit('trigger')">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'MobileDrawer',
};
</script>

<style lang="scss">
@import '~@/style/variables';
.mobile-drawer_icon {
  position: absolute;
  left: 0;
  width: 50px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;

  span {
    width: 100%;
    content: '';
    display: block;
    height: 2px;
    background: white;
    cursor: pointer;
  }

  @include respond(lg) {
    display: none;
  }
}
</style>
