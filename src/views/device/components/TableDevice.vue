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
    <v-data-table :headers="headers" :items="items" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Quản lý thiết bị</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn color="primary" dark class="mb-2" :to="'/create-device'">
            New Item
            <v-icon>mdi-plus</v-icon>
          </v-btn>
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn class="mr-2" icon :to="'/edit-device/' + item.id">
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-icon @click="deleteItem()"> mdi-delete </v-icon>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Bạn có chắc muốn xóa thiết bị ?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete()"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click="deleteItemConfirm(item.id)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
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
    };
  },
  created() {},
  computed: {},
  methods: {
    //delete product
    deleteItem() {
      this.dialogDelete = true;
    },

    // form comfirm delete product
    deleteItemConfirm(id) {
      axios.delete(`http://localhost:3000/devices/${id}`).then(() => {
        console.log("da xoa: " + id);
      });
      this.closeDelete();
      this.items = this.items.filter((device) => device.id != id);
    },
    closeDelete() {
      this.dialogDelete = false;
      // this.$router.back();
    },
  },
};
</script>
