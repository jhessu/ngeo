/**
 * @fileoverview Provides a layer tree widget directive. This directive uses
 * the "ngeoLayertreenode" directive.
 *
 * Example usage:
 *
 * <div ngeo-layertree="ctrl.tree" ngeo-layertree-map="ctrl.map"
 *      ngeo-layertree-layer="ctrl.getLayer(node)">
 * </div>
 *
 * Things to know about this directive:
 *
 * - The directive assumes that the root of the tree includes a "children"
 *   property containing tree nodes.
 *
 * - By default the directive uses "layertree.html" as its templateUrl. This
 *   can be changed by redefining the "ngeoLayertreeTemplateUrl" value.
 *
 * - The directive has its own scope, but it is not isolate scope. The name of
 *   this directive's scope, as used in the template, is "layertreeCtrl".
 *
 * - The directive creates a watcher on the "tree" expression ("ctrl.tree" in
 *   the usage example given above). Use a one-time binding expression if you
 *   know that the layer tree definition won't change:
 *
 *   <div ngeo-layertree="::ctrl.tree" ngeo-layertree-map="ctrl.map"
 *        ngeo-layertree-layer="ctrl.getLayer(node)">
 *   </div>
 */

goog.provide('ngeo.layertreeDirective');

goog.require('ngeo');
goog.require('ngeo.layertreenodeDirective');


/**
 * @const
 * @type {string}
 */
ngeo.layertreeTemplateUrl = 'layertree.html';


ngeoModule.value('ngeoLayertreeTemplateUrl',
    ngeo.layertreeTemplateUrl);


/**
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoLayertreeTemplateUrl Template URL for the directive.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 */
ngeo.layertreeDirective = function(ngeoLayertreeTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    controller: 'NgeoLayertreeController',
    templateUrl: ngeoLayertreeTemplateUrl
  };
};


ngeoModule.directive('ngeoLayertree', ngeo.layertreeDirective);



/**
 * @constructor
 * @param {angular.Scope} $scope Scope.
 * @param {angular.JQLite} $element Element.
 * @param {angular.Attributes} $attrs Attributes.
 * @ngInject
 */
ngeo.NgeoLayertreeController = function($scope, $element, $attrs) {

  var treeExpr = $attrs['ngeoLayertree'];
  var tree = /** @type {Object} */ ($scope.$eval(treeExpr));
  this['tree'] = tree;

  var mapExpr = $attrs['ngeoLayertreeMap'];
  var map = /** @type {ol.Map} */ ($scope.$eval(mapExpr));
  this['map'] = map;

  var layerExpr = $attrs['ngeoLayertreeLayer'];
  this['layerExpr'] = layerExpr;

  $scope.$watch(treeExpr, goog.bind(function(newVal, oldVal) {
    this['tree'] = newVal;
  }, this));

  $scope['uid'] = this['uid'] = goog.getUid(this);
  $scope['depth'] = 0;

  $scope['layertreeCtrl'] = this;
};


ngeoModule.controller('NgeoLayertreeController',
    ngeo.NgeoLayertreeController);
