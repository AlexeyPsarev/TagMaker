angular.module("tagmaker.common.components.copyBtn")
    .directive("tmCopyBtn", function(){
        return {
            restrict: "E",
            template: "<button class='btn btn-success' ng-disabled='isDisabled()'>Copy</button>",
            scope: {
                isDisabled: "&"
            },
            link: function(scope, iElement, iAttrs, controller, transcludeFn){
                iElement.on("click", function(){
                    var copyTextarea = document.querySelector('textarea');
                    copyTextarea.select();
                    try {
                        document.execCommand('copy');
                    } catch (err) {
                        console.log('Unable to copy');
                    }
                    copyTextarea.selectionStart = copyTextarea.selectionEnd;
                });
            }
        };
    });
