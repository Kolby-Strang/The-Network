<template>
    <div class="post-card d-flex">
        <div class="container-fluid p-4 pb-2">
            <div class="row">
                <div class="col-2">
                    <img class="creator-img" :src="account.picture" :alt="account.name">
                </div>
                <div class="col-10">
                    <form @submit.prevent="handleSubmit()">
                        <div class="form-floating mb-3">
                            <textarea v-model="editable.body" type="text" class="form-control"
                                placeholder="Leave a comment here" id="floatingTextareaDisabled" maxlength="5000"
                                required></textarea>
                            <label for="floatingTextareaDisabled">Make A Post...</label>
                        </div>
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="form-floating mb-3">
                                <input v-model="editable.imgUrl" type="url" class="form-control" id="floatingInput"
                                    maxlength="500" placeholder="Image Url">
                                <label for="floatingInput">Image Url...</label>
                            </div>
                            <button type="submit" class="btn"><i class="fs-4 mdi mdi-send primary-text"></i>Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
export default {
    setup() {
        // VARIABLES
        const account = computed(() => AppState.account)
        const editable = ref({})
        // FUNCTIONS
        async function handleSubmit() {
            try {
                await postsService.createPost(editable.value)
                Pop.success('Post Created!')
                editable.value = {}
            } catch (error) {
                Pop.error(error)
            }
        }
        // LIFECYCLE
        onMounted(() => {
            editable.value = {}
        })

        return { account, handleSubmit, editable }
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
}
</style>