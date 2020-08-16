<template>
  <div id="chat-component">
    <h2>chat-component</h2>
    <b-form-input type="text" v-model="msg" size='md' :trim='trimstatus' placeholder="enter your message"></b-form-input>

    <button @click="sendMessage">Send Message</button>
  </div>
</template>

<script>
export default {
  name: "chat-component",
  data() {
    return {
      msg: "",
      trimstatus: true
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
