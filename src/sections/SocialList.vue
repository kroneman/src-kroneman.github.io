<template>
  <div class="social">
      <ul class="social_list">
        <li v-for="item in socialList"
            :key="item.icon"
            class="social_list_item py-2"
        >
          <link-custom :href="item.link" :external="true" class="social_list_link">
            <icon :name="item.icon" />
          </link-custom>
        </li>
      </ul>
  </div>
</template>

<script>
import Icon from '@/components/icon/icon.vue';
import linkCustom from '@/components/link-custom/link-custom.vue';

export default {
  name: 'SocialList',
  components: {
    Icon,
    linkCustom,
  },
  data() {
    return {
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
@import './SocialList.scss';
</style>
