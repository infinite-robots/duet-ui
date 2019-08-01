<template>
  <div class="chat">
    <app-shell>
      <div class="matches-wrap">
        <p>Your Matches</p>
        <div class="match" v-for="match in matches" :key="match.name">
          <img src="https://images.unsplash.com/photo-1446040945968-d303ecb10b4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
          <span> {{ match.name }}</span>
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

    img {
      width: 40px;
      height: 40px;
      border-radius: 100%;
    }
  }
}
</style>
