<template>
  <div class="app-modal-background" v-if="!closed">
    <div class="app-modal card">
      <h1>{{ title }}</h1>
      <slot></slot>
      <button class="button main-button" v-on:click="close()">Got it</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['title'],
  data() {
    return {
      closed: false
    }
  },
  methods: {
    close() {
      this.closed = true;
    }
  }
}
</script>

<style lang="scss">
.app-modal-background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.56);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;

  h1 {
    color: #b40d7a;
    font-weight: 800;
    margin-bottom: 16px;
    font-size: 20px;
  }

  button {
    margin-top: 24px;
  }

}
</style>
