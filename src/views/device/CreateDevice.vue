<template>
  <div>
    <v-card-title>
      <span class="text-h5">Them thiet bi</span>
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
        deviceID: "",
        deviceName: "",
        deviceImage: null,
        createdAt: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 10),
        providerID: "",
        provider: "",
        categoryId: "",
      },
      listCategory: [],
    };
  },
  methods: {
    getCategories() {
      axios.get("http://localhost:3000/deviceCategories").then((res) => {
        this.listCategory = res.data;
      });
    },
  },
  created() {
    this.getCategories();
  },
};
</script>

<style></style>
