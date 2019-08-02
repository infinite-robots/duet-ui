<template>
  <div class="chat">
    <loader v-if="busy"></loader>
    <app-shell>
      <div class="chat-wrap">

        <div class="chat-area" v-if="chats && chats.length > 0">
          <div class="ch" v-for="chat in chats" :key="chat.createdAt" :class="{stranger: chat.userId === userId}">
          <p>
            {{ chat.message }}
          </p>
          </div>
        </div>

        <div v-else class="no-messages">
          <p>No messages. Feeling shy?</p>
        </div>
        
        <div class="chat-input-wrap">
          <input type="text" class="msg input" v-model="message" placeholder="say hello to your new friend" />
          <button class="button main-button" @click="sendMessage()">Send</button>
        </div>
      </div>
    </app-shell>
  </div>
</template>

<script>
import AppShell from '@/components/AppShell';
import { getUserChats, sendChat, markMessagesViewed } from '../services/api';
import { getUser } from '../services/auth';

export default {
  name: 'chat',
  components: { AppShell },
  data() {
    return {
      busy: true,
      chats: undefined,
      message: '',
      userId: undefined,
      chatter: undefined
    }
  },
  mounted() {
    this.getChats();
    this.userId = getUser().id;
  },
  methods: {
    sendMessage() {
      sendChat(this.$route.params.id, this.message).then(resp => {
        this.message = '';
        this.getChats();
      });
    },
    getChats() {
      getUserChats(this.$route.params.id).then(resp => {
        console.log('chat resp', resp);
        const messages = resp.data.messages;
        const chatter = resp.data.chatter;
        this.chats = messages.length > 10 ? messages.slice(-10) : messages;
        this.busy = false;
        markMessagesViewed(this.$route.params.id).then(resp => {
          // do nothing!
        });
      });
    }
  }
}
</script>

<style lang="scss">
.msg {
  width: 100%;
}
.no-messages p {
  margin-top: 50px;
  color: #aaa;
}
.chat-wrap {
  padding: 16px;
}
.chat-input-wrap {
  display: flex;
  position: fixed;
  bottom: 8px;
  left: 8px;
  width: calc(100% - 16px);

  input[type="text"] {
    margin-right: 8px;
  }
}

.chat-area {
  height: calc(100vh - 200px);
  overflow: scroll;
  text-align: left;
  padding-top: 8px;

  .ch {
    margin-bottom: 16px;

    &.stranger p {
      background: #b40d7a;
      color: #fff;
    }

    &.stranger {
      text-align: right;
    }
  }

  p {
    max-width: 66vw;
    padding: 8px;
    font-size: 14px;
    background: #eee;
    margin-bottom: 8px;
    border-radius: 10px;
    text-align: left;
    display: inline;
  }
}
</style>
