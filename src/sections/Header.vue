<template>
  <header class="header px-4 row">
    <div class="col-6 flex-grow">
      <h1 class="p-0 m-0 py-2 header_title">
        <a href="/" class="header_title_link">
          {{title}}
        </a>
      </h1>
    </div>
    <div class="col-6 d-flex flex-grow justify-content-right">
      <div class="social">
        <ul class="social_list">
          <li v-for="item in socialList"
              :key="item.icon"
              class="social_list_item py-2"
          >
            <a :href="item.link" class="social_list_link">
              <icon :name="item.icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import Icon from '@/components/icon';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      title: 'Lennart Kroneman',
      socialList: [
        {
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/kroneman/',
        },
        {
          icon: 'stackoverflow',
          link: 'https://stackoverflow.com/users/6598680/lkroneman',
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
