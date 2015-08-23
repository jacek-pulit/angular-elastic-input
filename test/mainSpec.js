describe('puElasticInput', function() {
    'use strict';

    var scope, compileAndDigest, bodyElements;

    beforeEach(module('puElasticInput'));

    beforeEach(inject(function($rootScope, $compile, $document) {
        bodyElements = [];
        scope = $rootScope.$new();
        compileAndDigest = function(html) {
            var element = angular.element(html);
            bodyElements.push(element);
            $document[0].body.appendChild(element[0]);
            $compile(element)(scope);
            scope.$digest();

            return element;
        };
    }));

    afterEach(function() {
        scope.$destroy();
        bodyElements.forEach(function(element) {
            element.remove();
        });
    });

    function setInputValue(inputElement, value) {
        var ctrl = inputElement.controller('ngModel');
        inputElement.val(value);
        ctrl.$setViewValue(value);
    }

    describe('width', function() {

        it('increases when some text is written', function() {
            var element = compileAndDigest('<input ng-model="s" pu-elastic-input>');
            var initialWidth = element[0].offsetWidth;
            setInputValue(element, 'foobar');
            expect(element[0].offsetWidth).toBeGreaterThan(initialWidth);
        });

    });
});
