<template>
  <div v-if="tags.length">
    <q-chip icon-right="tag" color="deep-orange" class="text-white" v-for="tag in tags" :key="tag.id">
      {{ tag.name }}
    </q-chip>
  </div>
</template>

<script>
  export default {
    name: 'PostTags',
    props: {
      tags: {
        type: Array,
        required: true
      }
    }
  }
</script>
