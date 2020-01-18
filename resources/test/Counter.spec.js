import { mount } from '@vue/test-utils'
import Counter from '../js/components/Counter'

describe('Counter', () => {
  const wrapper = mount(Counter)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })

  it('has a count label', () => {
    expect(wrapper.contains('.count')).toBe(true)
  })

  it('button click should increment the count', () => {
    expect(wrapper.vm.count).toBe(0)
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })
})
