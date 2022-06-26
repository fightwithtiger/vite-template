const env = import.meta.env.VITE_ENV

type ENV = 'dev' | 'test' | 'prod'

export const isDev = () => {
  return env === 'dev'
}

export const isTest = () => {
  return env === 'test'
}

export const isProd = () => {
  return env === 'prod'
}

export const getEnv = () => {
  return env as ENV
}