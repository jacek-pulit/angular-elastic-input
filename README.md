# Angular Elastic Input [![Build Status](https://travis-ci.org/jacek-pulit/angular-elastic-input.svg?branch=master)](https://travis-ci.org/jacek-pulit/angular-elastic-input)

A directive for AngularJS which automatically resizes the width of input field according to the content, while typing.

## Installation

Download archive file above or install using bower:
```
bower install angular-elastic-input --save
```

Include the script tag on your page after the AngularJS script tags:
```html
<script src="path/to/angular-elastic-input.min.js"></script>
```

Ensure that your application module specifies puElasticInput as a dependency:
```javascript
angular.module('myApp', ['puElasticInput']);
```

Use the directive by specifying an pu-elastic-input attribute on an input element:
```html
<input type="text" pu-elastic-input/>
```

## Demo

Do you want to see Angular Elastic Input in action?

Visit http://jacek-pulit.github.io/angular-elastic-input/

## Options

Minimum and maximum width you can specify as css properties: min-width and max-width

```html
<input type="text" pu-elastic-input style="min-width: 200px; max-width: 400px;"/>
```

or as element attributes: pu-elastic-input-minwidth and pu-elastic-input-maxwidth

```html
<input type="text" pu-elastic-input pu-elastic-input-minwidth="300px" pu-elastic-input-maxwidth="none"/>
```
### Defaults

min-width: 0

max-width: inner width of parent element

## License

Angular Elastic Input is licensed under the MIT license. See the LICENSE file for more details.

