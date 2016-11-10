angular.module("tagMaker.app.tags")
    .controller("tagsCtrl", ["$scope", "tagStorageService", function($scope, tagStorageService){
        $scope.storage = tagStorageService;
        $scope.pattern = "[A-Za-zА-Яа-яЁё0-9]+";
        $scope.modified = false;
                
        $scope.toSelected = function(tag){
            var index = $scope.storage.available.indexOf(tag);
            if (index != -1)
                $scope.storage.available.splice(index, 1);
            $scope.storage.selected.push(tag);
        };
        
        $scope.toAvailable = function(tag){
            var index = $scope.storage.selected.indexOf(tag);
            if (index != -1)
                $scope.storage.selected.splice(index, 1);
            $scope.storage.addTags([tag]);
        };
        
        $scope.makeHashTags = function(){
            var arr = $scope.storage.selected;
            var str = "";
            for (var i = 0; i < arr.length; ++i)
                str += ("#" + arr[i] + " ");
            return str;
        };
        
        $scope.addNewTag = function(){
            $scope.storage.addTags([$scope.newTag]);
            $scope.newTag = "";
            $scope.modified = true;
            $scope.new_tag_form.$setPristine();
        };
        
        $scope.removeTag = function(){
            var index = $scope.storage.available.indexOf($scope.newTag);
            if (index != -1){
                $scope.storage.available.splice(index, 1);
                $scope.modified = true;
            }
            $scope.newTag = "";
            $scope.new_tag_form.$setPristine();
        };
        
        $scope.hasSelectedTags = function(){
            return ($scope.storage.selected.length > 0);
        };
        
        $scope.validate = function(){
            return $scope.new_tag_form.input_field.$valid;
        };
        
        $scope.canRemove = function(){
            return ($scope.validate() && $scope.storage.available.length > 0);
        };
    }]);
