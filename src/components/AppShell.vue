<template>
  <div class="app-shell">
    <Modal title="You're in tune!" v-if="showMatchModal">
      <p>You got a match - head over to the chat and strike up a conversation.</p>
    </Modal>
    <div class="app-header">
      <router-link to="/onboarding"><i class="material-icons">account_circle</i></router-link>
      <router-link to="/swiper"><img src="../assets/duet_logo_color.png" /></router-link>
      <router-link to="/matches"><i class="material-icons" :class="{unread: unreadNotifications}">chat</i></router-link>
    </div>
    <div class="app-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { longPoll } from '../services/api';
import Modal from '@/components/Modal.vue'

export default {
  name: 'AppShell',
  components: { Modal },
  data() {
    return {
      closed: false,
      longPoll: undefined,
      unreadNotifications: false,
      matches: 0,
      showMatchModal: false
    }
  },
  mounted() {
    this.longPoll = setInterval(() => {
      longPoll().then(resp => {
        this.unreadNotifications = resp.data.interestcount > 0 || resp.data.chatcount > 0;
        if (resp.data.interestcount > this.matches) {
          this.showMatchModal = true;
        }
        this.matches = resp.data.interestcount;
      })
    }, 5000);
  },
  methods: {
  },
  beforeDestroy() {
    clearInterval(this.longPoll);
  }
}
</script>

<style lang="scss">
.app-shell {
  height: 100vh;
}
.app-header {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  -webkit-box-shadow: 0px 1px 5px 1px rgba(0,0,0,0.12);
  -moz-box-shadow: 0px 1px 5px 1px rgba(0,0,0,0.12);
  box-shadow: 0px 1px 5px 1px rgba(0,0,0,0.12);
  padding: 0 16px;
  z-index: 99;
  position: fixed;
  width: 100%;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    height: 30px;
    width: auto;
    cursor: pointer;
  }

  i {
    font-size: 30px;
    color: #ccc;
    cursor: pointer;

    &:hover {
      color: #666;
    }

    &.unread {
      color: #b40d7a;
    }
  }
}
.app-content {
  height: 100%;
  background: #f8f8f8;
  min-height: 400px;
  padding-top: 64px;
}
</style>
