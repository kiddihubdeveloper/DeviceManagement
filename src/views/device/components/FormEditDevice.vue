<template>
  <v-card class="ml-3">
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
                :src="editedItem.deviceImage ? editedItem.deviceImage : null"
                height="auto"
                width="10%"
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
                :src="editedItem.deviceImage ? imagePreview : null"
                height="auto"
                width="7%"
              ></v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="editedItem.id"
                label="ID"
                disabled
              ></v-text-field>
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
                :rules="[(v) => !!v || ' Vui lòng điền tên thiết bị']"
                label="Tên thiết bị"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-select
                v-model="editedItem.categoryId"
                label="Loại thiết bị"
                :rules="[(v) => !!v || ' Vui lòng điền loại thiết bị']"
                :items="listCategory"
                :item-text="'name'"
                :item-value="'id'"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                hint="DD/MM/YYYY format"
                persistent-hint
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="editedItem.createdAt"
                    label="Ngày nhập"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItem.createdAt"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.providerID"
                :rules="[(v) => !!v || ' Vui lòng điền mã nhà cung cấp']"
                label="Mã nhà cung cấp"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.provider"
                :rules="[(v) => !!v || ' Vui lòng điền tên nhà cung cấp']"
                label="Tên nhà cung cấp"
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
  data() {
    return {
      id: this.$route.params.id,
      editedItem: {
        deviceID: "",
        deviceCode: "",
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
      date: new Date(),
      menu: false,
      modal: false,
      datepick: false,
      snackbar: false,
      imagePreview: "",
    };
  },
  mounted() {},
  created() {
    // if (this.$route.query.path) this.search == this.$route.query.productName;
    this.getCategories();
    if (this.id) {
      axios.get(`http://localhost:3000/devices/${this.id}`).then((res) => {
        this.editedItem = res.data;
        this.editedItem.createdAt = this.parseDate(res.data.createdAt);
      });
    }
  },
  methods: {
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
        axios
          .put(`http://localhost:3000/devices/${this.id}`, this.editedItem)
          .then((res) => {
            if (res.data.id != 0) {
              DeviceEventBus.$emit("editSuccess", res.data.id);
              this.$router.push("/");
              console.log(this.editedItem);
            }
          });

        //Storage.store("devices", this.items);
        this.close();
      }
    },
    getCategories() {
      axios.get("http://localhost:3000/deviceCategories").then((res) => {
        this.listCategory = res.data;
        console.log(this.listCategory);
      });
    },
    // change format '- - -' to '/ / /'
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    //change format '/ / /' to '- - -'
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>

<style></style>
Footer
