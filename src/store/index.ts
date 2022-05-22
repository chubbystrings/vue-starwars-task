import { defineStore } from "pinia";

export const useStore = defineStore("user", {
  state: () => {
    return {
      menuIsOpen: false,
      notification: {
        message: "",
        show: false,
      },
    };
  },

  actions: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },

    setNotification(message: string) {
      this.notification = {
        message,
        show: true,
      };
      setTimeout(() => {
        this.notification = {
          message: "",
          show: false,
        };
      }, 2000);
    },
  },

  getters: {
    getMenuIsOpen(state) {
      return state.menuIsOpen;
    },

    getNotificationStatus(state) {
      return state.notification;
    },
  },
});
