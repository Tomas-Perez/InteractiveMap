/**
 * @author Tomas Perez Molina
 */
const Raphael = require('raphael')
const utilities = require('./shapesUtilities.js')
const animations = require('./animations.js')
const $ = require('jquery-browserify')
require('bootstrap')
const tabletop = require('tabletop')
const mapColor = '#5abd50'

const map = Raphael('map', '960', '560')
const sets = utilities.createSets(map, ['A', 'B', 'C', 'D'])

const shapesPromise = utilities.drawShapes('./assets/svg/map2.svg', map, mapColor)
const rowDict = {}

tabletop.init({
  key: 'https://docs.google.com/spreadsheets/d/1svu9m62ZU_hCZM33_FBbohbQGYoTBLTBUV6ixITS8Sg/edit?usp=sharing',
  callback: function (data) {
    data.forEach(row => {
      rowDict[row.id] = { state: row.state, currency: row.currency, price: row.price }
    })
    shapesPromise.then(() => $('.shape').each((i, shape) => addPopOver(shape)))
  },
  simpleSheet: true
})
// test
shapesPromise.then(promise => promise.forEach(shape => {
  utilities.setText(map, shape)
  sets.find(set => set.data.id === shape.node.id[0]).push(shape)
}))

shapesPromise.then(() => sets.filter(set => set.data.id !== 'D').forEach(set => addAnimations(set)))

const addPopOver = function (shape) {
  const queryShape = $(shape)
  const id = $(shape).attr('id')
  const dataRow = rowDict[id]
  if (dataRow) {
    queryShape.popover({
      trigger: 'hover',
      title: `${dataRow.currency}${dataRow.price}`,
      content: `<p>${dataRow.state}</p>`,
      animation: false,
      html: true,
      container: $('#pop-holder')
    })
  }
}

const addAnimations = function (set) {
  set.mouseover(animations.popup('#63ee59'))
  set.mouseout(animations.popDown(mapColor))
  set.click(animations.onClick('green'))
}
