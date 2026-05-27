<script setup>
import { ref, computed } from 'vue'
import columns from './columns'
import GristContainer from '@components/GristContainer.vue'

const allRecords = ref([])
const selectedRecordId = ref(null)
const gristContainerRef = ref(null)

const onRecord = (record) => {
  selectedRecordId.value = record?.id ?? null
}

const onRecords = (params) => {
  const { table } = params
  allRecords.value = grist.mapColumnNames(table) || table
}

const options = computed(() =>
  allRecords.value.map((record) => ({
    value: record.id,
    text: record.name,
  }))
)

const onSelectChange = (recordId) => {
  const rowId = Number(recordId)
  if (!Number.isFinite(rowId)) return
  selectedRecordId.value = rowId
  gristContainerRef.value?.updateCursorPos(rowId)
}
</script>

<template>
  <GristContainer
    ref="gristContainerRef"
    :columns="columns"
    @update:record="onRecord"
    @update:records="onRecords"
  >
    <div class="produit-selecteur fr-m-2w">
      <DsfrSelect
        :model-value="selectedRecordId"
        label="Sélectionner le produit à afficher"
        :options="options"
        @update:model-value="onSelectChange"
      />
    </div>
  </GristContainer>
</template>
