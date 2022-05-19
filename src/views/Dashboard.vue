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
      <Table :tableDetails="tableData" :pageType="'Films'" :isLoading="isLoading"/>
    </template>
  </dashboard-template>
</template>
<script lang="ts">
import { defineComponent, onMounted, watch, reactive, ref } from "vue";
import DashboardTemplate from "@/components/template/DashboardTemplate.vue";
import OverviewCard from "@/components/ui/molecule/OverviewCard.vue";
import Table from "@/components/ui/molecule/Table.vue";
import axios from "axios";

interface TABLE {
  header: string[];
  data: Record<string, any>[];
}

export default defineComponent({
  components: {
    DashboardTemplate,
    OverviewCard,
    Table,
  },
  setup() {
    const isLoading = ref(false);
    const tableData = reactive<TABLE>({
      header: [
        "Film Title",
        "Release Date",
        "Director",
        "Producer",
        "Episode ID",
        "Character",
      ],
      data: [],
    });
    const cardData = ref([
      {
        name: "Films",
        color: "#A9FFE0",
        value: 0,
      },
      {
        name: "Starships",
        color: "#A9C1FF",
        value: 0,
      },
      {
        name: "People",
        color: "#FFA9EC",
        value: 0,
      },
      {
        name: "Species",
        color: "#FDFFA9",
        value: 0,
      },
    ]);
    const starships = ref(0);
    const people = ref(0);
    const species = ref(0);

    const loadData = async () => {
      isLoading.value = true;
      try {
        const URL = "https://swapi.dev/api/films";

        const data = await axios.get(URL);

        const table: TABLE = {
          header: [
            "Film Title",
            "Release Date",
            "Director",
            "Producer",
            "Episode ID",
            "Character",
          ],
          data: [],
        };

        data.data.results.forEach((item: any, i: number) => {
          starships.value += item.starships.length;
          people.value += item.characters.length;
          species.value += item.species.length;

          const result = {
            id: i + 1,
            title: item.title,
            date: item.release_date,
            director: item.director,
            producer: item.producer,
            episodeId: item.episode_id,
            character: item.characters[0],
          };
          table.data.push(result);
        });

        tableData.header = table.header;
        tableData.data = table.data;

        cardData.value.map((v) => {
          if (v.name === "Films") {
            v.value = data.data.results.length;
            return v;
          }

          if (v.name === "Starships") {
            v.value = starships.value;
            return v;
          }

          if (v.name === "People") {
            v.value = people.value;
            return v;
          }

          if (v.name === "Species") {
            v.value = species.value;
            return v;
          }

          return v;
        });
        isLoading.value = false
      } catch (error) {
          isLoading.value = false
      }
    };

    onMounted(() => {
      loadData();
    });

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
