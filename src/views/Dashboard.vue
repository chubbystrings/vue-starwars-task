<template>
  <dashboard-template :title="'Films'">
    <template v-slot:card>
      <div class="cards--wrapper">
        <OverviewCard
          v-for="(item, i) in cardData"
          :key="i"
          :color="item.color"
          :title="item.name"
          :value="item.value"
          :isLoading="isLoading"
        />
      </div>
    </template>
    <template v-slot:table>
      <Table
        :tableDetails="tableData"
        :pageType="'Films'"
        :isLoading="isLoading"
      />
    </template>
  </dashboard-template>
</template>
<script lang="ts">
import { defineComponent, onMounted, watch, reactive, ref } from "vue";
import DashboardTemplate from "@/components/template/DashboardTemplate.vue";
import OverviewCard from "@/components/ui/molecule/OverviewCard.vue";
import Table from "@/components/ui/molecule/Table.vue";
import useFilms from "@/composables/useFilms";

export default defineComponent({
  components: {
    DashboardTemplate,
    OverviewCard,
    Table,
  },
  setup() {
    const { isLoading, cardData, tableData } = useFilms();

    return { cardData, tableData, isLoading };
  },
});
</script>
<style scoped>
.cards--wrapper {
  overflow-x: auto;
  gap: 20px;
  width: 100%;
  white-space: nowrap;
  padding: 10px 0;
}
</style>
