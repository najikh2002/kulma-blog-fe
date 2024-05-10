<template>
  <div>
    <!-- slider -->
    <Slider />

    <b-container class="mt-5 mb-5">
      <b-row>
        <b-col md="8" sm="12">
          <b-card
            no-body
            class="border-0 rounded-lg shadow-md mb-3"
            v-for="post in posts"
            :key="post.id"
          >
            <b-row class="g-0">
              <b-col md="4">
                <b-img
                  :src="post.image"
                  :alt="post.title"
                  class="w-100 img-post h-100 object-fit-cover"
                  rounded="left"
                ></b-img>
              </b-col>
              <b-col md="8">
                <b-card-body>
                  <h5>
                    <nuxt-link
                      :to="{ name: 'post-slug', params: { slug: post.slug } }"
                      >{{ post.title }}</nuxt-link
                    >
                  </h5>
                  <b-card-text>
                    {{ post.description.substr(0, 55) }}...</b-card-text
                  >
                  <b-card-text>
                    <small class="text-muted mr-3"
                      ><i class="fa fa-calendar"></i>
                      {{ post.created_at }}</small
                    >
                    <small class="text-muted"
                      ><i class="fa fa-comments"></i>
                      {{ post.comments.length }} Komentar</small
                    >
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
          <b-row class="mt-5">
            <b-col md="12" class="text-center">
              <nuxt-link
                :to="{ name: 'post' }"
                class="btn btn-md btn-primary rounded shadow-sm"
                >LIHAT LEBIH BANYAK
              </nuxt-link>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="4" sm="12">
          <b-card no-body class="border-0 rounded-lg shadow-md">
            <b-card-body>
              <h5>KATEGORI</h5>
              <hr />
              <b-card
                no-body
                class="border-0 shadow-sm card-category mb-2 rounded-lg"
                v-for="category in categories"
                :key="category.id"
              >
                <b-card-body class="p-2 fw-normal">
                  <b-img
                    :src="category.image"
                    :alt="category.name"
                    width="40"
                  ></b-img>
                  <nuxt-link
                    :to="{
                      name: 'category-slug',
                      params: { slug: category.slug },
                    }"
                    class="text-dark"
                  >
                    {{ category.name }}</nuxt-link
                  >
                </b-card-body>
              </b-card>
            </b-card-body>
          </b-card>

          <b-card no-body class="border-0 rounded-lg shadow-md">
            <b-card-body>
              <h5>TAGS</h5>
              <hr />
              <nuxt-link
                :to="{ name: 'tag-slug', params: { slug: tag.slug } }"
                class="btn btn-primary btn-sm mb-2 mr-2 shadow-sm"
                v-for="tag in tags"
                :key="tag.id"
                >{{ tag.name }}
              </nuxt-link>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Slider from "~/components/web/slider.vue";

export default {
  components: {
    Slider,
  },

  //meta
  head() {
    return {
      title:
        "KuliahMatematika.online - Belajar Matematika Bahasa Indonesia Terlengkap",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "KuliahMatematika.online - Belajar Matematika Bahasa Indonesia Terlengkap",
        },
        {
          hid: "og:title",
          name: "og:title",
          content:
            "KuliahMatematika.online - Belajar Matematika Bahasa Indonesia Terlengkap",
        },
        {
          hid: "og:site_name",
          name: "og:site_name",
          content:
            "KuliahMatematika.online - Belajar Matematika Bahasa Indonesia Terlengkap",
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

  async asyncData({ $axios }) {
    const posts = await $axios.$get("/api/web/post-homepage");
    const categories = await $axios.$get("/api/web/category-sidebar");
    const tags = await $axios.$get("/api/web/tags");

    return {
      posts: posts.data,
      categories: categories.data,
      tags: tags.data,
    };
  },
};
</script>

<style></style>
