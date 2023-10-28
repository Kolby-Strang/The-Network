<template>
    <div class="post-card">
        <div class="p-4">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="d-flex">
                    <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
                        <img class="creator-img" :src="post.creator.picture" alt="Profile Pic">
                    </router-link>
                    <div>
                        <p class="fw-bold">{{ post.creator.name }}</p>
                        <p>{{ post.updatedAt.toLocaleString() }} <i v-if="post.creator.graduated"
                                class="mdi mdi-school"></i></p>
                    </div>
                </div>
                <div>
                    <div v-if="post.creator.id == account.id" class="btn-group dropstart">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        </button>
                        <ul class="dropdown-menu text-center">
                            <!-- Dropdown menu links -->
                            <li>
                                <button data-bs-toggle="modal" :data-bs-target="`#editModal${post.id}`"
                                    class="dropdown-item">Edit</button>
                            </li>
                            <li>
                                <button @click="destroyPost()" class="dropdown-item">Delete</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <p>{{ post.body }}</p>
        </div>

        <img v-if="post.imgUrl" class="post-img" :src="post.imgUrl" alt="Content Img" selectable role="button"
            data-bs-toggle="modal" :data-bs-target="`#imageModal${post.id}`">

        <div class="d-flex justify-content-end p-3">
            <button @click="handleLike(post.id)" class="btn fs-2">
                <i v-if="likedByUser" class="primary-text mdi mdi-heart"></i>
                <i v-else class="primary-text mdi mdi-heart-outline"></i>
                {{ post.likes.length }}
            </button>
        </div>

    </div>
    <div class="modal fade" :id="`imageModal${post.id}`" tabindex="-1" aria-labelledby="imageModalLabel" role="dialog">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4" id="imageModalLabel">Image Viewer</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        control-id="ControlID-13"></button>
                </div>
                <div class="modal-body">
                    <img :src="post.imgUrl" alt="Large Image View" class="w-100">
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" :id="`editModal${post.id}`" tabindex="-1" aria-labelledby="imageModalLabel" role="dialog">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4" id="imageModalLabel">Image Viewer</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        control-id="ControlID-13"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updatePost()">
                        <div class="form-floating mb-3">
                            <textarea v-model="editable.body" type="text" class="form-control"
                                placeholder="Leave a comment here" id="floatingTextareaDisabled" maxlength="5000"
                                required></textarea>
                            <label for="floatingTextareaDisabled">Make A Post...</label>
                        </div>
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="form-floating mb-3">
                                <input v-model="editable.imgUrl" type="url" class="form-control" id="floatingInput"
                                    maxlength="500">
                                <label for="floatingInput">Image Url...</label>
                            </div>
                            <button type="submit" class="btn"><i class="primary-text fs-4 mdi mdi-pencil"></i> Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect, popScopeId } from 'vue';
import { Post } from '../models/Post';
import Pop from '../utils/Pop';
import { likesService } from '../services/LikesService';
import { logger } from '../utils/Logger';
import { postsService } from '../services/PostsService';
import { Modal } from 'bootstrap';
export default {
    props: {
        post: { type: Post, required: true }
    },
    setup(props) {
        // VARIABLES
        const account = computed(() => AppState.account)
        const editable = ref({ ...props.post })
        let likedByUser = ref(false)
        // FUNCTIONS
        async function handleLike(postId) {
            try {
                await likesService.handleLike(postId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function updatePost() {
            try {
                await postsService.updatePost(editable.value)
                Modal.getOrCreateInstance(`#editModal${props.post.id}`).hide()
                Pop.success("Post Edited!")
            } catch (error) {
                Pop.error(error)
            }
        }
        async function destroyPost() {
            try {
                const confirmed = await Pop.confirm("Are you sure you want to delete your post?")
                if (!confirmed) return
                await postsService.destroyPost(props.post.id)
                Pop.success("Post Deleted!")
            } catch (error) {
                Pop.error(error)
            }
        }
        function isLikedByUser() {
            const likes = props.post.likes
            let liked = false
            likes.forEach(like => {
                if (like.id == account.value.id) {
                    liked = true
                }
            });
            return liked
        }

        // LIFECYCLE

        watchEffect(() => {
            likedByUser.value = isLikedByUser()
        })
        return { account, handleLike, likedByUser, updatePost, destroyPost, editable }
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

.post-img {
    aspect-ratio: 16/9;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.post-card {
    background-color: white;
    box-shadow: 0 0 20px #aaaaaa;
}
</style>

