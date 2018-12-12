<template>
  <div class="home">
    <h1>LineBot 分からなかったメッセージ一覧</h1>
    <div v-show="is_loading">
      Loading...
    </div>
    <div v-show="!is_loading">
      <ul>
        <message v-for="message in messages"
                 v-bind:key="message.id"
                 v-bind:messageId="message.id">
        </message>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { LOAD_STATUS_PARAM } from "@/const";
import MessagesStore from "@/models/messagesStore";
import Message from "@/components/Message";

export default {
  name: "home",
  components: { Message },
  computed: {
    is_loading: function() {
      return MessagesStore.state.loadStatus === LOAD_STATUS_PARAM;
    },
    messages: function() {
      return MessagesStore.state.messages;
    }
  }
};

MessagesStore.dispatch("getMessages");
</script>
