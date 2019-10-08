/**
 * Phone Book config
 */

/**
 * Max elements to get
 */
export const MAX_ENTRIES = 100

/**
 * Max elements on page
 */
export const MAX_PER_PAGE = 10

/**
 * Helper function for fields
 * @param {Object} config - Field config
 * @param {String} config.key - Field's key
 * @param {Boolean} config.sortable - Is field sortable
 * @returns {Object} Config object for field
 */
const configureField = ({ key = '', sortable = true }) => ({
  key,
  sortable
})

/**
 * Table field config
 */
const ID = configureField({ key: 'id' })
const NAME = configureField({ key: 'name' })
const SURNAME = configureField({ key: 'surname' })
const PHONE = configureField({ key: 'phone' })
const EMAIL = configureField({ key: 'email' })
const GENDER = configureField({ key: 'gender', sortable: false })

/**
 * Table fields
 */
export const FIELDS = [ID, PHONE, NAME, SURNAME, EMAIL, GENDER]
