<template>
  <div class="home px-2 px-md-0">
    <div class="home-section row py-md-6 align-items-center" style="flex-wrap: wrap;">
      <div class="col-12">
        <h2 class="pb-4 py-md-4">{{introText}}</h2>
        <div class="row justify-content-center">
          <div class="col-12 col-md-4 px-4 pb-6" v-for="introItem in introItems" :key="introItem.title">
            <div class="card_image">
              <img v-if="introItem.image" :src="introItem.image" />
              <icon v-if="introItem.icon" :name="introItem.icon" />
            </div>
            <div class="card_text">
              <h4 class="my-1">{{introItem.title}}</h4>
              <p class="fs-18">{{introItem.text}}</p>
              <link-custom class="fs-18" :href="introItem.link" :external="introItem.linkExternal">
                <span v-if="introItem.linkText">
                  {{introItem.linkText}}
                </span>
                <span v-else>
                  {{introItem.link}}
                </span>
              </link-custom>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-section row align-items-center justify-content-center">
      <div class="col-12 col-xl-6 py-6">
        <h2>{{aboutHeader}}</h2>
        <p v-for="paragraph in aboutParagraphs" :key="paragraph" class="fs-md-20" style="line-height: 2em">
          {{paragraph}}
        </p>
      </div>
    </div>
    <div class="home-section row align-items-center">
      <div class="col-12 py-6">
        <h2>{{technologiesHeader}}</h2>
        <ul class="mx-auto d-inline-block text-center px-0" style="list-style-type: none">
          <li v-for="tech in technologiesList" :key="tech">
            {{tech}}
          </li>
        </ul>
      </div>
    </div>
    <div class="home-section row align-items-center">
      <div class="col-12 text-center">
        <h2 class="text-center">{{experienceHeader}}</h2>
        <div class="row justify-content-center">
          <div v-for="company in experienceCompanies" :key="company.titleLocation">
            <div class="py-4 p-md-4 text-left d-inline-block mx-auto">
              <p class="fs-30 text-center">{{company.duration}}</p>
              <h3 class="text-center">{{company.titleLocation}}</h3>
            </div>
          </div>
        </div>
        <p>{{experienceProjectsText}}</p>
        <ul class="mx-auto d-inline-block text-center py-4 px-0" style="list-style-type: none">
          <li
            v-for="project in experienceProjects" :key="project.text"
            class="pt-md-1"
          >
            <link-custom :href="project.link" :external="true">
              {{project.text}}
            </link-custom>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-section row align-items-center justify-content-center">
      <div class="col-12">
        <h2>{{connectHeader}}</h2>
        <ul
          class="px-0 mx-auto row-md justify-content-center align-items-center text-center text-md-left py-4"
          style="list-style-type: none"
        >
          <li v-for="linkItem in connectLinks" :key="linkItem.text" class="pt-2 pt-md-0 px-md-4 text-md-center">
            <link-custom :href="linkItem.link" :external="linkItem.external" :email="linkItem.email">
               {{linkItem.text}}
            </link-custom>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/icon.vue';
import linkCustom from '@/components/link-custom/link-custom.vue';

export default {
  name: 'Home',
  components: {
    Icon,
    linkCustom,
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
      aboutHeader: 'About Me',
      aboutParagraphs: [
        `Having spent a significant amount of time in countries other my own
        has given me a unique perspective.
        I grew up in Indonesia, went to University in America,
        and lived in the Netherlands for five years.
        This perspective has allowed me to look outside of the box
        and approach problems with flexibility and with patience.`,
      ],
      technologiesHeader: 'Technologies',
      technologiesList: [
        'HTML - ~6 years',
        'CSS - 6+ years',
        'Javascript - ~6 years',
        'Typescript - ~1 year',
        'Node Js - 4 years',
        'Linux - ~4 years',
        'Mac - ~4 years',
        'Windows - ~1 Year',

        'Webpack - 3 years',
        'Grunt - 1 year',
        'Gulp - 6 months',

        'SASS - 6 years',
        'LESS - 1 year',
        'Bootstrap &amp; Variations - 3 Years',
        'React - 1 year, 6 months',
        'Redux - 1 year',
        'Angular Js (1.5.x) - 6 months',
        'Vue Js - 1 Year',

        'Express Js - 1 year',
        'Hapi Js - 6 months',
        'Jest - 6 months',
        'Mocha - 3 months',
        'Docker - 1 year',
        'Nginx - 4 months',
        'Bash - 2 Years',
        'Websockets - 8 months',
      ],
      experienceHeader: 'Experience',
      experienceCompanies: [
        {
          titleLocation: 'Clockwork, Amsterdam',
          duration: '2.5 Years',
        },
        {
          titleLocation: 'Suitsupply, Amsterdam',
          duration: '2.5 Years',
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
      connectHeader: 'Get in touch',
      connectLinks: [
        {
          link: 'mailto:a.l.kroneman@gmail.com?subject=kroneman.io',
          text: 'Send an email',
          external: false,
          email: true,
        },
        {
          link: 'https://www.linkedin.com/in/kroneman/',
          text: 'Connect on Linkedin',
          external: true,
        },
        {
          link: 'https://stackoverflow.com/users/6598680/lkroneman',
          text: 'Send a message on StackOverflow',
          external: true,
        },
        {
          link: 'https://github.com/kroneman',
          text: 'Follow me / give feedback on Github',
          external: true,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import './Home.scss';
</style>
