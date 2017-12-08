(function() {
    'use strict';

    angular
        .module('firstApp')
        .controller('CartDetailController', CartDetailController);

    CartDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Cart', 'Item', 'Customer'];

    function CartDetailController($scope, $rootScope, $stateParams, previousState, entity, Cart, Item, Customer) {
        var vm = this;

        vm.cart = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('firstApp:cartUpdate', function(event, result) {
            vm.cart = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
