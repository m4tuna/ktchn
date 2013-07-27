/** hack - ns-app.js
	@author Shawn Marincas
	@company NinjaStack, Inc.
	@license Private
	@description 
		Build the main Angular app and declare the routes and controllers
*/
angular
.module('hack', [ 'ngResource', 'nsServices', 'nsFilters', 'nsDirectives' ])
.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/', { templateUrl: '/views/home.html', controller: 'HomeCtrl' })
			.when('/about', { templateUrl: '/views/about.html', controller: 'HomeCtrl' })
			.when('/login', { templateUrl: '/views/login.html', controller: 'HomeCtrl' })
			.when('/board', { templateUrl: '/views/board.html', controller: 'HomeCtrl' })
			.otherwise('/404', { templateUrl: '/views/404.html', controller: 'DefaultCtrl' });
	}
]).controller('TopCtrl',[ '$scope', '$rootScope', 'AppState',
	function($scope, $rootScope, AppState) {
		console.log('initialize Top Control');
		$scope.state = AppState;
	}
]).controller('DefaultCtrl', [ '$scope', 'AppState',
	function($scope, AppState) {
		console.log('initialize Default Control');
		$scope.state = AppState;
	}
]).controller('HomeCtrl', [ '$scope', 'AppState',
	function($scope, AppState) {
		console.log('initialize Home Control');
		$scope.state = AppState;
	}
]);