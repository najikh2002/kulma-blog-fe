<template>
  <b-container class="mt-5 mb-5">
    <b-row>
      <b-col md="5" class="mb-3" sm="12" v-for="post in posts" :key="post.id">
        <b-card
          :img-src="post.image"
          img-alt="Post Image"
          img-top
          tag="article"
          class="mb-2 h-100 rounded-lg"
        >
          <div class="mb-2">
            <small class="text-muted"
              ><i class="fa fa-calendar"></i> {{ post.created_at }}</small
            >
          </div>
          <h5>
            <nuxt-link
              :to="{ name: 'post-slug', params: { slug: post.slug } }"
              >{{ post.title }}</nuxt-link
            >
          </h5>
          <b-card-text> {{ post.description.substr(0, 55) }}... </b-card-text>
          <b-card-text>
            <small class="text-muted"
              ><i class="fa fa-comments"></i> {{ post.comments.length }}</small
            >
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-2 justify-content-center">
      <b-pagination
        v-model="pagination.current_page"
        :total-rows="pagination.total"
        :per-page="pagination.per_page"
        @change="changePage"
        aria-controls="my-table"
      ></b-pagination>
    </b-row>
  </b-container>
</template>

<script>
export default {
  head() {
    return {
      title:
        "Posts - PejuangPemrogaman.com - Belajar Koding Lengkap Bahasa Indonesia",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Daftar konten terbaru blog PejuangPemrogaman.com",
        },
        {
          hid: "og:title",
          name: "og:title",
          content:
            "PejuangPemrogaman.com - Belajar Koding Bahasa Indonesia Terlengkap",
        },
        {
          hid: "og:site_name",
          name: "og:site_name",
          content:
            "PejuangPemrogaman.com - Belajar Koding Bahasa Indonesia Terlengkap",
        },
        {
          hid: "og:image",
          name: "og:image",
          content:
            "https://cdn.jsdelivr.net/gh/maulayyacyber/assets-images-ebooks/cms-nuxt-laravel-11/xKOCz0P.png",
        },
      ],
    };
  },
  watchQuery: ["page"],

  async asyncData({ $axios, query }) {
    let page = query.page ? parseInt(query.page) : "";

    const posts = await $axios.$get(`/api/web/posts?page=${page}`);

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
          page: page,
        },
      });
    },
  },
};
</script>

<style></style>
