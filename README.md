# angularjs-fuzzysearch
Fuzzy search filter for Angular JS

## Usage:

Include "fuzzy-search.js" script into your HTML page and a fuzzySearch module to your app dependencies:

```
var angular.module('app', ['fuzzySearch']);
```

Use fuzzy as a regular AngularJS filter in HTML, for example:
```
    <div ng-controller="mainController as main">
      <input type="text" ng-model="pattern"/>
      <div ng-repeat="item in main.items | fuzzy:pattern">{{item}}</div>
    </div>
```
