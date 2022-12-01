<template>
  <q-chip color="light-green-14" text-color="white" icon="directions">
    Categoría: {{ category.name }}
  </q-chip>
</template>

<script>
  export default {
    name: 'PostCategory',
    props: {
      category: {
        type: Object,
        required: true
      }
    }
  }
</script>

