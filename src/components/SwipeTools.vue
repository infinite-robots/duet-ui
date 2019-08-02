<template>
  <div class="swipe-tools">
    <div class="swipe-button dislike" @click="$emit('cardRejected')">
      <i class="material-icons">close</i>
    </div>
    <div class="play-button swipe-button" @mousedown="$emit('playPressed')" @mouseup="$emit('playReleased')"
      v-hammer:press="$emit('playPressed')" v-hammer:pressup="$emit('playReleased')"
    >
      <i class="material-icons">play_arrow</i>
    </div>
    <div class="swipe-button like" @click="$emit('cardAccepted')">
      <i class="material-icons">check</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwipeTools',
}
</script>

<style lang="scss">
.swipe-tools {
  display: flex;
  align-items: center;
  justify-content: center;
}
.swipe-button {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin: 0 8px;
  box-shadow: 2px 2px 2px rgba(0,0,0,.1);
  cursor: pointer;
}

.like {
  background: #B01679;
}

.dislike {
  background: #EE3C14;
}

.play-button {
  width: 64px;
  height: 64px;
  background: #fff;
  color: #333;

  &:hover {
    background: #f8f8f8;
  }

  &:active {
    background: #eee;
  }
}
</style>
