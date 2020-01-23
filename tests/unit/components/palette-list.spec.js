'use strict'

import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount, mount, createLocalVue } from "@vue/test-utils"

import paletteListComponent from '../../../src/components/palette-list.vue'

const localVue = createLocalVue()

describe('palleteListComponent', () => {
  let wrapper

  let whiteColorProp = {
    "name": "White",
    "variableName": "$white",
    "value": "#FFF !default",
    "mockValue": "#FFF"
  }

  let blackColorProp = {
    "name": "Black",
    "variableName": "$black",
    "value": "#000 !default",
    "mockValue": "#000"
  }

  let propsDataForTesting = {
    title: "Some title",
    palette: [
      whiteColorProp,
      blackColorProp
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

  it('test autocomplete searchOptions items', () => {
    expect(wrapper.findAll('v-autocomplete-stub').isVisible()).toBe(true)
    let items = propsDataForTesting.palette
      .map(color => color.name)
      .concat(propsDataForTesting.palette.map(color => color.value))
      .concat(propsDataForTesting.palette.map(color => color.variableName))
      .concat(propsDataForTesting.palette.map(color => color.mockValue))
    expect(wrapper.find('v-autocomplete-stub').attributes().items).toBe(items.join(','))
  })

  it('test selectedColor event', async () => {
    wrapper.vm.$emit('selectedColor', whiteColorProp)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().selectedColor[0][0]).toEqual(whiteColorProp)
  })

  it('test selectedColor method', async () => {
    wrapper.vm.selectedColor(blackColorProp)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().selectedColor[0][0]).toEqual(blackColorProp)
  })

})

function getShadowWrapper(propsDataForTesting) {
  let wrapper = shallowMount(paletteListComponent, {
    localVue,
    propsData: propsDataForTesting
  })
  return wrapper;
}

