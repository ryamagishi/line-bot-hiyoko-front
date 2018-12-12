<template>
  <li class="message">
    <ul>
      <li>ID: {{ body.id }}</li>
      <li>時刻: {{ body.created }}</li>
      <li>来たメッセージ: {{ body.question }}</li>
      <li>当時の返信: {{ body.actual_reply }}</li>
      <li>学習させたい返信: <input v-model="newMessage" class="input"
                           placeholder="返信を入力してください。">
      </li>
      <li><button v-on:click="updateMessage">学習</button></li>
    </ul>
  </li>
</template>

<script>
import MessagesStore from "@/models/messagesStore";

export default {
  name: "Message",
  props: ["messageId"],
  data: function() {
    return { newMessage: "" };
  },
  computed: {
    body: function() {
      let messageId = this.$options.propsData.messageId;
      return MessagesStore.state.messages.filter(function(element) {
        return element.id === messageId;
      })[0];
    }
  },
  methods: {
    updateMessage: function() {
      this.body.update_message = this.newMessage;
      MessagesStore.state.updateMessageId = this.$options.propsData.messageId;
      MessagesStore.dispatch("updateMessage");
    }
  }
};
</script>

<style scoped lang="scss">
li.message {
  border: solid 1px black;
  margin: 1em;
  background-color: whitesmoke;
  ul {
    display: flex;
    flex-direction: column;
    margin: 1em;
    li {
      text-align: left;
      input {
        width: 130pt;
        height: 30pt;
      }
    }
  }
}
</style>
