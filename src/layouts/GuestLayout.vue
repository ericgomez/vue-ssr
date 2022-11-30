<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-red-10">
      <q-toolbar>

        <q-toolbar-title>
          {{ $route.meta.title }}
        </q-toolbar-title>

        <q-btn round dense icon="subdirectory_arrow_right" @click="$router.push('/login')" />
        <q-btn round class="q-ml-sm" dense icon="account_box" @click="$router.push('/register')" />

      </q-toolbar>
    </q-header>

    <q-page-container>
    <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
  export default {
    name: 'GuestLayout'
  }
</script>
