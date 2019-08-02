<template>
  <div class="loading">
    <img src="../assets/ihm_loading.gif" />
  </div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>

<style lang="scss">
.loading {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, .75);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100px;
    height: auto;
  }
}
</style>
