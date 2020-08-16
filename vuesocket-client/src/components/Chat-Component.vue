<template>
  <div id="chat-component">
    <h2>chat-component</h2>
    <input type="text" v-model="msg" @keydown.enter="sendMessage" />
    <button @click="sendMessage">Send Message</button>
  </div>
</template>

<script>
export default {
  name: "chat-component",
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    sendMessage() {
      if (!this.msg) {
        alert("Please enter a message");
      } else {
        this.$emit("sendMessage", this.msg);
        this.msg = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
