/** {{ appname }} - ns-services.js
	@author {{ author }}
	@company {{ company }}
	@license Private
	@description 
		NinjaStack Services
*/
angular
.module('nsServices', [])
.service('AppState', function() {
	return { };
}).service('FireAuth', function(AppState,$rootScope) {
	var fireRef = new Firebase('https://ktchn.firebaseio.com/');

	return new FirebaseSimpleLogin(fireRef, function(err, user) {
		if(err) {
			console.log(err);
			return;
		}

		if(!user) {
			console.log('user is logged out');
			return;
		}

		console.log('logging in!', user);
		AppState.user = user;

		$rootScope.$broadcast('FireBase::Login',user);
	});
});
