(function() {
    'use strict';
    angular
        .module('firstApp')
        .factory('Price', Price);

    Price.$inject = ['$resource'];

    function Price ($resource) {
        var resourceUrl =  'api/prices/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
