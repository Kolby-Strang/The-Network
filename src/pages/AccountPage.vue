<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>


  </div>

  <form @submit.prevent="handleSubmit()">

    <div class="d-flex">
      <!-- Name -->
      <div class="form-floating mb-3">
        <input v-model="editable.name" type="text" class="form-control" placeholder="name" id="name" required>
        <label for="name">Name</label>
      </div>
      <!-- Class -->
      <div class="form-floating mb-3">
        <input v-model="editable.class" type="text" class="form-control" placeholder="class" id="class">
        <label for="class">class</label>
      </div>
    </div>

    <!-- Bio -->
    <div class="form-floating mb-3">
      <textarea v-model="editable.bio" type="text" class="form-control" placeholder="bio" id="bio"></textarea>
      <label for="bio">bio</label>
    </div>
    <!-- Graduated -->
    <div>
      <input v-model="editable.graduated" class="form-check-input" type="checkbox" id="graduated">
      <label class="form-check-label ms-1" for="graduated">Graduated</label>
    </div>


    <div class="d-flex">
      <!-- Github -->
      <div class="form-floating mb-3">
        <input v-model="editable.github" type="text" class="form-control" placeholder="github" id="github">
        <label for="github">github</label>
      </div>
      <!-- Linkedin -->
      <div class="form-floating mb-3">
        <input v-model="editable.linkedin" type="text" class="form-control" placeholder="linkedin" id="linkedin">
        <label for="linkedin">linkedin</label>
      </div>
      <!-- Resume Link -->
      <div class="form-floating mb-3">
        <input v-model="editable.resume" type="text" class="form-control" placeholder="resume" id="resume">
        <label for="resume">resume</label>
      </div>
    </div>

    <div class="d-flex">
      <!-- Cover Image -->
      <div class="form-floating mb-3">
        <input v-model="editable.coverImg" type="text" class="form-control" placeholder="coverImg" id="coverImg">
        <label for="coverImg">coverImg</label>
      </div>
      <!-- Profile Picture -->
      <div class="form-floating mb-3">
        <input v-model="editable.picture" type="text" class="form-control" placeholder="picture" id="picture">
        <label for="picture">picture</label>
      </div>
    </div>

    <button class="btn btn-primary" type="submit">Submit</button>

  </form>
</template>

<script>
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { accountService } from '../services/AccountService';
export default {
  setup() {
    // VARIABLES
    const editable = ref({});
    // FUNCTIONS
    async function handleSubmit() {
      try {
        if (editable.value.graduated == 'on') {
          editable.value.graduated = true
        } else {
          editable.value.graduated = false
        }
        await accountService.editAccount(editable.value)
      } catch (error) {
        Pop.error(error)
      }
    }
    // LIFECYCLE
    watchEffect(() => {
      editable.value = AppState.account
    })
    return {
      account: computed(() => AppState.account),
      editable,
      handleSubmit
    };
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
