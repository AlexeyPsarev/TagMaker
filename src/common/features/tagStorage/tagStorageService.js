angular.module("tagMaker.common.features.tagStorage")
    .factory("tagStorageService", function(){
        return {
            available: [],
            selected: [],
            clear: function(){
                this.addTags(this.selected);
                this.selected = [];
            },
            addTags: function(arr){
                var added = false;
                for (var i = 0; i < arr.length; ++i){
                    var elem = arr[i];
                    var index = this.available.indexOf(elem);
                    if (index == -1){
                        this.available.push(elem);
                        added = true;
                    }
                }
                if (added)
                    this.available.sort();
            }
        };
    });
