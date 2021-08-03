<template>
  <div>
    <h1>Welcome to the Dashboard</h1>
    <p>{{ data }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard",
  data() {
    return {
      data: undefined
    }
  },
  created() {
    axios
      .get(window.location.origin + "/api/dashboard")
      .then(res => this.data = res.data)
      .catch((error) => {
        if (error.response.status === 401) {
          window.location.href = window.location.origin + "/api/auth/discord";
        }
      });
  },
};
</script>