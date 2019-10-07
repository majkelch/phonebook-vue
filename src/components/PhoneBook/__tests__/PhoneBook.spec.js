import { shallowMount } from '@vue/test-utils'

import PhoneBook from '@/components/PhoneBook'
import { MAX_ENTRIES } from '@/components/PhoneBook/phonebook.config'

import { getEntries } from '@/components/PhoneBook/phonebook.service'

jest.mock('@/components/PhoneBook/phonebook.service', () => ({
  getEntries: jest.fn()
}))

describe('PhoneBook', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(PhoneBook)
  })

  it('should set properties on vm after initialize', async done => {
    const res = [
      {}, {}
    ]
    getEntries.mockImplementationOnce(() => Promise.resolve(res))

    await wrapper.vm.initialize()

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.entries).toEqual(res)
      expect(getEntries).toHaveBeenCalledWith({ amount: MAX_ENTRIES })
      expect(wrapper.vm.isLoading).toBeFalsy()
      done()
    })
  })
})
