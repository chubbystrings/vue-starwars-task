import { defineStore } from "pinia";

export const useStore = defineStore("user", {

    state: () => {
        return {
            menuIsOpen: false
        }
    },

    actions: {
        toggleMenu() {
            this.menuIsOpen = !this.menuIsOpen
        }
    },

    getters: {
        getMenuIsOpen(state) {
            return state.menuIsOpen
        }
    }
})