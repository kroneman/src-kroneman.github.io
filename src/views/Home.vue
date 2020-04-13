<template>
  <div class="home">
    <div class="home-section row py-6 align-items-center" style="flex-wrap: wrap;">
      <div class="col-12">
        <h2 class="py-4">{{introText}}</h2>
        <div class="row justify-content-center">
          <div class="col-4 px-4" v-for="introItem in introItems" :key="introItem.title">
            <div class="card_image">
              <img v-if="introItem.image" :src="introItem.image" />
              <icon v-if="introItem.icon" :name="introItem.icon" />
            </div>
            <div class="card_text">
              <h4>{{introItem.title}}</h4>
              <p class="fs-18">{{introItem.text}}</p>
              <a class="fs-18" :href="introItem.link">
                <span v-if="introItem.linkText">
                  {{introItem.linkText}}
                </span>
                <span v-else>
                  {{introItem.link}}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-section row align-items-center justify-content-center">
      <div class="col-12 col-xl-6">
        <h2>About Me</h2>
        <p class="fs-20" style="line-height: 2em">
          Having spent a significant amount of time in countries other my own
          has given me a unique perspective.
          I grew up in Indonesia, went to University in America,
          and lived in the Netherlands for five years.
          This perspective has allowed me to look outside of the box
          and approach problems with flexibility and with patience.
        </p>
      </div>
    </div>
    <div class="home-section row align-items-center">
      <div class="col-12">
        <h2>Technologies</h2>
        <ul class="mx-auto d-inline-block text-center" style="list-style-type: none">
          <li>HTML - ~6 years</li>
          <li>CSS - 6+ years</li>
          <li>Javascript - ~6 years</li>
          <li>Typescript - ~1 year</li>
          <li>Node Js - 4 years</li>
          <li>Linux - ~4 years</li>
          <li>Mac - ~4 years</li>
          <li>Windows - ~1 Year</li>

          <li>Webpack - 3 years</li>
          <li>Grunt - 1 year</li>
          <li>Gulp - 6 months</li>

          <li>SASS - 6 years</li>
          <li>LESS - 1 year</li>
          <li>Bootstrap &amp; Variations - 3 Years</li>
          <li>React - 1 year, 6 months</li>
          <li>Redux - 1 year</li>
          <li>Angular Js (1.5.x) - 6 months</li>
          <li>Vue Js - 1 Year</li>

          <li>Express Js - 1 year</li>
          <li>Hapi Js - 6 months</li>
          <li>Jest - 6 months</li>
          <li>Mocha - 3 months</li>
          <li>Docker - 1 year</li>
          <li>Nginx - 4 months</li>
          <li>Bash - 2 Years</li>
          <li>Websockets - 8 months</li>
        </ul>
      </div>
    </div>
    <div class="home-section row align-items-center">
      <div class="col-12 text-center">
        <h2 class="text-center">Experience</h2>
        <div class="row justify-content-center">
          <div>
            <div class="p-4 text-left d-inline-block mx-auto">
              <p class="fs-30 text-center">2.5 Years</p>
              <h3>Clockwork, Amsterdam</h3>
            </div>
          </div>
          <div>
            <div class="p-4 text-left d-inline-block mx-auto">
              <p class="fs-30 text-center">2.5 Years</p>
              <h3>SuitSupply, Amsterdam</h3>
            </div>
          </div>
        </div>
        <p>{{experienceProjectsText}}</p>
        <ul class="mx-auto d-inline-block text-center py-4" style="list-style-type: none">
          <li v-for="project in experienceProjects" :key="project.text">
            <a :href="project.link">
              {{project.text}}
            </a>
          </li>
        </ul>
        <!-- <experience /> -->
      </div>
    </div>
    <div class="home-section row align-items-center justify-content-center">
      <div class="col-12">
        <h2>Get in touch</h2>
        <ul
          class="mx-auto row justify-content-center align-items-center text-left py-4 d-flex"
          style="list-style-type: none"
        >
          <li class="px-4">
            <a href="mailto:a.l.kroneman@gmail.com?subject=kroneman.io">
              Send an email
            </a>
          </li>
          <li class="px-4">
            <a href="https://www.linkedin.com/in/kroneman/">
              Connect on Linkedin
            </a>
          </li>
          <li class="px-4">
            <a href="https://stackoverflow.com/users/6598680/lkroneman">
              Send a message on StackOverflow
            </a>
          </li>
          <li class="px-4 text-center">
            <a href="https://github.com/kroneman">
               Follow me / give feedback on Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/icon.vue';

export default {
  name: 'Home',
  components: {
    Icon,
  },
  data() {
    return {
      introText: 'Projects / Articles',
      introItems: [
        {
          image: 'https://github.com/kroneman/map-conquest/blob/master/map-conquest.jpg?raw=true',
          title: 'Map conquest',
          text: 'Map conquest is my hobby project, a risk-clone built using socket.io, express, mapbox and vue.js',
          link: 'https://github.com/kroneman/map-conquest',
          linkText: 'View Repository',
          linkExternal: true,
        },
        {
          image: '',
          icon: 'google-app-script',
          title: 'Google apps script: localization',
          text: 'Scripts google\'s language app in google apps script to speed up setting up initial localization files',
          link: 'https://github.com/kroneman/google-apps-script--app-localization',
          linkText: 'View Repository',
          linkExternal: true,
        },
      ],
      experienceProjectsText: 'I\'ve maintained / contributed to / released iterations of the following sites',
      experienceProjects: [
        {
          link: 'https://suitsupply.com',
          text: 'suitsupply.com',
        },
        {
          link: 'https://suistudio.com',
          text: 'suistudio.com',
        },
        {
          link: 'https://shiptracker.portofrotterdam.com/#!/',
          text: 'shiptracker.portofrotterdam.com',
        },
        {
          link: 'https://omoda.nl',
          text: 'omoda.nl',
        },
        {
          link: 'https://www.ladress.com',
          text: 'ladress.com',
        },
        {
          link: 'https://my.portofrotterdam.com/login?redirect=%2Fdashboard',
          text: 'my.portofrotterdam.com',
        },
        {
          link: 'https://king.portofrotterdam.com/calendar',
          text: 'king.portofrotterdam.com',
        },
        {
          link: 'https://www.fuelforfans.com/',
          text: 'fuelforfans.com',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.home-section {
  min-height: calc(100vh - 60px);
}

.card {
  &_image {
    height: 200px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  &_text {
    padding: 15px;
  }
}
</style>
