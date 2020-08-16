<template>
  <div id="app">
    <h1>Chatroom</h1>
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
import io from "socket.io-client";

export default {
  name: "app",
  data() {
    return {
      username: "",
      socket: io("http://localhost:4000"),
      messages: [],
      users: []
    };
  },
  components: {
    Chat: () => import("@/components/Chat-Component.vue")
  },
  mounted() {
    this.username = prompt(`What is your username ?`, `Anonymous`);

    // eslint-disable-next-line no-unused-expressions
    !this.username ? (this.username = "Anonymous") : "";

    this.joinServer();
  },
  methods: {
    joinServer() {
      this.socket.on("loggedIn", data => {
        this.messages = data.messages;
        this.users = data.users;
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
