/**
 * @author Tomas Perez Molina
 */

const popup = function (color) {
  return function () {
    const ratio = 's1.2'
    this.toFront()
    this.attr({
      cursor: 'pointer',
      fill: color,
      stroke: '#000000',
    })
    this.animate({
      transform: ratio
    }, 100)
    this.text.toFront()
    this.text.animate({
      transform: ratio
    }, 100)
  }
}

const popDown = function (color) {
  return function () {
    this.attr({
      fill: color
    })
    this.animate({
      transform: 's1'
    }, 100)
    this.text.animate({
      transform: 's1'
    }, 100)
  }
}

const onClick = function (color) {
  return function () {
    this.animate({
      fill: color
    }, 100)
  }
}

module.exports = {
  popup: popup,
  popDown: popDown,
  onClick: onClick
}
