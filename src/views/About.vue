<template>
  <div class="about">
    <h1>Lets build a map</h1>
    <animation-map />
  </div>
</template>

<script>
import animationMap from '@/components/map/map.generated.vue';

export default {
  name: 'About',
  components: {
    animationMap,
  },
};
</script>
