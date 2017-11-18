(function() {
    'use strict';
    angular
        .module('firstApp')
        .factory('Offering', Offering);

    Offering.$inject = ['$resource'];

    function Offering ($resource) {
        var resourceUrl =  'api/offerings/:id';

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
