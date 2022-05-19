<template>
  <div v-if="menuIsOpen" class="overlay" @click="handleClick"></div>
  <div :class="`${menuIsOpen ? 'open' : ''} sidebar`" ref="container">
    <div class="toggle--button--wrapper">
      <toggle-button></toggle-button>
    </div>
    <div class="headers">
      <div class="logo--wrapper">
        <img src="/img/svg/starwarz-image.svg" />
      </div>
      <router-link
        to="/dashboard"
        :class="`link--wrapper ${
          currentSingleRoute === 'films' ? 'link-active' : ''
        }`"
      >
        <div class="icon">
          <img src="/img/svg/overview.svg" />
        </div>
        Overview
      </router-link>
    </div>
    <div class="links">
      <router-link
        to="/dashboard/starships"
        :class="`link--wrapper ${
          currentSingleRoute === 'starships' ? 'link-active' : ''
        }`"
      >
        <div class="icon">
          <img src="/img/svg/starship-icon.svg" />
        </div>
        Starships
      </router-link>
      <router-link
        to="/dashboard/people"
        :class="`link--wrapper ${
          currentSingleRoute === 'people' ? 'link-active' : ''
        }`"
      >
        <div class="icon">
          <img src="/img/svg/people-icon.svg" />
        </div>
        People
      </router-link>
      <router-link
        to="/dashboard/species"
        :class="`link--wrapper ${
          currentSingleRoute === 'species' ? 'link-active' : ''
        }`"
      >
        <div class="icon">
          <img src="/img/svg/species-icon.svg" />
        </div>
        Species
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../../store";
import { storeToRefs } from "pinia";
import ToggleButton from "../atom/ToggleButton.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    ToggleButton,
  },
  setup() {
    const store = useStore();
    const { menuIsOpen } = storeToRefs(store);
    const route = useRoute();

    const handleClick = () => store.toggleMenu();
    const currentSingleRoute = computed(() => {
      if (route.params?.single) {
        return route.params.single;
      }
      return "";
    });

    return { menuIsOpen, handleClick, currentSingleRoute };
  },
});
</script>
<style scoped>
.sidebar {
  position: relative;
  background-color: var(--secondary);
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  gap: 100px;
  box-sizing: border-box;
  transition: all 0.5s ease-out;
  z-index: 99;
}

.toggle--button--wrapper {
  position: absolute;
  right: 0px;
  top: -5px;
  display: none;
}

.sidebar .headers {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
}
.logo--wrapper {
  width: 107px;
  height: 46px;
  margin: 0 auto;
}

.logo--wrapper img {
  width: 100%;
  height: 100%;
}

.link--wrapper {
  display: flex;
  gap: 20px;
  padding: 15px 10px;
  color: white;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.link--wrapper .icon {
  width: 18px;
  height: 18px;
}

.icon img {
  width: 100%;
  height: 100%;
}

.link--wrapper:hover {
  background: var(--button);
  transition: all 0.2s ease-out;
}

.link--wrapper.router-link-active,
.link--wrapper.link-active {
  background: var(--button);
  transition: all 0.2s ease-out;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.overlay {
  position: absolute;
  z-index: 9;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
}

@media screen and (max-width: 1200px) {
  .sidebar {
    position: fixed;
    height: 100vh;
    left: -250px;
    z-index: 10000;
  }
  .open.sidebar {
    left: 0;
  }
  .toggle--button--wrapper {
    display: block;
  }
}
</style>
