<template>
  <v-card class="mx-5 my-4">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search By Device Name Or By Type of Device"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :custom-filter="filterDeviceName"
      show-select
      @input="enterSelect($event)"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Quản lý thiết bị</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn v-if="displayBtn" color="success" dark class="mb-2 mr-4">
            Borrow
            <v-icon>mdi-plus</v-icon>
          </v-btn>
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
        <div v-if="listCategory.length != 0">
          {{ listCategory[item.categoryId - 1].name }}
        </div>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <div v-if="item.status === '1'">
          <v-chip color="red"> Đã Mượn </v-chip>
        </div>
        <div v-else-if="item.status === '2'">
          <v-chip color="green" class="row-pointer"> Chưa Mượn </v-chip>
        </div>
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
  props: ["items", "headers", "listCategory"],
  data() {
    return {
      dialogDelete: false,
      search: "",
      displayBtn: false,
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
  },

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
    },

    // select row of table display button borrow
    enterSelect(values) {
      console.log(values);
      if (values == null || values.length == 0) {
        this.displayBtn = false;
      } else {
        this.displayBtn = true;
      }
    },

    // filter table by device Name
    filterDeviceName(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        (item.deviceName.toString().indexOf(search) !== -1 ||
          this.listCategory[item.categoryId - 1].name
            .toString()
            .indexOf(search) !== -1)
      );
    },
  },
};
</script>
<style scoped>
.row-pointer:hover {
  cursor: pointer;
}
</style>
