<template>
  <nav class="nav">
    <ul class="nav-list">
      <li
        v-for="link in navLinks" :key="link.title"
        class="nav-list_item"
      >
        <a
          class="nav-list_link"
          :class="{
            'is-active': link.isActive
          }"
          @click="(e) => scrollTo(e, link.anchorElement)"
        >{{link.title}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { debounce, isInViewport } from '@/utils';

export default {
  name: 'Navigation',
  data() {
    return {
      navLinks: [
        {
          anchor: '#Projects',
          title: 'Projects',
          isActive: false,
          anchorLocation: null,
          anchorElement: null,
        },
        {
          anchor: '#Experience',
          title: 'Experience',
          isActive: false,
          anchorLocation: null,
          anchorElement: null,
        },
        {
          anchor: '#Tech',
          title: 'Tech',
          isActive: false,
          anchorLocation: null,
          anchorElement: null,
        },
        {
          anchor: '#About',
          title: 'About',
          isActive: false,
          anchorLocation: null,
          anchorElement: null,
        },
        {
          anchor: '#Contact',
          title: 'Contact',
          isActive: false,
          anchorLocation: null,
          anchorElement: null,
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.navLinks = this.navLinks.map(this.getAnchorElements);
      this.getAnchorLocations();
      this.onScroll();
      window.addEventListener('scroll', this.onScroll);
      window.addEventListener('resize', this.getAnchorLocations);
    });
  },
  methods: {
    scrollTo(e, anchorElement) {
      const distanceToTop = (el) => Math.floor(el.getBoundingClientRect().top);
      e.preventDefault();
      if (!anchorElement) {
        return;
      }

      const originalTop = distanceToTop(anchorElement);
      window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
    },
    onScroll() {
      const updatedAnchorElements = this.navLinks.map((navLink) => {
        const isActive = navLink.anchorElement ? isInViewport(navLink.anchorElement, 500) : false;
        return {
          ...navLink,
          isActive,
        };
      });

      this.navLinks = updatedAnchorElements;
    },
    getAnchorElements(navLink) {
      const anchorElement = document.querySelector(navLink.anchor);
      return {
        ...navLink,
        anchorElement,
      };
    },
    getAnchorLocations: debounce(function getAnchorLocations() {
      this.navLinks = this.navLinks.map((navLink) => {
        if (!navLink.anchorElement) {
          return navLink;
        }

        const anchorLocation = Math.floor(navLink.anchorElement.getBoundingClientRect().top);
        return {
          ...navLink,
          anchorLocation: anchorLocation || null,
        };
      }).filter((item) => Boolean(item.anchorElement));
    }, 100),
  },
};
</script>

<style lang="scss">
@import "./Navigation.scss";
</style>
