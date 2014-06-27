module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    copy: {
      main: {
        src: './src/*.html',
        dest: './build/',
        filter: 'isFile',
        expand: true,
        flatten:true,
      },
      fonts: {
        src: './src/fonts/*.ttf',
        dest: './build/fonts/',
        filter: 'isFile',
        expand: true,
        flatten:true,
      }
    },
    replace: {
      livereload: {
        src: ['./build/*.html'],
        overwrite: true,
        replacements: [{
          from: '<\!-- dev scripts -->',
          to: '<script src="http://localhost:35729/livereload.js"></script>'
        }]
      }
    },
    less: {
        development: {
            options: {
              compress: true,  //minifying the result
            },
            files: {
              //compiling main.less into main.css
              "./build/css/main.css":"./src/less/main.less",
            }
        }
    },
    concat: {
      options: {
        separator: ';',
      },
      js_frontend: {
        src: [
          './bower_components/jquery/dist/jquery.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './src/g-and-m.js'
        ],
        dest: './build/main.js',
      }
    },
    uglify: {
      options: {
        mangle: true  // Use if you want the names of your functions and variables unchanged
      },
      frontend: {
        files: {
          './build/main.js': './build/main.js',
        }
      },
    },
    watch: {
        js_frontend: {
          files: [
            //watched files
            './bower_components/jquery/dist/jquery.js',
            './bower_components/bootstrap/dist/js/bootstrap.js',
            './src/g-and-m.js',
            './src/default.html'
            ],   
          tasks: ['copy', 'replace:livereload', 'less', 'concat'],     //tasks to run
          options: {
            livereload: true                        //reloads the browser
          }
        },
        less: {
          files: ['./src/less/*.less'],  //watched files
          tasks: ['less'],                          //tasks to run
          options: {
            livereload: true                        //reloads the browser
          }
        },
    },
  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');
  
  // Task definition
  grunt.registerTask('default', ['copy', 'replace:livereload', 'less', 'concat', 'watch']);
  grunt.registerTask('finalize', ['copy', 'less', 'concat', 'uglify'])
};