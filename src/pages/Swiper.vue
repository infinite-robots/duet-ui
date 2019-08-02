<template>
  <div class="band-swiper">
    <loader v-if="busy"></loader>
    <!-- <Modal title="Let's get started!">
      <p>Instead of building a traditional profile, we're going to present you with some bands and artists. Just swipe left or right to indicate if you like them or not, and we'll do the rest!</p>
    </Modal> -->
    <app-shell>
      <div class="chart-wrap" v-if="cards.length === 0 || cards.length > 0 && cards[0].type !== 'battle'">
        <highcharts :options="chartOptions"></highcharts>
      </div>
      <card-stack :cards="cards" v-if="cards.length > 0"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
        @bandAselected="handleBand1Selected"
        @bandBselected="handleBand2Selected"
      ></card-stack>
      <swipe-tools v-if="cards.length > 0 && cards[0].type === 'normal'"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
      ></swipe-tools>
      <div v-if="cards.length > 0 && cards[0].type === 'battle'" class="battle-hint">
        <p>Battle of the Bands!</p>
        <p>Swipe up or down or use the checkmarks to indicate which band you prefer.</p>
      </div>
    </app-shell>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import AppShell from '@/components/AppShell.vue'
import CardStack from '@/components/CardStack.vue'
import SwipeTools from '@/components/SwipeTools.vue'
import { Chart } from 'highcharts-vue'

import Highcharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'
highchartsMore(Highcharts)

import { getCards } from '../services/api';

export default {
  name: 'Swiper',
  components: { Modal, AppShell, CardStack, SwipeTools, highcharts: Chart },
  mounted() {
    // getCards().then(resp => {
    //   console.log(resp);
    // })
  },
  data() {
    return {
      busy: false,
      cards: [
        // {type: 'battle', band1: {name: 'test'}, band2: {name: 'test2'}},
        {name: 'Nine Inch Nails', type: 'normal'},
        {name: 'The Beatles', type: 'normal'},
        {name: 'Gorillaz', type: 'normal'},
        // {type: 'battle', band1: {name: 'test123'}, band2: {name: 'test222'}},
        {name: 'Eminem', type: 'normal'},
        // {type: 'battle', band1: {name: 'test11111'}, band2: {name: 'test2123123'}},
      ],
      chartOptions: {
        chart: {
          polar: true,
          height: 100,
          backgroundColor: 'transparent',
          margin: -8
        },

        title: undefined,

        // subtitle: {
        //     text: 'Also known as Radar Chart'
        // },

        pane: {
            startAngle: 0,
            endAngle: 360,
        },

        xAxis: {
            tickInterval: (360 / 7),
            min: 0,
            max: 360,
            labels: {
                format: ' '
            },
            
        },

        yAxis: {
            // min: 0,
            floor: 0,
            ceiling: 100,
            labels: {
              format: ' '
            },
        },

        plotOptions: {

            series: {
                pointStart: 0,
                pointInterval: (360 / 7),
                marker: {
                  enabled: false
                },
                fillOpacity: 0.25
            },
            column: {
                pointPadding: 0,
                groupPadding: 0
            }
        },

        credits: {
          enabled: false
        },

        legend: {
          enabled: false
        },

        tooltip: {
          enabled: false
        },

        series: [{
          type: 'area',
          name: 'Area',
          data: [50, 50, 50, 50, 50, 50, 50]
        }, 
        {
          type: 'area',
          name: 'Area2',
          data: [10, 20, 100, 1, 1, 80, 20],
          color: 'rgba(238, 60, 20, 0.50)',
        }
        ]
      }
    }
  },
  methods: {
    handleCardAccepted() {
      this.cards.shift();
      this.loadMoreCards();
    },
    handleCardRejected() {
      this.cards.shift();
      this.loadMoreCards();
    },
    handleBand1Selected() {
      console.log('handleband1')
      this.cards.shift();
      this.loadMoreCards();
    },
    handleBand2Selected() {
      console.log('handleband2')
      this.cards.shift();
      this.loadMoreCards();
    },
    loadMoreCards() {
      if (this.cards.length <= 1) {
        this.busy = true;
      }
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
.chart-wrap {
  width: 100px;
  height: 100px;
  position: fixed;
  z-index: 99;
  right: 16px;
  top: 80px;
  background: rgba(0,0,0,.5);
  border-radius: 100%;
}
</style>
