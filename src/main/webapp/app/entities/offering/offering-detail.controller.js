(function() {
    'use strict';

    angular
        .module('firstApp')
        .controller('OfferingDetailController', OfferingDetailController);

    OfferingDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Offering', 'Price'];

    function OfferingDetailController($scope, $rootScope, $stateParams, previousState, entity, Offering, Price) {
        var vm = this;

        vm.offering = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('firstApp:offeringUpdate', function(event, result) {
            vm.offering = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
