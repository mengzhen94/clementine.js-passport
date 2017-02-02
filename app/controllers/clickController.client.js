'use strict';

/*
immediately invoked function express (IIFE)
An IIFE is going to bind all the variables within to the local scope of that function. 
This means that any variables declared within this function will not conflict with 
other variables within the application that may share the same name or need to be re-used.
*/

(function(){
	//Integrating the API into AngularJS
	angular
	.module('clementineApp', ['ngResource'])
	.controller('clickController', 
		['$scope', '$resource', function($scope, $resource){
		
		//This new $resource object allows us to query this API, 
		//and will return the results to a field in the browser.
		var Click = $resource('/api/:id/clicks');

		//bind the getClicks method to $scope
		$scope.getClicks = function(){
			/*
			 This can then be either manipulated in some way before passing it on to 
			 he browser, or (as in our case) just pass it straight in to a variable on 
			 the $scope. 
			*/

			//Click.get() will make an HTTP GET request to the API and return all of the results.
			Click.get(function(results){
				$scope.clicks = results.clicks;
			});
		}

		$scope.getClicks();

		/*
		For addClick, we're instructing Angular to use $resource.save, which will 
		prompt an HTTP POST request. This in turn will get routed by our index.js 
		file and run the clickHandler.addClick method on the database. 
		Once that action has been performed, we query the API via $scope.getClicks, 
		therefore forcing the $scope.clicks variable to update and represent 
		the new number of clicks.
		*/

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

	}]);

})();