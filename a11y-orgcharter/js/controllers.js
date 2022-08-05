orgApp.controller('csvController', ['$scope', '$location', '$rootScope', '$log', '$timeout', function($scope, $location, $rootScope, $log, $timeout) {
  $scope.$watch('trimfile', function(newFileObj) {
    //there is a new file
    if (newFileObj) {
      $scope.loading = true;
      //read the file
      var reader = new FileReader();
      reader.readAsText(newFileObj);
      //when file is read
      reader.onload = function(e) {
        //parse it into a json
        Papa.parse(reader.result, {
          complete: function(results) {
            $timeout(function() {
              $scope.headers = results.data[0];
              $scope.csvList = _.rest(results.data, 1);
              $scope.turnToJson();
            });
          }
        });
      };
      $scope.filename = newFileObj.name;
    }
  });

  $scope.turnToJson = function() {
    $scope.jsonList = [];
    _.each($scope.csvList, function(thisItem, i) {
      if(thisItem.length===5) {
        $scope.jsonList.push({
          id: thisItem[0],
          reportsTo: thisItem[1],
          isAssistant: thisItem[2],
          name: thisItem[3],
          title: thisItem[4],
          reports: []
        });
      }
      if ($scope.jsonList.length === $scope.csvList.length - 1) {
        $scope.rearrangeJson();
      }
    });
  };
  $scope.rearrangeJson = function() {
    $scope.jsonListSorted = _.sortBy($scope.jsonList, 'SupervisorID').reverse();
    _.each($scope.jsonListSorted, function(item, i) {
      if (item.reportsTo !== '0') {
        var thisPersonsBossIndex = $scope.jsonList.findIndex(function(o) {
          return o.id === item.reportsTo;
        });
          $scope.jsonList[thisPersonsBossIndex].reports.push(item);
        if (i === $scope.jsonListSorted.length - 2) {
          $scope.dataObject = $scope.jsonList[0];
          $timeout(function() {
            angular.element(document).ready(function() {
              $(angular.element('#source-chart')).orgChart({
                container: $(angular.element('#chart')),interactive: true, showLevels:2});
            });
          }, 1000);
        }
      }
    });
  };
}]);
