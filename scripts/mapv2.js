/**
 * @author Tomas Perez Molina
 */



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

const map = Raphael('map', '960', '560');

const zoneA = map.set();
const zoneB = map.set();
const zoneC = map.set();
const zoneD = map.set();

async function drawShapes() {
    const shapes = await shapesFromSvg('../svg/map.svg');

    const raphaelShapes = shapes.map(shape => {
        return map.path(shape.d).attr({
            'stroke-width': '2',
            'stroke-opacity': '1',
            'fill': '#15E0FF'
        }).data({'id': shape.id});
    });


    raphaelShapes.forEach(shape => console.log(shape.data().id[0]));

    raphaelShapes.filter(shape => shape.data().id[0] === 'A').forEach(shape => zoneA.push(shape));
    raphaelShapes.filter(shape => shape.data().id[0] === 'B').forEach(shape => zoneB.push(shape));
    raphaelShapes.filter(shape => shape.data().id[0] === 'C').forEach(shape => zoneC.push(shape));
    raphaelShapes.filter(shape => shape.data().id[0] === 'D').forEach(shape => zoneD.push(shape));

    zoneA.mouseover(function() {
        this.toFront();
        this.attr({
            cursor: 'pointer',
            fill: '#990000',
            stroke: '#000000',
            'stroke-width': '2'
        });
        this.animate({
            transform: 's1.3'
        }, 100)
    });

    zoneA.mouseout(function() {
        this.attr({
            fill: '#15E0FF'
        });
        this.animate({
            transform: 's1'
        }, 100)
    });
    zoneA.click(function() {
        this.animate({
            fill: 'green',
        }, 100);
    });
}

drawShapes();




/*
const raphaelShapes = shapes.map(shape => {
    return
});





console.log(raphaelShapes);
*/

