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
 * Filter debounce time (in ms)
 */
export const FILTER_DEBOUNCE_TIME = 200

/**
 * Start page for table
 */
export const START_PAGE = 1

/**
 * Pager config
 */
export const PAGER_CONFIG = {
  MAX_ENTRIES,
  MAX_PER_PAGE
}

/**
 * Helper function for table fields
 * @param {Object} config - Field's config
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
const ACTIONS = configureField({ key: 'actions', sortable: false })

/**
 * Table fields
 */
export const FIELDS = [ID, PHONE, NAME, SURNAME, EMAIL, GENDER, ACTIONS]
