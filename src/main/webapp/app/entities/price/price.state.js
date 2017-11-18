(function() {
    'use strict';

    angular
        .module('firstApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('price', {
            parent: 'entity',
            url: '/price',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Prices'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/price/prices.html',
                    controller: 'PriceController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('price-detail', {
            parent: 'price',
            url: '/price/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Price'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/price/price-detail.html',
                    controller: 'PriceDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Price', function($stateParams, Price) {
                    return Price.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'price',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('price-detail.edit', {
            parent: 'price-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/price/price-dialog.html',
                    controller: 'PriceDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Price', function(Price) {
                            return Price.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('price.new', {
            parent: 'price',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/price/price-dialog.html',
                    controller: 'PriceDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                value: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('price', null, { reload: 'price' });
                }, function() {
                    $state.go('price');
                });
            }]
        })
        .state('price.edit', {
            parent: 'price',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/price/price-dialog.html',
                    controller: 'PriceDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Price', function(Price) {
                            return Price.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('price', null, { reload: 'price' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('price.delete', {
            parent: 'price',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/price/price-delete-dialog.html',
                    controller: 'PriceDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Price', function(Price) {
                            return Price.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('price', null, { reload: 'price' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
