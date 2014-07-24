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
    image_resize: {
      top_banner_thing: {
        files: [
          {
            expand:true,
            flatten:true,
            src: ['../original_pictures/top/*.jpg'],
            dest: './build/images/',
            ext: '-top-fullsize.jpg'
          },
        ],
        options: {
          width: 1200,
          height: 950,
          overwrite: false,
          crop: false
        },
      },
      middle_thumbs: {
        files: [
          {
            expand:true,
            flatten:true,
            src: ['../original_pictures/middle/*.jpg'],
            dest: './build/images/',
            ext: '-middle-thumb.jpg'
          },
        ],
        options: {
          width: 600,
          height: 400,
          overwrite: false,
          crop: true,
          gravity: 'Center',
        },
      },
      middle_fullsize: {
        files: [
          {
            expand:true,
            flatten:true,
            src: ['../original_pictures/middle/*.jpg'],
            dest: './build/images/',
            ext: '-middle-fullsize.jpg'
          },
        ],
        options: {
          width: 1200,
          height: 950,
          overwrite: false,
          crop: false,
          gravity: 'Center',
        },
      },
      bottom_gallery_thumbs: {
        files: [
          {
            expand:true,
            flatten:true,
            src: ['../original_pictures/bottom_gallery/*.jpg'],
            dest: './build/images/',
            ext: '-bottom-thumb.jpg'
          },
        ],
        options: {
          width: 100,
          height: 100,
          overwrite: false,
          crop: true,
          gravity: 'Center',
        },
      },
      bottom_gallery_fullsize: {
        files: [
          {
            expand:true,
            flatten:true,
            src: ['../original_pictures/bottom_gallery/*.jpg'],
            dest: './build/images/',
            ext: '-bottom-fullsize.jpg'
          },
        ],
        options: {
          width: 1200,
          height: 950,
          overwrite: false,
          crop: false
        },
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
  grunt.loadNpmTasks('grunt-image-resize');
  
  // Task definition
  grunt.registerTask('default', ['copy', 'replace:livereload', 'less', 'concat', 'image_resize', 'watch']);
  grunt.registerTask('finalize', ['copy', 'less', 'concat', 'uglify', 'image_resize'])
};