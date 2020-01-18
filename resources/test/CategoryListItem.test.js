import { shallowMount,mount, createLocalVue } from '@vue/test-utils'
// import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Header from '../js/components/parts/Header'
// import store from '../js/store/store'

// Vue.use(Vuex)

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)

describe('Header', () => {
  let actions
  let state
  let store

  beforeEach(() => {
    state = {
      toggle: {
        menu: false
      }
    }
    actions = {
      moduleActionClick: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        auth: {
          state,
          actions,
        },
        memodata: {
          state,
          actions,
        },
      }
    })
  })

  it('MDEditor が文字列に含まれているか', () => {
    const wrapper = shallowMount(Header, {store, localVue})
    expect(wrapper.html()).toContain('MDEditor')
  })

})
