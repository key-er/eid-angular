angular.module('app') // because this is what we defined in index.js
// controller is where we set the state of the component
.component('app', {
  controller: function($scope, dictServices) {

    this.title = 'Oxford Dictionary - The Angular Way',
    this.typedText = '', // this is two way bound to input via ng-model
    this.viewhistory = false,

    this.handleSubmit  = function() {
      // debugger

      dictServices.getWordDetail(this.typedText, (err, data) => {
        // the service should take a word and search
        this.thesaurii = data
      })
    },


    this.showHideHistory = function() {
      this.viewhistory = !this.viewhistory
    },

    this.handleDateSelector = () => {

      if (this.seletectedDate) {
        const isoDate = this.seletectedDate.toISOString()
        dictServices.getSearchHistory(isoDate, (err, data) => {
          this.words = data;
        })
      }
    }
  },

  bindings: {}, //no binding as this is the first component
  templateUrl: '/templates/app.html'
})

