<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-9">
        <router-view />
      </div>
      <div class="col-3 d-none d-md-block pt-3">

        <div v-for="ad in ads" :key="ad.title">
          <AdTall :ad="ad" />
        </div>

      </div>
    </div>
  </main>
</template>

<script>
import { computed, getTransitionRawChildren, onMounted, ref } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Pop from './utils/Pop'
import { adsService } from './services/AdsService.js'
import AdTall from './components/AdTall.vue'

export default {
  setup() {
    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getAds();
    })
    return {
      appState: computed(() => AppState),
      ads: computed(() => AppState.ads)
    }
  },
  components: { Navbar, AdTall }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
  --primary-color: #39C4C6;
}

.primary-text {
  color: var(--primary-color);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
