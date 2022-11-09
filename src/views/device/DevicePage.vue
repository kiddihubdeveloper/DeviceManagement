<template>
  <div>
    <form-search-device
      :keySearch="keySearch"
      @on-Search="getDeviceByStatus"
    ></form-search-device>
    <table-device :items="items" :headers="headers"></table-device>
  </div>
</template>

<script>
import axios from "axios";
import TableDevice from "./components/TableDevice.vue";
import Storage from "@/utils/storage";
import FormSearchDevice from "./components/FormSearchDevice.vue";
export default {
  components: {
    TableDevice,
    FormSearchDevice,
  },
  data() {
    return {
      search: "",
      editedItem: {
        productCode: "",
        productName: "",
        productPicture: "",
        productDay: "",
        providerCode: "",
        provider: "",
      },

      headers: [
        { text: "ID", align: "start", value: "id" },
        // { text: "Mã sản phẩm", value: "productCode" },
        { text: "Tên thiết bị ", value: "deviceName" },
        { text: "Ảnh thiết bị", value: "deviceImage" },
        { text: "Nhà cung cấp", value: "providerID" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [],
      keySearch: {
        status: 0,
      },
    };
  },
  created() {
    this.getDevices();
  },
  computed: {},
  methods: {
    async getDevices() {
      return axios
        .get("http://localhost:3000/devices")
        .then((response) => {
          this.items = response.data;
          console.log(this.items);
        })
        .catch((error) => {
          throw error.response.data;
        });
    },
    getDeviceByStatus() {
      this.items = [];
      axios
        .get("http://localhost:3000/devices")
        .then((response) => {
          if (this.keySearch.status == 0) {
            this.items = response.data;
          } else {
            this.items = response.data.filter(
              (a) => a.status == this.keySearch.status
            );
          }
          console.log(this.items);
        })
        .catch((error) => {
          throw error.response.data;
        });
    },
  },
};
</script>

<style></style>
