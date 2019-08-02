<template>
  <div class="card-stack">
    <template v-for="card in cards">
      <swipe-card :key="card.name" v-if="card.cardType === 'normal'" :card="card"
        @cardAccepted="$emit('cardAccepted');"
        @cardRejected="$emit('cardRejected');"
      ></swipe-card>
      <battle-card :key="card.band1.name" v-if="card.cardType === 'battle'" :card="card"
        @bandAselected="$emit('bandAselected');"
        @bandBselected="$emit('bandBselected');"
      ></battle-card>
    </template>
  </div>
</template>

<script>
import SwipeCard from '@/components/SwipeCard.vue'
import BattleCard from '@/components/BattleCard.vue'

export default {
  name: 'CardStack',
  props: ['cards'],
  components: { SwipeCard, BattleCard }
}
</script>

<style lang="scss">
.card-stack {
  position: relative;
  display: flex;
  justify-content: center;
  height: calc(100vh - 185px);
}
</style>
