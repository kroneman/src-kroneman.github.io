<template>
  <div class="card">
    <div class="card_image">
      <img v-if="image" :src="image" />
      <icon v-if="icon" :name="icon" class="full-size" />
    </div>
    <div class="card_text p-4">
      <h4 class="my-1">{{title}}</h4>
      <p class="fs-16 fs-md-18">{{text}}</p>
      <link-custom class="fs-18" :href="link" :external="linkExternal">
        <span v-if="linkText">
          {{linkText}}
        </span>
        <span v-else>
          {{link}}
        </span>
      </link-custom>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/icon/icon.vue';
import linkCustom from '@/components/link-custom/link-custom.vue';

export default {
  name: 'Card',
  components: {
    Icon,
    linkCustom,
  },
  props: {
    image: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    text: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: String,
      required: false,
      default: null,
    },
    linkExternal: {
      type: Boolean,
      required: false,
      default: false,
    },
    linkText: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import "./Card";
</style>
