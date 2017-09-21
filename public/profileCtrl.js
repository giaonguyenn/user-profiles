angular.module('userProfiles')
.controller('profileCtrl', function( $scope, friendService ) {
	// FIX ME - assign values to $scope.currentUser and $scope.friends
	// $scope.login = function(user) {
	// 	friendService.login(user).then(function(response) {
	// 		$scope.currentUser = response.data;
	// 		console.log(response);
	// 	});
	// };

	friendService.getFriends().then(function(response){
		console.log(response);
		$scope.currentUser = response.data.currentUser;
		$scope.friends = response.data.friends;
	})
});     