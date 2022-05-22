import { ref, reactive, onMounted } from "vue";
import { TABLE } from "@/types";
import axiosInstance from "@/services/axios";
import {useStore} from '@/store';

const useStarships = () => {
  const isLoading = ref(false);
  const store = useStore()

  const tableData = reactive<TABLE>({
    header: ["Name", "Model", "Class", "Passenger", "Length", "Character"],
    data: [],
  });
  onMounted(() => {
    (async () => {
      isLoading.value = true;
      try {
        const data = await axiosInstance.get("/starships");

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

        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        store.setNotification("Oops! cannot retrieve data at the moment try again later");
        console.log(error);
      }
    })();
  });
  return { isLoading, tableData };
};

export default useStarships;
