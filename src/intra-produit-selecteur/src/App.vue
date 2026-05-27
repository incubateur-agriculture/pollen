<script setup>
import columns from './columns'
import GristContainer from '@components/GristContainer.vue'
</script>

<template>
  <GristContainer :columns="columns">
    <h1 class="fr-h4">Sélecteur de produit</h1>
  </GristContainer>
</template>
