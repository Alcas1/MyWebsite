angular.module('mobileDgnApp').controller('ToolController', function ($scope, updateService) {

    this.toolList = updateService.getToolList();
    $scope.createView = function (toolName) {

        //creates a new view based on tool selected
        if (toolName === 'Container') {
            updateService.addView(toolName);
        }
        else if(toolName === 'Text'){
            updateService.addView(toolName);
        }
    };

    $scope.toolIcon = function (toolName) {
        //gets the tool's icon in the ng-repeat
        if (toolName === 'Container') {
            return 'assets/icon-layers.svg';
        }
        else if(toolName === 'Text'){
            return 'assets/icon-font_size.svg';
        }
    };


});