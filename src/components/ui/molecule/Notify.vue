<template>
  <div class="notification">
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs  } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    }
  },
  setup(props) {

    const {message} = toRefs(props)
    return { message };
  },
});
</script>

<style scoped>
.notification {
  background-color: #fdfdfd;
  border-left: 5px solid red;
  border-radius: 2px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 250px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100px;
}


.notification p {
  color: red !important;
  font-size: 14px !important;
}
</style>
