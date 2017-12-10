'use strict'

import RedisCache from './helper/RedisCache'

module.exports.hello = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const CACHE_KEY = 'CACHE_KEY'
  let res = {}
  let checkCache = await RedisCache.get(CACHE_KEY)
  if (checkCache) {
    res = checkCache
  } else {
    await RedisCache.set(CACHE_KEY, {'message': 'Hello World!'})
    res = {'message': 'Set cache success!'}
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify(res)
  }

  callback(null, response)

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}
