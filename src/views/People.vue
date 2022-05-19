<template>
  <dashboard-template :title="'People'">
    <template v-slot:table>
      <Table :tableDetails="tableData" :pageType="'People'" :isLoading="isLoading"/>
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
      header: [
        "Name",
        "Birth Year",
        "Gender",
        "Hair Color",
        "Height",
        "Created",
      ],
      data: [],
    });
    onMounted(() => {
      isLoading.value = true;
      (async () => {
        try {
          const URL = "https://swapi.dev/api/people";

          const data = await axios.get(URL);

          let options: {
            year: "numeric" | "2-digit" | undefined;
            month: "numeric" | "2-digit" | "long" | "short" | undefined;
            day: "numeric" | "2-digit" | undefined;
          } = { year: "numeric", month: "2-digit", day: "2-digit" };

          data.data.results.forEach((item: any, i: number) => {
            const id = item.url.split("/").filter(Number)[0];
            const date = new Date(item.created);

            const result = {
              id,
              name: item.name,
              birth: item.birth_year,
              gender: item.gender,
              hair: item.hair_color,
              height: item.height,
              created: date.toLocaleString("en-US", options),
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
