'use strict';

describe('Controller Tests', function() {

    describe('Item Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockItem, MockCategory, MockCart;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockItem = jasmine.createSpy('MockItem');
            MockCategory = jasmine.createSpy('MockCategory');
            MockCart = jasmine.createSpy('MockCart');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Item': MockItem,
                'Category': MockCategory,
                'Cart': MockCart
            };
            createController = function() {
                $injector.get('$controller')("ItemDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'firstApp:itemUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
