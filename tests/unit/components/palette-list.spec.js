'use strict'

import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount, mount, createLocalVue } from "@vue/test-utils"

import paletteListComponent from '../../../src/components/palette-list.vue'

const localVue = createLocalVue()
let vuetify

describe('palleteListComponent', () => {
  let wrapper
  let propsDataForTesting = {
    title: "Some title",
    palette: [
      {
        "name": "White",
        "variableName": "$white",
        "value": "#FFF !default",
        "mockValue":  "#FFF"
      }
    ]
  }

  beforeEach(() => {
    vuetify = new Vuetify
    localVue.use(vuetify)
    wrapper = getWrapper(propsDataForTesting)
  })

  it('test props', () => {
    expect(wrapper.props().title).toBe(propsDataForTesting.title)
    expect(wrapper.props().palette[0]).toBe(propsDataForTesting.palette[0])
  })

})

function getWrapper(propsDataForTesting){
  let wrapper = shallowMount(paletteListComponent, {
    localVue,
    vuetify,
    propsData: propsDataForTesting,
    stubs: [
      'v-list',
      'v-list-item-content',
      'v-list-item-title',
      'v-list-item',
      'v-icon',
      'v-btn',
      'v-card',
      'v-autocomplete',
      'v-toolbar',
      'v-toolbar-title',
      'v-app-bar-nav-icon'
    ]
  })
  return wrapper;
}
