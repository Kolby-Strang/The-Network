<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <ProfileHeader :profile="profile" />
            </div>
            <div v-if="profileId == account.id" class="col-12 mt-5">
                <CreatePostCard />
            </div>
            <div v-for="post in posts" :key="post.id" class="col-12 mt-5">
                <PostCard :post="post" />
            </div>
            <div class="col-12">
                <PaginationComponent />
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { onMounted, ref, watchEffect } from 'vue';
import Pop from '../utils/Pop';
import { profilesService } from '../services/ProfilesService.js'
import CreatePostCard from '../components/CreatePostCard.vue';
import PostCard from '../components/PostCard.vue';
import PaginationComponent from '../components/PaginationComponent.vue';
import ProfileHeader from '../components/ProfileHeader.vue';
export default {
    props: {
        profileId: { type: String, required: true }
    },
    setup(props) {
        // VARIABLES
        const profile = ref({});
        const posts = ref([])
        const account = ref({})
        // FUNCTIONS 
        async function getProfile() {
            try {
                profile.value = await profilesService.getProfileById(props.profileId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getPosts() {
            try {
                await profilesService.getPostsByProfileId(props.profileId)
                posts.value = AppState.posts
            } catch (error) {
                Pop.error(error);
            }
        }
        // LIFECYCLE 
        onMounted(() => {
            getProfile();
            getPosts();
        });
        watchEffect(() => {
            if (AppState.account != {}) {
                account.value = AppState.account
            }
            if (AppState.posts) {
                posts.value = AppState.posts
            }
        })
        return { account, profile, posts };
    },
    components: { CreatePostCard, PostCard, PaginationComponent, ProfileHeader }
};
</script>


<style lang="scss" scoped></style>