<template>
  <div id="app">
    <h1 class="display-1"><strong>Chatroom</strong></h1>
    <p><strong>Username</strong> : {{ username }}</p>
    <p><strong>Online</strong> : {{ users.length }}</p>
    <hr />
    <ul v-for="(useronline, index) in users" :key="index">
      <li>{{ useronline }}</li>
    </ul>
    <hr />
    <Chat @sendMessage="sendMessage" />
    <hr />
    <h3>Chat Message</h3>
    <ul v-for="msg in messages" :key="msg._id">
      <li>{{ msg }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      username: this.$store.getters.getUsername,
      socket: this.$store.getters.getSocket,
      messages: [],
      users: []
    };
  },
  components: {
    Chat: () => import("@/components/Chat-Component.vue")
  },
  mounted() {
    this.username = prompt(`What is your username ?`, `Anonymous`);

    if (!this.username) {
      this.username = "Anonymous";
    }

    this.$store.dispatch("setUsername", this.username);

    this.joinServer();
  },
  methods: {
    joinServer() {
      this.socket.on("loggedIn", data => {
        this.$store.dispatch("setMessage", data.messages);
        //   this.messages = data.messages;

        this.$store.dispatch("setUser", data.users);
        //   this.users = data.users;

        this.socket.emit("newuser", this.username);
      });

      this.listen();
    },
    listen() {
      this.socket.on("userOnline", user => {
        this.users.push(user);
      });
      this.socket.on("userLeft", user => {
        this.users.splice(this.users.indexOf(user), 1);
      });

      this.socket.on("msg", msg => {
        console.log(`Msg in Start`);
        this.messages.push(msg);
      });
    },
    sendMessage(messageChat) {
      this.socket.emit("msg", messageChat);

      console.log(`Send Mag Finish`);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //   text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
