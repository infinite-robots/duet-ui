<template>
  <div class="swipe-card" :style="{ transform: transformString }" ref="interactElement">
    <div class="img-wrap">
      <img src="../assets/band2.jpg" />
      <div class="swipe-card-info">
        <p class="main-info">The Beatles</p>
        <p class="secondary-info">Pop</p>
      </div>
    </div>
  </div>
</template>

<script>
import interact from 'interactjs';

export default {
  name: 'SwipeCard',
  data() {
    return {
      interactPosition: {
        x: 0,
        y: 0
      },
    }
  },
  computed: {
    transformString() {
      const { x, y } = this.interactPosition;
      return `translate3D(${x}px, ${y}px, 0)`;
    }
  },
  mounted() {
    const element = this.$refs.interactElement;
    interact(element).draggable({
      onmove: event => {
        const x = this.interactPosition.x + event.dx;
        const y = this.interactPosition.y + event.dy;
        this.interactSetPosition({ x, y });
      },
      onend: () => {
        this.resetCardPosition();
      }
    });
  },
  beforeDestroy() {
    interact(this.$refs.interactElement).unset();
  },
  methods: {
    interactSetPosition(coordinates) { 
      const { x = 0, y = 0 } = coordinates;
      this.interactPosition = { x, y };
    },
    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0 });
    },
  }
}
</script>

<style lang="scss">
.swipe-card {
  position: relative;
  padding: 8px;
  border-radius: 5px;
  max-width: 420px;
  margin: 4px auto 0;
}
.img-wrap {
  position: relative;
  height: calc(100vh - 144px);
  img {
    border-radius: 5px;
    height: 100%;
    object-fit: cover;
  }
}
.swipe-card-info {
  height: 120px;
  position: absolute;
  background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.75) 80%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(0,0,0,0.75) 80%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(0,0,0,0.75) 80%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  padding: 16px;
  width: 100%;
  bottom: 0;
  color: #fff;
  border-radius: 0 0 5px 5px;
  text-align: left;

  .main-info {
    font-size: 32px;
    font-weight: 800;
  }

  .secondary-info {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
