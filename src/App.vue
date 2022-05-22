<template>
<teleport to="body">
    <transition
      name="route"
      appear
    >
      <Notify v-if="showNotification" :message="notificationMessage" />
    </transition>
  </teleport>
  <div
    :class="
      isAuthRoute ? 'auth--dashboard--wrapper' : 'guest--dashboard--wrapper'
    "
  >
    <auth-sidebar :auth="isAuthRoute"></auth-sidebar>
    <router-view v-slot="slotProps">
      <transition mode="out-in" name="route" appear>
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "./store";
import { useRoute } from "vue-router";
import AuthSidebar from "@/components/ui/molecule/Sidebar.vue";
import Notify from '@/components/ui/molecule/Notify.vue';

export default defineComponent({
  components: {
    AuthSidebar,
    Notify,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const isAuthRoute = computed(() => route.name !== "Home");

     const showNotification = computed(() => store.getNotificationStatus.show);
    const notificationMessage = computed(
      () => store.getNotificationStatus.message
    );

    return { isAuthRoute, showNotification, notificationMessage };
  },
});
</script>

<style scoped>
.auth--dashboard--wrapper {
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  height: 100vh;
  box-sizing: border-box;
  width: 100%;
}
.guest--dashboard--wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100vh;
  box-sizing: border-box;
  width: 100%;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active,
.route-leave-active {
  transition: all 0.5s ease-out;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
}

@media screen and (max-width: 1200px) {
  .auth--dashboard--wrapper {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 925px) {
  .guest--dashboard--wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
