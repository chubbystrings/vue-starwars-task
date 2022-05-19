<template>
  <dashboard-template :title="'People'">
    <template v-slot:table>
      <Table
        :tableDetails="tableData"
        :pageType="'People'"
        :isLoading="isLoading"
      />
    </template>
  </dashboard-template>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import DashboardTemplate from "@/components/template/DashboardTemplate.vue";
import Table from "@/components/ui/molecule/Table.vue";
import usePeople from "@/composables/usePeople";

export default defineComponent({
  components: {
    DashboardTemplate,
    Table,
  },
  setup() {
    const { isLoading, tableData } = usePeople();

    return { tableData, isLoading };
  },
});
</script>
<style scoped></style>
