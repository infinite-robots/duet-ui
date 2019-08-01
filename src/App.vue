<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
@import './styles/main.scss';
</style>
