var app = angular.module('manPower',[]);

app.directive('fileModel', ['$parse', function ($parse) {
  return {
     restrict: 'A',
     link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
           scope.$apply(function(){
              modelSetter(scope, element[0].files[0]);
           });
        });
     }
  };
}]);

app.service('fileUpload', ['$http', function ($https) {
  this.uploadFileToUrl = function(file, uploadUrl){
     var fd = new FormData();
     fd.append('file', file);

     $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
     })

     .success(function(){
     })

     .error(function(){
     });
  }
}]);

app.run(function ($rootScope,$http) {
  //console.log('App Starts');
  $rootScope.server="http://13.59.139.90/api/";
  // $rootScope.server="http://192.168.42.192/ManPowerServices/api/";
  $rootScope.getIpURL = $rootScope.server+'get_ip.php';
  $rootScope.mobileMenu = 'hide';
  $http.get($rootScope.getIpURL).then(function(res) {
    $rootScope.ip = res.data.ip;
    //console.log('ip',$rootScope.ip);
    $rootScope.monitorVisitorsURL = $rootScope.server + 'monitor_visitors.php?ip=' + $rootScope.ip;
    $http.get($rootScope.monitorVisitorsURL).then(function(res){
      $rootScope.monitorStats = res;
      //console.log('monitorStats', $rootScope.monitorStats);
    })
  })

  //Page Rerouting
	if(window.localStorage['activeServicesTab'] == '' || window.localStorage['activeServicesTab'] == null || window.localStorage['activeServicesTab'] == undefined) {
		$rootScope.activeServicesTab = 'staffing';
		window.localStorage['activeServicesTab'] = $rootScope.activeServicesTab;
		//console.log('activeServicesTab', $rootScope.activeServicesTab);
	}
	if(window.localStorage['activeServicesTab']){
		$rootScope.activeServicesTab = window.localStorage['activeServicesTab'];
		//console.log('activeServicesTab', $rootScope.activeServicesTab);
	}
  $rootScope.setActiveServicesTab = function (view) {
    $rootScope.activeServicesTab = view;
    window.localStorage['activeServicesTab'] = view;
    //console.log('localSetActiveServicesTab', window.localStorage['activeServicesTab']);
  }

  $rootScope.toggleMobileMenu = function () {
    //console.log('toggle');
    if ($rootScope.mobileMenu == 'hide') {
      $rootScope.mobileMenu = 'active';
    } else if ($rootScope.mobileMenu == 'active') {
      $rootScope.mobileMenu = 'hide';
    }
  }
  $rootScope.logout = function () {
    window.localStorage['profile'] = '';
    window.location.href = 'index.html';
  }
});

app.controller('HomeController', function($scope,$rootScope,$http) {
  //console.log('HomeController');

  $scope.addNewEnquiry = function (formData) {
    $http.get($rootScope.getIpURL).then(function(res) {
      $rootScope.ip = res.data.ip;
      //console.log('ip',$rootScope.ip);
      $scope.addNewEnquiryURL = $rootScope.server + 'insert_enquiry.php?ip=' + $rootScope.ip +'&name=' + formData.name +'&email=' + formData.email +'&message=' + formData.message ;
      //console.log($scope.addNewEnquiryURL);
      $http.get($scope.addNewEnquiryURL).then(function(res){
        $scope.enquiryResponse = res;
        $scope.contactForm = {};
        // if(res.data.status == 'S'){
        //    alert('Message Sent Successfully');
        //    window.location.reload();
        // } else if (res.data.status == 'N'){
        //   alert('Some Error Occured');
        // }
      })
    })
  }

  $scope.fetchVisitors = function () {
    $http.get($rootScope.getIpURL).then(function(res) {
      $rootScope.ip = res.data.ip;
      //console.log('ip',$rootScope.ip);
      $scope.fetchVisitorsURL = $rootScope.server + "fetch_visitors.php?ip="+ $rootScope.ip;
      //console.log($scope.fetchVisitorsURL);
      $http.get($scope.fetchVisitorsURL).then(function(response) {
        $scope.visitors = response.data;
        //console.log('visitorsResponse', $scope.visitors);
        //console.log('length',$scope.visitors.length);
      });
    })
  }
  $scope.fetchVisitors();

  $scope.fetchEnquiries = function () {
    $http.get($rootScope.getIpURL).then(function(res) {
      $rootScope.ip = res.data.ip;
      //console.log('ip',$rootScope.ip);
      $scope.fetchEnquiryURL = $rootScope.server + "fetch_enquiries.php?ip="+ $rootScope.ip;
      //console.log($scope.fetchEnquiryURL);
      $http.get($scope.fetchEnquiryURL).then(function(response) {
        $scope.enquiries = response.data;
        //console.log('enquiriesResponse', $scope.enquiries);
      });
    })
  }
  $scope.fetchEnquiries();

  $scope.fetchViews = function () {
    $http.get($rootScope.getIpURL).then(function(res) {
      $rootScope.ip = res.data.ip;
      //console.log('ip',$rootScope.ip);
      $scope.fetchViewsURL = $rootScope.server + "fetch_views.php?ip="+ $rootScope.ip;
      //console.log($scope.fetchViewsURL);
      $http.get($scope.fetchViewsURL).then(function(response) {
        $scope.views = response.data[0].views;
        //console.log('viewsResponse', $scope.views);
      });
    })
  }
  $scope.fetchViews();


  $scope.FeaturesJobs = [{"title":"Sales& Marketing Profile", "exp" : "1 to 5", "city": "Mumbai/Navi Mumbai"},{"title":"Receptionist", "exp" : "1 to 5", "city": " Mumbai/Navi Mumbai"},{"title":"Personal Assistant", "exp" : "2 to 8", "city": "Mumbai/Navi Mumbai"},{"title":"Accounts & Purchase Profile", "exp" : "3 to 8", "city": "Mumbai/Navi Mumbai"}];

  $scope.setActiveServiceSwtichView = function (view){
    $scope.activeServiceSwtichView = view;
  }
  $scope.setActiveServiceSwtichView('default');

});

app.controller('ServicesController', function($scope,$rootScope,$http) {
  //console.log('ServicesController');
  $scope.jobs = [{"title": "HR Manager","company":"abc pvt ltd","location":"Mumbai","expMin":"1","expMax":"5","payMin":"3","payMax":"5","active":"20"},{"title": "Odoo ERP Developer","company":"def pvt ltd","location":"Delhi","expMin":"2","expMax":"4","payMin":"2","payMax":"4","active":"120"},{"title": "HR Manager","company":"abc pvt ltd","location":"Mumbai","expMin":"1","expMax":"5","payMin":"3","payMax":"5","active":"20"},{"title": "Odoo ERP Developer","company":"def pvt ltd","location":"Delhi","expMin":"2","expMax":"4","payMin":"2","payMax":"4","active":"120"},{"title": "HR Manager","company":"abc pvt ltd","location":"Mumbai","expMin":"1","expMax":"5","payMin":"3","payMax":"5","active":"20"},{"title": "Odoo ERP Developer","company":"def pvt ltd","location":"Delhi","expMin":"2","expMax":"4","payMin":"2","payMax":"4","active":"120"},{"title": "HR Manager","company":"abc pvt ltd","location":"Mumbai","expMin":"1","expMax":"5","payMin":"3","payMax":"5","active":"20"},{"title": "Odoo ERP Developer","company":"def pvt ltd","location":"Delhi","expMin":"2","expMax":"4","payMin":"2","payMax":"4","active":"120"}];

  $scope.addNewRequirement = function (requirementForm) {
    $http.get($rootScope.getIpURL).then(function(res) {
      $rootScope.ip = res.data.ip;
      //console.log('ip',$rootScope.ip);
      $scope.addNewRequirementURL = $rootScope.server + 'insert_requirement.php?ip=' + $rootScope.ip +
                                                                                '&person=' + requirementForm.person +
                                                                                '&companyName=' + requirementForm.companyName +
                                                                                '&email=' + requirementForm.email +
                                                                                '&city=' + requirementForm.city +
                                                                                '&phone=' + requirementForm.phone +
                                                                                '&enquiry=' + requirementForm.enquiry +
                                                                                '&address=' + requirementForm.address +
                                                                                '&sector=' + requirementForm.sector;
      //console.log($scope.addNewRequirementURL);
      $http.get($scope.addNewRequirementURL).then(function(res){
        $scope.requirementResponse = res;
        $scope.requirementForm = {};
        // if(res.data.status == 'S'){
        // } else if (res.data.status == 'N'){
        //   alert('Some Error Occured');
        // }
      })
    })
  }

})

app.controller('loginController', function ($rootScope, $scope, $http) {
  //console.log('loginController');
  $scope.login = function (loginProfile) {
    $scope.loginProfile = loginProfile;
    $http.get($rootScope.getIpURL).then(function(res) {
      $rootScope.ip = res.data.ip;
      //console.log('ip',$rootScope.ip);
      $rootScope.loginURL = $rootScope.server + 'login.php?ip=' + $rootScope.ip + '&email=' + $scope.loginProfile.email_id + '&password=' + $scope.loginProfile.password ;
      //console.log($rootScope.loginURL);
      $http.get($rootScope.loginURL).then(function(res){
        $rootScope.profile = res.data;
        //console.log(res);
        if ($rootScope.profile.status == 'IC'){
          //console.log('message', $rootScope.profile);
          alert('Invalid Username or Password');
        }
        if ($rootScope.profile[0].DEL_FLG == 'N'){
          //console.log('profile', $rootScope.profile);
          if ($rootScope.profile[0].user_type == 'U'){
            window.localStorage['profile'] = JSON.stringify($rootScope.profile[0]);
            window.location.href = 'index.html';
          } else if($rootScope.profile[0].user_type == 'A') {
            alert('You are Admin, you will be redirected to the Admin Page');
            window.localStorage['profile'] = JSON.stringify($rootScope.profile[0]);
            window.location.href = 'admin/index.html';
          }
        }
      })
    })
  }

  $scope.register = function (registerProfile) {
    $scope.registerProfile = registerProfile;
    $http.get($rootScope.getIpURL).then(function(res) {
      $rootScope.ip = res.data.ip;
      //console.log('ip',$rootScope.ip);
      $rootScope.registerURL = $rootScope.server + 'register.php?ip=' + $rootScope.ip + '&email=' + $scope.registerProfile.email_id + '&password=' + $scope.registerProfile.password + '&name=' + $scope.registerProfile.name + '&mobile=' + $scope.registerProfile.mobile ;
      //console.log($rootScope.loginURL);
      $http.get($rootScope.registerURL).then(function(res){
        $rootScope.registerResponse = res.data;
        if ($rootScope.registerResponse.status == 'RS'){
          alert('User Registered Successfully');
        } else {
          alert('Some Error Occured');
        }
      })
    })
  }

});

app.controller('JobsController', function($scope, $rootScope, $http, $timeout) {
  //console.log('JobsController');
  $scope.listYr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
  $scope.listMon = [0,1,2,3,4,5,6,7,8,9,10,11,12];

  $scope.addNewSkills = function (resumeForm) {
    //console.log('resumeForm');
    $http.get($rootScope.getIpURL).then(function(res) {
      $rootScope.ip = res.data.ip;

      //console.log('ip',$rootScope.ip);
      $scope.addNewSkillsURL = $rootScope.server + 'insert_skills.php?ip=' + $rootScope.ip +
                                                                                '&name=' + resumeForm.name +
                                                                                '&gender=' + resumeForm.gender +
                                                                                '&email=' + resumeForm.email +
                                                                                '&city=' + resumeForm.city +
                                                                                '&phone=' + resumeForm.phone +
                                                                                '&jobFunction=' + resumeForm.jobFunction +
                                                                                '&expYr=' + resumeForm.expYr +
                                                                                '&expMon=' + resumeForm.expMon +
                                                                                '&currentWorkLocation=' + resumeForm.currentWorkLocation +
                                                                                '&skills=' + resumeForm.skills
                                                                                '&resume=' + resumeForm.resume;
      //console.log($scope.addNewSkillsURL);
      $http.get($scope.addNewSkillsURL).then(function(res){
        $scope.resumeResponse = res;
        $scope.resumeForm = {};
        $setTimeout(function () {
          window.location.href='index.html';
        }, 100);
        // if(res.data.status == 'S'){
        //    alert('Message Sent Successfully');
        //    window.location.reload();
        // } else if (res.data.status == 'N'){
        //   alert('Some Error Occured');
        // }
      })
    })
  }
});
