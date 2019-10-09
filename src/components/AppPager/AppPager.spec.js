import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'

import AppPager from './AppPager'
import { PAGER_CONFIG } from '@/routes/PhoneBook/phonebook.config'

let wrapper

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('AppPager', () => {
  afterEach(() => {
    wrapper.destroy()
  })
  /**
   * These are more like "showcase" tests
   * PhoneBook should be fully tested (integration tests)
   * but that would require more time
   */
  it('should set up component', () => {
    wrapper = shallowMount(AppPager, {
      localVue,
      propsData: {
        config: PAGER_CONFIG
      }
    })
    expect(wrapper.vm.currentPage).toEqual(PAGER_CONFIG.START_PAGE)
    expect(wrapper.vm.config).toBe(PAGER_CONFIG)
  })

  it('should emit event with new page number', () => {
    wrapper = mount(AppPager, {
      localVue,
      propsData: {
        config: PAGER_CONFIG
      }
    })
    const nextPageLink = wrapper.find('a[aria-label="Go to page 2"')
    const eventPayload = [ { currentPage: 2 }]
    nextPageLink.trigger('click')
    expect(wrapper.emitted().onPageChange).toBeTruthy()
    expect(wrapper.emitted().onPageChange[1]).toEqual(eventPayload)
  })
})
