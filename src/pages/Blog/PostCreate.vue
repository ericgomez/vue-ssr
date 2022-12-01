<template>
  <q-page class="flex flex-center" style="background: radial-gradient(circle, #607d8b 0%, #1d1d1d 100%)">
    <q-card inline style="width: 800px; background: radial-gradient(circle, #e0f7fa 0%, #e0f7fa 100%)">
      <q-card-section>
        <q-input
          v-model="post.title"
          label="Título"
          @blur="$v.post.title.$touch"
          :error="$v.post.title.$error"
        />

        <q-select
          option-label="name"
          option-value="id"
          v-model="post.category"
          :options="categories"
          label="Selecciona una categoría"
          :error="$v.post.category.$error"
        />

        <q-input
          type="textarea"
          label="Post"
          v-model="post.body"
          @blur="$v.post.body.$touch"
          :error="$v.post.body.$error"
        />

        <q-select
          option-label="name"
          option-value="id"
          v-model="post.tags"
          :options="tags"
          multiple
          use-chips
          label="Selecciona los tags que desees"
          :error="$v.post.tags.$error"
        />
      </q-card-section>

      <q-card-actions>
        <q-btn
          class="full-width"
          color="black"
          icon-right="send"
          label="Crear un nuevo post"
          @click.native="submit"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import { mapActions, mapState } from "vuex";
import { protect } from "../../utils/auth";

export default {
  name: 'PostCreate',
  preFetch ({store, redirect}) {
    console.log('CREATE POST PAGE');
    // en preFetch perdemos el contexto de this
    protect(redirect, !store.state.auth.logged, '/login');
    return store.dispatch("blog/fetchTagsAndCategories");
  },
  meta: {
    title: 'Crear nuevo post'
  },
  data () {
    return {
      post: {
        title: '',
        body: '',
        category: null,
        tags: []
      }
    }
  },
  computed: {
    ...mapState("blog", ["categories", "tags"])
  },
  validations: {
    post: {
      title: { required, minLength: minLength(2) },
      body: { required, minLength: minLength(10) },
      category: { required },
      tags: {}
    }
  },
  methods: {
    ...mapActions('blog', ['createPost']),
    submit () {
      this.$v.post.$touch();
      if (this.$v.post.$error) {
        this.$q.notify({
          message: 'Error validando el post',
          position: 'top',
          type: 'negative'
        });
        return;
      }

      this.$q.loading.show();
      let tags = this.post.tags.map(({ id }) => id);
      const post = {
        title: this.post.title,
        body: this.post.body,
        category_id: this.post.category.id
      };

      this.createPost({ post, tags }).then(res => {
        if (res.res === 'ok') {
          this.$q.notify({
            message: res.message,
            position: 'bottom',
            type: 'positive'
          });
          this.$router.push("/blog/posts");
        }
      }).catch(err => {
        this.$q.notify({
          message: err.message,
          position: 'top',
          type: 'negative'
        })
      }).finally(() => {
        this.$q.loading.hide()
      })
    }
  }
}
</script>
