export interface Page {
  id: number
  name: string
  zhName: string
  isMenu: boolean
  children: Page[]
}

export type PageName = Pick<Page, 'name' | 'zhName'>