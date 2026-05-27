<script setup>
import BdcJauge from '@components/BdcJauge.vue'

// Setup
const props = defineProps(['record', 'isSelected'])
const emit = defineEmits(['select'])

// Selection
const handleClick = () => {
  emit('select', props.record.id)
}
</script>
<template>
  <li class="fr-card fr-p-2w bdc-card" @click="handleClick" :class="{ 'is-selected': props.isSelected }">
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-1w">
      <div class="fr-col-10">
        <h2 class="fr-h6 fr-mb-1v">{{ record.nom }}</h2>
        <DsfrTag :label="record.attributaire" class="fr-mr-1w" :small="true"/>
        <DsfrTag :label="record.marche" :small="true"/>
      </div>
      <div class="fr-col-2 fr-grid-row fr-grid-row--middle fr-grid-row--right">
        <span class="bdc-card__arrow fr-text-title--blue-france fr-icon-arrow-right-line" :class="{'fr-hidden': !props.isSelected}" aria-hidden="true"></span>
      </div>
    </div>
    <BdcJauge :record="record" />
  </li>
</template>

<style lang="scss">
.bdc-card {
  cursor: pointer;

  &:hover, &.is-selected  {
    background-color: var(--background-alt-blue-france);
  }
  
  &.is-selected {
    background-image: linear-gradient(0deg,var(--text-title-blue-france),var(--text-title-blue-france)),linear-gradient(0deg,var(--text-title-blue-france),var(--text-title-blue-france)),linear-gradient(0deg,var(--text-title-blue-france),var(--text-title-blue-france)),linear-gradient(0deg,var(--text-title-blue-france),var(--text-title-blue-france)) !important;
  }
}
</style>