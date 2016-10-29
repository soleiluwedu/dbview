angular
  .module('Dbview.TableController', ['ui.router'])
  .controller('TableController', ['$scope', 'tableService', '$stateParams', 'dbService', '$http', tableController])

function tableController($scope, tableService, $stateParams, dbService, $http) {
  $scope.name = $stateParams.tablename;

  // reference the data that will be rendered to a table format
  $scope.dataToRender = tableService.getData($stateParams.tablename);

  $scope.deleteRow = () => {
    $http.post('/delete', { creds: dbService.creds, where: $scope.query })
      .success((data, status) => { tableService.addTableData($scope.name, data) })
      .error((data, status) => { console.log("Error:", status) });
  }

  $scope.createTable = () => {
    $http.post('/createTable', { creds: dbService.creds, columns: $scope.valuesToInsert })
      .success((data, status) => { tableService.addTableData($scope.name, data) })
      .error((data, status) => { console.log("Error:", status) });
  }
}
