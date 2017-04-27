define(['app', 'css!common/overlayMaker/overlayMaker.css?'], function(app) {
    app.provider('overlayMaker', function() {
        var _parent =  document.getElementsByTagName('body')[0];
        var _bg = 'rgba(0,0,0,.6)';
        // var template = '<span>no template</span>';
        this.$get = ['$rootScope', '$sce', '$compile', '$templateCache', '$templateRequest', '$http', '$q', '$timeout', function($rootScope, $sce, $compile, $templateCache, $templateRequest, $http, $q, $timeout) {
            /**
             * 
             * @param {dom} parent 遮罩父级容器 默认 body
             * @param {string} bg 背景颜色 默认 'rgba(0,0,0, .6)'
             * @param {
             *  object{duration:xx;, easing:'xxx'}},
             *  animation  遮罩层的动画设置，默认
             *      {
             *         duration: 300 //ms
             *         easing: 'linear'
             *      }
             * }
             */
            var showOverLay = function(config) {
                var scope = config.scope;
                var controller = config.controller;
                var templateUrl = config.templateUrl || '';
                var parent = config.parent;
                var animation = config.animation;
                if ($rootScope.overlay_count > 1) 
                    throw new Error('遮罩层数量超出预期，先关闭已经打开的遮罩层');
                return new Layer(scope, controller,  templateUrl, parent, animation);
            }

            /**
             * 
             * @param {*} parent 可以指定loading层的父容器
             */
            var loading = function(parent) {
                var scope = { overlayContentLoading: true };
                var animation = {animationDuration: '0s'};
                var parent = parent || document.querySelector('body');
                return new Layer(scope, null,  null, parent, animation);
            }
                        

            function Layer(scope, controller, templateUrl, parent, animation) {
                var _this = this;
                var prefix = 'overlay_';
                this.id = prefix + new Date().valueOf();
                parent = parent || _parent;
                this.parentFlexed = setNewStyle(parent, 'display', 'flex');
                this.parentPosition = setNewStyle(parent, 'position', 'relative');
                var layer = document.createElement('div');
                layer.id = this.id;
                layer.className = 'overlay-wrapper';
                /**默认dom动画在css中，这边可以用自定义动画覆盖 */
                if (animation) {
                    (angular.isNumber(animation.animationDuration) || 
                    animation.animationDuration) && (layer.style.animationDuration = animation.animationDuration);
                    animation.animationDirection && (layer.style.animationDirection = animation.animationDirection);
                    animation.animationName && (layer.style.animationName = animation.animationName);
                    animation.animationTimingFunction && (layer.style.animationTimingFunction = animation.animationTimingFunction);
                }
                layer.style.position = 'absolute';
                // layer.style.backgroundColor = 'bg';
                //开始loading
                var template = $templateRequest('common/overlayMaker/templates.html').then(function(template) {
                    getTemplate(templateUrl).then(function(customizedTemplate) {
                        //结束loading
                        layer.innerHTML = template;
                        var content = layer.children[0];//.overlay-content
                        var customizedHTML = document.createElement('div');
                        customizedHTML.className = 'customize-overlay-content';
                        customizedHTML.innerHTML = customizedTemplate || '';
                        content.appendChild(customizedHTML);
                        var scope2 = $rootScope.$new();
                        var initialProperties = {
                            overlayContentLoading: false,//loading
                            $close: function() {
                                _this.hide();//关闭
                            },
                            $loading: function() {
                                this.overlayContentLoading = true;
                            },
                            $loaded: function() {
                                this.overlayContentLoading = false;
                            }
                        };
                        this.scope = scope2;
                        var scope2 = angular.extend(scope2, initialProperties);
                        if (angular.isObject(scope)) {
                            angular.extend(scope2, scope);
                        }                                 
                        $timeout(function() {
                            $rootScope.overlay_count += 1;
                            if (angular.isFunction(controller)) {
                                controller(scope2);
                            }
                            $compile(layer.childNodes)(scope2);                           
                        });
                        parent.appendChild(layer);
                    }); 

                    function getTemplate(templateUrl) {
                        var defer = $q.defer();
                        if (!templateUrl) {
                            defer.resolve('');
                        } else {
                            $templateRequest(templateUrl).then(function(tpl) {
                                defer.resolve(tpl);
                            });
                        }
                        return defer.promise;
                    }
                });
            }
             
             Layer.prototype.hide = function() {
                var that = this;
                var layer = document.getElementById(this.id);
                if (layer) {
                    layer.className += ' fade';
                    setTimeout(function() {
                        that.parentFlexed.reverse();
                        that.parentPosition.reverse();                        
                        layer.remove();
                        $rootScope.overlay_count -= 1;
                    });
                }         
             }

             Layer.prototype.loading = function() {
                 this.scope.$loading();
             }

             Layer.prototype.loaded = function() {
                 this.scope.$loaded();
             }

            /**
             * 
             * @param {[object Dom]} element 
             * @param {string} style 需要设置的属性值(eg: 'backgroundColor')
             * @param {string} value 给属性设置的新值
             * @returns Object{ reverse: Fn } 带有一个可以原路返回被改变样式的实例
             */
            function setNewStyle(element, style, value) {
                function styleModifier() {
                    this.element = element;
                    this.style = style;
                    this.oldStyleValue = window.getComputedStyle(element)[style];
                    element.style[style] = value;
                }
                styleModifier.prototype.reverse = function() {
                    this.element.style[this.style] = this.oldStyleValue;
                }
                return new styleModifier();
            }
            return {
                make: showOverLay,
                loading: loading
            }
        }];
    });
});