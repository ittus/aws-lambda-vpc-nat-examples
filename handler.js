'use strict'

import RedisCache from './helper/RedisCache'

module.exports.hello = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log('event event.pathParameters', event.pathParameters)
  const CACHE_KEY = event.pathParameters.proxy
  let res = {}
  let checkCache = await RedisCache.get(CACHE_KEY)
  if (checkCache) {
    res = checkCache
  } else {
    await RedisCache.set(CACHE_KEY, {'message': 'Cache response for ' + CACHE_KEY})
    res = {'message': 'Set cache success for ' + CACHE_KEY + '!'}
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify(res)
  }

  callback(null, response)

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}
