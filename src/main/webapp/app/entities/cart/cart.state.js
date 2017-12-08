(function() {
    'use strict';

    angular
        .module('firstApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('cart', {
            parent: 'entity',
            url: '/cart',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Carts'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/cart/carts.html',
                    controller: 'CartController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('cart-detail', {
            parent: 'cart',
            url: '/cart/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Cart'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/cart/cart-detail.html',
                    controller: 'CartDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Cart', function($stateParams, Cart) {
                    return Cart.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'cart',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('cart-detail.edit', {
            parent: 'cart-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cart/cart-dialog.html',
                    controller: 'CartDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Cart', function(Cart) {
                            return Cart.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('cart.new', {
            parent: 'cart',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cart/cart-dialog.html',
                    controller: 'CartDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('cart', null, { reload: 'cart' });
                }, function() {
                    $state.go('cart');
                });
            }]
        })
        .state('cart.edit', {
            parent: 'cart',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cart/cart-dialog.html',
                    controller: 'CartDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Cart', function(Cart) {
                            return Cart.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('cart', null, { reload: 'cart' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('cart.delete', {
            parent: 'cart',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cart/cart-delete-dialog.html',
                    controller: 'CartDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Cart', function(Cart) {
                            return Cart.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('cart', null, { reload: 'cart' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
