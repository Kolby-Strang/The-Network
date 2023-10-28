<template>
    <img class="w-100 mb-1 selectable" :src="ad.tall" alt="Ad" :href="ad.linkURL">
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    props: {
        ad: { type: Object, required: true }
    },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped></style>