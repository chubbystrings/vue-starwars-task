<template>
  <div class="dashboard--wrapper">
    <Sidebar  />
    <div class="content--wrapper">
      <Header  />
      <div class="main--content">
        <slot name="card"></slot>
         <h3>{{ title }}</h3>
        <slot name="table"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs, ref } from "vue";
import Header from "@/components/ui/molecule/Header.vue";
import Sidebar from '@/components/ui/molecule/Sidebar.vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    Header,
    Sidebar
  },

  setup(props) {
    const { title } = toRefs(props);
    const clicked = ref(false)


    return { title, clicked };
  },
});
</script>

<style scoped>
.dashboard--wrapper {
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  height: 100vh;
  box-sizing: border-box;
  width: 100%;
}

.content--wrapper {
  overflow-x: hidden;
}

.main--content {
  overflow-x: hidden;
  padding: 50px 30px;
}

.main--content h3 {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  color: #a4a7b7;
  margin: 15px 0;
}

@media screen and (max-width: 1200px) {
  .dashboard--wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
