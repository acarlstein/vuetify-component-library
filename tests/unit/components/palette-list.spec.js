'use strict'

import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount, mount, createLocalVue } from "@vue/test-utils"

import paletteListComponent from '../../../src/components/palette-list.vue'

const localVue = createLocalVue()

describe('palleteListComponent', () => {
  let wrapper
  let propsDataForTesting = {
    title: "Some title",
    palette: [
      {
        "name": "White",
        "variableName": "$white",
        "value": "#FFF !default",
        "mockValue": "#FFF"
      },
      {
        "name": "Black",
        "variableName": "$black",
        "value": "#000 !default",
        "mockValue": "#000"
      }
    ]
  }

  beforeEach(() => {
    Vue.use(Vuetify)
    localVue.use(Vuetify)
    wrapper = getShadowWrapper(propsDataForTesting)
  })

  afterEach(()=>{
    wrapper = null
  })

  it('test props', () => {
    expect(wrapper.props().title).toBe(propsDataForTesting.title)
    expect(wrapper.props().palette).toBe(propsDataForTesting.palette)
  })

  it('test title property', () => {
    expect(wrapper.find('v-toolbar-title-stub').isVisible()).toBe(true)
    expect(wrapper.text().indexOf(propsDataForTesting.title)).toBeGreaterThan(-1)
  })

  it('test autocomplete items', () => {
    expect(wrapper.findAll('v-autocomplete-stub').isVisible()).toBe(true)
    let items = propsDataForTesting.palette
      .map(color => color.name)
      .concat(propsDataForTesting.palette.map(color => color.value))
      .concat(propsDataForTesting.palette.map(color => color.variableName))
      .concat(propsDataForTesting.palette.map(color => color.mockValue))
    expect(wrapper.find('v-autocomplete-stub').attributes().items).toBe(items.join(','))
  })

})

function getShadowWrapper(propsDataForTesting) {
  let wrapper = shallowMount(paletteListComponent, {
    localVue,
    propsData: propsDataForTesting
  })
  return wrapper;
}

