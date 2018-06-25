angular.module('app')
.component('listThesaurus', {
  controller: function($scope) {
  },
  bindings: {
    thesaurii: '<'

  },
  templateUrl: '/templates/list-thesaurus.html'

})