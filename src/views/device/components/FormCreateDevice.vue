<template>
  <v-card class="mx-3">
    <v-card-text>
      <v-container>
        <v-form ref="form" lazy-validation>
          <v-row>
            <!-- <v-col cols="6" sm="6" md="6">
              <v-file-input
                v-model="editedItem.deviceImage"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-camera"
                @change="selectImage"
                @click:clear="clearImagePreview()"
                label="Ảnh thiết bị"
                placeholder="Pick an image"
              ></v-file-input>
            </v-col>
            <v-col cols="6" sm="6" md="6">
              <v-img
                :src="editedItem.deviceImage ? imagePreview : null"
                height="auto"
                width="7%"
              ></v-img>
            </v-col> -->

            <v-col cols="6" sm="6" md="6">
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
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                v-model="editedItem.deviceCode"
                label="Mã thiết bị"
                :rules="[(v) => !!v || ' Vui lòng điền mã thiết bị']"
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="12" md="6">
              <v-text-field
                v-model="editedItem.deviceName"
                label="Tên thiết bị"
                :rules="[(v) => !!v || ' Vui lòng điền tên thiết bị']"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-select
                v-model="editedItem.categoryId"
                label="Loại thiết bị"
                :items="listCategory"
                :item-text="'name'"
                :item-value="'id'"
                :rules="[(v) => !!v || ' Vui lòng điền loại thiết bị']"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
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
                :rules="[(v) => !!v || ' Vui lòng điền mã nhà cung cấp']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.provider"
                label="Tên nhà cung cấp"
                :rules="[(v) => !!v || ' Vui lòng điền tên nhà cung cấp']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close"> Reset </v-btn>
      <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
      <v-snackbar v-model="snackbar">
        Vui lòng điền đầy đủ trường bắt buộc
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import DeviceEventBus from "../js/DeviceEventBus.js";
export default {
  props: ["editedItem", "listCategory"],
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10),
      menu: false,
      modal: false,
      datepick: false,
      snackbar: false,
      // imagePreview: "",
    };
  },

  created() {
    // default id for device
    axios.get("http://localhost:3000/devices").then((res) => {
      this.editedItem.id =
        parseInt(res.data.sort((a, b) => a.id - b.id)[res.data.length - 1].id) +
        1;
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
      this.$refs.form.validate();
      if (
        this.editedItem.deviceCode == "" ||
        this.editedItem.deviceName == "" ||
        this.editedItem.providerID == "" ||
        this.editedItem.provider == "" ||
        this.editedItem.categoryId == ""
      ) {
        this.snackbar = true;
      } else {
        this.editedItem.createdAt = this.formatDate(this.editedItem.createdAt);
        console.log(this.editedItem.categoryId);
        this.listCategory[this.editedItem.categoryId - 1].amountDevice =
          this.listCategory[this.editedItem.categoryId - 1].amountDevice + 1;
        axios.all([
          axios
            .post("http://localhost:3000/devices", this.editedItem)
            .then((res) => {
              if (res.data.id != 0) {
                DeviceEventBus.$emit("createSuccess", res.data.id);
                this.$router.push("/");
              }
            }),
          axios.put(
            `http://localhost:3000/deviceCategories/${this.editedItem.categoryId}`,
            this.listCategory[this.editedItem.categoryId - 1]
          ),
        ]);

        this.close();
      }
    },
  },
};
</script>

<style></style>
