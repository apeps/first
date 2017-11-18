(function() {
    'use strict';

    angular
        .module('firstApp')
        .controller('OfferingController', OfferingController);

    OfferingController.$inject = ['Offering'];

    function OfferingController(Offering) {

        var vm = this;

        vm.offerings = [];

        loadAll();

        function loadAll() {
            Offering.query(function(result) {
                vm.offerings = result;
                vm.searchQuery = null;
            });
        }
    }
})();
