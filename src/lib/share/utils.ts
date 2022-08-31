import { NodeItem } from "../virtualTree/type"

// export function flatten<T extends {children: T[]}, U extends T & { depth: number }>(arr: T[], count: number, depth: number) {
//   const target: U[] = []
//   for(let val of arr) {
//     target.push({
//       ...val,
//       depth,
//     })
//     if(val.children && val.children.length > 0 && count) {
//       target.push(...flatten<T, U>(val.children, count--, depth + 1))
//     }
//   }

//   return target as U[]
// }

export function markDelte(parentId: number, leafs: NodeItem[]) {
  const children = leafs.filter(i => i.parentId === parentId)
  children.forEach((leaf: NodeItem, idx: number) => {
    leaf.isDelete = true
    markDelte(leaf.id, leafs)
  })
}