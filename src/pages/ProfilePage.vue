<template>
    <div class="component">
        Yo! {{ profile }}

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { profilesService } from '../services/ProfilesService.js'
export default {
    props: {
        profileId: { type: String, required: true }
    },
    setup(props) {
        // VARIABLES
        let profile = ref(null)
        // FUNCTIONS 
        async function getProfile() {
            try {
                profile.value = await profilesService.getProfileById(props.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }
        // LIFECYCLE 
        onMounted(() => {
            getProfile()
        })
        return { profile }
    }
};
</script>


<style lang="scss" scoped></style>