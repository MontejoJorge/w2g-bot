<template>
  <div>
    <h1>Welcome to the Dashboard</h1>
    <p>{{ data }}</p>
    <div v-if="loading">Cargando</div>
    <table>
      <tr>
        <th></th>
        <th>Guild name</th>
      </tr>
      <tr v-for="guild in guilds" :key="guild.id">
        <td><img :src="guildIcon(guild.id, guild.icon)" /></td>
        <td>{{ guild.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { profileAvatar, guildIcon } from "../helpers/discord";
require("regenerator-runtime");

export default {
  name: "Dashboard",
  methods: {
    guildIcon
  },
  data() {
    return {
      loading: false,
      data: undefined,
      guilds: undefined,
    };
  },
  async created() {

      this.loading = true;
      
      axios
        .get(window.location.origin + "/api/dashboard")
        .then((res) => {
          this.guilds = res.data.guilds;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            window.location.href = window.location.origin + "/api/auth/discord";
          }
        })
        .finally(() => {
          console.log("finaly");
          this.loading = false
        });
  },
};
</script>