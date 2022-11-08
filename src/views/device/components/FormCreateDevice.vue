<template>
  <v-card class="ml-3">
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="6" sm="6" md="6">
            <!-- <v-text-field
              v-model="editedItem.deviceImage"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon="mdi-camera"
              @change="selectImage"
              @click:clear="clearImagePreview()"
              label="Ảnh thiết bị"
              placeholder="Pick an image"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-img
              :src="editedItem.deviceImage ? imagePreview : null"
              height="auto"
              width="7%"
            ></v-img> -->
            <v-text-field
              v-model="editedItem.deviceImage"
              prepend-icon="mdi-camera"
              label="Ảnh thiết bị (Only accept link https)"
              placeholder="Pick an image"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-img
              :src="editedItem.deviceImage ? editedItem.deviceImage : null"
              height="auto"
              width="10%"
            ></v-img>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="editedItem.deviceID"
              label="Mã thiết bị"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="12" md="6">
            <v-text-field
              v-model="editedItem.deviceName"
              label="Tên thiết bị"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-select
              v-model="editedItem.categoryId"
              label="Loại thiết bị"
              :items="listCategory"
              :item-text="'name'"
              :item-value="'id'"
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="datepick"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="editedItem.createdAt"
                  label="Ngày nhập"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="editedItem.createdAt"
                @input="datepick = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedItem.providerID"
              label="Mã nhà cung cấp"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedItem.provider"
              label="Tên nhà cung cấp"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close"> Reset </v-btn>
      <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import Storage from "@/utils/storage";
export default {
  props: ["editedItem", "listCategory"],
  data() {
    return {
      defaultItem: {
        id: this.$route.params.id,
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
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10),
      menu: false,
      modal: false,
      datepick: false,
      imagePreview: "",
    };
  },

  created() {
    axios.get("http://localhost:3000/devices").then((res) => {
      this.editedItem.id =
        parseInt(res.data.sort((a, b) => a.id - b.id)[res.data.length - 1].id) +
        1;
      console.log(this.editedItem.id);
    });
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // upload image to form
    async selectImage(e) {
      const file = e;
      if (!file) return;
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(f);
        });
      const data = await readData(file);
      this.imagePreview = data;
      this.editedItem.deviceImage = this.imagePreview;
      console.log(file.name);
    },
    async clearImagePreview() {
      this.editedIndex.deviceImage = null;
    },

    close() {
      this.editedItem.deviceID = "";
      this.editedItem.deviceImage = null;
      this.editedItem.deviceName = "";
      this.editedItem.createdAt = new Date(Date.now())
        .toISOString()
        .slice(0, 10);
      this.editedItem.providerID = "";
      this.editedItem.provider = "";
      this.editedItem.categoryId = "";
    },
    save() {
      this.editedItem.createdAt = this.formatDate(this.editedItem.createdAt);
      axios
        .post("http://localhost:3000/devices", this.editedItem)
        .then((res) => {
          if (res.data.id != 0) {
            this.$router.push("/");
            console.log(this.editedItem);
          }
        });

      //Storage.store("devices", this.items);
      this.close();
    },
  },
};
</script>

<style></style>
