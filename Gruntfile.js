module.exports = function(grunt) {

  grunt.initConfig({
    clean: ['dist/*.js', 'dist/*.css', 'dist/*.html', 'dist/Procfile', 'dist/*.json'],

    // copy files that need no minification
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            cwd: 'app/partials/',
            src: ['**'],
            dest: 'dist/partials/',
            filter: 'isFile'
          },

          {
            expand: true,
            src: ['package.json', 'Procfile'],
            dest: 'dist/'
          }
        ]
      }
    },

    // minify all js
    uglify: {
      options: {
        mangle: false
      },
      everything: {
        files: {
          'dist/js/app.js': [
            'app/components/jquery/jquery.min.js',
            'app/components/angular/angular.min.js',
            'app/components/moment/min/moment.min.js',
            'app/components/underscore/underscore-min.js',
            'app/components/angular-ui-date/src/date.js',
            'app/components/angular-ui-slider/src/slider.js',
            'app/components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'app/components/angular-ui-router/release/angular-ui-router.min.js',
            'app/components/pnotify/jquery.pnotify.min.js',
            'app/components/jquery-ui/ui/jquery-ui.js',
            'app/lib/ngStorage.js',
            'app/js/app.js',
            'app/js/services.js',
            'app/js/controllers.js',
            'app/js/filters.js',
            'app/js/directives.js',
            'app/js/config.js'
          ]
        }
      }
    },

    // minify all css
    cssmin: {
      combine: {
        files: {
          'dist/css/styles.css': [
            'app/css/bootstrap-theme.min.css',
            'app/components/pnotify/jquery.pnotify.default.css',
            'app/components/pnotify/jquery.pnotify.default.icons.css',
            'app/components/jquery-ui/themes/smoothness/jquery-ui.css',
            'app/css/app.css'
          ]
        }
      }
    },

    // change the paths in index.html for css and js
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['app/index.html']
        }
      }
    },

    // start the server from the root, not the /app dir
    // therefore, make ./app -> ./
    'string-replace': {
      dist: {
        files: {
          'dist/server.js': 'server.js'
        },
        options: {
          replacements: [{
            pattern: 'app',
            replacement: ''
          }]
        }
      }
    }
  });

  // Load the plugin that provides the 'uglify' task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-string-replace');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'processhtml', 'copy', 'string-replace']);
};