<template>
  <div class="swipe-card" :style="{ transform: transformString }" ref="interactElement" :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent
    }">
    <div class="img-wrap">
      <img :src="card.img" />
      <div class="swipe-card-info">
        <p class="main-info">{{ card.name }}<span v-if="card.type === 'person'">{{ card.age }}</span></p>
        <p class="secondary-info" :class="{ bio: card.type === 'person'}">
          {{ card.type === 'person' ? card.bio : card.genre }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import interact from 'interactjs';

export default {
  name: 'SwipeCard',
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 100
  },
  props: ['card'],
  data() {
    return {
      isCurrent: true,
      isInteractAnimating: true,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0
      },
    }
  },
  computed: {
    transformString() {
      if (!this.isInteractAnimating) {
        const { x, y, rotation } = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
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

        const {
          interactMaxRotation,
          interactXThreshold
        } = this.$options.static;
        const x = this.interactPosition.x + event.dx;
        const y = this.interactPosition.y + event.dy;

        let rotation = interactMaxRotation * (x / interactXThreshold);

        if (rotation > interactMaxRotation) rotation = interactMaxRotation;
        else if (rotation < -interactMaxRotation)
          rotation = -interactMaxRotation;

        this.interactSetPosition({ x, y, rotation });
      },
      onend: () => {
        const { x } = this.interactPosition;

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
      const { x = 0, y = 0, rotation = 0 } = coordinates;
      this.interactPosition = { x, y, rotation };
    },
    resetCardPosition() {
      this.isInteractAnimating = true;
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
    },
    interactUnsetElement() {
      interact(this.$refs.interactElement).unset();
    },
    playCard(like) {
      if (like) {
        this.interactSetPosition({
          x: 1000,
          rotation: 15
        });
        this.$emit('cardAccepted');
      } else {
        this.interactSetPosition({x: -1000, rotation: -15});
        this.$emit('cardRejected');
      }
      this.interactUnsetElement();
    }
  }
}
</script>

<style lang="scss">
.swipe-card {
  height: calc(100vh - 200px);
  position: absolute;
  background: #eee;
  // padding: 8px;
  box-shadow: 0px 0px 3px rgba(0,0,0,.3);
  border-radius: 5px;
  // max-width: 420px;
  width: calc(100% - 16px);
  margin: 8px auto 0;

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
  .swipe-card:nth-child(n+5) {
    display: none;
  }
}
.img-wrap {
  position: relative;
  height: calc(100vh - 200px);
  // border: 5px solid red;
  border-radius: 5px;
  width: 100%;
  img {
    border-radius: 5px;
    height: 100%;
    width: 100%;
    object-fit: cover;
    border: 3px solid #fff;
  }
}
.swipe-card-info {
  height: 120px;
  position: absolute;
  background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.75) 80%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(0,0,0,0.75) 80%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(0,0,0,0.75) 80%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  padding: 16px;
  width: calc(100% - 6px);
  bottom: 3px;
  left: 3px;
  color: #fff;
  border-radius: 0 0 5px 5px;
  text-align: left;
  overflow: hidden;

  .main-info {
    font-size: 32px;
    font-weight: 800;
    white-space: nowrap;

    span {
      margin-left: 8px;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .secondary-info {
    font-size: 20px;
    font-weight: 600;

    &.bio {
      font-size: 16px;
      font-weight: normal;
    }
  }
}
</style>
