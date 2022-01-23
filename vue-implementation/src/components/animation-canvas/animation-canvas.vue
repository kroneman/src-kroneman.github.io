<template>
  <div class="animation-canvas" :style="{ opacity: canvasOpacity }">
    <canvas class="canvas"></canvas>

    <custom-button
      v-if="isShowSkipButton"
      class="animation-canvas_button mr-4 is-small no-border"
      @click="skipMethod"
    >
      {{buttonText.skip}}
    </custom-button>

    <custom-button
      v-if="isShowRepeatButton"
      class="animation-canvas_button mb-lg-0 mr-4 is-small no-border"
      @click="repeatMethod"
    >
      {{buttonText.repeat}}
    </custom-button>
  </div>
</template>

<script>
import './animationFrame.polyfill';

import { has } from '@/utils';

import customButton from '@/components/button-custom/button-custom.vue';

import withCircleAnimation from './withCircleAnimation';
import withPaticleAnimation from './withParticleAnimation';
import withIntroAnimation from './withIntroAnimation';

export default {
  name: 'AnimationCanvas',
  components: {
    customButton,
  },
  props: {
    animationType: {
      type: String,
      default: 'Circle',
    },
    withSkipAnimation: {
      type: Boolean,
      default: false,
    },
    withReplayAnimation: {
      type: Boolean,
      default: false,
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
      buttonText: {
        skip: 'Skip Sequence',
        repeat: 'Replay Sequence',
      },
      isAnimationDone: false,
    };
  },
  computed: {
    lowerCaseAnimationType() {
      return this.animationType.toLowerCase();
    },
    isShowRepeatButton() {
      return this.withReplayAnimation && this.isAnimationDone;
    },
    isShowSkipButton() {
      return this.withSkipAnimation && !this.isAnimationDone;
    },
    initMethod() {
      const variations = {
        circle: this.initCircleAnimation,
        particle: this.initParticleAnimation,
        intro: this.introInitAnimation,
        default: () => {},
      };

      return this.getMixinVariationMethod(variations);
    },
    repeatMethod() {
      const variations = {
        circle: () => {},
        particle: () => {},
        intro: this.introReplayAnimation,
        default: () => {},
      };

      return this.getMixinVariationMethod(variations);
    },
    skipMethod() {
      const variations = {
        circle: () => {},
        particle: () => {},
        intro: this.introSkipAnimation,
        default: () => {},
      };

      return this.getMixinVariationMethod(variations);
    },
  },
  mounted() {
    this.initMethod();
  },
  methods: {
    getMixinVariationMethod(variations) {
      const { lowerCaseAnimationType } = this;
      if (has(variations, lowerCaseAnimationType)) {
        return variations[lowerCaseAnimationType];
      }

      return variations.default;
    },
  },
};
</script>

<style lang="scss">
@import './animation-canvas.scss';
</style>
