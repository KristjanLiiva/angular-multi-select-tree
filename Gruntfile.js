module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  var _ = require('lodash');
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var path = require('path');

  var karmaConfig = function(configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
    return _.extend(options, customOptions, travisOptions);
  };

  var mountFolder = function (connect, dir) {
    var _staticPath = path.resolve(dir);
    return [serveStatic(_staticPath), serveIndex(_staticPath)];
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'src/**/*.html', 'src/**/*.less', 'demo/**/*.html', 'demo/**/*.js'],
        tasks: ['update-dist']
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        eqeqeq: true,
        globals: {
          angular: true
        }
      }
    },
    concat: {
      js: {
        src: ['src/**/*.js', '.tmp/**/*.js'],
        dest: 'dist/angular-multi-select-tree.js'
      },
      css: {
        src: ['src/**/*.css', 'src/**/*.less'],
        dest: 'dist/angular-multi-select-tree.css'
      }
    },
    ngtemplates: {
      'multi-select-tree': {
        src: 'src/**/*.html',
        dest: '.tmp/angular-multi-select-tree.tpl.js'
      }
    },
    uglify: {
      src: {
        files: {
          'dist/angular-multi-select-tree.min.js': '<%= concat.js.dest %>'
        }
      }
    },

    // connect
    connect: {
      options: {
        port: 3000,
        livereload: 93729,
        hostname: '0.0.0.0'
      },
      demo: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '')
            ];
          }
        }
      }
    },

    // open
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>/demo/'
      }
    },

    karma: {
      unit: {
        options: karmaConfig('karma.conf.js', {
          singleRun: true
        })
      },
      server: {
        options: karmaConfig('karma.conf.js', {
          singleRun: false
        })
      }
    },
    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    },
    ngmin: {
      src: {
        src: '<%= concat.js.dest %>',
        dest: '<%= concat.js.dest %>'
      }
    },
    cssmin: {
        css: {
          src: '<%= concat.css.dest %>',
          dest: 'dist/angular-multi-select-tree.min.css'
        }
    },
    clean: ['dist/*']
  });

  grunt.registerTask('default', ['dev']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('test-server', ['karma:server']);
  grunt.registerTask('update-dist', ['clean', 'concat', 'ngtemplates']);
  grunt.registerTask('server', ['open', 'connect:demo', 'watch']);
  grunt.registerTask('dev', ['update-dist', 'server']);
  grunt.registerTask('build', ['clean', 'jshint', 'concat', 'ngtemplates', 'ngmin', 'cssmin', 'uglify']);

};
