<template>
  <div class="home">
    <div class="home-section row align-items-center" style="flex-wrap: wrap;">
      <div class="col-12">
        <h2>{{introText}}</h2>
        <div class="row justify-content-center">
          <div class="col px-4 " v-for="introItem in introItems" :key="introItem.title">
            <h4>{{introItem.title}}</h4>
            <a :href="introItem.link">
                {{introItem.link}}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="home-section row align-items-center justify-content-center">
      <div class="col-12 col-xl-6">
        <h2>About Me</h2>
        <p class="fs-20" style="line-height: 2em">
          Having spent a significant amount of time in countries other my own has given me a unique perspective.
          I grew up in Indonesia, went to University in America, and lived in the Netherlands for five years.
          This perspective has allowed me to look outside of the box and approach problems with flexibility and with patience.
        </p>
      </div>
    </div>
    <div class="home-section row align-items-center">
      <div class="col-12">
        <h2>Technologies</h2>
        <p>
        </p>
      </div>
    </div>
    <div class="home-section row align-items-center">
      <div class="col-12">
        <h2>Experience</h2>
        <experience />
      </div>
    </div>
    <div class="home-section row align-items-center justify-content-center">
      <div class="col-12 col-xl-6">
        <h2>Get in touch</h2>
        <p class="fs-20">I'm always interested in hearing about what projects you're working on and if I can be of any help. Otherwise its always great to know someone appreciates your work or has interest in the work you're doing</p>
        <p class="fs-20">You can show your support by:</p>
        <ul class="text-left py-4 d-flex" style="list-style-type: none">
          <li>
            <a href="https://www.linkedin.com/in/kroneman/">
              Connecting on Linkedin
            </a>
          </li>
          <li class="ml-4">
            <a href="https://stackoverflow.com/users/6598680/lkroneman">
              Sending me message on StackOverflow
            </a>
          </li>
          <li class="ml-4">
            <a href="https://github.com/kroneman">
              Following me on Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Intro-card.vue';
import Experience from '@/sections/Experience.vue';

export default {
  name: 'Home',
  components: {
    Card,
    Experience
  },
  data() {
    return {
      introText: 'Projects / Articles',
      introItems: [
        {
          title: 'Map conquest',
          text: '',
          link: 'https://github.com/kroneman/map-conquest'
        },
        {
          title: 'Utilizing google apps script for managing Localization',
          text: '',
          link: 'https://github.com/kroneman/google-apps-script--app-localization'
        }
      ]
    }
  }
};
</script>

<style lang="scss">
.home-section {
  min-height: calc(100vh - 60px);
}
</style>
