angular.module('mobileDgnApp').controller('CodeController', function ($scope, $rootScope, updateService) {

    //disallow pasting into the codebox
    $('#codeBox').bind("paste", function (e) {
        e.preventDefault();
    });

    //generate the code
    $rootScope.genCode = function () {
        $scope.codeGen = "";
        var propGen = "";
        var viewList = updateService.getViewList();
        var deviceView = updateService.getGlobalParent();
        var dfsViewList = [];
        var varGen = "var " + deviceView.getName() + " = viewGroup.GetContainerView();\n";
        dfs(deviceView, viewList, dfsViewList);
        //iterate through properties of each view
        for (var i = 1; i < dfsViewList.length; i++) {
            var curView = dfsViewList[i];
            if (curView.getType() === 'Container') {
                var border = '{width:1}';
                varGen += sprintf('var %s = new MobileDgnUiContainerView();\n', curView.getName());
                propGen += sprintf('\n%s.Configure({\n\tbackground:%s\n});\n', curView.getName(), curView.getHexColor(), border);
            }
            else if (curView.getType() === 'Text') {
                varGen += sprintf('var %s = new MobileDgnUiTextView(MobileDgnUiTextView.MultiTextViewType);\n', curView.getName());
                propGen += sprintf('%s.Configure({\n\tbackground:%s,\n\ttext:{\n\t\tsize: 16\n\t}\n});\n', curView.getName(), curView.getHexColor());
                propGen += sprintf('%s.SetText("%s");\n', curView.getName(), curView.getText());
            }
            if (curView.isRelative()) {
                if (!curView.isHorizontalFilled()) {
                    propGen += sprintf('%s.SetWidth(%d);\n', curView.getName(), curView.getWidth());
                }
                if (!curView.isVerticalFilled()) {
                    propGen += sprintf('%s.SetHeight(%d);\n', curView.getName(), curView.getHeight());
                }

                if (curView.getAnchors().top !== null) {
                    propGen += sprintf('%s.TopEdge().Align(%s.TopEdge());\n', curView.getName(), curView.getParent().getName());
                }
                if (curView.getAnchors().left !== null) {
                    propGen += sprintf('%s.LeftEdge().Align(%s.LeftEdge());\n', curView.getName(), curView.getParent().getName());
                }
                if (curView.getAnchors().right !== null) {
                    propGen += sprintf('%s.RightEdge().Align(%s.RightEdge());\n', curView.getName(), curView.getParent().getName());
                }
                if (curView.getAnchors().bottom !== null) {
                    propGen += sprintf('%s.BottomEdge().Align(%s.BottomEdge());\n', curView.getName(), curView.getParent().getName());
                }


            }
            else {
                propGen += sprintf('%s.LeftEdge().Align(%s.LeftEdge(), %d, false, 0, false);\n', curView.getName(), curView.getParent().getName(), curView.getX());
                propGen += sprintf('%s.TopEdge().Align(%s.TopEdge(), 0, false, %d, false);\n', curView.getName(), curView.getParent().getName(), curView.getY());
                propGen += sprintf('%s.SetWidth(%d);\n', curView.getName(), curView.getWidth());
                propGen += sprintf('%s.SetHeight(%d);\n', curView.getName(), curView.getHeight());

            }


            propGen += sprintf('%s.AddView(%s);\n', curView.getParent().getName(), curView.getName());

        }
        $scope.codeGen += varGen;
        $scope.codeGen += propGen;
    };

    //highlight all code
    $scope.select = function () {
        $('#codeBox').select();
    };

    //go back to the screen
    $scope.screen = function () {
        $rootScope.appState = 0;
    };

    //create a new list in depth first search order
    function dfs(view, viewList, dfsViewList) {
        dfsViewList.push(view);
        var tempViewList = [];
        for (var i = 0; i < viewList.length; i++) {
            if (viewList[i].getParent().id === view.id) {
                tempViewList.push(viewList[i]);
            }
        }
        if (tempViewList.length > 0) {
            for (var j = 0; j < tempViewList.length; j++) {
                dfs(tempViewList[j], viewList, dfsViewList);
            }
        }

    }

});
