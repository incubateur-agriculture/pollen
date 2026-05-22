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

// Services faits
const rowsServicesFaits = computed(() => {
  if (!currentRecord.value.servicesFaits) return []
  return currentRecord.value.servicesFaits.map(service => 
    [
      service.est_paye ? 'Oui' : 'Non', 
      `${formatMontant(service.montant)} €`, 
      service.livrable?.rowIds?.length > 0 ? 'Oui' : 'Non', 
      service.date_reception_livrable ? new Date(service.date_reception_livrable).toLocaleDateString('fr-FR') : 'Non renseigné'
    ]
  )
})
</script>

<template>
  <GristContainer :columns="columns" @update:record="onRecord">
    <div v-if="currentRecord" class="bdc-infos fr-m-2w">

      <section class="fr-grid-row fr-grid-row--gutters fr-grid-row--bottom">
        <div class="fr-col-6">
          <h1 class="fr-h3 fr-mb-1w">{{ currentRecord.nom }}</h1>
          <div class="bdc-infos__tags">
            <DsfrTag :label="currentRecord.attributaire" small/>
            <DsfrTag :label="currentRecord.marche" small/>
            <DsfrTag :label="`n° chorus ${currentRecord.chorus}`" small/>
          </div>
        </div>
        <div class="fr-col-6">
          <p class="fr-text--xs fr-mb-0">
            <span class="bdc-infos__small-icon fr-icon-calendar-line"></span> 
            Réception du bon de commande le {{ currentRecord.dateBdc || '(?)' }}
          </p>
          <p class="fr-text--xs fr-mb-0">
            <span class="bdc-infos__small-icon fr-icon-refresh-line"></span> 
            Dernière mise à jour {{ currentRecord.derniereModification }}
          </p>
        </div>
      </section>

      <section class="fr-grid-row fr-grid-row--gutters">
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
      </section> 

      <section>
        <h3 class="fr-h5 fr-mb-1v">Services faits du bon de commande</h3>
        <DsfrDataTable 
          v-if="currentRecord.servicesFaits.length > 0"
          class="bdc-infos__table"
          title="Tableau des services faits du bon de commande pour le produit"
          :no-caption="true"
          :headersRow="['Payé', 'Montant', 'Livrable envoyé', 'Date de réception du livrable']" 
          :rows="rowsServicesFaits"
          :verticalBorders="true"
          size="sm"
        />
        <p v-else class="fr-text--xs fr-mb-0">Aucun service fait renseigné pour le bon de commande</p>
      </section>
    </div>
  </GristContainer>
</template>

<style lang="scss">
.bdc-infos {
  display: flex;
  flex-direction: column;
  gap: 2rem;

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