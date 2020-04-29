<template>
  <div class="animation-canvas" :style="{ opacity: canvasOpacity }">
    <canvas class="canvas"></canvas>
  </div>
</template>

<script>
import withCircleAnimation from './withCircleAnimation';
import withPaticleAnimation from './withParticleAnimation';

export default {
  name: 'AnimationCanvas',
  props: {
    animationType: {
      type: String,
      default: 'Circle',
    },
  },
  mixins: [
    withCircleAnimation,
    withPaticleAnimation,
  ],
  data() {
    return {
      canvasOpacity: 0,
      canvas: null,
      context: null,
    };
  },
  mounted() {
    if (this.animationType.toLowerCase() === 'circle') {
      this.initCircleAnimation();
    }

    if (this.animationType.toLowerCase() === 'particle') {
      this.initParticleAnimation();
    }
  },
};
</script>

<style lang="scss">
@import './animation-canvas.scss';
</style>
