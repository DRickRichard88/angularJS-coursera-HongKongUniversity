'use strict';

angular.module('confusionApp')
  .constant("baseURL","http://localhost:3000/")
  .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
// funkcja wypluwająca dania jest taki Ajax angularowy, wzbogacony o metodę PUT 
//rozumiem cały services w angularze jako moduł zaopatrujący w dane w tym przypadku ściągam je z serwera
    
    this.getDishes = function(){
      return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
    };
    
//funckcja wypluwająca promocje j/w tylko bez metody put 

    this.getPromotion = function(index) {
      return $resource(baseURL + "promotions/:id");
    };

  }])

  .factory('corporateFactory',['$resource', 'baseURL', function($resource,baseURL) {
//jest to factory więc musi być zmienna z pustą tablicą
  var corpfac = {};
  
  

  //Funkcja zwracająca tablice obiektow 
  corpfac.getLeader = function(){
    return $resource(baseURL+"leadership/:id",null);
  };
//Zwraca konkretny obiekt z tąd parametr index
    corpfac.getLeaders = function(){
      return $resource(baseURL+"leadership/");
    };  

////jeśli używamy factory musimy zwrocić cały obiekt
  return corpfac;

  }])
//ogarnia wysyłanie komentarzy na JSON server
  .factory('feedbackFactory',['$resource', 'baseURL', function($resource, baseURL) {

    var feedback = {};
    feedback.getFeedback = function(){
      return $resource(baseURL+"feedback/:id", null, {'save':{method:'POST'}});
    };

    return feedback;

  }])
;