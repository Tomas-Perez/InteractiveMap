/**
 * @author Tomas Perez Molina
 */

const $ = require('jquery')

const shapesFromSvg = function (filePath) {
  return new Promise((resolve, reject) => {
    $.get(filePath).done((data) => {
      const paths = []

      $(data).find('polygon, rect, path').each((i, shape) => {
        const queryShape = $(shape)
        let d = ''
        if (queryShape.is('path')) {
          d = queryShape.attr('d').trim()
        } else if (queryShape.is('polygon')) {
          d = `M${queryShape.attr('points').trim()}z`
        } else if (queryShape.is('rect')) {
          const x = queryShape.attr('x')
          const y = queryShape.attr('y')
          const w = queryShape.attr('width')
          const h = queryShape.attr('height')

          d = `M${x},${y}h${w}v${h}h${-w}z`
        }
        paths.push({ d, id: queryShape.attr('id') })
      })

      resolve(paths)
    }).fail(() => reject(new Error('Could not find file')))
  })
}

const drawShapes = async function (filePath, map, color) {
  const shapes = await shapesFromSvg(filePath)

  return shapes.map(shape => {
    const path = map.path(shape.d)
    path.attr(
      {
        'stroke-width': '1',
        'stroke-opacity': '1',
        fill: color
      }
    )
    path.node.setAttribute('id', shape.id)
    path.node.setAttribute('class', 'shape')
    return path
  })
}

const setText = function (map, shape) {
  const box = shape.getBBox()
  const text = map.text(box.x + box.width / 2, box.y + box.height / 2, shape.node.id)
  text.node.setAttribute('pointer-events', 'none')
  shape.text = text
}

const createSets = function (paper, setIds) {
  return setIds.map((id) => {
    const set = paper.set()
    set.data = { id }
    return set
  })
}

module.exports = {
  drawShapes,
  setText,
  createSets
}
