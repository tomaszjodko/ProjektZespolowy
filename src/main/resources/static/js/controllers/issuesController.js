/**
 * Created by Tomasz Jodko on 2016-06-09.
 */
app.controller('IssuesController', ['$scope', '$rootScope','commentFactory','priorityFactory', 'issueFactory','projectFactory', '$location','$timeout', function ($scope, $rootScope,commentFactory,priorityFactory, issueFactory,projectFactory, $location,$timeout) {

    $scope.newCommentWrapper ={
        historia:{
            id: 0,
            typ: "WEWNETRZNY"
        },
        user:{
            id: $rootScope.token.id
        },
        zgloszenie:{
            id:''
        }
    };




    $scope.selectedProjectChanged = function(){
        console.log($scope.selectedProject);
        issueFactory.getExternalIssuesByProjectId($scope.selectedProject.id,function (resp) {
            $scope.issues = resp;
            console.log(resp);
        });
    };


    $scope.saveNewComment = function () {
        $scope.newCommentWrapper.zgloszenie.id = $scope.selectedIssue.id;
        console.log($scope.newCommentWrapper);
        commentFactory.saveComment($scope.newCommentWrapper, function (resp) {
            console.log(resp);
            $scope.comments.push(resp);
            $scope.newCommentWrapper.historia.opis ='';
        });

    };

    priorityFactory.getPriorities(function(resp){
        $scope.priorities = resp;
        $scope.selectedPriority = resp[0];
    });



    projectFactory.getProjectsByUserId($rootScope.token.id,function (resp) {
        $scope.projects = resp;
        $scope.selectedProject = resp[0];
        issueFactory.getExternalIssuesByProjectId($scope.selectedProject.id,function (resp) {
            $scope.issues = resp;
            console.log(resp);
        });
        console.log($scope.selectedProject);
    });

    $scope.setIssueStatus = function(){
        issueFactory.changeIssue($scope.selectedIssue, function (resp) {
            console.log(resp);
        });
    };

    $scope.saveIssue = function () {
        issueFactory.saveIssue($scope.selectedIssue, function (resp) {
            console.log(resp);
        });
    };

    $scope.deleteIssue = function () {
        var id = $scope.selectedIssue.id;
        issueFactory.deleteIssue(id);
        var index = $scope.issues.indexOf($scope.selectedIssue);
        $scope.issues.splice(index, 1);
    };

    // fired when table rows are selected
    $scope.$watch('displayedCollection', function (row) {
        // get selected row
        var selectedCount = 0;
        row.filter(function (r) {
            if (r.isSelected) {
                console.log(r);
                $scope.selectedIssue = r;
                commentFactory.getCommentsByIssueId(r.id,function(resp){
                    $scope.comments = resp;
                });
                selectedCount++;
            }
        });
        if (selectedCount > 0) {
            $('#selectedIssueForm').modal("show")
        } else {
            $('#selectedIssueForm').modal("hide")
        }
    }, true);





    if (!$rootScope.authenticated || $rootScope.userWew === false) {
        $location.path('/');    //redirect user to home.
    }
}]);
