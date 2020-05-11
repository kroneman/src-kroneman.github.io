<template>
  <div class="about pt-6">
    <div class="container pt-6">
      <div v-if="googleApiData" v-html="googleApiData"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const { VUE_APP_G_DOC_POC } = process.env;
export default {
  name: 'GoogleDrivePOC',
  data() {
    return {
      googleApiData: null,
    };
  },
  async created() {
    if (!VUE_APP_G_DOC_POC) {
      return;
    }

    const { data } = await axios.get(VUE_APP_G_DOC_POC);
    const { html } = data;

    if (!html) {
      return;
    }

    this.googleApiData = html;
  },
};
</script>
