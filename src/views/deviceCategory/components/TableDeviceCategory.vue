<template>
  <v-card class="mx-5 my-4">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="itemCategories" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Quản lý loại thiết bị</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            dark
            class="mb-2"
            :to="'/create-device-category'"
          >
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
      <template v-slot:[`item.name`]="{ item }">
        {{ item.name }}
      </template>
      <template v-slot:[`item.amountDevice`]="{ item }">
        {{ item.amountDevice }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn class="mr-2" icon :to="'/edit-device-category/' + item.id">
          <v-icon color="green"> mdi-pencil </v-icon>
        </v-btn>
        <v-btn class="mr-2" icon :to="'/category?categoryId=' + item.id">
          <v-icon color="blue"> mdi-eye </v-icon>
        </v-btn>
        <v-icon @click="deleteItem(item.id)" color="red"> mdi-delete </v-icon>
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
  props: ["itemCategories", "headers"],
  data() {
    return {
      dialogDelete: false,
      search: "",

      id: "",
      snackbar: false,
    };
  },
  created() {},

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
        axios.delete(`http://localhost:3000/deviceCategories/${this.id}`);
        this.snackbar = true;
        this.itemCategories = this.itemCategories.filter(
          (device) => device.id != this.id
        );
        this.closeDelete();
      }
    },
    closeDelete() {
      this.dialogDelete = false;
      this.id = "";
    },

    // getAmountDevice(id) {
    //   axios.get(`http://localhost:3000/devices/${this.id}`).then((response) => {
    //     return response.data.filter((device) => device.categoryId == id).length;
    //   });
    // },
  },
};
</script>
<style scoped>
.row-pointer:hover {
  cursor: pointer;
}
</style>
