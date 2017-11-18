(function() {
    'use strict';

    angular
        .module('firstApp')
        .controller('PriceController', PriceController);

    PriceController.$inject = ['Price'];

    function PriceController(Price) {

        var vm = this;

        vm.prices = [];

        loadAll();

        function loadAll() {
            Price.query(function(result) {
                vm.prices = result;
                vm.searchQuery = null;
            });
        }
    }
})();
