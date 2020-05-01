export default {
  namespaced: true,
  state: {
    introText: 'Projects / Articles',
    introItems: [
      {
        image: 'https://github.com/kroneman/map-conquest/blob/master/map-conquest.jpg?raw=true',
        title: 'Map conquest',
        text:
          'Map conquest is my hobby project, a risk-clone built using socket.io, express, mapbox and vue.js',
        link: 'https://github.com/kroneman/map-conquest',
        linkText: 'View Repository',
        linkExternal: true,
      },
      {
        image: '',
        icon: 'google-app-script',
        title: 'Google apps script: localization',
        text:
          'A script for Localization using google Translate Api and google Drive',
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
    technologiesHeader: 'I work with',
    technologiesList: [
      'HTML - ~6 years',
      'CSS - 6+ years',
      'Javascript - ~6 years',
      '',
      'Typescript - ~1 year',
      'Node Js - 4 years',
      '',
      'Linux - ~4 years',
      'Mac - ~4 years',
      'Windows - ~1 Year',
      '',
      'Webpack - 3 years',
      'Grunt - 1 year',
      'Gulp - 6 months',
      '',
      'SASS - 6 years',
      'LESS - 1 year',
      'Bootstrap & Variations - 3 Years',
      '',
      'React - 1 year, 6 months',
      'Angular Js (1.5.x) - 6 months',
      'Vue Js - 1 Year',
      '',
      'Redux - 1 year',
      'Vuex - 1 year',
      'Mobx - ~3 months',
      '',
      'Express Js - 1 year',
      'Hapi Js - 6 months',
      '',
      'Jest - 6 months',
      'Mocha - 3 months',
      '',
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
    experienceProjectsText: '',
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
        link: 'https://my.portofrotterdam.com/login?redirect=%2Fdashboard',
        text: 'my.portofrotterdam.com',
      },
      {
        link: 'https://king.portofrotterdam.com/calendar',
        text: 'king.portofrotterdam.com',
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
        link: 'https://www.fuelforfans.com/',
        text: 'fuelforfans.com',
      },
    ],
    connectHeader: 'Get in touch',
    connectMessage: 'I\'m looking for new opportunities',
    connectLinks: [
      {
        link: 'https://github.com/kroneman',
        text: 'Github',
        external: true,
      },
      {
        link: 'https://www.linkedin.com/in/kroneman/',
        text: 'Linkedin',
        external: true,
      },
      {
        link: 'mailto:a.l.kroneman@gmail.com?subject=kroneman.io',
        text: 'Email',
        external: false,
        email: true,
      },
      {
        link: 'https://stackoverflow.com/users/6598680/lkroneman',
        text: 'StackOverflow',
        external: true,
      },
    ],
  },
};
