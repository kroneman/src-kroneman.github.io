<template>
  <header class="header px-4">
    <div class="row align-items-center">
      <div class="col-12 col-md-6 col-lg-9 col-xl-6 flex-grow">
        <div class="d-flex align-items-center justify-content-center justify-content-md-left">
          <h1 class="p-0 m-0 py-2 header_title">
            <a href="/" class="header_title_link">
              {{title}}
            </a>
          </h1>
          <navigation />
        </div>
      </div>

      <div class="col col-xl-6 d-none d-md-flex flex-grow justify-content-right">
        <div class="social">
          <ul class="social_list">
            <li v-for="item in socialList"
                :key="item.icon"
                class="social_list_item py-2"
            >
              <link-custom :href="item.link" :external="true" class="social_list_link">
                <icon :name="item.icon" style="max-width: 34px" />
              </link-custom>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Icon from '@/components/icon.vue';
import linkCustom from '@/components/link-custom/link-custom.vue';
import navigation from '@/sections/Navigation.vue';

export default {
  components: {
    Icon,
    linkCustom,
    navigation,
  },
  data() {
    return {
      title: '@kroneman',
      socialList: [
        {
          icon: 'stackoverflow',
          link: 'https://stackoverflow.com/users/6598680/lkroneman',
        },
        {
          icon: 'gmail',
          link: 'mailto:a.l.kroneman@gmail.com?subject=kroneman.io',
        },
        {
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/kroneman/',
        },
        {
          icon: 'github',
          link: 'https://github.com/kroneman',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "./Header.scss";
</style>
