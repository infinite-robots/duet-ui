<template>
  <div class="band-swiper">
    <!-- <Modal title="Let's get started!">
      <p>Instead of building a traditional profile, we're going to present you with some bands and artists. Just swipe left or right to indicate if you like them or not, and we'll do the rest!</p>
    </Modal> -->
    <app-shell>
      <swipe-card></swipe-card>
      <swipe-tools></swipe-tools>
    </app-shell>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import AppShell from '@/components/AppShell.vue'
import SwipeCard from '@/components/SwipeCard.vue'
import SwipeTools from '@/components/SwipeTools.vue'

export default {
  name: 'BandSwiper',
  components: { Modal, AppShell, SwipeCard, SwipeTools },
  data() {
    return {
      cards: [
        {name: 'Tool'},
        {name: 'Nine Inch Nails'},
        {name: 'The Beatles'},
        {name: 'Gorillaz'},
        {name: 'Eminem'},
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
