<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-amber-8">
      <q-toolbar>
        <q-toolbar-title>
          {{ $route.meta.title }}
        </q-toolbar-title>

        <q-btn round flat icon="account_box" @click="$router.push('/blog/profile')" />
        <q-btn round class="q-ml-sm" flat icon="fab fa-blogger" @click="$router.push('/blog/posts')" />
        <q-btn round class="q-ml-sm" flat icon="arrow_right_alt" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  export default {
    name: 'LoggedLayout',
    methods: {
      logout () {
        // execute action with dispatch
        this.$store.dispatch('auth/logout').then(res => {
          // execute mutation with commit
          this.$store.commit('auth/setUser',
            { user: {id: null, email: null, name: null}, logged: false },
            { root: true }
          );

          // notify is plugin of quasar to messages
          this.$q.notify({
            message: res.data.message,
            position: 'bottom',
            color: 'orange'
          });

          this.$router.push({ name: 'Login' });
        });
      }
    }
  }
</script>
