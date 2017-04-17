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

////sortowanie wg tekstu
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
//            if(input === "rating"){          // ascending
//                $scope.orderingText = "rating";
//            }else if(input === "-rating"){   // descending
//                $scope.orderingText = "rating";
//                $scope.inWhichOrder = true;
//            }// ORDER BY DATE
//            else if(input === "date"){       // ascending
//                $scope.orderingText = "date";
//            }else if(input === "-date"){     // descending
//                $scope.orderingText = "date";
//                $scope.inWhichOrder = true;
//            }// ORDER BY AUTHOR
//            else if(input === "author"){     // ascending
//                $scope.orderingText = "author";
//            }else if(input === "-author"){   // descending
//                $scope.orderingText = "author";
//                $scope.inWhichOrder = true;
//            }else{                           // no order (display as it is)
//                $scope.orderingText = "";
//                $scope.inWhichOrder = false;
//            }
//        };  // end of textFilter function

    }])

    // CONTACT CONTROLLER
    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {contact:"", firstName:"", lastName:"", agree:false, email:"" };
        var contact_options = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
        $scope.contact_options = contact_options;
        $scope.invalidChannelSelection = false;
    }])

    // VALIDATOR CONTACT CONTROLLER
    .controller('FeedbackController', ['$scope', function($scope) {

        $scope.sendFeedback = function() {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.contact == "")&& !$scope.feedback.contact) { // the rule after && might not needed
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {contact:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.contact="";

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])


    /*
     *
     * ASSIGNMENT 2 - CONTROLLERS
     *
     * */
  .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
   
    //Step 1: Create a JavaScript object to hold the comment from the form
    var comment = {
      rating: 5,
      comment: '',
      author: '',
      date: ""
    }

    $scope.comment = comment;

    $scope.submitComment = function () {
      $scope.mycomment.date = new Date().toISOString();
      console.log($scope.mycomment);
      $scope.dish.comments.push($scope.mycomment);

      menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
      $scope.commentForm.$setPristine();
      $scope.mycomment = {rating:5, comment:"", author:"", date:""};
    }
}])

    /*
    *  ASSIGNMENT 3
    *
    * */

    // TASK 2 ------------------------------------//
     .controller('IndexController', ['$scope', '$stateParams',
        'menuFactory', 'corporateFactory',
            function($scope, $stateParams, menuFactory, corporateFactory) {
              
              $scope.dish = {};
              $scope.showDish = false;
              $scope.message="Loading ...";
              $scope.dish = menuFactory.getDishes().get({id:0})
                .$promise.then(
                function(response){
                  $scope.dish = response;
                  $scope.showDish = true;
                },
                function(response) {
                  $scope.message = "Error: "+response.status + " " + response.statusText;
                }
              );


              $scope.promotion = menuFactory.getPromotion(0);
              
              $scope.chef =  corporateFactory.getLeader(0);


    }])
    // TASK 2 ------------------------------------//
    .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function($scope, $stateParams, corporateFactory) {
        $scope.leaders = corporateFactory.getLeaders();

    }])

;