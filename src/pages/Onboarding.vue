<template>
  <div class="onboarding app-page">
    <loader v-if="busy"></loader>
    <div class="card">
      <p>Tell us a little about yourself.</p>
      <input v-model="name" class="input" type="text" placeholder="Choose a username">

      <div class="select-wrap">
        <div class="select">
          <select v-model="selectedAge">
            <option>Select Your Age</option>
            <option  v-for="age in ages" :key="age">{{ age === 66 ? '65+' : age }}</option>
          </select>
        </div>
      </div>
      <div class="select-wrap">
        <div class="select">
          <select v-model="selectedGender">
            <option selected>Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Unspecified</option>
          </select>
        </div>
      </div>

      <button @click="saveUser()" class="button main-button">Continue</button>
    </div>
  </div>
</template>

<script>
import {createUser} from "../services/api";
import router from '../router'
export default {
  name: 'onboarding',
  data() {
    return {
      busy: false,
      selectedAge: "Select Your Age",
      selectedGender: "Gender",
      name: undefined,
      ages: Array.from({ length: 49 }, (_, i) => i + 18)
    }
  },methods: {
    saveUser() {
      let user = {
        name: this.name,
        bio: "",
        gender: this.selectedGender,
        age: this.selectedAge,
      };
      this.busy = true;
      createUser(user).then(value => {
        router.push({
          path: '/swiper',

        });
        this.busy = false;
      })

    }
  }
}
</script>

<style lang="scss">
  .onboarding {
    min-height: 100vh;
    padding: 16px;
    display: flex;
    align-items: center;
    background: #b40d7a; /* Old browsers */
    background: -moz-linear-gradient(45deg,  #b40d7a 0%, #ef4023 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg,  #b40d7a 0%,#ef4023 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg,  #b40d7a 0%,#ef4023 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    min-height: 100vh;

    p {
      font-size: 20px;
      margin-bottom: 16px;
      font-weight: bold;
      color: #b40d7a;
    }

    .card {
      width: 100%;
    }

    .select-wrap {
      margin: 16px 0;
    }
  }
</style>
