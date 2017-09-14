/**
 * @author Tomas Perez Molina
 */
const raph = require('raphael')
const popper = require('popper.js')
const utilities = require('./shapesUtilities.js')
const animations = require('./animations.js')

const map = raph('map', '960', '560')
const sets = utilities.createSets(map, ['A', 'B', 'C', 'D'])

const shapes = utilities.drawShapes('./svg/map.svg', map, '#15E0FF')

shapes.then(raphaelShapes => raphaelShapes.forEach(shape => {
  utilities.setText(map, shape)
  const set = sets.find(set => set.data.id === shape.data('id')[0])
  set.push(shape)
}))

shapes.then(() => {
  sets.filter(set => set.data.id !== 'D').forEach(set => {
    set.mouseover(animations.popup)
    set.mouseout(animations.popDown)
    set.click(animations.onClick)
  })
})
