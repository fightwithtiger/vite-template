export function flatten<T extends {children: T[]}, U extends T & { depth: number }>(arr: T[], depth: number) {
  const target: U[] = []
  for(let val of arr) {
    target.push({
      ...val,
      depth,
    })
    if(val.children && val.children.length > 0) {
      target.push(...flatten<T, U>(val.children, depth + 1))
    }
  }

  return target as U[]
}