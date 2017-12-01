'use strict';

import RedisCache from './helper/RedisCache'

module.exports.hello = async (event, context, callback) => {
  const CACHE_KEY = 'CACHE_KEY'
  await RedisCache.set(CACHE_KEY, {"message": "Hello World!"})
  let checkCache = await RedisCache.get(CACHE_KEY)
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      checkCache
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
