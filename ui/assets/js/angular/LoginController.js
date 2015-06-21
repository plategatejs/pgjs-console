module.exports = function (application) {
  application.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
    $scope.checkCredentials = function () {
      $http
        .post('/api/login', {
          username: $scope.username,
          password: $scope.password
        }, {
          timeout: 10000
        })
        .success(function () {
          window.location = '/';
        })
        .error(function (data, status) {
        })
        .finally(function () {
        });
    }
  }]);
};
