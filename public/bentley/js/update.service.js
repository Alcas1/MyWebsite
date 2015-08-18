app.factory('updateService', function ($rootScope) {
        var copyView = null;
        var newView = null;
        var viewsCreated = 0;
        var viewList = [];
        var allTools = [
            {
                name: 'Container',
                width: 100,
                height: 100,
                bgColor: 'rgb(207,216,220)'

            },
            {
                name: 'Text',
                width: 80,
                height: 40,
                bgColor: 'rgb(255,255,255)'
            }


        ];
        //copy view
        $(window).bind('keydown', function (e) {
            //check for control c press
            if (e.ctrlKey && String.fromCharCode(e.which) === 'c' || String.fromCharCode(e.which) === 'C') {
                if (!(curSelected.getParent().id === 'None')) {
                    copyView = jQuery.extend(true, {}, curSelected);
                }
            }
        });

        //paste view
        $(window).bind('keydown', function (e) {
            //check for control v press
            if (e.ctrlKey && String.fromCharCode(e.which) === 'v' || String.fromCharCode(e.which) === 'V') {
                if (copyView !== null) {
                    //add view and reset position
                    newView = addView(copyView.getType());
                    var tempProps = copyView.properties;
                    tempProps.name = newView.getName();
                    tempProps.text = copyView.getText();
                    tempProps.x = 0;
                    tempProps.y = 0;
                    tempProps.isRelative = false;
                    tempProps.anchors = {
                        left: null,
                        right: null,
                        top: null,
                        bottom: null
                    };
                    updateView(newView, tempProps);
                    selectView(newView, true);
                }
            }
        });
        //create Parent of Device Screen
        var topView = new View('None');
        topView.update({name: 'None'});
        var rootView = new View('DeviceScreen', topView);
        viewList.push(rootView);

        var curSelected = rootView;

        angular.element(document).ready(function () {
            updateView(rootView, {
                name: 'DeviceScreen',
                width: 1024,
                height: 768,
                x: 0,
                y: 0,
                isRelative: false,
                backgroundColor: '#EFEFEF'
            });
        });
        function getViewById(Id) {
            var foundView = null;
            viewList.forEach(function (view) {
                if (view.id === Id) {
                    foundView = view;
                }
            });
            return foundView;
        }

        function getViewByName(Name) {
            var foundView = null;
            viewList.forEach(function (view) {
                if (view.properties.name === Name) {
                    foundView = view;
                }
            });
            return foundView;
        }

        function getToolList() {
            return allTools;
        }

        function getToolByType(type) {
            for (var i = 0; i < allTools.length; i++) {
                if (allTools[i].name === type) {
                    return allTools[i];
                }
            }
            return null;
        }


        function addView(nType) {
            var tool = getToolByType(nType);
            var viewName = nType + (viewsCreated++);
            var view = new View(viewName, curSelected, {
                name: viewName,
                width: tool.width,
                height: tool.height,
                backgroundColor: tool.bgColor,
                type: nType
            });
            viewList.push(view);
            $rootScope.$broadcast('viewAdded',
                {view: view, type: nType}
            );
            $rootScope.$broadcast('viewSelected',
                {curSelected: view, apply: false}
            );
            return view;
        }


        function updateView(view, properties) {
            //iterate through children
            //for relative children check which values to modify
            if (properties.height && view.getHeight() !== properties.height) {
                getAllChildren(view).forEach(function (child) {
                    if (child.isVerticalFilled()) {
                        child.update({height: properties.height});
                        $rootScope.$broadcast('viewBoundsUpdated', {view: child});
                    }
                    else if (child.getAnchors().bottom !== null) {
                        //move child to match y
                        var y = properties.height - child.getHeight();
                        child.update({y: y});
                        $rootScope.$broadcast('viewBoundsUpdated', {view: child});
                    }

                });
            }

            if (properties.width && view.getWidth() !== (properties.width)) {
                getAllChildren(view).forEach(function (child) {
                    if (child.isHorizontalFilled()) {
                        child.update({width: properties.width});
                        $rootScope.$broadcast('viewBoundsUpdated', {view: child});
                    }
                    else if (child.getAnchors().right !== null) {
                        //move child to match y
                        var x = properties.width - child.getWidth();
                        child.update({x: x});
                        $rootScope.$broadcast('viewBoundsUpdated', {view: child});
                    }
                });
            }

            var finalAnchors;
            var anchors = properties.anchors;
            var curAnchors = curSelected.getAnchors();
            if (anchors) {
                finalAnchors = curAnchors;
                if (anchors.left !== undefined) {
                    finalAnchors.left = anchors.left;
                    if (anchors.left === null && !canRemoveAnchor(view, 'left')) {
                        finalAnchors.left = {id: curSelected.getParent().id, padding: 0};
                    }
                }
                if (anchors.right !== undefined) {
                    finalAnchors.right = anchors.right;
                    if (anchors.right === null && !canRemoveAnchor(view, 'right')) {
                        finalAnchors.right = {id: curSelected.getParent().id, padding: 0};
                    }
                }
                if (anchors.top !== undefined) {
                    finalAnchors.top = anchors.top;
                    if (anchors.top === null && !canRemoveAnchor(view, 'top')) {
                        finalAnchors.top = {id: curSelected.getParent().id, padding: 0};
                    }
                }
                if (anchors.bottom !== undefined) {
                    finalAnchors.bottom = anchors.bottom;
                    if (anchors.bottom === null && !canRemoveAnchor(view, 'bottom')) {
                        finalAnchors.bottom = {id: curSelected.getParent().id, padding: 0};
                    }
                }
                view.updateAnchors(finalAnchors.left, finalAnchors.right, finalAnchors.top, finalAnchors.bottom);
                var width = view.getWidth();
                var height = view.getHeight();
                var x = view.getX();
                var y = view.getY();
                if (finalAnchors.left !== null && finalAnchors.right !== null) {
                    x = 0;
                    width = view.getParent().getWidth();
                }
                if (finalAnchors.top !== null && finalAnchors.bottom !== null) {
                    y = 0;
                    height = view.getParent().getHeight();
                }

                view.update({
                    width: width,
                    height: height,
                    x: x,
                    y: y
                });
                selectView(view);
                getAllChildren(view).forEach(function (child) {
                    if (child.isHorizontalFilled()) {
                        child.update({width: width});
                        $rootScope.$broadcast('viewBoundsUpdated', {view: child});
                    }
                    if (child.isVerticalFilled()) {
                        child.update({height: height});
                        $rootScope.$broadcast('viewBoundsUpdated', {view: child});
                    }

                });
                //$rootScope.$broadcast('viewBoundsUpdated', {view: view});
            }

            view.update(properties);

            $rootScope.$broadcast('viewBoundsUpdated', {view: view});


        }

        function selectView(nCurSelected, nApply) {
            $rootScope.$broadcast('viewSelected',
                {curSelected: nCurSelected, apply: nApply}
            );
            curSelected = nCurSelected;

        }

        function removeView(nCurSelected) {
            for (var i = 0; i < viewList.length; i++)
                if (viewList[i].id === nCurSelected.id) {
                    viewList.splice(i, 1);
                    break;
                }

            $rootScope.$broadcast('viewRemoved',
                {curSelected: nCurSelected}
            );

        }

        function getViewList() {
            return viewList;
        }

        function canRemoveAnchor(view, anchor) {
            if (anchor === 'left' && view.getAnchors().right === null) {
                return false;
            }
            else if (anchor === 'right' && view.getAnchors().left === null) {
                return false;
            }
            if (anchor === 'top' && view.getAnchors().bottom === null) {
                return false;
            }
            if (anchor === 'bottom' && view.getAnchors().top === null) {
                return false;
            }
            return true;
        }

        function getAllChildren(view) {
            var childList = [];
            for (var curView in viewList) {
                if (viewList[curView].getParent() === view) {
                    childList.push(viewList[curView]);
                }
            }
            return childList;
        }


        function getCurSelected() {
            return curSelected;
        }

        function setGlobalParent(nGlobalParent) {
            rootView = nGlobalParent;
        }

        function getGlobalParent() {
            return rootView;
        }

        function getChildBounds(view) {
            var left = view.getWidth();
            var right = 0;
            var top = view.getHeight();
            var bottom = 0;

            getAllChildren(view).forEach(function (child) {
                var x = child.getX() || 0;
                var y = child.getY() || 0;
                var x2 = (child.getX() || 0) + child.getWidth();
                var y2 = (child.getY() || 0) + child.getHeight();
                if (x < left && child.getAnchors().left === null) {
                    left = x;
                }
                if (y < top && child.getAnchors().top === null) {
                    top = y;
                }
                if (x2 > right && child.getAnchors().right === null) {
                    right = x2;
                }
                if (y2 > bottom && child.getAnchors().bottom === null) {
                    bottom = y2;
                }


            });

            return [left, right, top, bottom];

        }

        return {
            getViewById: getViewById,
            getViewByName: getViewByName,
            addView: addView,
            updateView: updateView,
            removeView: removeView,
            selectView: selectView,
            getToolList: getToolList,
            getViewList: getViewList,
            getCurSelected: getCurSelected,
            setGlobalParent: setGlobalParent,
            getGlobalParent: getGlobalParent,
            getAllChildren: getAllChildren,
            getChildBounds: getChildBounds
        }
    }
)
;