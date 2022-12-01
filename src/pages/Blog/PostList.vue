<template>
  <q-page padding>
    <div class="row q-col-gutter-x-xs q-col-gutter-y-lg" v-if="posts && posts.length">
      <post-item v-for="post in posts" :post="post" :key="post.id" />
    </div>
    <q-banner class="bg-red-14 text-white" v-else>
      Desafortunadamente no hay nada que mostrar ahora mismo
      <template v-slot:action>
        <q-btn @click="$router.push('/blog/create-post')" flat color="white" label="Crea el primer post" />
      </template>
    </q-banner>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import PostItem from '../../components/Post/PostItem';
import { protect } from "../../utils/auth";

export default {
  name: 'PostListPage',
  preFetch ({ store, redirect }) {
    console.log('BLOG PAGE');
    // en preFetch perdemos el contexto de this
    protect(redirect, !store.state.auth.logged, '/login');
    return store.dispatch('blog/fetchPosts', null, { root: true })
  },
  components: {
    PostItem
  },
  async mounted () {
    this.$root.$on("deletePost", async post => {
      await this.$store.dispatch("blog/deletePost", post.id)
    })
  },
  meta: {
    title: "Listado de posts"
  },
  computed: {
    ...mapState('blog', ['posts'])
  }
}
</script>
