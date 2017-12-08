(function() {
    'use strict';

    angular
        .module('firstApp')
        .controller('CartController', CartController);

    CartController.$inject = ['Cart'];

    function CartController(Cart) {

        var vm = this;

        vm.carts = [];

        loadAll();

        function loadAll() {
            Cart.query(function(result) {
                vm.carts = result;
                vm.searchQuery = null;
            });
        }
    }
})();
