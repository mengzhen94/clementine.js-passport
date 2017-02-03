'use strict';
/*
The GitHub API :

id: The numeric ID associated with the GitHub account.
displayName: The full name (i.e. first and last) for the GitHub account.
username: The GitHub username for the account
public_repos: The number of public repositories associated with the GitHub account

*/
/*
immediately invoked function express (IIFE)
An IIFE is going to bind all the variables within to the local scope of that function. 
This means that any variables declared within this function will not conflict with 
other variables within the application that may share the same name or need to be re-used.
*/

(function(){
	//Integrating the API into AngularJS
	angular
	.module('profileApp', ['ngResource'])
	.controller('profileController', 
		['$scope', '$resource', function($scope, $resource){
		
		//This new $resource object allows us to query this API, 
		//and will return the results to a field in the browser.
		var Profile = $resource("/api/:id", {id: "@id"},
			{enter : {
                                      method: "GET", 
                                      isArray: false
                                     }
                            });

		//bind the getClicks method to $scope
		$scope.getProfile = function(){
			/*
			 This can then be either manipulated in some way before passing it on to 
			 he browser, or (as in our case) just pass it straight in to a variable on 
			 the $scope. 
			*/

			//Click.get() will make an HTTP GET request to the API and return all of the results.
			Profile.get(function(results){
				//$scope.clicks = results.clicks;
				//console.log(results);
				$scope.profileId = results.id;
				$scope.profileUsername = results.username;
				$scope.displayName = results.displayName;
				$scope.profileRepos = results.publicRepos;


			});
		}

		$scope.getProfile();

		/*
		For addClick, we're instructing Angular to use $resource.save, which will 
		prompt an HTTP POST request. This in turn will get routed by our index.js 
		file and run the clickHandler.addClick method on the database. 
		Once that action has been performed, we query the API via $scope.getClicks, 
		therefore forcing the $scope.clicks variable to update and represent 
		the new number of clicks.
		*/
/*
		//prompt an HTTP POST request
		$scope.addClick = function(){
			Click.save(function(){
				$scope.getClicks();
			});
		};
		
		//HTTP DELETE request
		$scope.resetClicks = function(){
			Click.remove(function(){
				$scope.getClicks();
			});
		};
*/
	}]);

})();