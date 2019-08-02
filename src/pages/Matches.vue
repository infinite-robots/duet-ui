<template>
  <div class="chat">
    <app-shell>
      <div class="matches-wrap">
        <p>Discover New Matches</p>
        <div class="match" v-for="match in matches" :key="match.name">
         <router-link to="/chat"><img src="https://images.unsplash.com/photo-1446040945968-d303ecb10b4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" /></router-link>   
          <div class="">
            <h3 class="chat-match-name"> {{ match.name }}</h3>
            <div class="chat-preview">You have a Match. Say "Hello".</div>
          </div> 
        </div>
      </div>
    </app-shell>
  </div>
</template>

<script>
import AppShell from '@/components/AppShell';

export default {
  name: 'chat',
  components: { AppShell },
  data() {
    return {
      matches: [
        {name: 'Sara'},
        {name: 'Alice'},
        {name: 'Maria'}
      ]
    }
  }
}
</script>

<style lang="scss">
.matches-wrap {
  padding-top: 8px;

  .match {
    display: flex;
    border-bottom: 1px solid #eeeeee;

    img {
      width: 60px;
      height: 60px;
      border-radius: 100%;
      margin: 10px 20px 10px 20px;
      border: 2px solid #fff;
      box-shadow: 1px 1px 2px #eee;
      float: left;
    }
  }

  p {
    padding: 20px;
    background-color: #fff;
  }
}

  .chat-match-name {
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    margin: 10px 0 0 0;
  }

  .chat-preview {
    font-size: 12px;
  }
</style>
