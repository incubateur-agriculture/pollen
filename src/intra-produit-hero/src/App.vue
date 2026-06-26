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
const montantRestantAE = computed(() => formatMontant(currentRecord.value.montantRestantAE))
const montantRestantCP = computed(() => formatMontant(currentRecord.value.montantRestantCP))
const montantBudgetDisponible = computed(() => formatMontant(currentRecord.value.montantBudgetDisponible))
</script>

<template>
  <GristContainer ref="gristContainerRef" :columns="columns" @update:record="onRecord" @update:records="onRecords">
    <DsfrHeader
      class="produit-hero__header"
      :logo-text="['République', 'Française']"
      service-title="Pollen"
      service-description="L'outil pour suivre et plannifier le budget de son produit La Ruche numérique"
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
        <div class="fr-col-12 fr-col-md-7 fr-pl-2w">
          <h1 class="fr-mb-1w">{{ currentRecord.nom }}</h1>
          <div class="produit-hero__infos">
            <p class="fr-text--sm fr-mb-0">
              <span class="produit-hero__small-icon fr-text--xs fr-icon-calendar-line"></span>
              Existe depuis le {{ currentRecord.dateCreation || '(non renseigné)'}}
            </p>
            <p class="fr-text--sm fr-mb-0">
              <span class="produit-hero__small-icon fr-icon-team-line"></span>
              Dernier comité le {{ currentRecord.comiteDate || '(non renseigné)' }}
            </p>
            <p v-if="currentRecord.comiteLien" class="fr-text--sm fr-mb-0">
              <span class="produit-hero__small-icon fr-icon-file-text-line"></span>
              Accéder 
              <a :href="currentRecord.comiteLien" target="_blank">au relevé de décisions des comités</a>
            </p>
          </div>
        </div>

        <div class="produit-hero__container-cards fr-col-12 fr-col-md-5">
          <div>
            <div class="fr-card fr-p-2w">
              <p class="fr-text--xs fr-mb-1v">Montant restant à engager</p>
              <p class="fr-h6 fr-mb-0">{{ montantRestantAE }} €</p>
            </div>
          </div>
          <div>
            <div class="fr-card fr-p-2w">
              <p class="fr-text--xs fr-mb-1v">Montant restant à consommer</p>
              <p class="fr-h6 fr-mb-0">{{ montantRestantCP }} €</p>
            </div>
          </div>
          <div>
            <div class="fr-card fr-p-2w">
              <p class="fr-text--xs fr-mb-1v">Budget disponible</p>
              <p class="fr-h6 fr-mb-0">{{ montantBudgetDisponible }} €</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </GristContainer>
</template>

<style lang="scss">
.produit-hero {

  &__header {
    .fr-container {
      max-width: none !important;
    }
  }

  &__small-icon:before {
    transform: scale(0.8);
  }

  &__infos {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.5rem;
  }

  &__container-cards {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
