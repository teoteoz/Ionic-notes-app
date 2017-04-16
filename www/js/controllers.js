angular.module('notesapp.controllers', [])

  .controller('ListCtrl',  function($scope, NotesFactory) {

    $scope.reordering = false;

    $scope.notes = NotesFactory.list();

    $scope.toggleReordering = function() {
      $scope.reordering = !$scope.reordering;
    };

    $scope.move = function (note, fromIndex, toIndex) {
      NotesFactory.reorder(note, fromIndex, toIndex);
    };

    $scope.remove = function (noteId) {

      NotesFactory.delete(noteId);
    };

  })

  .controller('EditCtrl', function ($scope, $state, NotesFactory) {

    var noteId = $state.params.noteId;
    $scope.note = angular.copy(NotesFactory.get(noteId));

    $scope.save = function() {
      NotesFactory.update($scope.note);
      $state.go("list");
    }

  })

  .controller('AddCtrl', function ($scope, $state, NotesFactory){

    $scope.note = {
      id: new Date().getTime().toString(),
      title: '',
      description: ''
    };

    $scope.save = function() {
      NotesFactory.create($scope.note);
      $state.go('list');
    }
  });