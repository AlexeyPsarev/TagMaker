angular.module("tagMaker.common.components.saveFile")
    .directive("tmFileOutput", ["tagStorageService", function(storage){
        return {
            restrict: "E",
            template: "<button class='btn btn-success' ng-disabled='isDisabled()'>Save</button>",
            scope: {
                isDisabled: "&"
            },
            link: function(scope, iElement, iAttrs, controller, transcludeFn){
                function saveToFile(filename){
                    var content = "";
                    var available = storage.available;
                    var selected = storage.selected;
                    for (var i = 0; i < available.length - 1; ++i){
                        content += (available[i] + "\n");
                    }
                    if (available.length > 0)
                        content += (available[available.length - 1]);
                    if (selected.length > 0)
                        content += "\n";
                    for (var i = 0; i < selected.length - 1; ++i){
                        content += (selected[i] + "\n");
                    }
                    if (selected.length > 0)
                        content += (selected[selected.length - 1]);
                    
                    var link = document.createElement('a');
                    var mimeType = 'text/plain';
                    link.setAttribute('download', filename);
                    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(content));
                    link.click();
                };
                
                iElement.on("click", function(){
                    var d = new Date();
                    var fileName = d.toISOString() + '.txt';
                    try {
                        saveToFile(fileName);
                    } catch(err) {
                        alert(err.message);
                    }
                });
                
                //angular.element(iElement[0].querySelector("button")).prop("disabled", scope.disabled);
            }
        };
    }]);
