orgApp.directive('fileModel', ['$parse', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function() {
        scope.$apply(function() {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);

orgApp.directive('orgchart', function() {
    return {
        restrict: 'AE',
        scope: {
            source     : '=',
            container  : '=',
            stack      : '=',
            depth      : '=',
            interactive: '=',
            showLevels : '=',
            clicked    : '=' // We use '=' here rather than '&' for this callback function
        },
        link: function(scope, element, attrs) {
            var target = $(element);
            var source = $('#' + scope.source);
            var options = {
                container  : target,
                nodeClicked: scope.clicked,
                stack      : scope.stack,
                depth      : scope.depth,
                interactive: scope.interactive,
                showLevels : scope.showLevels
            };
            source.orgChart(options);
        }
    };
});
