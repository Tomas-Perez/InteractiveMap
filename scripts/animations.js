/**
 * @author Tomas Perez Molina
 */

const popup = function(){
    const ratio = 's1.2';
    this.toFront();
    this.attr({
        cursor: 'pointer',
        fill: '#990000',
        stroke: '#000000',
        'stroke-width': '2'
    });
    this.animate({
        transform: ratio
    }, 100);
    this.text.toFront();
    this.text.animate({
        transform: ratio
    }, 100);
};

const popDown = function(){
    this.attr({
        fill: '#15E0FF'
    });
    this.animate({
        transform: 's1'
    }, 100);
    this.text.animate({
        transform: 's1'
    }, 100);
};

const onClick = function(){
    this.animate({
        fill: 'green',
    }, 100);
};

module.exports = {
    popup: popup,
    popDown: popDown,
    onClick: onClick
}
