<template>
  <div class="login--wrapper">
    <div class="section--one">
      <div class="image--wrapper">
        <img src="/img/svg/starwarz-image.svg" />
      </div>
    </div>
    <div class="section--two">
      <login-form></login-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "../molecule/LoginForm.vue";

export default defineComponent({
  components: {
    LoginForm,
  },
  setup() {},
});
</script>
<style scoped>
.login--wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100vh;
}
.section--one {
  position: relative;
  background-color: var(--secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.main--content {
  display: grid;
  height: 100vh;
  background-color: #fff6d3;
  place-items: center;
  place-content: center;
  font-weight: bold;
  font-size: 25px;
  text-align: left;
  border: 5px solid green;
}

.section--two {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1200px) {
  .section--one {
    padding: 0 10px;
  }
  .section--one .image--wrapper {
    height: 300px;
    width: 300px;
  }
  .image--wrapper img {
    width: 100%;
    height: 100%;
  }
}

@media screen and (max-width: 925px) {
    .login--wrapper {
        grid-template-columns: 1fr;
    }

    .section--one {
        display: none;
    }
}

@media screen and (max-width: 575px) {
    .section--two {
        padding: 0 20px;
    }
}
</style>
