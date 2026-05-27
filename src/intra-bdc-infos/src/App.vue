<script setup>
import { ref, computed } from 'vue'
import columns from './columns'
import { formatMontant } from '@services/formatter'
import GristContainer from '@components/GristContainer.vue'

// Bon de commande sélectionné
const currentRecord = ref(null)
const onRecord = (record) => {
  currentRecord.value = grist.mapColumnNames(record) || record
}

// Montants
const montantTotal = computed(() => formatMontant(currentRecord.value.montantTotal))
const montantConsomme = computed(() => formatMontant(currentRecord.value.montantConsomme))
const montantRestant = computed(() => formatMontant(currentRecord.value.montantRestant))
const restantColor = computed(() => {
  if (currentRecord.value.montantRestant === 0) return 'fr-background-default--grey'
  if (currentRecord.value.montantRestant < currentRecord.value.montantTotal * 0.1) return 'fr-background-alt--red-marianne'
  else if (currentRecord.value.montantRestant < currentRecord.value.montantTotal * 0.25) return 'fr-background-alt--orange-terre-battue'
  else if (currentRecord.value.montantRestant < currentRecord.value.montantTotal * 0.5) return 'fr-background-alt--yellow-tournesol'
  else return 'fr-background-alt--green-bourgeon'
})
</script>

<template>
  <GristContainer :columns="columns" @update:record="onRecord">
    <section v-if="currentRecord" class="bdc-infos fr-m-2w">

      <h1 class="fr-h3 fr-mb-1w">{{ currentRecord.nom }}</h1>
      <div class="bdc-infos__tags fr-mb-1w">
        <DsfrTag :label="currentRecord.attributaire" small/>
        <DsfrTag :label="currentRecord.marche" small/>
        <DsfrTag :label="`n° chorus ${currentRecord.chorus}`" small/>
      </div>

      <div class="fr-mb-2w">
        <p class="fr-text--xs fr-mb-0">
          <span class="bdc-infos__small-icon fr-icon-calendar-line"></span> 
          Bon de commande réceptionné le {{ currentRecord.dateBdc || '(?)' }}
        </p>
      </div>

      <div class="fr-grid-row fr-grid-row--gutters fr-mb-2w">
        <div class="fr-col-4">
          <div class="bdc-infos__montant fr-card fr-p-2w">
            <p class="fr-text--xs fr-mb-1v">Montant total</p>
            <p class="fr-h6 fr-mb-0">{{ montantTotal }} €</p>
          </div>
        </div>
        <div class="fr-col-4">
          <div class="bdc-infos__montant fr-card fr-p-2w">
            <p class="fr-text--xs fr-mb-1v">Montant consommé</p>
            <p class="fr-h6 fr-mb-0">{{ montantConsomme }} €</p>
          </div>
        </div>
        <div class="fr-col-4">
          <div class="bdc-infos__montant fr-card fr-p-2w" :class="restantColor">
            <p class="fr-text--xs fr-mb-1v">Reste à consommer</p>
            <p class="fr-h6 fr-mb-0">{{ montantRestant }} €</p>
          </div>
        </div>
      </div> 

      <p class="fr-text--xs">
        <span class="bdc-infos__small-icon fr-icon-refresh-line"></span> 
        Dernière mise à jour {{ currentRecord.derniereModification }}
      </p>
    </section>
  </GristContainer>
</template>

<style lang="scss">
.bdc-infos {

  &__tags {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 0.5rem;
  }

  &__small-icon {
    transform: scale(0.75);
    display: inline-block;
  }

  &__montant {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__table {
    border-top: 0.75px solid var(--text-default-grey);
    border-left: 0.75px solid var(--text-default-grey);
  }

  &__last-update {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
}
</style>