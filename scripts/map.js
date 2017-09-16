/**
 * @author Tomas Perez Molina
 */
const Raphael = require('raphael')
const utilities = require('./shapesUtilities.js')
const animations = require('./animations.js')
const $ = require('jquery-browserify')
require('bootstrap')
const mapColor = '#15E0FF'

const map = Raphael('map', '960', '560')
const sets = utilities.createSets(map, ['A', 'B', 'C', 'D'])

const shapesPromise = utilities.drawShapes('./svg/map2.svg', map, mapColor)

shapesPromise.then(promise => promise.forEach(shape => {
  utilities.setText(map, shape)
  sets.find(set => set.data.id === shape.node.id[0]).push(shape)
}))

shapesPromise.then(() => sets.filter(set => set.data.id !== 'D').forEach(set => addAnimations(set)))

shapesPromise.then(() => $('.shape').each((i, shape) => addPopOver(shape)))

const addPopOver = function (shape) {
  $(shape).popover({
    trigger: 'hover',
    title: $(shape).attr('id'),
    content: '<h5>Superficieeeee: 542m2</h5>',
    animation: false,
    html: true,
    container: $('#pop-holder')
  })
}

const addAnimations = function (set) {
  set.mouseover(animations.popup('#8af62e'))
  set.mouseout(animations.popDown(mapColor))
  set.click(animations.onClick('green'))
}