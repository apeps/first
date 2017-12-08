(function() {
    'use strict';

    angular
        .module('firstApp')
        .controller('OfferingDialogController', OfferingDialogController);

    OfferingDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Offering', 'Price'];

    function OfferingDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Offering, Price) {
        var vm = this;

        vm.offering = entity;
        vm.clear = clear;
        vm.save = save;
        vm.prices = Price.query();
        vm.offerings = Offering.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.offering.id !== null) {
                Offering.update(vm.offering, onSaveSuccess, onSaveError);
            } else {
                Offering.save(vm.offering, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('firstApp:offeringUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
