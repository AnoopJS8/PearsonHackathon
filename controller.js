

var app = angular.module('flashcardApp',[]);

app.controller('flashcardController',function($scope){

        $scope.flashes=[];
        
        $scope.click = false;

            $scope.addNewFlash=function(){
        	var newFlashLen=$scope.flashes.length + 1;
        	$scope.flashes.push({'front':'','back':''}); 
        	console.log($scope.flashes);                                                              									
        };

        $scope.showAddFlashes = function(){
        	$scope.click = true;
        	//for( var i in $scope.flashes)
        	//	console.log(i);

        	return $scope.flashes;
        //	this.Arr = $scope.flashes;

        };

	   
    

	});

angular.module('flashcard',['flashcardApp'])
.controller('flashcardControl',function(){
	 $scope.getAll = function () {
		$scope.data = {  "Name": "New",
		"Item": [
		{ "Question": "What is AngularJS ?", "Answer": "AngularJS is a JavaScript framework which simplifies binding JavaScript objects with HTML UI elements." },
		{ "Question": "Explain Directives in Angular?", "Answer": "Directives are attributes decorated on the HTML elements. All directives start with the word “ng”." },
		]};

		$scope.$watch('$scope.data', function () {
            $scope.loadFlashCard($scope.data);
            $scope.loadSideBar($scope.data);
        });
	}
	$scope.getAll();
	$scope.loadFlashCard = function (data) {
        $scope.flashCard = data.title;
        $scope.questions = data.Item;
        $scope.totalItems = $scope.questions.length;
        $scope.itemsPerPage = 1;
        $scope.currentPage = 1;
        $scope.mode = 'flashcard';
        $scope.$watch('currentPage + itemsPerPage', function () 
        {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
        end = begin + $scope.itemsPerPage;
        $scope.filteredQuestions = $scope.questions.slice(begin, end);
        });
    }

    $scope.loadSideBar = function (data) {
        $scope.sideBarquestions = data.Item;
        $scope.sideBartotalItems = $scope.questions.length;
        $scope.sideBaritemsPerPage = 4;
        $scope.sideBarcurrentPage = 1;
        $scope.$watch('sideBarcurrentPage + sideBaritemsPerPage', function () {
            var begin = (($scope.sideBarcurrentPage - 1) * $scope.sideBaritemsPerPage),
              end = begin + $scope.sideBaritemsPerPage;
            $scope.sideBarfilteredQuestions = $scope.sideBarquestions.slice(begin, end);
            $scope.begin = begin;
            $scope.end = end;
        });

    }

    //for next set of sidebar
    $scope.goToSideBar = function () {
        $scope.sideBarfilteredQuestions = $scope.sideBarquestions.slice($scope.begin + 1, $scope.end + 1);
        $scope.begin = $scope.begin + 1;
        $scope.end = $scope.end + 1;
    }
    //for back set of sidebar
    $scope.goBackSideBar = function () {
        $scope.sideBarfilteredQuestions = $scope.sideBarquestions.slice($scope.begin - 1, $scope.end - 1);
        $scope.begin = $scope.begin - 1;
        $scope.end = $scope.end - 1;
    }

    //for the next flashcard
    $scope.goTo = function (index) {
        if (index > 0 && index <= $scope.totalItems) {
            $scope.currentPage = index;
            $scope.mode = 'flashcard';
        }
        //if the next flashcard not in sidebar
        if (index > $scope.end && index != 1) {
            $scope.goToSideBar();
        }

        if (index <= $scope.begin && index != 1) {
            $scope.goBackSideBar();
        }
    }
});
