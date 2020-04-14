<template>
  <span class="link-custom">
    <a v-if="external" :href="href" @click="trackLink" target="_blank">
      <slot />
    </a>
    <a v-else-if="email" :href="href" @click="trackLink">
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
    eventCategory: { type: String, default: 'linkCustom' },
    eventAction: { type: String, default: 'navigate' },
  },
  methods: {
    trackLink() {
      if (this.$ga) {
        this.$ga.event({
          eventCategory: this.eventCategory,
          eventAction: this.eventAction,
          eventLabel: this.href,
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import './link-custom.scss';
</style>
