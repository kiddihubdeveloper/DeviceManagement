<template>
  <v-card width="150vh" class="mx-auto mt-5">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :custom-filter="customSearch"
      show-select
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Quản lý thiết bị</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn color="primary" dark class="mb-2" :to="'/create-device'">
            New Item
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Bạn có chắc muốn xóa thiết bị ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.id`]="{ item }">
        {{ item.id }}
      </template>
      <template v-slot:[`item.deviceName`]="{ item }">
        {{ item.deviceName }}
      </template>
      <template v-slot:[`item.deviceImage`]="{ item }">
        <img
          :src="item.deviceImage"
          alt=""
          width="50"
          height="50"
          class="mt-2"
        />
      </template>

      <template v-slot:[`item.categoryId`]="{ item }">
        {{ listCategory[item.categoryId - 1].name }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn class="mr-2" icon :to="'/edit-device/' + item.id">
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-icon @click="deleteItem(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" color="success">
      Bạn đã xóa thành công

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  props: ["items", "headers"],
  data() {
    return {
      dialogDelete: false,
      search: "",
      listCategory: [],
      id: "",
      snackbar: false,
    };
  },
  created() {
    if (this.$route.query.deviceName) {
      this.search = this.$route.query.deviceName;
    } else {
      this.search = "";
    }
    this.getCategories();
  },
  computed: {},
  methods: {
    //delete product
    deleteItem(id) {
      this.dialogDelete = true;
      this.id = id;
      console.log(this.id);
    },

    // form comfirm delete product
    deleteItemConfirm() {
      if (this.id != "") {
        axios.delete(`http://localhost:3000/devices/${this.id}`);
        this.snackbar = true;
        this.items = this.items.filter((device) => device.id != this.id);
        this.closeDelete();
      }
    },
    closeDelete() {
      this.dialogDelete = false;
      this.id = "";
      // this.$router.back();
    },
    getCategories() {
      axios.get("http://localhost:3000/deviceCategories").then((res) => {
        this.listCategory = res.data;
      });
    },
    customSearch(value, search, item) {
      if (Array.isArray(value)) {
        return value.some((item) =>
          Object.values(item).some(
            (v) => v && v.toString().toLowerCase().includes(search)
          )
        );
      }
      return Object.values(item).some(
        (v) => v && v.toString().toLowerCase().includes(search)
      );
    },
  },
};
</script>
