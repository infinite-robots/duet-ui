<template>
  <div class="home">
    <img src="../assets/logo_white.png" class="logo" />
    <p>Discover people that love the music you love.</p>
    <router-link to="/onboarding" class="button">Create Account</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;

  .logo {
    width: 170px;
    height: auto;
    margin-bottom: 32px;
  }

  p {
    margin-top: 0;
    margin-bottom: 32px;
  }
}
</style>
