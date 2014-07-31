module.exports = function(grunt) {
  var taskName;
  var pkg = grunt.file.readJSON('package.json');
  for(taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }

  grunt.initConfig({
    connect: {
      livereload: {
        options: {
          port: 9001
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= connect.livereload.options.port %>'
      }
    },

    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    uglify: {
      build : {
       src : 'common/js/script.js',
       dest : 'common/js/script.min.js'
      }
    },

    watch: {
      options: {
        livereload: true,
        nospawn: true
      },
      html: {
        files: '*.html',
        tasks: []
      },
      php:{
        files:'*.php',
        tasks: []
      },
      css:{
        files:'*.css',
        tasks: []
      },
      scss:{
        files:'common/scss/*.scss',
        tasks:['compass']
      },
      scripts: {
        files: 'common/js/script.js',
        tasks: ['uglify']
      }
    }
  });

  grunt.registerTask('default', [ 'connect' , 'open' , 'watch' , 'compass', 'uglify' ]);
  grunt.registerTask('dist', [ 'watch' , 'compass', 'uglify' ]);
};