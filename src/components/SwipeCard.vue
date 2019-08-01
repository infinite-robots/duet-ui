<template>
  <div class="swipe-card" :style="{ transform: transformString }" ref="interactElement" :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent
    }">
    <div class="img-wrap">
      <img src="../assets/band2.jpg" />
      <div class="swipe-card-info">
        <p class="main-info">{{ card.name }}</p>
        <p class="secondary-info">Pop</p>
      </div>
    </div>
  </div>
</template>

<script>
import interact from 'interactjs';

export default {
  name: 'SwipeCard',
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
        const { x } = this.interactPosition;

        console.log(x);

        if (x > 120) {
          console.log('accepted')
          this.playCard(true);
        } else if (x < -120) {
          console.log('rejected')
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
.swipe-card {
  position: absolute;
  padding: 8px;
  border-radius: 5px;
  // max-width: 420px;
  width: 100%;
  margin: 4px auto 0;

  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.3s ease-in-out;
  }
}
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$cardsTotal: 5;
@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);
  .swipe-card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    transform: translateY($translation) scale($scale);
  }
}
.img-wrap {
  position: relative;
  height: calc(100vh - 194px);
  // border: 5px solid red;
  border-radius: 5px;
  width: 100%;
  img {
    border-radius: 5px;
    height: 100%;
    width: auto;
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
