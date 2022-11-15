<template>
  <div>
    <v-card-title>
      <v-icon @click="reload"> mdi-arrow-left</v-icon>
      <span class="ml-3 text-h5">Thêm thiết bị</span>
    </v-card-title>
    <form-create-device
      :editedItem="editedItem"
      :listCategory="listCategory"
    ></form-create-device>
  </div>
</template>

<script>
import axios from "axios";
import FormCreateDevice from "./components/FormCreateDevice.vue";
export default {
  components: {
    FormCreateDevice,
  },
  data() {
    return {
      editedItem: {
        id: this.$route.params.id,
        deviceCode: "",
        deviceName: "",
        deviceImage: null,
        createdAt: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 10),
        providerID: "",
        provider: "",
        categoryId: "",
        status: "2",
      },
      listCategory: [],
    };
  },
  methods: {
    getCategories() {
      axios.get("http://localhost:3000/deviceCategories").then((res) => {
        this.listCategory = res.data;
        console.log(this.listCategory);
      });
    },
    reload() {
      this.$router.back();
    },
  },
  created() {
    this.getCategories();
  },
};
</script>

<style></style>
