import { getEnv } from "@/utils/env";

const env = getEnv()

const hosts = {
  dev: 'http://t-api.com',
  test: 'http://t-api.com',
  prod: 'http://p-api.com',
}

export const BASE_URL = hosts[env]