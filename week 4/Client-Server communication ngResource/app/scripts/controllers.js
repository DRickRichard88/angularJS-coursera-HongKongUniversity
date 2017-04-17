'use strict';

angular.module('confusionApp')

// Dishes controllers najpierw menu sterujący tabem
  .controller('MenuController', [ '$scope', 'menuFactory', function($scope, menuFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";
    menuFactory.getDishes().query(
      function(response) {
        $scope.dishes = response;
        $scope.showMenu = true;
      },
      function(response) {
        $scope.message = "Error: "+response.status + " " + response.statusText;
      });

// zmiana tabow w menu
    $scope.select = function(setTab){

      $scope.tab = setTab;

      if (setTab === 2)
        $scope.filtText = "appetizer";
      else if (setTab === 3)
        $scope.filtText = "mains";
      else if (setTab === 4)
        $scope.filtText = "dessert";
      else
        $scope.filtText = "";
    };

    $scope.isSelected = function (checkTab) {
      return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function() {
      //obsługa przycisku "show details" operuję wartością boulen
      $scope.showDetails = !$scope.showDetails;
    };
  }])

//Kontroler dish wraz z wświetlanymi komentarzami

  .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
    $scope.inputText = "";

    $scope.dish = {};
    $scope.showDish = false;
    $scope.message="Loading ...";
    $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
      .$promise.then(
      function(response){
        $scope.dish = response;
        $scope.showDish = true;
      },
      function(response) {
        $scope.message = "Error: "+response.status + " " + response.statusText;
      }
    );

    ////sortowanie wg tekstu inna metoda
    //    $scope.orderingText = "";
    //
    //// direction of order indicator (asceding by default)
    //        $scope.inWhichOrder = false;
    //
    //// FUNCTION THAT CONTROLS THE ORDERING BY INPUT TEXT
    //    $scope.textFilter = function() {
    //      var input = document.getElementById("inputText").value;
    //
    //            // ORDER BY RATING
    //            if(input === "rating"){          // rosnąco
    //                $scope.orderingText = "rating";
    //            }else if(input === "-rating"){   // malejąco
    //                $scope.orderingText = "rating";
    //                $scope.inWhichOrder = true;
    //            }// ORDER BY DATE
    //            else if(input === "date"){       // rosnąco
    //                $scope.orderingText = "date";
    //            }else if(input === "-date"){     // malejąco
    //                $scope.orderingText = "date";
    //                $scope.inWhichOrder = true;
    //            }// ORDER BY AUTHOR
    //            else if(input === "author"){     // rosnąco
    //                $scope.orderingText = "author";
    //            }else if(input === "-author"){   // malejąco
    //                $scope.orderingText = "author";
    //                $scope.inWhichOrder = true;
    //            }else{                           // brak sortowania 
    //                $scope.orderingText = "";
    //                $scope.inWhichOrder = false;
    //            }
    //        };

  }])

// CONTACT CONTROLLER

  .controller('ContactController', ['$scope', function($scope) {
    
    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
    
  }])

  .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
    
    $scope.sendFeedback = function() {
      console.log($scope.feedback);
      if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
        $scope.invalidChannelSelection = true;
        console.log('incorrect');
      }
      else {
        $scope.invalidChannelSelection = false;
        //Wrzuca feedback na serwer        
        feedbackFactory.sendFeedback().save($scope.feedback);
        $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                           agree:false, email:"" };
        $scope.feedback.mychannel="";

//i resetuje formularz..
        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
    };
    
  }])


  .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {

    //Step 1: Create a JavaScript object to hold the comment from the form
    $scope.mycomment = {
      rating: 5,
      comment: '',
      author: '',
      date: ''
    };

//wysyłanie komentarzy na nasz JSON SERWER
    $scope.submitComment = function () {
      $scope.mycomment.date = new Date().toISOString();
      console.log($scope.mycomment);
      $scope.dish.comments.push($scope.mycomment);

      menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
      $scope.commentForm.$setPristine();
      $scope.mycomment = {rating:5, comment:"", author:"", date:""};
    }
  }])

  .controller('IndexController', ['$scope', '$stateParams','menuFactory', 'corporateFactory',function($scope, $stateParams, menuFactory, corporateFactory) {
// funkcję kontrolujące dane pobrane z JSON SERVER, są wstawiane za pomocą kontrolera do HTML przez odpowiednie wtyczki, zawiera także obsłuugę błedow 

    $scope.showDish = false;
    $scope.showPromotion = false;
    $scope.showChef = false;
    $scope.message="Loading ...";
//obsługuje tylko konkretne danie w home.html z tąd podane id o ktore chodzi
    $scope.featuredDish = menuFactory.getDishes().get({id:0})
      .$promise.then(
        function(response){
          $scope.featuredDish = response;
          $scope.showDish = true;
        },
        function(response) {
          $scope.message = "Error: "+response.status + " " + response.statusText;
        }
      );
//obsługuje wczytanie promocji rownież z id 
    $scope.promotion = menuFactory.getPromotion().get({id:0})
      .$promise.then(
        function(response){
          $scope.promotion = response;
          $scope.showPromotion = true;
        },
        function(response){
          $scope.message = "Error: "+response.status + " " + response.statusText;
        }      
      );
    

//obsługuje wczyanie danych szefa (id:0)
    $scope.chef = corporateFactory.getLeader().get({id:0})
      .$promise.then(
      function(response){
        $scope.chef = response;
        $scope.showChef = true;
      },
      function(response){
        $scope.message = "Error: "+response.status + " " + response.statusText;
      }      
    );


}])

  .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function($scope, $stateParams, corporateFactory) {
    $scope.message = "Loading ...";

    $scope.showLeadership = false;

    corporateFactory.getLeaders().query(
      function(response) {
        $scope.leaders = response;
        $scope.showLeadership = true;
      },
      function(response) {
        $scope.message = "Error: "+response.status + " " + response.statusText;
      });
  }])
;