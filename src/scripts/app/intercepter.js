define(['app'], function(app) {
    app.factory('myHttpInterceptor', ['$q','$cookies', function($q, $cookies) {
        return {
          'request': function(config) {
                  // TODO: 过滤所有url,如果是需要加小尾巴的加上小尾巴
                  if (config.url.indexOf('.html') > 0 && HashStaticFile) {
                      config.url = HashStaticFile(config.url);
                  }
              if (config.url.indexOf('api/') >= 0) {
                  var token = $cookies.get("sessionToken");
                  if (token) {
                      token = token.replace('/^"$/','');
                  } else {
                      token = '';
                  }
                  config.headers["F-Session"] = token;
                  config.cache = false;

                  // do something on success
              }
                return config;
          },

         'requestError': function(rejection) {
            if (canRecover(rejection)) {
              return responseOrNewPromise
            }
            return $q.reject(rejection);
          },
          'response': function(response) {
                if (response.data && response.data.error && response.data.error.code) {
                    // TODO: auth fail, jump to login
                    if(response.data.error.code == 100313 || (response.data.error.code == 100103 && !response.config.headers['F-Session'])) {
                        // TODO: 无权限时,跳转重新登录
                        console.log("response with error:",response);
                        $.cookie("sessionToken", '');
                        window.location.href="index.html";
                    }

                }
            return response;
          },
          // optional method
         'responseError': function(rejection) {
                if (rejection.data) {
                    console.log("responseError:",rejection.data,rejection);
                }
           return rejection;
          }
        };
    }]);

    app.config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.transformRequest.unshift( function(obj, headersGetter){
          var content_type = headersGetter('content-type') || '';
          if (content_type.indexOf('application/json') >= 0) {
              return obj;
          }
          if (typeof obj === "string") {
              return obj;
          }
          var str = [];
          for(var p in obj){
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
      });

      $httpProvider.interceptors.push('myHttpInterceptor');
    }]);
});