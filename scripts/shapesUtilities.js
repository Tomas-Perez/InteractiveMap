/**
 * @author Tomas Perez Molina
 */

const $ = require('jquery');

const shapesFromSvg = function(filePath) {
    return new Promise((resolve, reject) => {
        $.get(filePath).done((data) => {
            const paths = [];

            $(data).find('polygon, rect, path').each(function (i, shape) {
                let queryShape = $(shape);
                let d = '';
                if (queryShape.is('path')) {
                    d = queryShape.attr('d').trim();
                }
                else if (queryShape.is('polygon')) {
                    d = 'M' + queryShape.attr('points').trim() + 'z';
                }
                else if(queryShape.is('rect')) {
                    const x = queryShape.attr('x');
                    const y = queryShape.attr('y');
                    const w = queryShape.attr('width');
                    const h = queryShape.attr('height');

                    d = 'M' + x + ',' + y + 'h' + w + 'v' + h + 'h' + -w + 'z';
                }
                paths.push({d: d, id: queryShape.attr('id')});
            });

            resolve(paths);
        }).fail(() => reject(new Error('Could not find file')));
    });
};

async function drawShapes(filePath, map, color) {
    const shapes = await shapesFromSvg(filePath);

    return shapes.map(shape => {
        return map.path(shape.d).attr({
            'stroke-width': '2',
            'stroke-opacity': '1',
            'fill': color
        }).data({'id': shape.id});
    });
}

const setText = function(map, shape){
    const box = shape.getBBox();
    const text = map.text(box.x + box.width/2, box.y + box.height/2, shape.data().id);
    text.node.setAttribute("pointer-events", "none");
    shape.text = text;
};

const createSets = function(paper, setIds){
    return setIds.map(id => {
        const set = paper.set();
        set.data = {'id': id};
        return set;
    })
};

module.exports = {
    drawShapes: drawShapes,
    setText: setText,
    createSets: createSets
}
