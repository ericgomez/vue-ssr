<template>
  <div class="col-4">
    <q-card flat bordered class="bg-grey-1">
      <img :alt="post.title" src="https://fakeimg.pl/200x100/?text=Post" />
      <q-card-section>
        <post-category class="q-mb-md" :category="post.category" />
      </q-card-section>

      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ post.title }}</div>
            <div class="text-subtitle2">{{ post.owner.name }}</div>
          </div>

          <div class="col-auto" v-if="!detail">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section
                      @click="$router.push({name: 'PostDetail', params: {id: post.id}})"
                    >
                      Detalle
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section @click="$root.$emit('deletePost', post)">Eliminar</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        {{ post.body }}
      </q-card-section>

      <q-separator v-if="post.tags.length" />

      <q-card-section v-if="post.tags.length">
        <post-tags :tags="post.tags" />
      </q-card-section>

    </q-card>
  </div>
</template>

<script>
  import PostTags from './PostTags';
  import PostCategory from './PostCategory';
  export default {
    name: 'PostItem',
    components: {
      PostTags, PostCategory
    },
    props: {
      post: {
        type: Object,
        required: true
      },
      detail: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

