<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-book-open"></i> POSTS
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
            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <nuxt-link
                  :to="{ name: 'admin-post-create' }"
                  class="btn btn-info btn-sm"
                  style="padding-top: 8px"
                  ><i class="fa fa-plus-circle"></i> TAMBAH</nuxt-link
                >
              </div>
              <input
                v-model="search"
                type="text"
                class="form-control"
                @keypress.enter="searchData"
                placeholder="cari berdasarkan judul post"
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
            stripped
            bordered
            hover
            :items="posts"
            :fields="fields"
            show-empty
          >
            <template v-slot:cell(comments)="row">
              <i class="fa fa-comments"></i> {{ row.item.comments.length }}
            </template>

            <template v-slot:cell(actions)="row">
              <b-button
                variant="warning"
                size="sm"
                :to="{
                  name: 'admin-post-edit-id',
                  params: { id: row.item.id },
                }"
                >EDIT</b-button
              >

              <b-button
                variant="danger"
                size="sm"
                @click="deletePost(row.item.id)"
                >DELETE</b-button
              >
            </template>
          </b-table>

          <b-pagination
            v-model="pagination.current_page"
            :total-rows="pagination.total"
            :per_page="pagination.per_page"
            @change="changePage"
            align="right"
            class="mt-3"
          >
          </b-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  // layout
  layout: "admin",

  // meta head
  head() {
    return {
      title:
        "Posts - PejuangPemrogaman.com - Belajar Koding Bahasa Indonesia Lengkap",
    };
  },

  data() {
    return {
      fields: [
        {
          label: "Judul Post",
          key: "title",
        },
        {
          label: "Category",
          key: "category.name",
        },
        {
          label: "Penulis",
          key: "user.name",
        },
        {
          label: "Komentar",
          key: "comments",
          tdClass: "text-center",
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

    const posts = await $axios.$get(
      `/api/admin/posts?q=${search}&page=${page}`
    );

    return {
      posts: posts.data.data,
      pagination: posts.data,
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

    deletePost(id) {
      this.$swal
        .fire({
          title: "APAKAH ANDA YAKIN ?",
          text: "INGIN MENGHAPUS DATA INI ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "YA, HAPUS!",
          cancelButtonText: "TIDAK",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$axios.delete(`/api/admin/posts/${id}`).then(() => {
              // refresh page
              this.$nuxt.refresh();

              // alert
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
