<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-9">
        <router-view />
      </div>
      <div class="col-3 d-none d-md-block">
        ads
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
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
