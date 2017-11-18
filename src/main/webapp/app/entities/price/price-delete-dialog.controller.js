(function() {
    'use strict';

    angular
        .module('firstApp')
        .controller('PriceDeleteController',PriceDeleteController);

    PriceDeleteController.$inject = ['$uibModalInstance', 'entity', 'Price'];

    function PriceDeleteController($uibModalInstance, entity, Price) {
        var vm = this;

        vm.price = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Price.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
