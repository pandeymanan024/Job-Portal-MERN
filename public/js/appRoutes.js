angular.module('GetJobs').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    let Path = path.join(__dirname, '../')
    $routeProvider

        .when('/viewMyJobs', {
            templateUrl: 'views/ViewMyJobs.html',
            controller: 'ViewMyJobsController'
        })
        .when('/viewMyJobDetails/:jobId', {
            templateUrl: 'views/viewMyJobDetails.html',
            controller: 'ViewMyJobDetailsController'
        })
        .when('/searchJobs', {
            templateUrl: 'views/searchJobs.html',
            controller: 'SearchJobController'
        })
        .when('/viewJobDetails/:jobId', {
            templateUrl: 'views/viewJobDetails.html',
            controller: 'ViewJobDetailsController'
        })
        .otherwise({
            redirectTo: '/login'
        });


    $locationProvider.html5Mode(true);

}]);