<template>
  <div class="animation-canvas" :style="{ opacity: canvasOpacity }">
    <canvas class="canvas"></canvas>
  </div>
</template>

<script>
import './animationFrame.polyfill';
import withCircleAnimation from './withCircleAnimation';
import withPaticleAnimation from './withParticleAnimation';
import withIntroAnimation from './withIntroAnimation';

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
    withIntroAnimation,
  ],
  data() {
    return {
      canvasOpacity: 0,
      canvas: null,
      context: null,
    };
  },
  mounted() {
    const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
    const variations = {
      circle: this.initCircleAnimation,
      particle: this.initParticleAnimation,
      intro: this.introInitAnimation,
    };

    const lowercaseAnimationtype = this.animationType.toLowerCase();
    if (has(variations, lowercaseAnimationtype)) {
      variations[lowercaseAnimationtype]();
    }
  },
};
</script>

<style lang="scss">
@import './animation-canvas.scss';
</style>
