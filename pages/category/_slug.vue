<template>
  <b-container class="mt-5 mb-5">
    <b-row>
      <b-col md="12" class="mb-13">
        <h4>
          KATEGORI : <strong>{{ category.name.toUpperCase() }}</strong>
        </h4>
      </b-col>
      <b-col md="4" class="mb-3" sm="12" v-for="post in posts" :key="post.id">
        <b-card
          :img-src="post.image"
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
            <small class="muted-text"
              ><i class="fa fa-comments"></i>
              {{ post.comments.length }} Komentar</small
            >
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  head() {
    return {
      title:
        this.category.name +
        " - PejuangPemrogaman.com - Belajar Koding Lengkap Bahasa Indonesia",
      meta: [
        {
          hid: "og:title",
          name: "og:title",
          content: this.category.name,
        },
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: this.category.name,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.category.image,
        },
      ],
    };
  },

  async asyncData({ params, $axios }) {
    const category = await $axios.$get(`/api/web/categories/${params.slug}`);

    return {
      category: category.data,
      posts: category.data.posts,
    };
  },
};
</script>

<style></style>
