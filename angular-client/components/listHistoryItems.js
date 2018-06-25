angular.module('app')
.component('listHistoryItems', {
  controller: function($scope) {
  },
  bindings: {
    word: '<'
  },

  templateUrl: '/templates/list-history-items.html'
})