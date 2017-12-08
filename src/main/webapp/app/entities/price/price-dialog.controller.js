(function() {
    'use strict';

    angular
        .module('firstApp')
        .controller('PriceDialogController', PriceDialogController);

    PriceDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Price', 'Offering'];

    function PriceDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Price, Offering) {
        var vm = this;

        vm.price = entity;
        vm.clear = clear;
        vm.save = save;
        vm.offerings = Offering.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.price.id !== null) {
                Price.update(vm.price, onSaveSuccess, onSaveError);
            } else {
                Price.save(vm.price, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('firstApp:priceUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
