<template>
  <header class="header px-4">
    <div class="row align-items-center">
      <div class="col-12 col-md-6 col-lg-9 col-xl-6 flex-grow">
        <div class="d-flex align-items-center justify-content-center justify-content-md-left pos-r">
          <mobile-drawer-icon
            :isActive="isDrawerOpen"
            @trigger="toggleDrawer"
          />
          <h1 class="p-0 m-0 py-2 pl-md-5 pl-lg-0 header_title">
            <div class="d-flex align-items-center">
              <!-- <icon name="lion-logo" class="mr-3 d-none d-lg-block" style="min-width: 40px" /> -->
              <a href="/" class="header_title_link">
                {{title}}
              </a>
            </div>
          </h1>
          <mobile-drawer :isOpen="isDrawerOpen">
            <navigation @trigger="onNavigate" />
            <div class="d-block d-md-none d-flex justify-content-center py-4 py-md-none pos-r">
              <span class="mobile-line" />
              <social-list class="pt-5" />
            </div>
          </mobile-drawer>
        </div>
      </div>

      <div class="col col-xl-6 d-none d-md-flex flex-grow justify-content-right">
        <social-list />
      </div>
    </div>
  </header>
</template>

<script>
import mobileDrawer from '@/sections/MobileDrawer/MobileDrawer.vue';
import mobileDrawerIcon from '@/sections/MobileDrawer/MobileDrawerIcon.vue';
import navigation from '@/sections/Navigation.vue';
import socialList from '@/sections/SocialList.vue';
// import icon from '@/components/icon/icon.vue';

export default {
  components: {
    navigation,
    mobileDrawer,
    mobileDrawerIcon,
    socialList,
    // icon,
  },
  data() {
    return {
      isDrawerOpen: false,
      title: '@kroneman',
    };
  },
  methods: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
    onNavigate() {
      this.isDrawerOpen = false;
    },
  },
};
</script>

<style lang="scss">
@import "./Header.scss";
.mobile-line {
  content: '';
  position: absolute;
  right: 30px;
  left: 30px;
  top: auto;
  height: 1px;
  background: rgba(theme-color(grey-3), .5);

  @include respond(lg) {
      display: none;
  }
}
</style>
