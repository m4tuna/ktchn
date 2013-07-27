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
			.when('/login', { templateUrl: '/views/login.html', controller: 'LoginCtrl' })
			.when('/board', { templateUrl: '/views/board.html', controller: 'BoardCtrl' })
			.when('/recipes', { templateUrl: '/views/recipes.html', controller: 'HomeCtrl' })
			.otherwise('/404', { templateUrl: '/views/404.html', controller: 'DefaultCtrl' });
	}
]).controller('TopCtrl',[ '$scope', '$location', 'FireAuth', 'AppState',
	function($scope, $location, FireAuth, AppState) {
		console.log('initialize Top Control');
		$scope.state = AppState;

		$scope.logout = function() {
			FireAuth.logout();

			delete $scope.state.user;
			$location.path('/');
		}

	}
]).controller('DefaultCtrl', [ '$scope', 'AppState',      //read_friendlists
	function($scope, AppState) {
		console.log('initialize Default Control');
		$scope.state = AppState;
	}
]).controller('LoginCtrl', [ '$scope', '$location', 'AppState', 'FireAuth',
	function($scope, $location, AppState, FireAuth) {
		$scope.state = AppState;

		$scope.login = function(provider) {
			FireAuth.login(provider);
		}

		$scope.$on('FireBase::Login', function(user) {
			console.log('all logged in and ready to go!');

			$scope.$apply(function() {
				$location.path('/board');
			});
		})
	}
]).controller('BoardCtrl', [ '$scope', '$location', 'AppState', 'FireAuth',
	function($scope, $location, AppState, FireAuth) {
		console.log('initialize Board Control');
		$scope.state = AppState;

		if(!$scope.state.user) {
			$location.path('/login');
		}

		$scope.state.boards = [
			{
				name: 'Fridge',
				items: [
					{
						name: 'fridgeitem2'
					}
				]
			},
			{
				name: 'Freezer',
				items: [
					{
						name: 'freezeritem1'
					}
				]
			},
			{
				name: 'Pantry',
				items: [
					{
						name: 'pantryitem1'
					}
				]
			},
			{
				name: 'Groceries',
				items: [
					{
						name: 'groceryitem1'
					}
				]
			},
		];

		$scope.addItem = function(board) {
			board.items.push({ name: board.newitem });

			delete board.newitem;
		}

		$scope.rmItem = function(board,item) {
			board.items.splice(item,1)
		}
	}
]).controller('HomeCtrl', [ '$scope', 'AppState',
	function($scope, AppState) {
		console.log('initialize Home Control');
		$scope.state = AppState;
	}
]);