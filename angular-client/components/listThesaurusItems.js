angular.module('app')
.component('listThesaurusItems', {
  controller: function($scope) {
    // debugger
  },
  bindings: {
    value: '<'
  },

  templateUrl: '/templates/list-thesaurus-items.html'
})