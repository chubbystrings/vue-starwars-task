<template>
  <router-view v-slot="slotProps">
      <transition mode="out-in" name="route">
        <component :is="slotProps.Component"></component>
      </transition>
  </router-view>
</template>

<style>
.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
}
</style>
