<template>
  <div>
    <v-card-title>
      <span class="text-h5">Them thiet bi</span>
    </v-card-title>
    <form-create-device />
  </div>
</template>

<script>
import FormCreateDevice from "./components/FormCreateDevice.vue";
export default {
  comments: {
    FormCreateDevice,
  },
};
</script>

<style>
</style>