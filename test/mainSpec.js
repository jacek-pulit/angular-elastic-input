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
        ctrl.$render();
    }

    function triggerEvent(element, eventName) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, true);
        element[0].dispatchEvent(event);
    }

    describe('width', function() {

        it('increases when some text is written', function() {
            var element = compileAndDigest('<input ng-model="s" pu-elastic-input>');
            var initialWidth = element[0].offsetWidth;
            setInputValue(element, 'foobar');
            expect(element[0].offsetWidth).toBeGreaterThan(initialWidth);
        });

        it('is changed when model is changed in scope', function() {
            var element = compileAndDigest('<input ng-model="s" pu-elastic-input>');
            var initialWidth = element[0].offsetWidth;
            scope.s = 'foobar';
            scope.$digest();
            expect(element[0].offsetWidth).toBeGreaterThan(initialWidth);
        });

        it('is changed when ngModelOptions.updateOn event is triggered', function() {
            var t = '<input ng-model="s" ng-model-options="{updateOn: \'blur\'}" pu-elastic-input>';
            var element = compileAndDigest(t);
            var initialWidth = element[0].offsetWidth;
            setInputValue(element, 'foobar');
            expect(element[0].offsetWidth).toBe(initialWidth);
            triggerEvent(element, 'blur');
            expect(element[0].offsetWidth).toBeGreaterThan(initialWidth);
        });

        it('is changed to fit the placeholder', function() {
            var regularElement =
                compileAndDigest('<input ng-model="s" pu-elastic-input>');
            var placeholderElement =
                compileAndDigest('<input ng-model="s" placeholder="foobar" pu-elastic-input>');
            expect(placeholderElement[0].offsetWidth).toBeGreaterThan(regularElement[0].offsetWidth);
        });

        it('cannot be less than minWidth', function() {
            var style = 'min-width: 100px; padding:0; margin:0; border:none';
            var element =
                compileAndDigest('<input ng-model="s" style="' + style + '" pu-elastic-input>');
            expect(element[0].clientWidth).toBe(100);
            setInputValue(element, 'foobar_foobar_foobar_foobar_foobar');
            expect(element[0].clientWidth).toBeGreaterThan(100);
        });

        it('cannot be more than maxWidth', function() {
            var style = 'max-width: 100px; padding:0; margin:0; border:none';
            var element =
                compileAndDigest('<input ng-model="s" style="' + style + '" pu-elastic-input>');
            expect(element[0].clientWidth).toBeLessThan(100);
            setInputValue(element, 'foobar_foobar_foobar_foobar_foobar');
            expect(element[0].clientWidth).toBe(100);
        });

    });
});
