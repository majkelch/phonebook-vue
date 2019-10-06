import { shallowMount } from '@vue/test-utils'
import PhoneBook from '@/components/PhoneBook.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(PhoneBook, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
