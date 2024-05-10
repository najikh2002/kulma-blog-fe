<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-clone"></i> MENUS
          </h3>
          <div class="card-tools">
            <button
              type="button"
              class="btn btn-tool"
              data-card-widget="collapse"
              title="Collapse"
            >
              <i class="fas fa-minus"></i>
            </button>
            <button
              type="button"
              class="btn btn-tool"
              data-card-widget="remove"
              title="Remove"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <nuxt-link
                  :to="{ name: 'admin-menu-create' }"
                  class="btn btn-info btn-sm"
                  style="padding-top: 8px"
                >
                  <i class="fa fa-plus-circle"></i> TAMBAH
                </nuxt-link>
              </div>
              <input
                type="text"
                class="form-control"
                v-model="search"
                @keypress.enter="searchData"
                placeholder="cari berdasarkan name menu"
              />
              <div class="input-group-append">
                <button @click="searchData" class="btn btn-info">
                  <i class="fa fa-search"></i> CARI
                </button>
              </div>
            </div>
          </div>

          <!-- table -->
          <b-table
            striped
            bordered
            hover
            :items="menus"
            :fields="fields"
            show-empty
          >
            <template v-slot:cell(actions)="row">
              <b-button
                variant="warning"
                size="sm"
                :to="{
                  name: 'admin-menu-edit-id',
                  params: {
                    id: row.item.id,
                  },
                }"
                >EDIT</b-button
              >
              <b-button
                variant="danger"
                size="sm"
                @click="deleteMenu(row.item.id)"
                >DELETE</b-button
              >
            </template>
          </b-table>

          <!-- pagination -->
          <b-pagination
            v-model="pagination.current_page"
            :total-rows="pagination.total"
            :per-page="pagination.per_page"
            @change="changePage"
            align="right"
            class="mt-3"
          ></b-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: "admin",
  head() {
    return {
      title:
        "Menus - PejuangPemrogaman.com - Belajar Koding Lengkap Bahasa Indonesia",
    };
  },
  data() {
    return {
      fields: [
        {
          label: "Nama Menu",
          key: "name",
        },
        {
          label: "URL",
          key: "url",
        },
        {
          label: "Actions",
          key: "actions",
          tdClass: "text-center",
        },
      ],

      search: "",
    };
  },

  watchQuery: ["q", "page"],

  async asyncData({ $axios, query }) {
    let page = query.page ? parseInt(query.page) : "";

    let search = query.q ? query.q : "";

    const menus = await $axios.$get(
      `/api/admin/menus?q=${search}&page=${page}`
    );

    return {
      menus: menus.data.data,
      pagination: menus.data,
    };
  },

  methods: {
    changePage(page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.$route.query.q,
          page: page,
        },
      });
    },

    searchData() {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
        },
      });
    },

    deleteMenu(id) {
      this.$swal
        .fire({
          title: "APAKAH ANDA YAKIN ?",
          text: "INGIN MENGHAPUS DATA INI !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "YA, HAPUS!",
          cancelButtonText: "TIDAK",
        })
        .then((response) => {
          if (response.isConfirmed) {
            this.$axios.delete(`/api/admin/menus/${id}`).then(() => {
              this.$nuxt.refresh();

              this.$swal.fire({
                title: "BERHASIL!",
                text: "Data Berhasil Dihapus!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
            });
          }
        });
    },
  },
};
</script>

<style></style>
