<template></template>
<script>
import Storage from "@/utils/storage";

export default {
  name: 'LogoutPage',
  created() {
    Storage.remove('user');
    this.$router.push({name: 'Login'});
  }
}
</script>