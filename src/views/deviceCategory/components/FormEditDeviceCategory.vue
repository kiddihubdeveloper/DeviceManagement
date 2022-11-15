<template>
  <v-card class="mx-3">
    <v-card-text>
      <v-container>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                v-model="itemCategory.id"
                label="ID loại thiết bị"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="12" md="6">
              <v-text-field
                v-model="itemCategory.name"
                label="Tên loại thiết bị"
                :rules="[(v) => !!v || ' Vui lòng điền tên loại thiết bị']"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                v-model="itemCategory.deviceCode"
                label="Mã loại thiết bị"
                :rules="[(v) => !!v || ' Vui lòng điền mã loại thiết bị']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                v-model="itemCategory.amountDevice"
                label="Số lượng thiết bị trong kho"
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="reset"> Reset </v-btn>
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
import DeviceCategoryEventBus from "../js/DeviceCategoryEventBus.js";
export default {
  data() {
    return {
      id: this.$route.params.id,
      itemCategory: {
        id: "",
        name: "",
        amountDevice: 0,
        deviceCode: "",
      },
      listCategory: [],
      snackbar: false,
    };
  },
  mounted() {},
  created() {
    // get param of device
    if (this.id) {
      axios
        .get(`http://localhost:3000/deviceCategories/${this.id}`)
        .then((res) => {
          this.itemCategory = res.data;
        });
    }
  },
  methods: {
    //click button reset
    reset() {
      this.itemCategory.deviceCode = "";
      this.itemCategory.name = "";
    },

    //click button save
    save() {
      // check validate
      this.$refs.form.validate();
      if (this.itemCategory.deviceCode == "" || this.itemCategory.name == "") {
        this.snackbar = true;
      } else {
        axios
          .put(
            `http://localhost:3000/deviceCategories/${this.id}`,
            this.itemCategory
          )
          .then((res) => {
            if (res.data.id != 0) {
              DeviceCategoryEventBus.$emit("editSuccess", res.data.id);
              this.$router.push("/device-category");
            }
          });
        this.reset();
      }
    },
  },
};
</script>

<style></style>
Footer
