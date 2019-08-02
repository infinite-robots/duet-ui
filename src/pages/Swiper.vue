<template>
  <div class="band-swiper">
    <loader v-if="busy"></loader>
    <Modal title="Let's get started!" v-if="showModal">
      <p>Instead of building a traditional profile, we're going to present you with some bands and artists. Just swipe left or right to indicate if you like them or not, and we'll do the rest!</p>
    </Modal>
    <app-shell>
      <div class="chart-wrap" v-if="cards.length === 0 || cards.length > 0 && cards[0].cardType !== 'battle'">
        <highcharts :options="chartOptions" ref="chart"></highcharts>
        <span>80%</span>
      </div>
      <card-stack :cards="cards" v-if="cards.length > 0"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
        @bandAselected="handleBand1Selected"
        @bandBselected="handleBand2Selected"
      ></card-stack>
      <swipe-tools v-if="cards.length > 0 && cards[0].cardType === 'normal'"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
        @playPressed="handlePlayPressed"
        @playReleased="handlePlayReleased"
      ></swipe-tools>
      <p v-if="cards.length > 0 && cards[0].cardType === 'normal'" class="hint">(hold Play to preview)</p>
      <div v-if="cards && cards.length > 0 && cards[0].cardType === 'battle'" class="battle-hint">
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
import { Howl, Howler } from 'howler';

import Highcharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'
highchartsMore(Highcharts)

import { getCards, swipeCard } from '../services/api';

export default {
  name: 'Swiper',
  components: { Modal, AppShell, CardStack, SwipeTools, highcharts: Chart },
  mounted() {
    this.getCards();
    const modalSeen = localStorage.getItem('modal1');
    if (!modalSeen) {
      localStorage.setItem('modal1', true);
      this.showModal = true;
    }
  },
  data() {
    return {
      busy: true,
      howl: undefined,
      userCompass: undefined,
      matchPercent: 0,
      showModal: false,
      cards: [],
      // cards: [
      //   {type: 'battle', band1: {name: 'test'}, band2: {name: 'test2'}},
      //   {name: 'Nine Inch Nails', type: 'normal'},
      //   {name: 'The Beatles', type: 'normal'},
      //   {name: 'Gorillaz', type: 'normal'},
      //   {type: 'battle', band1: {name: 'test123'}, band2: {name: 'test222'}},
      //   {name: 'Eminem', type: 'normal'},
      //   {type: 'battle', band1: {name: 'test11111'}, band2: {name: 'test2123123'}},
      // ],
      chartOptions: {
        chart: {
          polar: true,
          height: 100,
          backgroundColor: 'transparent',
          margin: -8
        },
        title: undefined,
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
            min: 0,
            max: 100,
            // floor: 0,
            // ceiling: 100,
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
                fillOpacity: .65
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
          data: [50, 50, 50, 50, 50, 50, 50],
          fillOpacity: .65
        }, 
        // {
        //   type: 'area',
        //   name: 'Area2',
        //   data: [10, 20, 100, 1, 1, 80, 20],
        //   color: 'rgba(238, 60, 20, 0.50)',
        // }
        ]
      }
    }
  },
  methods: {
    handleCardAccepted() {
      this.sendSwipe(true);
      this.cards.shift();
      this.checkNewCard();
      this.loadMoreCards();
    },
    handleCardRejected() {
      this.sendSwipe(false);
      this.cards.shift();
      this.checkNewCard();
      this.loadMoreCards();
    },
    checkNewCard() {
      if (this.howl) {
        this.howl.stop();
      }
      this.howl = undefined;
      const comparerSeries = this.$refs.chart.chart.get('comparer');
      if (this.cards.length === 0 && comparerSeries) {
        comparerSeries.setData([0, 0, 0, 0, 0, 0, 0], true);
        setTimeout(() => {
          comparerSeries.remove();
        }, 300);
        return;
      }
      const currentCard = this.cards[0];
      if (currentCard && currentCard.type === 'person') {
        const arrData = this.getChartDataFromCompass(currentCard.compass);
        if (comparerSeries) {
          comparerSeries.setData(arrData, true);
        } else {
          this.$refs.chart.chart.addSeries({
            id: 'comparer',
            name: 'comparer',
            type: 'area',
            data: arrData,
            color: 'rgba(238, 60, 20, 0.50)',
          });

          this.setMatchPercent(arrData);
        }
      } else {
        const comparerSeries = this.$refs.chart.chart.get('comparer');
        if (comparerSeries) {
          comparerSeries.setData([0, 0, 0, 0, 0, 0, 0], true);
          setTimeout(() => {
            comparerSeries.remove();
          }, 300);
        }
      }
    },
    setMatchPercent(compass2) {
      const compass1 = this.userCompass;
      console.log(compass1, compass2)
      if (compass1 && compass2) {
        let diff = 0;
        diff += Math.abs(compass1[0] - compass2[0]);
        diff += Math.abs(compass1[1] - compass2[1]);
        diff += Math.abs(compass1[2] - compass2[2]);
        diff += Math.abs(compass1[3] - compass2[3]);
        diff += Math.abs(compass1[4] - compass2[4]);
        diff += Math.abs(compass1[5] - compass2[5]);
        diff += Math.abs(compass1[6] - compass2[6]);
        const x = 500 - diff;
        this.matchPercent = (x / 500) * 100;
        console.log(this.matchPercent);
      } else {
        return 0;
      }
    },
    sendSwipe(swipe) {
      const card = this.cards[0];
      swipeCard(card.type, card.genre, 1, card.id, swipe).then(resp => {
        const arrData = this.getChartDataFromCompass(resp.data);
        if (resp.data.country) {
          // console.log('redraw chart?', arrData)
          this.$refs.chart.chart.series[0].setData(arrData, true);
          this.userCompass = arrData;
        }
      });
    },
    getChartDataFromCompass(compass) {
      const result = [];
      result.push(compass['hip-hop']);
      result.push(compass['country']);
      result.push(compass['rock']);
      result.push(compass['edm']);
      result.push(compass['pop']);
      result.push(compass['latin']);
      result.push(compass['podcast']);

      return result;
    },
    handleBand1Selected() {
      this.cards.shift();
      this.loadMoreCards();
    },
    handleBand2Selected() {
      this.cards.shift();
      this.loadMoreCards();
    },
    loadMoreCards() {
      if (this.cards.length === 0) {
        this.busy = true;
        this.getCards();
      }
    },
    getCards() {
      getCards().then(resp => {
        this.cards = resp.data.map(card => {
          card.cardType = 'normal';
          return card;
        });
        this.busy = false;
        this.checkNewCard();
      })
    },
    playAudio() {
      if (this.howl) {
        this.howl.stop();
      }
      const sound = new Howl({
        src: [this.cards[0].audio]
      });

      sound.play();

      this.howl = sound;
    },
    handlePlayPressed() {
      this.playAudio();
    },
    handlePlayReleased() {
      this.howl.pause();
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
.hint {
  color: #aaa;
  font-size: 14px;
  margin-top: 8px;
}
</style>
