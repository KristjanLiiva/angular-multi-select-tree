angular-multi-select-tree
=============================

Lightweight Angular multi select tree directive with arbitrary depth.

Size gzipped 3kb.

#### Demo Page:

[Demo] (http://KristjanLiiva.github.io/angular-multi-select-tree)

#### Dependencies not included in dist
* Angular - tested with 1.5.x but should work starting from 1.3.x
* Bootstrap (only css) - tested with 3.x

#### Features
```
<multi-select-tree
  data-input-model="[{'id':'','name':'',children:[]}]"
  multi-select="true"
  data-output-model="selectedItem"
  data-default-label="Nothing selected"
  data-callback="selectOnly1Or2(item, selectedItems)"
  data-select-only-leafs="false"
  data-switch-view-label="test1"
  data-switch-view="true">
</multi-select-tree>
```

#### Download:

Download dist and include
```html
<script type="text/javascript" src="../dist/angular-multi-select-tree.js"></script>
<link rel="stylesheet" href="../dist/angular-multi-select-tree.css">
```

NPM (the module is not published but can be installed from github)
```
"angular-multi-select-tree": "git+https://git@github.com/KristjanLiiva/angular-multi-select-tree.git"
```

Include it in the usual ways, and inject
```js
import multiSelectTree from 'angular-multi-select-tree';
angular.module('app', ['multi-select-tree']);
```

Example for loading CSS using webpack
webpack.conf
```js
resolve: {
    modules: ['node_modules', 'src'],
      alias: {
        'angular-multi-select-tree.css': path.join(__dirname, '../node_modules/angular-multi-select-tree/dist/angular-multi-select-tree.css')
      }
  }
```
and require in your project
```
require('angular-multi-select-tree.css');
```

#### Development
See package.json for available commands

#### License

MIT, see [LICENSE.md](./LICENSE.md).
