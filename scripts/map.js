/**
 * @author Tomas Perez Molina
 */
const Raphael = require('raphael')
const Popper = require('popper.js')
const utilities = require('./shapesUtilities.js')
const animations = require('./animations.js')
const $ = require('jquery-browserify')
const b = require('bootstrap')

const map = Raphael('map', '960', '560')
const sets = utilities.createSets(map, ['A', 'B', 'C', 'D'])

const shapesPromise = utilities.drawShapes('./svg/map.svg', map, '#15E0FF')

shapesPromise.then(promise => promise.forEach(shape => {
  utilities.setText(map, shape)
  const set = sets.find(set => set.data.id === shape.node.id[0])
  set.push(shape)
}))

const msg = document.querySelector('.msg')
shapesPromise.then(promise => promise.forEach(shape => new Popper(shape.node, msg)))

shapesPromise.then(() => {
  sets.filter(set => set.data.id !== 'D').forEach(set => {
    set.mouseover(animations.popup)
    set.mouseout(animations.popDown)
    set.click(animations.onClick)
  })
})

const ph = $('#pop-holder')

ph.popover({
  trigger: 'manual',
  animation: false,
  html: true,
  container: 'body'
})

shapesPromise.then(() => {
  $('.shape').on('mouseover', (evt) => {
    const bbox = evt.target.getBoundingClientRect()
    ph.attr('data-content', evt.target.id)
    ph.attr('data-original-title', `<h1>${evt.target.id}</h1>`)
    ph[0].style.left = bbox.right + 'px'
    ph[0].style.top = (bbox.top + (bbox.bottom - bbox.top) / 2) + 'px'
    ph.popover('show')
  }).on('mouseout', () => ph.popover('hide'))
})
