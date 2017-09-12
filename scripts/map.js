/**
 * @author Tomas Perez Molina
 */

const map = Raphael('map', '960', '560');
const sets = createSets(map, ['A', 'B', 'C', 'D']);

const shapes = drawShapes('../svg/map.svg', '#15E0FF');

shapes.then(raphaelShapes => raphaelShapes.forEach(shape => {
    setText(shape);
    const set = sets.find(set => set.data.id === shape.data('id')[0]);
    set.push(shape);
}));

shapes.then(() => {
    sets.filter(set => set.data.id !== 'D').forEach(set => {
        set.mouseover(popup);
        set.mouseout(popDown);
        set.click(onClick);
    })
});


/*
const raphaelShapes = shapes.map(shape => {
    return
});





console.log(raphaelShapes);
*/

