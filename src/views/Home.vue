<template>
  <div class="home">

    <div id="Intro" class="home-section bg-grey-1 clr-background py-6 pos-r">
      <animation-canvas
        animation-type="intro"
        :with-skip-animation="true"
        :with-replay-animation="true"
      />
    </div>

    <div id="Projects" class="home-section pt-6 py-md-6 px-0">
      <div class="container d-flex align-items-center ofl-h">
        <div class="row align-items-center">
          <div class="col-12">
            <h2 class="my-md-3 pb-md-4 py-md-4">{{homeData.introText}}</h2>
            <div class="row justify-content-center">
              <card
                v-for="introItem in homeData.introItems" :key="introItem.title"
                class="col-12 col-md-6 col-lg-4 px-md-4 pb-6"
                :image="introItem.image"
                :icon="introItem.icon"
                :title="introItem.title"
                :text="introItem.text"
                :link="introItem.link"
                :linkExternal="introItem.linkExternal"
                :linkText="introItem.linkText"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="Experience" class="home-section bg-grey-1 clr-background py-6 pos-r">
      <animation-canvas />
      <div class="container d-flex align-items-center">
        <div class="d-block w-100">
          <div class="row align-items-center">
            <div class="col-12 text-center">
              <h2 class="text-center">{{homeData.experienceHeader}}</h2>
              <div class="row justify-content-center">
                <div v-for="company in homeData.experienceCompanies" :key="company.titleLocation">
                  <div class="py-4 p-md-4 text-left d-inline-block mx-auto">
                    <p class="fs-30 my-1 text-center">{{company.duration}}</p>
                    <h3 class="text-center my-1">{{company.titleLocation}}</h3>
                  </div>
                </div>
              </div>
              <p>{{homeData.experienceProjectsText}}</p>
              <ul class="mx-auto d-inline-block text-center py-4 px-0 list no-bullets">
                <li
                  v-for="project in homeData.experienceProjects" :key="project.text"
                  class="pt-md-1"
                >
                  <link-custom :href="project.link" :external="true" eventAction="experienceProject">
                    {{project.text}}
                  </link-custom>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="Tech" class="home-section pos-r">
      <!-- <animation-canvas animation-type="particle" /> -->
      <gravity-points />
      <div class="container d-flex align-items-center z-1">
        <div class="d-block w-100">
          <div class="row align-items-center">
            <div class="col-12 py-6">
              <h2>{{homeData.technologiesHeader}}</h2>
              <ul class="mx-auto d-inline-block text-center px-0 list no-bullets equal-height">
                <li v-for="(tech, index) in homeData.technologiesList" :key="tech + index">
                  {{tech}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="About" class="home-section bg-grey-5 py-6 home-section--about text-center">
      <!-- <animation-map class="home-section_map py-6" :animated-map="true" /> -->
      <scroll-container class="home-section_map-container py-6">
        <animation-map :animated-map="true" />
        <animation-map :animated-map="true" :delay-start="1000" />
        <animation-map :animated-map="true" :delay-start="2000" />
      </scroll-container>
      <div class="container d-flex align-items-center">
        <div class="row px-4 align-items-center justify-content-center">
          <div class="col-12 col-md-10 col-lg-8 col-xl-6 py-6">
            <h2>{{homeData.aboutHeader}}</h2>
            <p v-for="paragraph in homeData.aboutParagraphs" :key="paragraph" class="fs-md-20 lh-2">
              {{paragraph}}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div id="Contact" class="home-section">
      <div class="container d-flex align-items-center">
        <div class="d-block w-100">
          <div class="row align-items-center justify-content-center">
            <div class="col-12 pb-4">
              <div class="d-flex justify-content-center w-100">
                <profile-image />
              </div>
            </div>
            <div class="col-12">
              <h2>{{homeData.connectHeader}}</h2>
              <p>{{homeData.connectMessage}}</p>
              <ul
                class="px-0 mx-auto row-md justify-content-center align-items-center text-center text-md-left py-4 list no-bullets"
              >
                <li v-for="linkItem in homeData.connectLinks" :key="linkItem.text" class="pt-2 pt-md-0 px-md-4 text-md-center">
                  <link-custom :href="linkItem.link" :external="linkItem.external" :email="linkItem.email">
                    {{linkItem.text}}
                  </link-custom>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import linkCustom from '@/components/link-custom/link-custom.vue';
import animationMap from '@/components/map/map.generated.vue';
import animationCanvas from '@/components/animation-canvas/animation-canvas.vue';
import gravityPoints from '@/components/gravity-points/gravity-points.vue';
import profileImage from '@/components/profile-image/profile-image.vue';
import scrollContainer from '@/components/endless-horizontal-scroll/endless-horizontal-scroll.vue';
import card from '@/components/card/card.vue';

export default {
  name: 'Home',
  components: {
    linkCustom,
    animationMap,
    animationCanvas,
    gravityPoints,
    profileImage,
    scrollContainer,
    card,
  },
  computed: {
    homeData() {
      return this.$store.state.home;
    },
  },
};
</script>

<style lang="scss">
@import './Home.scss';
</style>
