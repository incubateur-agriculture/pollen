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
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="bdc-card__top fr-col-3">
        <h2 class="fr-h6 fr-mb-1v">{{ record.nom }}</h2>
        <div class="bdc-card__top__tags">
          <DsfrTag :label="record.attributaire" class="fr-mr-1w" :small="true"/>
          <DsfrTag :label="record.marche" :small="true"/>
        </div>
      </div>
      <div class="fr-col-8">
        <BdcJauge :record="record" />
      </div>
      <div class="fr-col-1 fr-grid-row fr-grid-row--middle fr-grid-row--right">
        <span class="bdc-card__arrow fr-text-title--blue-france fr-icon-arrow-right-line" :class="{'fr-hidden': !props.isSelected}" aria-hidden="true"></span>
      </div>
    </div>
  </li>
</template>

<style lang="scss">
.bdc-card {
  cursor: pointer;

  &:hover, &.is-selected  {
    background-color: var(--background-alt-blue-france);
  }

  &__top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>