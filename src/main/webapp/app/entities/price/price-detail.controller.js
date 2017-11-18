(function() {
    'use strict';

    angular
        .module('firstApp')
        .controller('PriceDetailController', PriceDetailController);

    PriceDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Price', 'Offering'];

    function PriceDetailController($scope, $rootScope, $stateParams, previousState, entity, Price, Offering) {
        var vm = this;

        vm.price = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('firstApp:priceUpdate', function(event, result) {
            vm.price = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
