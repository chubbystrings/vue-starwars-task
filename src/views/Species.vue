<template>
  <dashboard-template :title="'Species'">
    <template v-slot:table>
      <Table
        :tableDetails="tableData"
        :pageType="'Species'"
        :isLoading="isLoading"
      />
    </template>
  </dashboard-template>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import DashboardTemplate from "@/components/template/DashboardTemplate.vue";
import Table from "@/components/ui/molecule/Table.vue";
import useSpecies from "@/composables/useSpecies";

export default defineComponent({
  components: {
    DashboardTemplate,
    Table,
  },
  setup() {
    const { isLoading, tableData } = useSpecies();

    return { tableData, isLoading };
  },
});
</script>
<style scoped></style>
