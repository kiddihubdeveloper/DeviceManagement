<template>
  <form class="" style="padding-left: 5em">
    <v-radio-group
      v-model="keySearch.status"
      row
      @change="onSearch"
      label="Trạng thái:"
    >
      <v-radio
        v-for="option in options"
        :key="option.id"
        :label="option.label"
        :value="option.value"
      ></v-radio>
    </v-radio-group>
  </form>
</template>
<script>
import axios from "axios";
export default {
  props: ["keySearch"],
  data: () => ({
    options: [
      { id: 1, label: "Tất cả", value: 0 },
      { id: 2, label: "Đã mượn", value: 1 },
      { id: 3, label: "Chưa mượn", value: 2 },
    ],
  }),

  computed: {},

  methods: {
    onSearch() {
      this.$emit("on-Search");
    },
  },
};
</script>
