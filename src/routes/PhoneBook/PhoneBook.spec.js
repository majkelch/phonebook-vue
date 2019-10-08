import { shallowMount } from '@vue/test-utils'

import PhoneBook from '@/routes/PhoneBook'
import { MAX_ENTRIES } from '@/routes/PhoneBook/phonebook.config'

import { getEntries } from '@/routes/PhoneBook/phonebook.service'

jest.mock('@/routes/PhoneBook/phonebook.service', () => ({
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
