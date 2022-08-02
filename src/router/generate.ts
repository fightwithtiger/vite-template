import { dynamicRoutes } from './dynamic'
import { createRoutesGenerator } from '@/lib'

export const generate = createRoutesGenerator()(dynamicRoutes)
