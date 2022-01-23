<template>
  <!-- source: https://github.com/simple-icons/simple-icons/blob/develop/icons/linkedin.svg -->
  <div class="icon">
    <linkedin v-if="name === 'linkedin'" />
    <github v-if="name === 'github'" />
    <stackoverflow v-if="name === 'stackoverflow'" class="stackoverflow" />
    <google-apps-script v-if="name === 'google-app-script'" />
    <gmail v-if="name === 'gmail'" />
    <lion-logo v-if="name === 'lion-logo'" />
  </div>
</template>

<script>
import * as linkedin from '@assets/icons/linkedin.svg';
import * as gmail from '@assets/icons/gmail.svg';
import * as github from '@assets/icons/github.svg';
import * as stackoverflow from '@assets/icons/stackoverflow.svg';
import * as googleAppsScript from '@assets/icons/google-apps-script.svg';
import * as lionLogo from '@assets/icons/lion-logo.svg';

export default {
  name: 'Icon',
  components: {
    linkedin,
    gmail,
    github,
    stackoverflow,
    googleAppsScript,
    lionLogo,
  },
  props: {
    name: { type: String, default: 'none' },
  },
};
</script>

<style lang="scss">
@import './icon.scss';
</style>
