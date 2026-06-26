import { createApp } from 'vue'
import '@gouvfr/dsfr/dist/dsfr.min.css'
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css'
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css'
import '@gouvminint/vue-dsfr/styles'
import VueDsfr from '@gouvminint/vue-dsfr'

/* DSFR Chart : Si plus de 2 graphiques utilisés il est plus performant d'importer toutes la libraire */
import '@gouvfr/dsfr-chart/GaugeChart'
import '@gouvfr/dsfr-chart/GaugeChart.css'

import '@styles/app-style.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueDsfr)
app.mount('#intra-bdc-liste')
