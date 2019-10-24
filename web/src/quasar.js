import Vue from 'vue'

import './styles/quasar.styl'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import {
  Quasar, 
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QExpansionItem,
  QCard,
  QCardSection,
  QSelect,
  QOptionGroup,
  QSeparator,
  QSlider,
  QTab,
  QTabs,
  QTabPanel,
  QTabPanels,
  Ripple
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QExpansionItem,
    QCard,
    QCardSection,
    QSelect,
    QOptionGroup,
    QSeparator,
    QSlider,
    QTab,
    QTabs,
    QTabPanel,
    QTabPanels,
  },
  directives: {
    Ripple
  },
  plugins: {
  }
 })