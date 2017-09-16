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

const shapesPromise = utilities.drawShapes('./svg/map.svg', map, mapColor)

shapesPromise.then(promise => promise.forEach(shape => {
  utilities.setText(map, shape)
  const set = sets.find(set => set.data.id === shape.node.id[0])
  set.push(shape)
}))

shapesPromise.then(() => {
  sets.filter(set => set.data.id !== 'D').forEach(set => {
    set.mouseover(animations.popup('#8af62e'))
    set.mouseout(animations.popDown(mapColor))
    set.click(animations.onClick('green'))
  })
})

shapesPromise.then(() => {
  const shapes = $('.shape')
  shapes.each((i, shape) => {
    console.log(shape)
    $(shape).popover({
      trigger: 'hover',
      title: $(shape).attr('id'),
      animation: false,
      html: true,
      container: $('#pop-holder')
    })
  })
})
