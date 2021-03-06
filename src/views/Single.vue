<template>
  <dashboard-template :title="''">
    <template v-slot:table>
      <div class="single--wrapper" v-if="!isLoading">
        <div class="image--wrapper">
          <img :src="photo" />
        </div>
        <div class="description" v-if="pageType === 'films'">
          <h2>{{ result.data.title }}</h2>
          <p>Director: {{ result?.data?.director }}</p>
          <p>Producer: {{ result?.data?.producer }}</p>
          <p>Release Date: {{ result?.data?.release_date }}</p>
        </div>
        <div class="description" v-if="pageType === 'starships'">
          <h2>{{ result?.data?.name }}</h2>
          <p>Model: {{ result?.data?.model }}</p>
          <p>Passengers: {{ result?.data?.passengers }}</p>
          <p>Pilots: {{ "n/a" }}</p>
        </div>
        <div class="description" v-if="pageType === 'people'">
          <h2>{{ result?.data?.name }}</h2>
          <p>Gender: {{ result?.data?.gender }}</p>
          <p>Year of Birth: {{ result?.data?.birth_year }}</p>
          <p>Skin Color: {{ result?.data?.skin_color }}</p>
          <p>Height: {{ result?.data?.height }}</p>
        </div>
        <div class="description" v-if="pageType === 'species'">
          <h2>{{ result?.data?.name }}</h2>
          <p>Designation: {{ result?.data?.designation }}</p>
          <p>Language: {{ result?.data?.language }}</p>
          <p>Eye Colors: {{ result?.data?.eye_colors }}</p>
          <p>Average Lifespan: {{ result?.data?.average_lifespan }}</p>
        </div>
      </div>
      <div v-else class="single--wrapper">
        <Skeletal width="300px" height="400px" />
      </div>
    </template>
  </dashboard-template>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watchEffect,
  reactive,
} from "vue";
import { useRoute } from "vue-router";
import DashboardTemplate from "@/components/template/DashboardTemplate.vue";
import axiosInstance from "@/services/axios";
import Skeletal from "../components/ui/molecule/SkeletalLoader.vue";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    DashboardTemplate,
    Skeletal,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const pageType = ref("");
    const result = reactive({
      data: {},
    });
    const isLoading = ref(false);

    const photo = computed(() => {
      if (pageType.value === "films") {
        return "/img/svg/film.svg";
      }

      if (pageType.value === "species") {
        return "/img/svg/specie.svg";
      }
      if (pageType.value === "people") {
        return "/img/svg/people.svg";
      }

      if (pageType.value === "starships") {
        return "/img/svg/starship.svg";
      }

      return "/img/svg/film.svg";
    });

    onMounted(() => {
      isLoading.value = true;
      (async () => {
        try {
          const data = await axiosInstance.get(
            `/${route.params.single}/${route.params.id}`
          );

          result.data = { ...data.data };
          isLoading.value = false;
        } catch (error) {
          isLoading.value = false;
          store.setNotification(
            "Oops! cannot retrieve data at the moment try again later"
          );
        }
      })();
    });

    watchEffect(() => {
      pageType.value = route.params.single as string;
    });

    return { pageType, photo, result, isLoading };
  },
});
</script>
<style scoped>
.single--wrapper {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.image--wrapper {
  width: 318px;
  height: 450px;
}

.image--wrapper img {
  width: 100%;
  height: 100%;
}

.description {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  padding: 10px 5px;
}

.description h2 {
  font-weight: 700;
  font-size: 35px;
  line-height: 44px;
}

.description p {
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #434854;
}

@media screen and (max-width: 725px) {
  .single--wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (max-width: 365px) {
  .description {
    width: 100%;
  }
  .image--wrapper {
    width: 100%;
    height: 100%;
  }

  .description h2 {
    font-size: 20px;
    word-break: break-word;
    overflow-wrap: break-word;
    line-height: 24px;
  }

  .description p {
    font-size: 10px;
    word-break: break-word;
    overflow-wrap: break-word;
  }
}
</style>
