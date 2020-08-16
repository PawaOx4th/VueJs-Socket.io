<template>
  <div id="chat-component">
    <h2>chat-component</h2>

    <div class="p-3">
      <b-form-input
        class="w-25 mr-3 d-inline-block"
        type="text"
        v-model="msg"
        size="md"
        :trim="trimstatus"
        debounce="10"
        @keydown.enter="sendMessage"
        placeholder="enter your message"
      >
      </b-form-input>

      <b-button variant="primary" @click="sendMessage" size="md">Send Message</b-button>
    </div>
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
