<template>
  <v-data-table
    :headers="headers"
    :items="teachers"
    class="elevation-1"
    item-key="name"
    :search="search"
    dense
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title> Verify Teacher </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
    </template>
    <template v-slot:item.verified="{ item }">
      <v-chip
        v-if="item.verified"
        class="ma-2"
        color="primary"
        dark
        outlined
        pill
      >
        Verified
        <v-icon right>mdi-account-outline</v-icon>
      </v-chip>
      <v-chip
        v-if="!item.verified"
        class="ma-2"
        color="error accent-4"
        outlined
        pill
      >
        Unverified
        <v-icon right>mdi-account-outline</v-icon>
      </v-chip>
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn
        v-if="!item.verified"
        color="primary"
        small
        dark
        @click="verifyTeacher(item)"
        >Verify</v-btn
      >
      <v-btn v-else color="secondary" small @click="unverifyTeacher(item)"
        >Unverify</v-btn
      >
      <v-btn
        small
        :loading="loading5"
        :disabled="loading5"
        color="blue-grey"
        class="ma-2 white--text"
        fab
        @click="download(item)"
      >
        <v-icon dark>mdi-cloud-download</v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data> </template>
  </v-data-table>
</template>

<script>
import Vue from "vue";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTY2ZDk0YWFhM2ZjODAwM2U4NjljMTYiLCJpYXQiOjE1ODM5NDg4MTB9.CM7rXY9IzbZ7GuzGExTvAloq2LcBV_sWviskfZeB1nA";
export default {
  data: () => ({
    search: "",
    loading: false,
    headers: [
      {
        text: "Status",
        value: "verified",
        align: "center",
        class: "success--text title"
      },
      { text: "Username", value: "username" },
      { text: "Firstname", value: "firstName" },
      { text: "Surname", value: "lastName" },
      { text: "TimeStampSent", value: "evidenceSentDate" },
      { text: "Link", value: "evidenceInfo", align: "center" },
      { text: "Actions", value: "action", align: "center", sortable: false }
    ],
    teachers: [],
    editedIndex: -1,
    editedItem: undefined
  }),
  created() {
    //this.initialize();
  },
  computed: {
    isloading: () => {
      return this.teachers.length === 0 || this.loading;
    }
  },
  methods: {
    async verifyTeacher(item) {
      this.loading = true;
      try {
        const response = await Vue.axios.post(`admin/verifyTutor/${item._id}`);
        if (response.data.verified) {
          item.verified = true;
          this.pushNotification("success", "Verify Succeeded");
          this.save(item);
        }
      } catch {
        this.pushNotification("error", "Verify Error");
      }
      this.loading = false;
    },
    async unverifyTeacher(item) {
      try {
        this.loading = true;
        const response = await Vue.axios.post(
          `admin/unverifyTutor/${item._id}`
        );
        if (!response.data.verified) {
          item.verified = false;
          this.pushNotification("success", "Unverify Succeeded");
          this.save(item);
        }
      } catch {
        this.pushNotification("error", "Unverify Error");
      }
      this.loading = false;
    },
    save(item) {
      this.editedIndex = this.teachers.indexOf(item);
      if (this.editedIndex > -1) {
        Object.assign(this.teachers[this.editedIndex], item);
      }
    },
    pushNotification(color, messages) {
      this.pushNewNotification({ color: color, message: messages });
      this.dismissAndClearInput();
    },
    download(item) {
      // TODO: ...
    }
  },
  async mounted() {
    this.loading = true;
    Vue.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await Vue.axios.get("/admin/allTutor");
    this.teachers = response.data;
    this.loading = false;
  }
};
</script>
<style scoped lang="scss">
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
