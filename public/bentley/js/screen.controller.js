angular.module('mobileDgnApp').controller('ScreenController', function ($scope, updateService, $compile) {
    var curSelected = updateService.getCurSelected();
    //adds a select view on click for the screen
    $("#" + updateService.getGlobalParent().id).off('click').click(function (event) {
        event.stopPropagation();
        event.preventDefault();
        updateService.selectView(updateService.getViewById($(event.target).attr('id')), true);
    });


    //adds a view based on view type
    $scope.$on('viewAdded', function (event, args) {
        var parentView = updateService.getCurSelected();
        if (args.type === 'Container') {
            //creates a container
            var newElement = $compile("<container id='" + args.view.id + "' class='selected view resize-drag dropzone defaultContainer'></container>")($scope);
            $('#' + parentView.id).append(newElement);
            $scope.setInteractables(interact('#' + args.view.id));
            updateService.selectView(args.view);

        }
        else if (args.type === 'Text') {
            //creates a text area
            var newElement = $compile("<textarea style='resize:none' ng-keyUp='updateText($event)' type='text' spellcheck='false' id='" + args.view.id + "' class='selected view resize-drag dropzone defaultTextBox'></textarea>")($scope);
            $('#' + parentView.id).append(newElement);
            $scope.setInteractables(interact('#' + args.view.id));
            updateService.selectView(args.view);

        }

        //resets click events to update view info on click
        $(".view").off('click').click(function (event) {
            event.stopPropagation();
            event.preventDefault();
            if (updateService.getViewById($(event.target).attr('id')).getType() !== 'Text') {
                $('textarea').blur();
            }
            updateService.selectView(updateService.getViewById($(event.target).attr('id')), true);

        });
    });

    //updates the text in the view on keypress
    $scope.updateText = function ($event) {
        if ($event.which !== 46) {
            var element = updateService.getCurSelected();
            updateService.updateView(element, {
                text: $('#' + element.id).val()
            });
            updateService.selectView(element);
        }
    };

    //called often, updates the physical properties of the view in the screen
    $scope.$on('viewBoundsUpdated', function (event, args) {
        var view = args.view;
        var $element = $('#' + view.id);
        $element.attr('data-x', view.getX());
        $element.attr('data-y', view.getY());
        $element[0].style.webkitTransform = $element[0].style.transform =
            'translate(' + view.getX() + 'px,' + view.getY() + 'px)';
        $element.outerWidth(view.getWidth());
        $element.outerHeight(view.getHeight());
        $element.val(view.getText());
        $element.css('background-color', view.getBackgroundColor());
    });

    //selects view on screen 
    $scope.$on('viewSelected', function (event, args) {
        var prevView = updateService.getCurSelected();
        var view = args.curSelected;
        $('#' + prevView.id).removeClass('selected');
        $('#' + view.id).addClass('selected');
    });

    //removes view on screen
    $scope.$on('viewRemoved', function (event, args) {
        var curSelected = args.curSelected;
        $('#' + curSelected.id).remove();
    });

    //set interactJS events based on element ID
    $scope.setInteractables = function (interactObject) {
        var startX;
        var startY;
        var startWidth;
        var startHeight;
        var edges;
        var toRemove;
        interactObject.draggable({
            // keep the element within the area of it's parent
            restrict: {
                restriction: 'parent',
                endOnly: false,
                elementRect: {top: 0, left: 0, bottom: 1, right: 1}
            },

            onstart: function dragStartListener(event) {
                //selects view
                updateService.selectView(updateService.getViewById($(event.target).attr('id')), true);
            },

            onmove: function dragMoveListener(event) {
                //sets coordinates
                event.stopPropagation();
                var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                    x2 = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y2 = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                var element = updateService.getCurSelected();
                updateService.updateView(element, {
                    x: x2,
                    y: y2
                });
                updateService.selectView(element, true);
            },
            onend: function dragEndListener(event) {

                //adjusts for overdragging to fit parent bounds
                var element = updateService.getCurSelected();
                var x = element.getX();
                var y = element.getY();
                if (x < 0) {
                    x = 0;
                }
                if (x + element.getWidth() + .81 - element.getParent().getWidth() > 0) {
                    x = Math.floor(x + .81);
                }

                if (y < 0) {
                    y = 0;
                }
                if (y + element.getHeight() + .81 - element.getParent().getHeight() > 0) {
                    y = Math.floor(y + .81);
                }
                updateService.updateView(element, {
                    x: x,
                    y: y
                });
                updateService.selectView(element, true);

            }
        });
        interactObject.resizable({
            restrict: {
                restriction: "parent",
            },
            edges: {left: true, right: true, bottom: true, top: true}
        })
            .on('resizestart', function (event) {
                //creates variables based on starting view properties
                var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0),
                    y = (parseFloat(target.getAttribute('data-y')) || 0);
                var $target = $(target);
                updateService.selectView(updateService.getViewById($target.attr('id')), true);
                var element = updateService.getCurSelected();
                startX = x;
                startY = y;
                startWidth = element.getWidth();
                startHeight = element.getHeight();
                toRemove = false;
            })
            .on('resizeend', function (event) {
                var element = updateService.getCurSelected();

                if (toRemove) {
                    updateService.removeView(element);
                    updateService.selectView(element.parent, true);
                    return;
                }

                var $target = $(event.target);
                $target.css('visibility', 'visible');

                //find boundaries of children then convert to parent coordinate system
                var childBounds = updateService.getChildBounds(element);
                var boundaries = childBounds;
                boundaries[0] += element.getX();
                boundaries[1] += element.getX();
                boundaries[2] += element.getY();
                boundaries[3] += element.getY();

                var x = element.getX(),
                    y = element.getY(),
                    width = element.getWidth(),
                    height = element.getHeight();

                //coordinates of element
                var top = element.getY();
                var bottom = element.getY() + element.getHeight();
                var left = element.getX();
                var right = element.getX() + element.getWidth();

                //change in each direction
                var deltaLeft = left - boundaries[0];
                var deltaRight = boundaries[1] - right;
                var deltaTop = top - boundaries[2];
                var deltaBottom = boundaries[3] - bottom;

                //when one of the edges was moved snap to child bounds
                if (edges.left) {
                    if (left > boundaries[0] && deltaLeft > deltaRight) {
                        x = left - deltaLeft;
                        width += deltaLeft;
                    }
                    else if (right < boundaries[1] && deltaRight > deltaLeft) {
                        x = left - deltaRight;
                        width += deltaRight;
                    }
                }
                else if (edges.right) {
                    if (right < boundaries[1] && deltaRight > deltaLeft) {
                        width += deltaRight;
                    }
                    else if (left > boundaries[0] && deltaLeft > deltaRight) {
                        width += deltaLeft;
                    }
                }

                if (edges.top) {
                    if (top > boundaries[2] && deltaTop > deltaBottom) {
                        y = top - deltaTop;
                        height += deltaTop;
                    }
                    else if (bottom < boundaries[3] && deltaBottom > deltaTop) {
                        y = top - deltaBottom;
                        height += deltaBottom;
                    }
                }
                else if (edges.bottom) {
                    if (bottom < boundaries[3] && deltaBottom > deltaTop) {
                        height += deltaBottom;
                    }
                    else if (top > boundaries[2] && deltaTop > deltaBottom) {
                        height += deltaTop;
                    }
                }

                //adjusts for resize overdragging
                if (left < -1) {
                    width = width + x;
                    x = 0;
                }
                if (top < -1) {
                    height = height + y;
                    y = 0;
                }
                if (y + element.getHeight() > element.getParent().getHeight()) {
                    height = element.getParent().getHeight() - y;
                }
                if (x + element.getWidth() > element.getParent().getWidth()) {
                    width = element.getParent().getWidth() - x;
                }
                updateService.updateView(element, {
                    width: width,
                    height: height,
                    x: x,
                    y: y
                });
                updateService.selectView(element, true);


            })
            .on('resizemove', function (event) {
                var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0),
                    y = (parseFloat(target.getAttribute('data-y')) || 0);
                var $target = $(event.target);
                var element = updateService.getCurSelected();
                x += event.deltaRect.left;
                y += event.deltaRect.top;
                //Make Rect Invisible if width if less or equal to 1
                if (event.rect.height <= 1 || event.rect.width <= 1) {
                    $target.css('visibility', 'hidden');
                }
                else {
                    $target.css('visibility', 'visible');

                }
                //set remove flag if width or height is 0
                if (event.rect.height <= 0 || event.rect.width <= 0) {
                    toRemove = true;
                }
                else {
                    toRemove = false;
                }
                edges = event.edges;

                updateService.updateView(element, {
                    width: event.rect.width,
                    height: event.rect.height,
                    x: x,
                    y: y
                });
                updateService.selectView(element, true);
            });

    }

});