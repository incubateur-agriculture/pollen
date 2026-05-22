<script setup>
import { computed } from 'vue'
import { formatMontant } from '@services/formatter'

const props = defineProps(['record'])
const montantRestant = computed(() => formatMontant(props.record.montantRestant))
const initDate = computed(() => props.record.dateBdc ? `Depuis le ${props.record.dateBdc}` : 'BDC pas encore reçu')
</script>

<template>
  <div class="bdc-jauge">
    <gauge-chart
      :value="record.montantConsomme"
      :init="0"
      :target="record.montantTotal"
      :init-date="initDate"
      :target-date="`Restant à consommer ${montantRestant} €`"
      ></gauge-chart>
  </div>
</template>

<style lang="scss">
.bdc-jauge .chart {

  // Cache la légende des valeurs cibles et initiales
  & > div:nth-last-child(-n + 2) {
    display: none;
  }

  // Aligne le text au graphique
  & > div:nth-child(3) > p {
    margin-bottom: 0;
    &:last-child {
      text-align: right;
    }

    &:first-child {
      padding-right: 1rem;
    }
  }

  // Ajoute les unités dans le graphique
  & > div:nth-child(2) > p {
    font-weight: 600;
    &::after {
      content: ' €';
    }
  }
}
</style>