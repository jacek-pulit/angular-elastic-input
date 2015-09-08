describe('puElasticInput', function() {
    'use strict';

    var scope, compileAndDigest, bodyElements, lastChild;

    beforeEach(module('puElasticInput'));

    beforeEach(inject(function($rootScope, $compile, $document) {
        bodyElements = [];
        lastChild = $document[0].body.lastChild;
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
        while (lastChild.nextSibling) {
            lastChild.parentNode.removeChild(lastChild.nextSibling);
        }
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

        it('returns to its initial value when input value is cleared', function() {
            scope.s = 'foobar';
            var element = compileAndDigest('<input ng-model="s" pu-elastic-input>');
            var emptyElement = compileAndDigest('<input ng-model="e" pu-elastic-input>');
            expect(element[0].offsetWidth).toBeGreaterThan(emptyElement[0].offsetWidth);
            setInputValue(element, '');
            expect(element[0].offsetWidth).toBe(emptyElement[0].offsetWidth);
        });

        it('is affected by the font size', function() {
            var largeFontSizeElement =
                compileAndDigest('<input ng-model="l" pu-elastic-input style="font-size: 50px">');
            var smallFontSizeElement = compileAndDigest('<input ng-model="s" pu-elastic-input>');
            setInputValue(largeFontSizeElement, 'foobar');
            setInputValue(smallFontSizeElement, 'foobar');
            expect(largeFontSizeElement[0].offsetWidth).toBeGreaterThan(smallFontSizeElement[0].offsetWidth);
            expect(largeFontSizeElement[0].clientWidth).toBeGreaterThan(largeFontSizeElement[0].scrollWidth);
        });

        it('takes into account the padding and border when box-sizing: border-box is used', function() {
            var t, borderBoxElement, componentBoxElement;
            t = '<input ng-model="bb" pu-elastic-input style="box-sizing: border-box;  padding: 50px; border: 20px solid black;">';
            borderBoxElement = compileAndDigest(t);
            t = '<input ng-model="cb" pu-elastic-input style="box-sizing: content-box; padding: 50px; border: 20px solid black;">';
            componentBoxElement = compileAndDigest(t);

            setInputValue(borderBoxElement, 'foobar');
            setInputValue(componentBoxElement, 'foobar');

            expect(borderBoxElement[0].offsetWidth).toBe(componentBoxElement[0].offsetWidth);
        });

        it('increases when spaces are written', function() {
            var element = compileAndDigest('<input ng-model="s" pu-elastic-input>');
            var initialWidth = element[0].offsetWidth;
            setInputValue(element, '      ');
            expect(element[0].offsetWidth).toBeGreaterThan(initialWidth);
        });

    });
});
