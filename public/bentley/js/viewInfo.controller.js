angular.module('mobileDgnApp').controller('ViewInfoController', function ($scope, updateService) {
    //controls for changing info of a view
    $scope.properties = [];
    $scope.viewName = "DeviceScreen";
    $scope.state = 0;
    $scope.isDeviceScreen = true;
    $scope.hasLeftAnchor = true;
    $scope.hasRightAnchor = false;
    $scope.hasTopAnchor = true;
    $scope.hasBottomAnchor = false;
    var viewHeight = 768;
    var viewWidth = 1024;
    var viewX = 0;
    var viewY = 0;
    var parent = "None";
    updateProperties();

    //delete with the delete key
    $(window).bind('keydown', function (e) {
        if (e.keyCode === 46) {
            if (!(updateService.getCurSelected().getParent().id === 'None')) {
                if ($scope.state === 0) {
                    $scope.state = 1;
                    $scope.$apply();
                }
                else {
                    $scope.deleteView();
                    $scope.state = 0;
                    $scope.$apply();
                }
            }
        }
    });

    //create rgb sliders and set slide events
    var redSlider = $('#redSlider').slider();
    var greenSlider = $('#greenSlider').slider();
    var blueSlider = $('#blueSlider').slider();
    redSlider.on('slide', function (val) {
        var curSelected = updateService.getCurSelected();
        updateService.updateView(curSelected, {
            rVal: val.value,
            backgroundColor: getTheColor(val.value, curSelected.getGreen(), curSelected.getBlue())
        });
        updateService.selectView(curSelected);
    });

    greenSlider.on('slide', function (val) {
        var curSelected = updateService.getCurSelected();
        updateService.updateView(curSelected, {
            gVal: val.value,
            backgroundColor: getTheColor(curSelected.getRed(), val.value, curSelected.getBlue())

        });
        updateService.selectView(curSelected);
    });
    blueSlider.on('slide', function (val) {
        var curSelected = updateService.getCurSelected();
        updateService.updateView(curSelected, {
            bVal: val.value,
            backgroundColor: getTheColor(curSelected.getRed(), curSelected.getGreen(), val.value)

        });
        updateService.selectView(curSelected);
    });

    //convert to rgb color
    function getTheColor(red, green, blue) {
        var theColor = "";
        theColor = "rgb(" + red + "," + green + "," + blue + ")";
        return (theColor);
    }

    //switch on relative check
    $scope.isRelativeChange = function () {
        var curSelected = updateService.getCurSelected();


        updateService.updateView(curSelected, {
            isRelative: this.isRelativeBox, x: 0, y: 0
        });

        curSelected.properties.anchors = {
            left: {id: curSelected.getParent().id, padding: 0},
            right: null,
            top: {id: curSelected.getParent().id, padding: 0},
            bottom: null
        };

        updateService.selectView(curSelected);
    };


    //toggle for left anchor
    $scope.anchorLeftChange = function () {
        var curSelected = updateService.getCurSelected();
        updateService.updateView(curSelected, {
            anchors: {
                left: ($scope.hasLeftAnchor ? {id: curSelected.getParent().id, padding: 0} : null)
            }
        });
        updateService.selectView(curSelected);

    };

    //toggle for right anchor
    $scope.anchorRightChange = function () {
        var curSelected = updateService.getCurSelected();
        updateService.updateView(curSelected, {
            anchors: {
                right: ($scope.hasRightAnchor ? {id: curSelected.getParent().id, padding: 0} : null)
            }
        });
        updateService.selectView(curSelected);

    };

    //toggle for top anchor
    $scope.anchorTopChange = function () {
        var curSelected = updateService.getCurSelected();
        updateService.updateView(curSelected, {
            anchors: {
                top: ($scope.hasTopAnchor ? {id: curSelected.getParent().id, padding: 0} : null)
            }
        });
        updateService.selectView(curSelected);

    };

    //toggle for bottom anchor
    $scope.anchorBottomChange = function () {
        var curSelected = updateService.getCurSelected();
        updateService.updateView(curSelected, {
            anchors: {
                bottom: ($scope.hasBottomAnchor ? {id: curSelected.getParent().id, padding: 0} : null)
            }
        });
        updateService.selectView(curSelected);

    };

    //unused optional function
    $scope.isRelativeBoxText = function () {
        if (!this.isRelativeBox) {
            return 'Relative';
        }
        return 'Absolute';
    };

    //validate if a box is able to be edited
    $scope.editbox = function (property) {
        var element = updateService.getCurSelected();
        this.editingProperty = new Property('', '', false);
        if ((property.name === 'X' || property.name === 'Y') && element.isRelative())
            return;

        if (property.name == 'Width' && element.isHorizontalFilled())
            return;
        if (property.name == 'Height' && element.isVerticalFilled())
            return;

        if (property.canEdit) {
            this.editingProperty = property;
            this.editEnabled = true;
        }


        if (property.name === 'Parent' && element.getParent().getName() !== 'None') {
            updateService.selectView(element.getParent());
        }
    };

    //allow editing of name
    $scope.editName = function (property) {
        this.editNameEnabled = true;
        this.editViewName = property;
    };

    //validate the typed name
    $scope.checkEditName = function (keyEvent) {
        var globalParent = updateService.getGlobalParent();
        if (keyEvent.which === 13) {
            if (updateService.getViewByName(this.editViewName) !== null && updateService.getCurSelected().getName() !== this.editViewName) {
                alert("Cannot use same name");
                return;
            }
            var curSelected = updateService.getCurSelected();
            updateService.updateView(curSelected, {name: this.editViewName});
            updateService.selectView(curSelected, false);
            this.editNameEnabled = false;
        }
    };


    //check input when enter is pressed
    $scope.handleKeyPress = function (keyEvent) {
        if (keyEvent.which === 13) {
            this.checkEdit();
        }
    };

    //validate and/or change input based on requirements
    $scope.checkEdit = function () {
        var element = updateService.getCurSelected();
        var boundaries = updateService.getChildBounds(element);
        if (this.editingProperty.name === 'Height') {
            //Validates Height input
            var topBound = element.getParent().getHeight();
            var height = parseInt(this.editingProperty.value);
            var curY = element.getY() || 0;
            if (element.getParent().id === 'None') {
                if (height <= 0) {
                    height = element.getHeight();
                    return;
                }
                topBound = 4096;
            }
            if (height <= 0) {
                this.deleteView();
                return;
            }
            if (height < boundaries[3]) {
                height = boundaries[3];
            }
            else if (height > topBound - curY) {
                height = topBound - curY;
            }
            if (element.getAnchors().bottom !== null) {
                updateService.updateView(element, {
                    y: topBound - height >= 0 ? topBound - height : 0,
                    height: height > topBound ? topBound : height
                });
            }
            else {
                updateService.updateView(element, {
                    height: height
                });
            }
            updateService.selectView(element);

        }
        else if (this.editingProperty.name === 'Width') {
            //Validates Width input
            var rightBound = parseInt(element.getParent().getWidth());
            var width = parseInt(this.editingProperty.value);
            var curX = element.getX() || 0;

            if (element.getParent().id === 'None') {
                if (width <= 0) {
                    width = element.getWidth();
                    return;
                }
                rightBound = 4096;
            }
            if (width <= 0) {
                this.deleteView();
                return;
            }
            if (width < boundaries[1]) {
                width = boundaries[1]
            }
            else if (width > rightBound - curX) {
                width = rightBound - curX;
            }
            if (element.getAnchors().right !== null) {
                updateService.updateView(element, {
                    x: rightBound - width >= 0 ? rightBound - width : 0,
                    width: width > rightBound ? rightBound : width
                });
            }
            else {
                updateService.updateView(element, {
                    width: width
                });
            }
            updateService.selectView(element);
        }
        else if (this.editingProperty.name === 'X') {
            //Validates X input
            var curX = parseInt(this.editingProperty.value);

            if (element.getParent().id === 'None' && curX > 800) {
                curX = 800;
            }
            else if (element.getParent().id === 'None' && curX <= 0) {
                curX = 0;
            }
            else if (curX < 0) {
                curX = 0;
            }
            else if (Number(curX) + element.getWidth() - element.getParent().getWidth() > 0) {
                curX = Math.ceil(element.getParent().getWidth() - element.getWidth());
            }
            updateService.updateView(element, {
                x: curX
            });
            updateService.selectView(element);

        }
        else if (this.editingProperty.name === 'Y') {
            //Validates Y input
            var curY = parseInt(this.editingProperty.value);
            if (element.getParent().id === 'None' && curY > 300) {
                curY = 300;
            }
            else if (element.getParent().id === 'None' && curY <= 0) {
                curY = 0;
            }
            else if (curY < 0) {
                curY = 0;
            }
            else if (Number(curY) + element.getHeight() - element.getParent().getHeight() > 0) {
                curY = Math.ceil(element.getParent().getHeight() - element.getHeight());
            }
            updateService.updateView(element, {
                y: curY
            });
            updateService.selectView(element);

        }
        this.editEnabled = false;

    };

    $scope.deleteView = function () {
        //deletes view from service
        var curSelected = updateService.getCurSelected();
        updateService.removeView(curSelected);
        updateService.selectView(curSelected.parent);

    };

    //VERY IMPORTANT
    //Alot of this may not seem necessary as it updates every event,
    //however it is because it must update for if the user changes
    //the current selected. All properties of the view info must be
    //updated.
    $scope.$on('viewSelected', function (event, args) {

        var view = args.curSelected;
        var anchors = view.getAnchors();

        //set value of sliders
        $('#redSlider').data('slider').setValue(view.getRed());
        $('#greenSlider').data('slider').setValue(view.getGreen());
        $('#blueSlider').data('slider').setValue(view.getBlue());

        $scope.isDeviceScreen = view.id === updateService.getGlobalParent().id;
        $scope.state = 0;
        $scope.editNameEnabled = false;
        $scope.hasLeftAnchor = (anchors.left !== null);
        $scope.hasRightAnchor = (anchors.right !== null);
        $scope.hasTopAnchor = (anchors.top !== null);
        $scope.hasBottomAnchor = (anchors.bottom !== null);
        $scope.isRelativeBox = view.isRelative();
        if ($scope.isRelativeBox) {
            //disable drag due to relative positioning
            interact('#' + view.id).draggable({enabled: false}).resizable({
                edges: {
                    left: !(anchors.left !== null),
                    right: !(anchors.right !== null),
                    bottom: !(anchors.bottom !== null),
                    top: !(anchors.top !== null)
                }
            });

        }
        else {
            //enable drag because absolute positioning
            interact('#' + view.id).draggable({enabled: true}).resizable({
                edges: {
                    left: true,
                    right: true,
                    bottom: true,
                    top: true
                }
            });
        }
        $scope.viewName = view.getName();
        parent = view.getParent().getName();
        //update view info numbers
        viewX = (parseFloat(view.getX() || 0));
        viewY = (parseFloat(view.getY() || 0));
        viewWidth = Math.floor(view.getWidth() <= 1 ? 0 : view.getWidth());
        viewHeight = Math.floor(view.getHeight() <= 1 ? 0 : view.getHeight());
        updateProperties();
        //sometimes $scope.$apply() is needed to get the view controller
        //to update, it is based on if the rootscope is already applied or not
        //If confused, just try both, it'll give you an error if you need it
        //or just not update if you don't.
        if (args.apply)
            $scope.$apply();

    });


    //update the properties to be passed into the view controller
    function updateProperties() {
        $scope.properties = [];
        $scope.properties.push(new Property('Height', viewHeight, true));
        $scope.properties.push(new Property('Width', viewWidth, true));
        $scope.properties.push(new Property('X', viewX, true));
        $scope.properties.push(new Property('Y', viewY, true));
        $scope.properties.push(new Property('Parent', parent, false));
    }


});

//property object
function Property(name, value, canEdit) {

    this.name = name;
    this.value = value;
    this.canEdit = canEdit;

}