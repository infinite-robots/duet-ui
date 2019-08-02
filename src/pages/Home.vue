<template>
  <div class="home">
    <img src="../assets/logo_white.png" class="logo" />
    <div class="by-iheart">by <img src="../assets/iheart.png" class="ihm-logo"/></div>
    <p>Discover people that love<br/> the music you love.</p>
    <router-link to="/onboarding" class="button">Get Started</router-link>
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
  }

  .ihm-logo {
    width: 120px;
    height: auto;
    margin: 0 0 -5px 0;
  }

  .by-iheart {
    margin: 20px 0 32px;
    font-size: 10px;
  }

  p {
    margin: 0 10px 32px 10px;
  }
}
</style>
