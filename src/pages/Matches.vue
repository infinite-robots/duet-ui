<template>
  <div class="chat">
    <app-shell>
      <div class="matches-wrap">
        <p class="matches-header">Your Matches</p>
        <div class="m" v-if="matches && matches.length > 0">
          <div class="match" v-for="match in matches" :key="match.name" @click="chatWith(match.id)">
            <img :src="match.img" />
            <div class="match-info">
              <h3 class="chat-match-name"> {{ match.name }}</h3>
              <div class="chat-preview">{{ match.lastMessage ? match.lastMessage : 'Say hi to your match'}}</div>
            </div> 
          </div>
        </div>
        <div v-else class="no-matches">
          <p>No matches yet - keep swiping!</p>
        </div>
      </div>
    </app-shell>
  </div>
</template>

<script>
import AppShell from '@/components/AppShell';
import { getMatches, markMatchesViewed } from '../services/api';
import router from '../router';

export default {
  name: 'chat',
  components: { AppShell },
  data() {
    return {
      busy: true,
      matches: []
    }
  },
  mounted() {
    getMatches().then(resp => {
      console.log(resp);
      this.matches = resp.data;
      this.busy = false;
      markMatchesViewed().then(resp => {
        // do nothing!
      })
    });
  },
  methods: {
    chatWith(id) {
      router.push({
        path: `/chat/${id}`
      })
    }
  }
}
</script>

<style lang="scss">
.matches-wrap {
  padding-top: 8px;

  .match {
    display: flex;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eeeeee;
    cursor: pointer;

    img {
      width: 60px;
      height: 60px;
      border-radius: 100%;
      margin: 10px 20px 10px 20px;
      border: 2px solid #fff;
      box-shadow: 1px 1px 2px #eee;
      float: left;
      object-fit: cover;
    }
  }

  .matches-header {
    padding: 20px;
    color: #b40d7a;
    font-weight: 600;
  }
}

.match-info {
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h3 {
    margin: 0;
  }
}

.chat-match-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-align: left;
  margin: 10px 0 0 0;
}

.chat-preview {
  font-size: 12px;
  color: #333;
}
</style>
