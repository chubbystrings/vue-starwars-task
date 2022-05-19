<template>
  <dashboard-template :title="'Starship'">
    <template v-slot:table>
      <Table :tableDetails="tableData" :pageType="'Starships'" :isLoading="isLoading" />
    </template>
  </dashboard-template>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import DashboardTemplate from "@/components/template/DashboardTemplate.vue";
import Table from "@/components/ui/molecule/Table.vue";
import axios from "axios";

interface TABLE {
  header: string[];
  data: Record<string, any>[];
}

export default defineComponent({
  components: {
    DashboardTemplate,
    Table,
  },
  setup() {
    const isLoading = ref(false);
    const tableData = reactive<TABLE>({
      header: ["Name", "Model", "Class", "Passenger", "Length", "Character"],
      data: [],
    });
    onMounted(() => {
      isLoading.value = true;
      (async () => {
        try {
          const URL = "https://swapi.dev/api/starships";

          const data = await axios.get(URL);

          data.data.results.forEach((item: any, i: number) => {
            const id = item.url.split("/").filter(Number)[0];

            const result = {
              id,
              name: item.name,
              model: item.model,
              class: item.starship_class,
              passenger: item.passengers,
              length: item.length,
              character: item.url,
            };
            tableData.data.push(result);
          });

          isLoading.value = false
        } catch (error) {
            isLoading.value = false;
        }
      })();
    });

    return { tableData, isLoading };
  },
});
</script>
<style scoped></style>
