/**
 * Log service
 */

/**
 * Log passed message
 * @param {Error|Object|String} payload - Payload to be logged
 */
const log = (payload) => {
  console.error(payload)
}

export default {
  log
}
