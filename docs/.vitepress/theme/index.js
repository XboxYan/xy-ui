import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './index.css'
import '../../../components/theme.css'

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: Layout
}