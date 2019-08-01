<template>
  <div class="swipe-card battle-card" :style="{ transform: transformString }" ref="interactElement" :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent
    }">
    <div class="band band1">
      <img src="../assets/band.jpg" />
      <div class="band-info">
        <h1>{{ card.band1.name }}</h1>
        <p>Genre</p>
      </div>
      <div class="swipe-hint band1">
        <div class="swipe-button like">
          <i class="material-icons">check</i>
        </div>
        <i class="material-icons arrow-thing">arrow_upward</i>
      </div>
    </div>
    <div class="band band2">
      <img src="../assets/band2.jpg" />
      <div class="band-info">
        <h1>{{ card.band2.name }}</h1>
        <p>Genre</p>
      </div>
      <div class="swipe-hint band2">
        <i class="material-icons arrow-thing">arrow_downward</i>
        <div class="swipe-button like">
          <i class="material-icons">check</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import interact from 'interactjs';

export default {
  name: 'BattleCard',
  props: ['card'],
  data() {
    return {
      isCurrent: true,
      isInteractAnimating: true,
      interactPosition: {
        x: 0,
        y: 0
      },
    }
  },
  computed: {
    transformString() {
      if (!this.isInteractAnimating) {
        const { x, y } = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0)`;
      }
      return null;
    }
  },
  mounted() {
    const element = this.$refs.interactElement;
    interact(element).draggable({
      onstart: () => {
        this.isInteractAnimating = false;
      },
      onmove: event => {
        const x = this.interactPosition.x + event.dx;
        const y = this.interactPosition.y + event.dy;
        this.interactSetPosition({ x, y });
      },
      onend: () => {
        const { x, y } = this.interactPosition;

        if (y < -120) {
          console.log('band1')
          this.playCard(true);
        } else if (y > 120) {
          console.log('band2')
          this.playCard(false);
        } else {
          console.log('reset');
          this.resetCardPosition();
        }
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
      this.isInteractAnimating = true;
      this.interactSetPosition({ x: 0, y: 0 });
    },
    interactUnsetElement() {
      interact(this.$refs.interactElement).unset();
    },
    playCard(like) {
      if (like) {
        this.interactSetPosition({x: 1000})
        this.$emit('cardAccepted');
      } else {
        this.interactSetPosition({x: -1000})
        this.$emit('cardRejected');
      }
      this.interactUnsetElement();
    }
  }
}
</script>

<style lang="scss">
.battle-card {
  
  .band {
    position: relative;
    height: calc(50vh - 100px);
    border-radius: 5px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .band-info {
      background: -moz-linear-gradient(bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.75) 80%); /* FF3.6-15 */
      background: -webkit-linear-gradient(bottom, rgba(255,255,255,0) 0%,rgba(0,0,0,0.75) 80%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to top, rgba(255,255,255,0) 0%,rgba(0,0,0,0.75) 80%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      padding: 16px;
      color: #fff;
      text-align: left;

      h1 {
        font-size: 32px;
        font-weight: 800;
        margin-bottom: 0;
      }

      p {
        margin-top: 0;
        font-size: 20px;
        font-weight: 600;
      }
    }
  }

  .band1 {
    border-radius: 5px 5px 0 0;
    overflow: hidden;
  }

  .band2 {
    border-radius: 0 0 5px 5px;
    overflow: hidden;
  }

  .swipe-hint {
    color: #fff;
    position: absolute;
    right: 0;

    &.band1 {
      top: 16px;
    }

    &.band2 {
      bottom: 16px;
    }
  }

  .arrow-thing {
    font-size: 24px;
    color: rgba(255, 255, 255, .75) !important;
  }

  .band1 .arrow-thing {
    margin-top: 4px;
  }
}
</style>
