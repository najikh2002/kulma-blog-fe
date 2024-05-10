<template>
  <div>
    <b-jumbotron class="p-3 rounded-0 mb-0">
      <b-container>
        <b-row class="mt-2">
          <b-col md="1" class="text-center">
            <b-img
              src="../../public/img/logo.png"
              rounded="circle"
              alt="logo image"
              width="70"
            ></b-img>
          </b-col>
          <b-col md="11">
            <h3 class="font-weight-bold">KULIAH MATEMATIKA</h3>
            <p>Belajar Matematika Lengkap Bahasa Indonesia.</p>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>

    <b-navbar class="bg-navbar" toggleable="lg" type="dark">
      <b-container>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-for="menu in menus" :key="menu.id" :to="menu.url">{{
              menu.name.toUpperCase()
            }}</b-nav-item>
          </b-navbar-nav>

          <!-- right aligned navbar -->
          <b-navbar-nav class="ml-auto">
            <b-form-input
              v-model="search"
              size="sm"
              class="mr-sm-2 border-0"
              aria-placeholder="tulis kata kunci..."
              @keypress.enter="searchData"
            ></b-form-input>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              variant="primary"
              @click="searchData"
              >CARI</b-button
            >
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
      search: "",
    };
  },
  async fetch() {
    await this.$axios.get("/api/web/menus").then((response) => {
      this.menus = response.data.data;
    });
  },

  methods: {
    searchData() {
      this.$router.push({
        name: "search",
        query: {
          q: this.search,
        },
      });
    },
  },
};
</script>

<style></style>
