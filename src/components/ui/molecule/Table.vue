<template>
  <div class="table--wrapper">
    <table v-if="!isLoading">
      <thead>
        <tr>
          <th>
            <input type="checkbox" className="checkbox" @click="handleCheckAll" />
          </th>
          <th v-for="(item, i) in tableDetails.header" :key="i">{{ item }}</th>
        </tr>
      </thead>
      <tbody v-if="pageType === 'Films'">
        <tr
          v-for="(item, i) in tableDetails.data"
          :key="i"
          @click="handleClick(item.id)"
        >
          <td @click.stop="handleCheckbox">
            <input type="checkbox" className="checkbox" />
          </td>
          <td>{{ handleLongText(item.title) }}</td>
          <td>{{ item.date }}</td>
          <td>{{ handleLongText(item.director) }}</td>
          <td>{{ handleLongText(item.producer) }}</td>
          <td>{{ item.episodeId }}</td>
          <td>{{ handleLongText(item.character) }}</td>
        </tr>
      </tbody>
      <tbody v-if="pageType === 'Starships'">
        <tr
          v-for="(item, i) in tableDetails.data"
          :key="i"
          @click="handleClick(item.id)"
        >
          <td @click.stop="handleCheckbox">
            <input type="checkbox" className="checkbox"  />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ handleLongText(item.model) }}</td>
          <td>{{ handleLongText(item.class) }}</td>
          <td>{{ item.passenger }}</td>
          <td>{{ item.length }}</td>
          <td>{{ handleLongText(item.character) }}</td>
        </tr>
      </tbody>
      <tbody v-if="pageType === 'People'">
        <tr
          v-for="(item, i) in tableDetails.data"
          :key="i"
          @click="handleClick(item.id)"
        >
          <td @click.stop="handleCheckbox">
            <input type="checkbox" className="checkbox" />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.birth }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.hair }}</td>
          <td>{{ item.height }}</td>
          <td>{{ item.created }}</td>
        </tr>
      </tbody>
      <tbody v-if="pageType === 'Species'">
        <tr
          v-for="(item, i) in tableDetails.data"
          :key="i"
          @click="handleClick(item.id)"
        >
          <td @click.stop="handleCheckbox">
            <input type="checkbox" className="checkbox" />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.classification }}</td>
          <td>{{ handleLongText(item.eye) }}</td>
          <td>{{ handleLongText(item.hair) }}</td>
          <td>{{ item.height }}</td>
          <td>{{ item.created }}</td>
        </tr>
      </tbody>
    </table>
    <Skeletal v-else :width="'100%'" :height="pageType === 'Films' ? '400px' : '500px'" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Skeletal from "./SkeletalLoader.vue";
import { TABLE} from '@/types'


export default defineComponent({
  props: {
    tableDetails: Object as PropType<TABLE>,
    pageType: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    Skeletal,
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const { tableDetails, pageType, isLoading } = toRefs(props);

    const handleLongText = (text: string) => {
      return text.length > 30 ? text.substring(0, 30) + "..." : text;
    };

    const handleClick = (id: number) => {
      const routeName = route.name?.toString().toLowerCase();
      router.push(
        `/dashboard/${routeName === "dashboard" ? "films" : routeName}/${id}`
      );
    };

    const handleCheckAll = (e: any) => {
      e.target.checked = !e.target.checked
      const arr = document.querySelectorAll('.checkbox');
      arr.forEach((el: any) => {
        el.checked = !el.checked
      })
    }

    const handleCheckbox = () => {}


    return { tableDetails, handleClick, handleLongText, pageType, isLoading, handleCheckAll, handleCheckbox  };
  },
});
</script>
<style scoped>
.table--wrapper {
  overflow-x: auto;
}

.table--wrapper table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

table td {
  text-align: left;
  padding: 13px 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
}

table th {
  text-align: left;
  padding: 15px 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;

  color: #a4a7b7;
}

table tr {
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0px 0px 30px rgba(13, 47, 161, 0.07);
}
table tr:not(thead tr):hover {
  cursor: pointer;
  background: rgba(0,0,0,0.1);
}
</style>
