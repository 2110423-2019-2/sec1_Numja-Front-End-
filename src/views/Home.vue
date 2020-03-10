<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<<<<<<< HEAD
<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld
  }
};
=======
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
>>>>>>> dev
</script>
