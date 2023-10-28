<template>
    <div class="container-fluid pt-3">
        <div class="row">
            <div class="col-12">
                <form @submit.prevent="handleSearch()">
                    <div class="d-flex">
                        <div class="form-floating w-100">
                            <input v-model="searchInput" type="text" class="form-control" id="floatingPassword"
                                placeholder="" required>
                            <label for="floatingPassword">Search...</label>
                        </div>
                        <button class="btn btn-primary ms-2" type="submit">Search</button>
                    </div>
                </form>
            </div>

            <h2 v-if="profiles.length > 0">Profiles</h2>
            <div v-for="profile in profiles" :key="profile.id" class="col-12 mt-5">
                <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }">
                    <ProfileHeader class="text-dark selectable" :profile="profile" />
                </router-link>
            </div>

            <h2 v-if="posts.length > 0">Posts</h2>
            <div v-for="post in posts" :key="post.id" class="col-12 mt-5">
                <PostCard :post="post" />
            </div>

            <div v-if="posts.length == 0 && profiles.length == 0">
                <h2>Nothing to show here!</h2>
            </div>

        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
import { accountService } from '../services/AccountService';
import ProfileHeader from '../components/ProfileHeader.vue';
export default {
    setup() {
        // VARIABLES
        const searchInput = ref('');
        const posts = ref([]);
        const profiles = ref([]);
        // FUNCTIONS
        async function getPosts() {
            await postsService.getPostsByQuery(searchInput.value);
        }
        async function getProfiles() {
            profiles.value = await accountService.getProfilesByQuery(searchInput.value);
        }
        async function handleSearch() {
            try {
                await getProfiles();
                await getPosts();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        // LIFECYCLE
        watchEffect(() => {
            if (AppState.posts) {
                posts.value = AppState.posts;
            }
        });
        return { posts, searchInput, handleSearch, profiles };
    },
    components: { ProfileHeader }
};
</script>


<style lang="scss" scoped></style>