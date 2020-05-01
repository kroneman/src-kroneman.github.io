<template>
  <div>
    <div class="endless-scroll-container">
      <div class="endless-scroll-items"

      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
const { requestAnimFrame } = window;
export default {
  name: 'EndlessHorizontalScroll',
  data() {
    return {
      timeStamp: null,
      transformLeft: 0,
    };
  },
  mounted() {
    // this.timeStamp = Date.now();
    // this.animationLoop();
  },
  computed: {
    scrollItemsStyleObject() {
      console.log('scrollItemsStyleObject');
      return {
        transform: this.transformX(this.transformLeft),
      };
    },
  },
  methods: {
    tick() {
      // console.log('tick');
      // this.transformLeft -= 20;
      // this.transformLeft
    },
    animationLoop() {
      if (Date.now() < (this.timeStamp + Math.floor(1000 / 1))) {
        return requestAnimFrame(this.animationLoop);
      }

      this.tick();

      this.timeStamp = Date.now();
      return requestAnimFrame(this.animationLoop);
    },
    transformX(amount) {
      return `transform: translateX(${amount}px)`;
    },
  },
};
</script>

<style lang="scss">
@import './endless-horizontal-scroll.scss';
.red-border {
  border: 1px solid red;
}
</style>
