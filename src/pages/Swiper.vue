<template>
  <div class="band-swiper">
    <!-- <Modal title="Let's get started!">
      <p>Instead of building a traditional profile, we're going to present you with some bands and artists. Just swipe left or right to indicate if you like them or not, and we'll do the rest!</p>
    </Modal> -->
    <app-shell>
      <card-stack :cards="cards"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
      ></card-stack>
      <swipe-tools v-if="cards[0].type === 'normal'"></swipe-tools>
      <div v-else class="battle-hint">
        <p>Battle of the Bands!</p>
        <p>Select which band you like better.</p>
      </div>
    </app-shell>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import AppShell from '@/components/AppShell.vue'
import CardStack from '@/components/CardStack.vue'
import SwipeTools from '@/components/SwipeTools.vue'

export default {
  name: 'Swiper',
  components: { Modal, AppShell, CardStack, SwipeTools },
  data() {
    return {
      cards: [
        {type: 'battle', band1: {name: 'test'}, band2: {name: 'test2'}},
        {name: 'Nine Inch Nails', type: 'normal'},
        {name: 'The Beatles', type: 'normal'},
        {name: 'Gorillaz', type: 'normal'},
        {name: 'Eminem', type: 'normal'},
      ]
    }
  },
  methods: {
    handleCardAccepted() {
      this.cards.shift();
    },
    handleCardRejected() {
      this.cards.shift();
    }
  }
}
</script>

<style lang="scss">
.battle-hint {
  p:first-child {
    color: #b40d7a;
    font-weight: 600;
  }
}
</style>
