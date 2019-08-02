<template>
  <div class="band-swiper">
    <Modal title="Let's get started!">
      <p>Instead of building a traditional profile, we're going to present you with some bands and artists. Just swipe left or right to indicate if you like them or not, and we'll do the rest!</p>
    </Modal>
    <app-shell>
      <div class="chart-wrap">
        <highcharts :options="chartOptions"></highcharts>
      </div>
      <card-stack :cards="cards"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
      ></card-stack>
      <swipe-tools v-if="cards[0].type === 'normal'"></swipe-tools>
      <div v-else class="battle-hint">
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

export default {
  name: 'Swiper',
  components: { Modal, AppShell, CardStack, SwipeTools, highcharts: Chart },
  data() {
    return {
      cards: [
        // {type: 'battle', band1: {name: 'test'}, band2: {name: 'test2'}},
        {name: 'Nine Inch Nails', type: 'normal'},
        {name: 'The Beatles', type: 'normal'},
        {name: 'Gorillaz', type: 'normal'},
        {name: 'Eminem', type: 'normal'},
      ],
      chartOptions: {
        chart: {
          polar: true,
          height: 100,
          backgroundColor: 'transparent',
          margin: 0
        },

        title: undefined,

        // subtitle: {
        //     text: 'Also known as Radar Chart'
        // },

        pane: {
            startAngle: 0,
            endAngle: 360
        },

        xAxis: {
            tickInterval: 45,
            min: 0,
            max: 360,
            labels: {
                format: ' '
            }
        },

        yAxis: {
            // min: 0,
            floor: 0,
            ceiling: 100,
            labels: {
              format: ' '
            }
        },

        plotOptions: {

            series: {
                pointStart: 0,
                pointInterval: 45,
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

        series: [{
          type: 'area',
          name: 'Area',
          data: [10, 100, 30, 50, 75, 80, 20, 30]
        }, 
        // {
        //   type: 'area',
        //   name: 'Area2',
        //   data: [10, 20, 100, 1, 1, 80, 20, 30],
        //   color: 'rgba(255, 0, 0, 0.50)',
        // }
        ]
      }
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
