export const pages = [
  {
    id: 1,
    name: 'menu1',
    zhName: '菜单一',
    isMenu: true,
    children: [
      {
        id: 11,
        name: 'page11',
        zhName: '页面11',
        isMenu: true,
        children: []
      },
      // {
      //   id: 12,
      //   name: 'page12',
      //   zhName: '页面12',
      //   isMenu: true,
      //   children: []
      // },
      {
        id: 13,
        name: 'home',
        zhName: '首页',
        isMenu: false,
        children: []
      },
      {
        id: 14,
        name: 'child',
        zhName: '子路由',
        isMenu: false,
        children: []
      }
    ]
  },
  {
    id: 2,
    name: 'menu2',
    zhName: '菜单二',
    isMenu: true,
    children: [
      {
        id: 21,
        name: 'page21',
        zhName: '页面21',
        isMenu: true,
        children: []
      },
      {
        id: 22,
        name: 'about',
        zhName: '关于',
        isMenu: false,
        children: []
      }
    ]
  },
  {
    id: 3,
    name: 'menu3',
    zhName: '菜单三',
    isMenu: true,
    children: []
  }
]