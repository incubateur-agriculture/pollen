<script setup>
import { ref } from 'vue'
import columns from './columns'
import GristContainer from '@components/GristContainer.vue'
import BdcCard from '@components/BdcCard.vue'

const recordSelected = ref(null)
const allRecords = ref([])
const gristContainerRef = ref(null)

const onRecord = (record) => {
  recordSelected.value = record.id
}
const onRecords = (params) => {
  const { table } = params
  allRecords.value = grist.mapColumnNames(table) || table
}

const selectRecord = (recordId) => {
  gristContainerRef.value?.updateCursorPos(recordId)
}
</script>
<template>
  <GristContainer ref="gristContainerRef" :columns="columns" @update:record="onRecord" @update:records="onRecords">
    <section class="bdc-liste fr-m-2w">
      <ul v-if="allRecords.length > 0" class="bdc-liste__list unstyled-list fr-pl-0">
        <BdcCard 
          v-for="record in allRecords" 
          :key="record.id" 
          :record="record" 
          :is-selected="recordSelected === record.id" 
          @select="selectRecord" 
        />
      </ul>
      <p v-else class="fr-text--xs fr-mb-0">Aucun bon de commande</p>
    </section>
  </GristContainer>
</template>

<style lang="scss">
.bdc-liste {
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
  }
}
</style>