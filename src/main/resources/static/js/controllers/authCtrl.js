/**
 * Created by Tomasz Jodko on 2016-06-01.
 */
app.controller('AuthCtrl', function ($scope, $rootScope, $http, TokenStorage) {
    $rootScope.authenticated = false;
    $rootScope.adminWew = false;
    $rootScope.adminZew = false;
    $rootScope.userWew = false;
    $rootScope.userZew = false;

    $rootScope.token; // For display purposes only

    $scope.init = function () {
        $http.get('/projektzespolowy/users/current').success(function (user) {
            $rootScope.authenticated = false;
            $rootScope.adminWew = false;
            $rootScope.adminZew = false;
            $rootScope.userWew = false;
            $rootScope.userZew = false;
            if (typeof TokenStorage.retrieve() !== 'undefined' && TokenStorage.retrieve() !== null) {
                $rootScope.authenticated = true;

                // For display purposes only
                $rootScope.token = JSON.parse(atob(TokenStorage.retrieve().split('.')[0]));
                if ($rootScope.token.authority === "ROLE_ADMIN" && $rootScope.token.typUzytkownika === "WEWNETRZNY") {
                    $rootScope.adminWew = true;
                    $rootScope.userWew = true;
                } else if ($rootScope.token.authority === "ROLE_ADMIN" && $rootScope.token.typUzytkownika === "ZEWNETRZNY"){
                    $rootScope.adminZew = true;
                    $rootScope.userZew = true;
                } else if ($rootScope.token.authority === "ROLE_USER" && $rootScope.token.typUzytkownika === "WEWNETRZNY"){
                    $rootScope.userWew = true;
                } else if ($rootScope.token.authority === "ROLE_USER" && $rootScope.token.typUzytkownika === "ZEWNETRZNY"){
                    $rootScope.userZew = true;
                }
            }
        });
    };

    $scope.login = function () {
        $http.post('/api/login', {
            email: $scope.email,
            password: $scope.password
        }).success(function (result, status, headers) {
            $rootScope.authenticated = true;
            $rootScope.adminWew = false;
            $rootScope.adminZew = false;
            $rootScope.userWew = false;
            $rootScope.userZew = false;
            TokenStorage.store(headers('X-AUTH-TOKEN'));

            // For display purposes only
            $rootScope.token = JSON.parse(atob(TokenStorage.retrieve().split('.')[0]));
            if ($rootScope.token.authority === "ROLE_ADMIN" && $rootScope.token.typUzytkownika === "WEWNETRZNY") {
                $rootScope.adminWew = true;
                $rootScope.userWew = true;
            } else if ($rootScope.token.authority === "ROLE_ADMIN" && $rootScope.token.typUzytkownika === "ZEWNETRZNY"){
                $rootScope.adminZew = true;
                $rootScope.userZew = true;
            } else if ($rootScope.token.authority === "ROLE_USER" && $rootScope.token.typUzytkownika === "WEWNETRZNY"){
                $rootScope.userWew = true;
            } else if ($rootScope.token.authority === "ROLE_USER" && $rootScope.token.typUzytkownika === "ZEWNETRZNY"){
                $rootScope.userZew = true;
            }

        });
    };

    $scope.logout = function () {
        // Just clear the local storage
        TokenStorage.clear();
        $rootScope.authenticated = false;
        $rootScope.adminWew = false;
        $rootScope.adminZew = false;
        $rootScope.userWew = false;
        $rootScope.userZew = false;
    };
});
