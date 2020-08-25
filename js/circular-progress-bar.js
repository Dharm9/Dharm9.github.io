var Dial = function(container) {
    this.container = container;
    // this.size = this.container.offsetWidth;
    this.size = this.container.dataset.size;
    this.strokeWidth = this.size / 8;
    this.radius = (this.size / 2) - (this.strokeWidth / 2);
    this.value = this.container.dataset.value;
    this.img_path = this.container.dataset.path;
    this.language = this.container.dataset.text;
    this.direction = this.container.dataset.arrow;
    this.svg;
    this.defs;
    this.slice;
    this.overlay;
    this.text;
    this.arrow;
    this.create();
}

Dial.prototype.create = function() {
    this.createSvg();
    this.createDefs();
    this.createSlice();
    this.createOverlay();
    this.createImage();
    this.createText();
    // this.createArrow();
    this.container.appendChild(this.svg);
};

Dial.prototype.createSvg = function() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var w = parseInt(this.size) + 40;
    var h = parseInt(this.size) + 40;
    svg.setAttribute('width', w + 'px');
    svg.setAttribute('height', h + 'px');
    svg.setAttribute('viewBox', '-20 00 150 150');
    // svg.setAttribute('preserveAspectRatio', 'none');
    // svg.setAttribute('box-sizing', 'border-box');
    // svg.setAttribute('padding-right', 20 + 'px');
    // svg.setAttribute('padding-left', 20 + 'px');
    this.svg = svg;
};

Dial.prototype.createDefs = function() {
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    var overlayBlur = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    overlayBlur.setAttribute("id", "blur");
    var overlayBlurFilter = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
    overlayBlurFilter.setAttribute("stdDeviation", 0);
    overlayBlur.appendChild(overlayBlurFilter);
    var linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGradient.setAttribute('id', 'gradient');
    var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute('stop-color', '#0AAAE6'); // #6E4AE2 #86dac5
    stop1.setAttribute('offset', '0%');
    linearGradient.appendChild(stop1);
    var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute('stop-color', '#77d6f9'); // #78F8EC #77d6f9
    stop2.setAttribute('offset', '100%');
    linearGradient.appendChild(stop2);
    var linearGradientBackground = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGradientBackground.setAttribute('id', 'gradient-background');
    var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute('stop-color', 'rgba(0, 0, 0, 0.1)');
    stop1.setAttribute('offset', '0%');
    linearGradientBackground.appendChild(stop1);
    var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute('stop-color', 'rgba(0, 0, 0, 0.05)');
    stop2.setAttribute('offset', '100%');
    linearGradientBackground.appendChild(stop2);
    defs.appendChild(linearGradient);
    defs.appendChild(linearGradientBackground);
    defs.appendChild(overlayBlur);
    this.svg.appendChild(defs);
    this.defs = defs;
};

Dial.prototype.createSlice = function() {
    var slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
    slice.setAttribute('fill', 'none');
    slice.setAttribute('stroke', 'url(#gradient)');
    slice.setAttribute('stroke-width', this.strokeWidth/2);
    slice.setAttribute('stroke-linecap', 'round');
    slice.setAttribute('transform', 'translate(' + this.strokeWidth / 2 + ',' + this.strokeWidth / 2 + ')');
    slice.setAttribute('class', 'animate-draw');
    this.svg.appendChild(slice);
    this.slice = slice;
};

Dial.prototype.createOverlay = function() {
    var r = this.size - (this.size / 2) - this.strokeWidth / 0.9;
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', this.size / 2);
    circle.setAttribute('cy', this.size / 2);
    circle.setAttribute('r', r);
    circle.setAttribute('filter', 'url(#blur)')
    circle.setAttribute('fill', 'url(#gradient-background)');
    this.svg.appendChild(circle);
    this.overlay = circle;
};

Dial.prototype.createImage = function() { //Actually Create Image
    var fontSize = this.size / 3.5;
    var imgSize = this.size / 1.75;
    var xy = (this.size - imgSize) / 2;
    var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
    svgimg.setAttributeNS(null,'height', imgSize);
    svgimg.setAttributeNS(null,'width', imgSize);
    svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', this.img_path);
    svgimg.setAttributeNS(null,'x', xy);
    svgimg.setAttributeNS(null,'y', xy);
    svgimg.setAttributeNS(null, 'visibility', 'visible');
    this.svg.appendChild(svgimg);
    this.text = svgimg;
};

Dial.prototype.createText = function() {
    var fontSize = this.size / 8;
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute('x', (this.size / 2) + fontSize / 7.5);
    text.setAttribute('y', (parseInt(this.size) + 20));
    text.setAttribute('font-family', 'Roboto'); //change fonts
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('font-size', fontSize);
    text.setAttribute('fill', 'black');
    text.setAttribute('text-anchor', 'middle');
    var tspanSize = fontSize / 3;
    text.innerHTML = this.language;
    this.svg.appendChild(text);
    this.text = text;
};

// Dial.prototype.createArrow = function() {
//     var arrowSize = this.size / 10;
//     var arrowYOffset, m;
//     if(this.direction === 'up') {
//         arrowYOffset = arrowSize / 2;
//         m = -1;
//     }
//     else if(this.direction === 'down') {
//         arrowYOffset = 0;
//         m = 1;
//     }
//     var arrowPosX = ((this.size / 2) - arrowSize / 2);
//     var arrowPosY = (this.size - this.size / 3) + arrowYOffset;
//     var arrowDOffset =  m * (arrowSize / 1.5);
//     var arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
//     arrow.setAttribute('d', 'M 0 0 ' + arrowSize + ' 0 ' + arrowSize / 2 + ' ' + arrowDOffset + ' 0 0 Z');
//     arrow.setAttribute('fill', '#97F8F0');
//     arrow.setAttribute('opacity', '0.6');
//     arrow.setAttribute('transform', 'translate(' + arrowPosX + ',' + arrowPosY + ')');
//     this.svg.appendChild(arrow);
//     this.arrow = arrow;
// };

Dial.prototype.animateStart = function() {
    var v = 0;
    var self = this;
    var intervalOne = setInterval(function() {
        var p = +(v / self.value).toFixed(2);
        var a = (p < 0.95) ? 2 - (2 * p) : 0.05;
        v += a;
        if(v >= +self.value) {
            v = self.value;
            clearInterval(intervalOne);
        }
        self.setValue(v);
    }, 10);
};

Dial.prototype.animateReset = function() {
    this.setValue(0);
};

Dial.prototype.polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

Dial.prototype.describeArc = function(x, y, radius, startAngle, endAngle){
    var start = this.polarToCartesian(x, y, radius, endAngle);
    var end = this.polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;
}

Dial.prototype.setValue = function(value) {
		var c = (value / 100) * 360;
		if(c === 360)
			c = 359.99;
		var xy = this.size / 2 - this.strokeWidth / 2;
    var d = this.describeArc(xy, xy, xy, 0, c);
    this.slice.setAttribute('d', d);
    // var tspanSize = (this.size / 3.5) / 3;
    // this.text.innerHTML = Math.floor(value) + '<tspan font-size="' + tspanSize + '" dy="' + -tspanSize * 1.2 + '">%</tspan>';
};

var containers = document.getElementsByClassName("d-chart");
var dialsArray = new Array();

for (var i = 0; i < containers.length; i++) {
  dialsArray.push(new Dial(containers[i]));
  dialsArray[i].animateStart();
}
