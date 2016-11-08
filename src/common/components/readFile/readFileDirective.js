angular.module("tagMaker.common.components.readFile")
    .directive("tmFileInput", ["tagStorageService", function(storage){
        return {
            restrict: "E",
            template: '<input type="file" class="dir-file-input">' +
                      '<button class="btn btn-success dir-btn-load">Load</button>',
            scope: false,
            link: function(scope, iElement, iAttrs, controller, transcludeFn){
                var fileInput = iElement[0].querySelector(".dir-file-input");
                angular.element(fileInput).on("change", function(event){
                    var file = event.target.files[0];
                    var reader = new FileReader();
                    angular.element(reader).on("load", function(event) {
                        try {
                            var text = event.target.result;
                            storage.addTags(text.split(/[\r\n]+/g));
                            scope.$apply();
                        } catch(err) {
                            alert(err.message);
                        }
                    });
                    reader.readAsText(file);
                    angular.element(event.target).val(null);
                });
                iElement.on("click", function(){
                    fileInput.click();
                });
            }
        };
    }]);
