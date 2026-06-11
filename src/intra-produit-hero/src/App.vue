<script setup>
import { ref, computed } from 'vue'
import { formatMontant } from '@services/formatter'
import GristContainer from '@components/GristContainer.vue'
import columns from './columns'

const currentRecord = ref({})
const allRecords = ref([])
const selectedRecordId = ref(null)
const gristContainerRef = ref(null)

// Grist events
const onRecord = (record) => {
  currentRecord.value = grist.mapColumnNames(record) || record
  selectedRecordId.value = record.id
}

const onRecords = (params) => {
  const { table } = params
  allRecords.value = grist.mapColumnNames(table) || table
}

// Sélecteur
const options = computed(() =>
  allRecords.value.map((record) => ({
    value: record.id,
    text: record.nom,
  }))
)

const onSelectChange = (recordId) => {
  const rowId = Number(recordId)
  selectedRecordId.value = rowId
  gristContainerRef.value?.updateCursorPos(rowId)
}

// Montants
const montantAE = computed(() => formatMontant(currentRecord.value.montantAE))
const montantCP = computed(() => formatMontant(currentRecord.value.montantCP))
const comiteMontantValide = computed(() => formatMontant(currentRecord.value.comiteMontantValide))
</script>

<template>
  <GristContainer ref="gristContainerRef" :columns="columns" @update:record="onRecord" @update:records="onRecords">
    <DsfrHeader
      class="produit-hero__header"
      logo-text="maasa"
      service-title="Pollen"
      service-description="L'outil pour suivre et plannifier le budget de son produit"
      :quickLinks="[{label:'', to: ''}]"
    >
      <template #before-quick-links>
        <div class="produit-hero__selecteur">
          <DsfrSelect
            label="Produit affiché :"
            :hideLabel="true"
            defaultUnselectedText="Sélectionner un produit"
            :model-value="selectedRecordId"
            :options="options"
            @update:model-value="onSelectChange"
          />
        </div>
      </template>
    </DsfrHeader>
    <main class="produit-hero fr-mx-2w fr-mt-4w">
      <div class="fr-grid-row">
        <div class="fr-col-3 fr-pl-2w">
          <h1 class="fr-mb-1w">{{ currentRecord.nom }}</h1>
          <DsfrTag
            :label="`Créé le ${currentRecord.dateCreation || ''}`"
            icon="fr-icon-calendar-line"
          />
        </div>

        <div class="fr-col-5">
          <DsfrHighlight>
            <p>
              Montant total des bons de commandes (AE) :
              <strong>{{ montantAE }} €</strong>
            </p>
            <p>
              Montant total des services faits (CP) :
              <strong>{{ montantCP }} €</strong>
            </p>
          </DsfrHighlight>
        </div>

        <div class="fr-col-4">
          <DsfrHighlight>
            <p>
              Montant validé lors du dernier comité :
              <strong>{{ comiteMontantValide }} €</strong>
            </p>
            <p v-if="currentRecord.comiteLien != 'CENSORED'" class="fr-text--xs">
              <a v-if="currentRecord.comiteLien"  :href="currentRecord.comiteLien" target="_blank">
                Voir le relevé de décisions des comités
              </a>
              <span v-else class="fr-text--xs is-disabled">Aucun relevé de décisions des comités</span>
            </p>
          </DsfrHighlight>
        </div>
      </div>
    </main>
  </GristContainer>
</template>

<style lang="scss">
.produit-hero {
  .fr-tag {
    background-color: var(--border-default-blue-france);
    color: white;
  }
  
  .fr-highlight {
    height: 100%;
    align-content: center;
  }

  .fr-highlight p {
    margin-bottom: 0;
  }

  &__header {
    .fr-container {
      max-width: none !important;
    }
  }
}
</style>
