

/********************************************************************************/
/********************************** WEEK 2 **************************************/

Form validation 

/********************************** /WEEK 2 *************************************/





/********************************************************************************/
/********************************** WEEK 3 **************************************/



/******** Angular Factory, Service and Dependency Injection

Continue further code refactoring by separating the controllers & services in new files,
injecting the services to the controllers and then implement the controllers to the app.js file.



/******** Angular Templates

- Directives (ng-model, ng-show, etc.)
- Markups: {{ expression }}
- Filters ()
- Form controls ()

EVERYTHING TAKES PLACE IN THE index.html file.



/******** Angular ngRoute and Single Page Applications: Objectives and Outcomes

Creates configurations which, according to the selected link/url specify which template and controller to use.

What we had to do:

1) app.js         : Add the required ngRoute configuration for all appropriate links.
2) services.js    : Add _id:[number] to every dish in order to know which one it is (should come from the server with an id number)
3) menu.html      : Add the appropriate #/menu/{{dish._id}} link to the img anchor href.
4) controllers.js : Add $routeParams (as an dependence injection) to the controller responsible for each dish,
                    and specify the $routeParams._id parameter to the dish variable.
                    IMPORTANT: THE ORDER OF THE DEPENDENCIES ADDED TO THE FUNCTION MUST BE THE SAME WITH THOSE OF THE CONTROLLER.



/********* Angular UI-Router and SPA: Objectives and Outcomes

UI-Router module supports:
 a) multiple & nested views in the same time (ng-Route module supports only one).
 b) rendering different parts of the site using the routing.

It uses states to track different views instead of routes.

Setup:

1) change app.js according to ui-router specs.
2) in any controller that requires parameters add $statePares as Dependency Injection (replace with $routeParams).
3) Major refactor of templates (separate as better as possible).

/********************************** /WEEK 3 *************************************/

