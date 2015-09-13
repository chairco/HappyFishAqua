angular.module('starter.controllers', ['ion-tree-list'])

.controller('KalayCtrl', function($scope, $ionicScrollDelegate, $timeout) {
    var overlay_id;
    aqua_stats   = document.getElementById("aqua_stats");
    aqua_weather = document.getElementById("aqua_weather");
    aqua_feeding = document.getElementById("aqua_feeding");
    aqua_music   = document.getElementById("aqua_music");
    aqua_tools   = document.getElementById("aqua_tools");
    aqua_social  = document.getElementById("aqua_social");
    
    $scope.alert = function(text) {
        alert(text);  
    };

    var current_overlay_id = null, overlay_id;
    $scope.toggleOverlay = function(id) {
        overlay_id = eval(id);
        
        if (current_overlay_id !== null) {
            current_overlay_id.classList.remove("aqua-overlay-enter");
            current_overlay_id.classList.add("aqua-overlay-leave");
        }
        if (overlay_id === current_overlay_id) {
            current_overlay_id = null;
            return;
        } 
        
        overlay_id.classList.remove("aqua-overlay-leave");
        overlay_id.classList.add("aqua-overlay-enter");
        current_overlay_id = overlay_id;
    };
    
    

    var success = function(gmappedport) {
        //alert("Handshake completed!(" + gmappedport + ")");
        //document.getElementById("live_camera").innerHTML = '<img src="http://127.0.0.1:' + gmappedport + '/?action=stream" style="height: 100vh">';
        document.getElementById("live_camera").setAttribute("src", 'http://127.0.0.1:' + gmappedport + '/?action=stream');
        $ionicScrollDelegate.$getByHandle('cam_scroll').resize();
        //$ionicScrollDelegate.$getByHandle('cam_scroll').scrollBy(150, 0, "false");
    }

    var failure = function() {
        alert("Error calling Tunnel Plugin");
    }
//hello.greet("World", success, failure);
    if (typeof p2ptunnel != 'undefined') {
      //p2ptunnel.startP2PTunnel("A8SPV2MUX7BVXZCP111A", success, failure);
//document.getElementById("live_camera").innerHTML = '<img src="http://127.0.0.1:' + gmappedport + '/?action=stream" style="height: 100vh">';
    }
    
    $scope.labels = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40, 55,55,55,55,55, 66]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  // Simulate async data update
  $timeout(function () {
    $scope.data = [
      [28, 48, 40, 19, 86, 27, 90, 55,55,55,55,55, 66]
    ];
  }, 3000);
    
})

.controller('SideMenuCtrl', function($scope) {
    $scope.collapse = false;
    $scope.tasks = [
        {
            name: 'User Login',
            checked: false,
            action: 'login()'
        },
        {
            name: 'Timeline',
            checked: false,
            alias: 'timeline'
        },
        {
            name: 'My Aquariums',
            checked: false,
            tree: [
                {
                    name: '烈冰鮮鯛山',
                    checked: false,
                    alias: 'aqua/BCLKT293KGBG4Y2T111A'
                },
                {
                    name: '彈跳甲魚湯',
                    checked: false,
                    alias: 'aqua/A8SPV2MUX7BVXZCP111A'
                },
                {
                    name: '寶山飛龍鍋',
                    checked: false,
                    alias: 'aqua/BSEZFSYZKT51YMGD111A'
                }
            ]
        },
        {
            name: 'Collections',
            checked: false,
            alias: 'collections'

        },
        {
            name: 'Discover',
            checked: false,
            alias: 'discover'
        },
        {
            name: 'Settings',
            checked: false,
            alias: 'settings'
        },
    ];

    $scope.toggleCollapse = function(){
        $scope.collapse = !$scope.collapse;
        console.log($scope.collapse)
    };

    $scope.customTemplate = 'item_default_renderer';

    $scope.toggleTemplate = function() {
        if ($scope.customTemplate == 'ion-item.tmpl.html') {
            $scope.customTemplate = 'item_default_renderer'
        } else {
            $scope.customTemplate = 'ion-item.tmpl.html'
        }
    }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: '煮來吃', id: 1 },
    { title: 'TIIDA', id: 2 },
    { title: '深水炸彈', id: 3 },
    { title: '對魚彈琴', id: 4 },
    { title: '進化', id: 5 },
    { title: '霍爾的移動魚缸', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
