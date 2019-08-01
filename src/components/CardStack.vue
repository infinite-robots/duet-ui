<template>
  <div class="card-stack">
    <swipe-card v-for="card in cards" :key="card.name" :card="card"
      @cardAccepted="$emit('cardAccepted');"
      @cardRejected="$emit('cardRejected');"
    ></swipe-card>
  </div>
</template>

<script>
import SwipeCard from '@/components/SwipeCard.vue'

export default {
  name: 'CardStack',
  props: ['cards'],
  components: { SwipeCard }
}
</script>

<style lang="scss">
.card-stack {
  position: relative;
  display: flex;
  justify-content: center;
  height: calc(100vh - 123px);
}
</style>
