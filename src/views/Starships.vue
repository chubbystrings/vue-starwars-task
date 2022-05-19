<template>
  <dashboard-template :title="'Starship'">
    <template v-slot:table>
      <Table
        :tableDetails="tableData"
        :pageType="'Starships'"
        :isLoading="isLoading"
      />
    </template>
  </dashboard-template>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import DashboardTemplate from "@/components/template/DashboardTemplate.vue";
import Table from "@/components/ui/molecule/Table.vue";
import useStarships from '@/composables/useStarships'

export default defineComponent({
  components: {
    DashboardTemplate,
    Table,
  },
  setup() {
    const { isLoading, tableData} = useStarships()

    return { tableData, isLoading };
  },
});
</script>
<style scoped></style>
