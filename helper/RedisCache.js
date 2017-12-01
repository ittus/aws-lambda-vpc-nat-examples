import Redis from 'ioredis'

const DEFAULT_TIMEOUT = 4000
let cacheClient = null

if ((!cacheClient) && (typeof process.env.REDIS_ENDPOINT === 'string')) {
  const connectParams = process.env.REDIS_ENDPOINT.split(':')
  console.log('Connecting to redis', connectParams)
  try {
    cacheClient = new Redis({
      host: connectParams[0],
      port: connectParams[1],
      connectTimeout: 5000,
      reconnectOnError: function (err) {
        console.log('Reconnect on error', err)
        var targetError = 'READONLY'
        if (err.message.slice(0, targetError.length) === targetError) {
          // Only reconnect when the error starts with "READONLY"
          return true
        }
      },
      retryStrategy: function (times) {
        console.log('Redis Retry', times)
        if (times >= 3) {
          return undefined
        }
        var delay = Math.min(times * 50, 2000)
        return delay
      }
    })
    console.log('Create Redis Client success')
  } catch (error) {
    console.error('Connect to redis failed', error)
  }
}

export default {
  set: async (key, value, lifetime = 600) => {
    try {
      if (cacheClient) {
        console.log(`SET cache key=${key}`, value)
        let res = await cacheClient.set(key, JSON.stringify(value), 'EX', lifetime).timeout(DEFAULT_TIMEOUT)
        return res
      } else {
        console.log('Cache is not available')
      }
    } catch (err) {
      console.error('Write cache error', err)
    }
  },
  get: async (key) => {
    try {
      if (cacheClient) {
        let res = await cacheClient.get(key).timeout(DEFAULT_TIMEOUT)
        if (res) {
          res = JSON.parse(res)
        }
        console.log(`Read cache key=${key}`, res)
        return res
      } else {
        console.log('Cache is not available')
      }
    } catch (err) {
      console.error('Read cache error', err)
    }
    return undefined
  },
  remove: async (key) => {
    cacheClient.del(key).timeout(DEFAULT_TIMEOUT)
  }
}
