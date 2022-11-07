<template>
  <table-device :items="items" :headers="headers"></table-device>
</template>

<script>
import axios from "axios";
import TableDevice from "./components/TableDevice.vue";
import Storage from "@/utils/storage";
export default {
  components: {
    TableDevice,
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      search: "",
      editedIndex: -1,
      editedItem: {
        productCode: "",
        productName: "",
        productPicture: "",
        productDay: "",
        providerCode: "",
        provider: "",
      },
      defaultItem: {
        productCode: "",
        productName: "",
        productPicture: null,
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
      menu: false,
      modal: false,
      datepick: false,
    };
  },
  created() {
    //this.items = Storage.get("devices");
    this.getCountries();
  },
  computed: {},
  methods: {
    async getCountries() {
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
  },
};
</script>

<style></style>
