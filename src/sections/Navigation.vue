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
export default {
  name: 'Navigation',
  data() {
    return {
      navLinks: [
        {
          anchor: '#Projects',
          title: 'Projects',
          isActive: true,
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
    this.getAnchorLocations();
    window.addEventListener('scroll', this.onScroll);
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

      const checkIfDone = setInterval(() => {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
        if (distanceToTop(anchorElement) === 0 || atBottom) {
          anchorElement.focus();
          clearInterval(checkIfDone);
        }
      }, 100);
    },
    onScroll() {
      const headerHeight = 60;
      const scrollDistance = window.pageYOffset + headerHeight;
      const windowHeight = window.innerHeight;

      const lowerBound = scrollDistance - windowHeight * (2 / 3);
      const upperBound = scrollDistance + (windowHeight * (2 / 3));
      this.navLinks = this.navLinks.map((navLink) => ({
        ...navLink,
        isActive: navLink.anchorLocation > lowerBound
          && navLink.anchorLocation < upperBound,
      }));
    },
    getAnchorLocations() {
      this.navLinks = this.navLinks.map((navlink) => {
        const anchorElement = document.querySelector(navlink.anchor);
        const anchorLocation = Math.floor(anchorElement.getBoundingClientRect().top);
        return {
          ...navlink,
          anchorElement: anchorElement || null,
          anchorLocation: anchorLocation || null,
        };
      }).filter((item) => Boolean(item.anchorElement));
    },
  },
};
</script>

<style lang="scss">
@import "./Navigation.scss";
</style>
