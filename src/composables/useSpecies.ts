import { ref, reactive, onMounted } from "vue";
import axiosInstance from "@/services/axios";
import { TABLE, DATE_OPTIONS } from "@/types";

const useSpecies = () => {
  const isLoading = ref(false);
  const tableData = reactive<TABLE>({
    header: [
      "Name",
      "Classifications",
      "Eye Color",
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

        const data = await axiosInstance.get('/species');

        let options: DATE_OPTIONS = { year: "numeric", month: "2-digit", day: "2-digit" };

        data.data.results.forEach((item: any, i: number) => {
          const id = item.url.split("/").filter(Number)[0];
          const date = new Date(item.created);

          const result = {
            id,
            name: item.name,
            classification: item.classification,
            eye: item.eye_colors,
            hair: item.hair_colors,
            height: item.average_height,
            created: date.toLocaleString("en-US", options),
          };
          tableData.data.push(result);
        });
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
      }
    })();
  });

  return { tableData, isLoading };
};

export default useSpecies
