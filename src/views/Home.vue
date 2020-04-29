<template>
  <div class="home">

    <div id="Projects" class="home-section py-md-6 px-0">
      <div class="container d-flex align-items-center" style="overflow: hidden">
        <div class="row align-items-center">
          <div class="col-12">
            <h2 class="my-md-3 pb-md-4 py-md-4">{{homeData.introText}}</h2>
            <div class="row justify-content-center">
              <div class="col-12 col-md-6 col-lg-4 px-md-4 pb-6" v-for="introItem in homeData.introItems" :key="introItem.title">
                <div class="card_image">
                  <img v-if="introItem.image" :src="introItem.image" />
                  <icon v-if="introItem.icon" :name="introItem.icon" />
                </div>
                <div class="card_text p-4">
                  <h4 class="my-1">{{introItem.title}}</h4>
                  <p class="fs-16 fs-md-18">{{introItem.text}}</p>
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
      </div>
    </div>

    <div id="Experience" class="home-section bg-grey-1 clr-background py-6" style="position: relative">
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

    <div id="Tech" class="home-section" style="position: relative">
      <animation-canvas animation-type="particle" />
      <div class="container d-flex align-items-center">
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
      <animation-map class="home-section_map py-6" :animated-map="true" />
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
import Icon from '@/components/icon.vue';
import linkCustom from '@/components/link-custom/link-custom.vue';
import animationMap from '@/components/map/map.generated.vue';
import animationCanvas from '@/components/animation-canvas/animation-canvas.vue';

export default {
  name: 'Home',
  components: {
    Icon,
    linkCustom,
    animationMap,
    animationCanvas,
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
