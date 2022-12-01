<template>
  <q-page padding>
    <post-item :post="post" :detail="true" />
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import PostItem from '../../components/Post/PostItem';
import { protect } from '../../utils/auth';

export default {
  name: 'Post',
  preFetch ({ store, currentRoute, redirect }) {
    console.log('POST PAGE');
    // en preFetch perdemos el contexto de this
    protect(redirect, !store.state.auth.logged, '/login');
    return store.dispatch('blog/fetchPost', currentRoute.params.id, { root: true });
  },
  components: {
    PostItem
  },
  meta: {
    title: 'Detalle del post'
  },
  computed: {
    ...mapState('blog', ['post'])
  },
}
</script>
