<script setup>
import { ref, computed } from 'vue'
import { formatMontant } from '@services/formatter'
import GristContainer from '@components/GristContainer.vue'
import columns from './columns'

// Produit sélectionné
const currentRecord = ref({})
const onRecord = (record) => {
  currentRecord.value = grist.mapColumnNames(record) || record
}

// Montants
const montantAE = computed(() => formatMontant(currentRecord.value.montantAE))
const montantCP = computed(() => formatMontant(currentRecord.value.montantCP))
const comiteMontantValide = computed(() => formatMontant(currentRecord.value.comiteMontantValide))
</script>

<template>
  <GristContainer :columns="columns" @update:record="onRecord">
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
}
</style>
