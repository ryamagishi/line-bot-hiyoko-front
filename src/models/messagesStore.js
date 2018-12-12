import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import { LOAD_STATUS_PARAM, API_URL_MESSAGES } from "@/const";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadStatus: LOAD_STATUS_PARAM.INITIALIZE,
    messages: [],
    updateMessageId: ""
  },
  mutations: {
    getMessages(state, response) {
      state.messages = response.data;
      state.loadStatus = LOAD_STATUS_PARAM.DATA_LOADED;
    },
    updateMessage(state) {
      state.messages = state.messages.filter(function(element) {
        return element.id !== state.updateMessageId;
      });
      state.updateMessageId = "";
    }
  },
  actions: {
    getMessages({ commit }) {
      axios.get(API_URL_MESSAGES).then(response => {
        if (response.status === 200) {
          commit("getMessages", response);
        }
      });
    },
    updateMessage({ state, commit }) {
      let updateMessage = state.messages.filter(function(element) {
        return element.id === state.updateMessageId;
      })[0];
      if (typeof updateMessage === "undefined") {
        throw new Error("もう一度操作をやり直して下さい。");
      }
      axios
        .put(API_URL_MESSAGES + state.updateMessageId, updateMessage)
        .then(response => {
          if (response.status === 200) {
            commit("updateMessage");
            alert("更新しました！");
          } else {
            throw new Error("もう一度操作をやり直して下さい。");
          }
        });
    }
  }
});
