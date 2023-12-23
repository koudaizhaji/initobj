import PageSidebars from './page-sidebars.vue'

export interface Tree {
  label: string
  value: string | number
  children?: Tree[]
}

export interface PageSideBarsProps {
  data: Tree[]
  width?: number
  title?: string
}

export default PageSidebars
