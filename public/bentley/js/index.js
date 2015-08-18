/**
 * Created by Jonathan.Wu on 7/20/2015.
 */

//create app
var app = angular.module('mobileDgnApp', []);


//container directive
app.directive('container', ['updateService', function (updateService) {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            element.css({
                //'background-color':'red'
            });
        }
    };
}]);

//object for all views
function View(id, parent, properties) {

    this.id = id;
    this.parent = parent || null;
    //all view properties
    this.properties = {
        name: 'DeviceScreen',
        type: 'Container',
        text: null,
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        isRelative: false,
        anchors: {
            left: null,
            right: null,
            top: null,
            bottom: null
        },
        backgroundColor: "rgb(207,216,220)",
        rVal: 0,
        gVal: 0,
        bVal: 0

    };

    //add only properties given
    for (var key in properties) {
        if (this.properties.hasOwnProperty(key));
        {
            this.properties[key] = properties[key];
        }
    }


    this.getText = function () {
        return this.properties.text;
    };

    this.getRed = function () {
        return this.properties.rVal;
    };

    this.getGreen = function () {
        return this.properties.gVal;
    };
    this.getBlue = function () {
        return this.properties.bVal;
    };

    this.getBackgroundColor = function () {
        return this.properties.backgroundColor;
    };

    //convert background color to hex color
    this.getHexColor = function () {
        var color = this.properties.backgroundColor;
        var hexColor = "0x";
        if (color.substring(0, 4) === 'rgb(') {
            var rgb = color.substring(4, color.length - 1);
            var colors = rgb.split(',');
            for (var i = 0; i < colors.length; i++) {
                colors[i] = parseInt(colors[i]);
                colors[i] = colors[i].toString(16);
                if (colors[i].length === 1) {
                    colors[i] += "0";
                }
                hexColor += colors[i];
            }
        }
        else if (color.substring(0, 1) === '#') {
            hexColor += color.substring(1, color.length);
        }
        hexColor += 'ff';
        return hexColor;

    };

    this.getName = function () {
        return this.properties.name;
    };

    this.getWidth = function () {
        return this.properties.width;
    };

    this.getHeight = function () {
        return this.properties.height;
    };

    this.getX = function () {
        return this.properties.x;
    };

    this.getY = function () {
        return this.properties.y;
    };

    this.isRelative = function () {
        return this.properties.isRelative;
    };

    this.getAnchors = function () {
        return this.properties.anchors;
    };

    this.getType = function () {
        return this.properties.type;
    };

    this.getParent = function () {
        return this.parent;
    };
    this.getColorVal = function () {
        return this.properties.colorVal;
    };

    this.getProperties = function () {
        return this.properties;
    }

    this.isHorizontalFilled = function () {
        return this.properties.anchors.left !== null && this.properties.anchors.right !== null
    };
    this.isVerticalFilled = function () {
        return this.properties.anchors.top !== null && this.properties.anchors.bottom !== null
    };

}


//update specific properties after creation
View.prototype.update = function (properties) {
    for (var key in properties) {
        if (this.properties.hasOwnProperty(key));
        {
            if (key === 'isRelative' && properties[key]) {

            }
            if (!(key === 'anchors')) {
                this.properties[key] = properties[key];
            }


        }
    }
};


//update all anchors
View.prototype.updateAnchors = function (left, right, top, bottom) {
    this.properties.anchors.left = left;
    this.properties.anchors.right = right;
    this.properties.anchors.top = top;
    this.properties.anchors.bottom = bottom;

};

