<template>
    <div class="container-fluid post-card">
        <div class="row">
            <div class="col-12 position-relative">
                <img class="banner-img" :src="profile.coverImg" alt="">
                <img class="creator-img" :src="profile.picture" alt="">
            </div>
            <div class="col-12 d-flex justify-content-end fs-0 height-adj">
                <a v-if="profile.github" :href="profile.github"><i class="mdi mdi-github"></i> </a>
                <a v-if="profile.linkedin" :href="profile.linkedin"><i class="mdi mdi-linkedin"></i> </a>
                <a v-if="profile.resume" :href="profile.resume"><i class="mdi mdi-post"></i> </a>
            </div>
            <div class="col-12">
                <div class="px-4">
                    <p class="fs-4 text-secondary mb-0">{{ profile.class }}</p>
                    <p class="fs-2 fw-bold">{{ profile.name }}</p>
                    <i v-if="profile.graduated" class="mdi mdi-school fs-3 primary-text"></i>
                    <p class="mb-4">{{ profile.bio }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { Account } from '../models/Account';
export default {
    props: {
        profile: { type: Account, required: true }
    },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>
$img-width: 16vh;

.creator-img {
    width: $img-width;
    height: $img-width;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    position: absolute;
    left: 5vw;
    bottom: -$img-width/2;
    border: var(--primary-color) solid 5px;
}

.post-card {
    background-color: white;
    box-shadow: 0 0 20px #aaaaaa;
    padding: 0;
    margin-top: 1em;
}

.banner-img {
    width: 100%;
    height: 20vh;
    object-fit: cover;
    object-position: center;
}

.fs-0 {
    font-size: 40pt;
}

.height-adj {
    height: $img-width/2;
}
</style>