<template>
  <div
    class="mobile-drawer_icon"
    :class="{
      'is-active': isActive
    }"
    @click="trigger"
  >
    <div class="pos-r">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileDrawer',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    trigger() {
      this.$emit('trigger');
    },
  },
};
</script>

<style lang="scss">
@import '~@/style/variables';

$icon-height: 42px;
$x-offset: 9px;
.mobile-drawer_icon {
  position: absolute;
  left: 0;
  width: 50px;
  height: $icon-height;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;

  .line {
    width: 100%;
    content: '';
    display: block;
    height: 2px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-bottom: $icon-height / 6;
    &:last-child {
      margin-bottom: 0px;
    }
  }

  @include respond(lg) {
    display: none;
  }

  // https://codepen.io/RRoberts/pen/ZBYaJr
  &.is-active {
    transition: all 0.3s ease-in-out;
    transition-delay: 0.6s;
    transform: rotate(45deg);

    .line:nth-child(2) {
      width: 0px;
    }

    .line:nth-child(1),
    .line:nth-child(3) {
      transition-delay: 0.3s;
    }

    .line:nth-child(1) {
      transform: translateY($x-offset);
    }

    .line:nth-child(3) {
      transform: translateY(-$x-offset) rotate(90deg);
    }
  }
}
</style>
