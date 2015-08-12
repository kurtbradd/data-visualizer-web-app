// Sub-application/main Level State
app.config(['$stateProvider', function($stateProvider) {

  $stateProvider
  .state('app.home', {
    url: '/',
    templateUrl: 'js/main/templates/home.tpl.html',
    controller: 'HomeCtrl'
  })
  .state('app.projects', {
    url: '/projects/:project',
    templateUrl: 'js/main/templates/project.tpl.html',
    controller: 'ProjectCtrl'
  })
  .state('app.projects.topic', {
    url: '/:topic',
    templateUrl: 'js/main/templates/topic.tpl.html',
    controller: 'TopicCtrl',
  })

}]);