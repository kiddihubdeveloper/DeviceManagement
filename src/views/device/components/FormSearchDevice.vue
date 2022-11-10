<template>
  <form class="" style="padding-left: 5em">
    <v-radio-group
      v-model="keySearch.status"
      row
      @change="onSearchStatus"
      label="Trạng thái:"
    >
      <v-radio
        v-for="option in options"
        :key="option.id"
        :label="option.label"
        :value="option.value"
      ></v-radio>
    </v-radio-group>
    <v-col class="d-flex" cols="12" sm="6">
      <v-select
        v-model="keySearch.categoryId"
        :items="listCategory"
        :item-text="'name'"
        :item-value="'id'"
        label="Loại thiết bị"
        @change="onSearchDevice"
        outlined
      ></v-select>
    </v-col>
  </form>
</template>
<script>
import axios from "axios";
export default {
  props: ["keySearch", "listCategory"],
  data: () => ({
    options: [
      { id: 1, label: "Tất cả", value: 0 },
      { id: 2, label: "Đã mượn", value: 1 },
      { id: 3, label: "Chưa mượn", value: 2 },
    ],
  }),

  computed: {},

  methods: {
    onSearchStatus() {
      this.onSearchDevice();
    },
    onSearchDevice() {
      this.$emit("on-SearchDevice");
    },
  },
};
</script>
