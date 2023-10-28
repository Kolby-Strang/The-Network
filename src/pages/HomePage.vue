<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-9">
        <div class="container-fluid">
          <div class="row">

            <!-- TODO make create post component -->
            <div v-if="account.id" class="col-12 mt-5">
              <CreatePostCard />
            </div>

            <div v-for="post in posts" :key="post.id" class="col-12 mt-5">
              <!-- POST COMPONENT -->
              <PostCard :post="post" />
            </div>

            <PaginationComponent />

          </div>
        </div>
      </div>
      <div class="col-3 d-none d-md-block">
        ADS
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState.js'
import CreatePostCard from '../components/CreatePostCard.vue';
import PaginationComponent from '../components/PaginationComponent.vue';

export default {
  setup() {
    // VARIABLES
    const posts = computed(() => AppState.posts);
    const account = computed(() => AppState.account)
    // FUNCTIONS
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    // LIFECYCLE / WATCHERS
    onMounted(() => {
      getPosts();
    });
    return { posts, account };
  },
  components: { CreatePostCard, PaginationComponent }
}
</script>

<style scoped lang="scss"></style>
