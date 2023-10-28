<template>
    <div class="container-fluid post-card">
        <div class="row">
            <div class="col-12">
                <img class="img-fluid" :src="profile.coverImg" alt="">
            </div>
            <div class="col-12 d-flex justify-content-end fs-1">
                <a v-if="profile.github" :href="profile.github"><i class="mdi mdi-github"></i> </a>
                <a v-if="profile.linkedin" :href="profile.linkedin"><i class="mdi mdi-linkedin"></i> </a>
                <a v-if="profile.resume" :href="profile.resume"><i class="mdi mdi-post"></i> </a>
            </div>
            <div class="col-12">
                <div class="px-4">
                    <p>{{ profile.class }}</p>
                    <p>{{ profile.name }}</p>
                    <p>{{ profile.bio }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Profile } from '../models/Profile';
export default {
    props: {
        profile: { type: Profile, required: true }
    },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>
.creator-img {
    width: 6vw;
    height: 6vw;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    margin-right: 1em;
}

.post-card {
    background-color: white;
    box-shadow: 0 0 20px #aaaaaa;
    padding: 0;
    margin-top: 1em;
}
</style>