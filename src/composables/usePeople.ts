import { ref, reactive, onMounted } from "vue";
import axiosInstance from "@/services/axios";
import { TABLE, DATE_OPTIONS } from "@/types";

const usePeople = () => {
  const isLoading = ref(false);
  const tableData = reactive<TABLE>({
    header: ["Name", "Birth Year", "Gender", "Hair Color", "Height", "Created"],
    data: [],
  });
  onMounted(() => {
    isLoading.value = true;
    (async () => {
      try {
        const data = await axiosInstance.get("/people");

        let options: DATE_OPTIONS = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        };

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
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
      }
    })();
  });

  return { tableData, isLoading };
};

export default usePeople;
