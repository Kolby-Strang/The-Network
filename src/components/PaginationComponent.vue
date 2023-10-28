<template>
    <div class="d-flex justify-content-between my-2">
        <button @click="newPage()" :disabled="!pageData.newer" class="btn fs-4">&lt;Previous</button>
        <button @click="oldPage()" :disabled="!pageData.older" class="btn fs-4">Next&gt;</button>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
export default {
    setup() {
        // VARIABLES
        const pageData = computed(() => AppState.page)
        // FUNCTIONS 
        async function newPage() {
            try {
                await postsService.getPosts(pageData.value.newer)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function oldPage() {
            try {
                await postsService.getPosts(pageData.value.older)
            } catch (error) {
                Pop.error(error)
            }
        }
        return { newPage, oldPage, pageData }
    }
};
</script>


<style lang="scss" scoped></style>