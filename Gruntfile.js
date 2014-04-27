module.exports = function (grunt) {
    grunt.initConfig({
        // our Grunt task settings
        pkg       : grunt.file.readJSON('package.json'),
        // rackspace : grunt.file.readJSON('rackspace.json'),

        // Minify files using Uglify complier
        uglify: {
            // Settings for the build process
            // Minifies files and puts them in a build folder
            build: {
                options: {
                    sourceMap : true,
                    mangle    : true,
                    compress: {
                        drop_console: true,
                        dead_code   : true,
                        unused      : true,
                        warnings    : true
                    }
                },
                files: [{
                    expand : true,
                    cwd    : 'js/',
                    src    : ['**/*.js'],
                    dest   : 'build/js',
                    ext    : '.js'
                }]
            },
        },
        // JSHint settings
        // Refer to .jshintrc for all the options
        jshint : {
            // JSHint for the build process
            dev : {
                options : {
                    jshintrc : true,
                    reporter: require('jshint-stylish'),
                },
                all : ['js/**/*.js'],
            },
        },

        // Copy necessary files to their respective folders
        copy : {
            // Copies files for the build process
            build : {
                files : [
                    {
                        expand : true,
                        cwd : '.',
                        src : 'favicon.ico',
                        dest : 'build'
                    }
                ]
            },
        },
        // Cleans up all the files generated through Grunt
        clean : {
            build   : ['build']
        },
        // Hashes files with thier md5 and replaces them on the place
        // Also replaces references to them in the html/php files
        hashres: {
            options: {
                encoding: 'utf8',
                fileNameFormat: '${name}.${hash}.${ext}',
                renameFiles: true
            },
            // Build settings for hashing
            // hashes files in the build folder
            build: {
                options: {
                },
                src: [
                    'build/js/**/*.js',
                    'build/css/**/*.css'
                ],
                dest: ['build/*.html']
            },
        },
        connect : {
            server: {
                options: {
                    port: 9001,
                    livereload: true,
                    keepalive : true
                }
            }
        },
        watch: {
            less: {
                files: ['css/less/**/*.less','index.html'],
                tasks: ['recess:dev'],
                options: {
                    spawn: false,
                    livereload : 35729
                },
            },
            configFiles: {
                files: [ 'Gruntfile.js' ],
                options: {
                    reload: true
                }
            },
            templates: {
                files: [ 'templates/**/*.hbs' ],
                options: {
                    reload: true,
                },
                tasks: ['handlebars']
            }

        },
        recess : {
            build : {
                options : {
                    compress: true // Compress your compiled code
                },
                files : [{
                    expand: true,
                    cwd: '.',
                    src: 'css/**/*.css',
                    dest: 'build',
                    ext: '.css'
                }]
            },
            dev : {
                options : {
                    compile: true
                },
                files : [{
                    expand: true,
                    cwd: 'css/less',
                    src: '*.less',
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: "osdc"
                },
                files: {
                    "js/templates.js": "templates/**/*.hbs",
                }
            }
        }

    });

    // Loading all the tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-hashres');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    // Registering tasks
    grunt.registerTask('build', [
        'clean:build',
        'uglify:build',
        'copy:build',
        'recess:build',
        'hashres:build'
    ]);

    grunt.registerTask('stage', [
        'clean:staging',
        'uglify:staging',
        'copy:staging',
        'recess:staging',
        'hashres:staging'
    ]);

    grunt.registerTask('release', [
        'clean:release',
        'uglify:release',
        'copy:release',
        'recess:release',
        'hashres:release'
    ]);

};

