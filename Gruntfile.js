
module.exports = function(grunt) {

    var config;
    try {
        config = require('./config');
    } catch(ex) {
        config = {};
        grunt.log.writeln('WARNING: config.js does not exist');
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            publicDir: config.publicDir,
            staticDir: config.staticDir,
            jsTplDir: "js/<%= pkg.name %>/tpl",
            jsComponentDir: "js/component",
            targetDir: 'target',
            distDir: '.dist',
            releaseDir: 'dist',
            originDir: 'origin'
        },

        clean: {
            jsTpl: ["<%= meta.jsTplDir %>/"],
            jsComponent: ["<%= meta.jsComponentDir %>/"],
            cssComponent: ["css/*/**", "!css/appname/**"],
            origin_arkui: ["<%= meta.originDir %>/arkui/css/"],
            pub_static: ["<%= meta.staticDir %>/"],
            pub_html: ["<%= meta.publicDir %>/**/*.html"],
            target_js: ["<%= meta.targetDir %>/js"],
            target_css: ["<%= meta.targetDir %>/css"],
            target_pics: ["<%= meta.targetDir %>/pics"],
            dist: ["<%= meta.distDir %>"]
        },

        dispatch: {
            options: {
                directory: "bower_components"
            },
            "ozjs": {
                use: {
                    "<%= meta.jsComponentDir %>/": "oz.js"
                }
            },
            "mo": {
                use: {
                    "<%= meta.jsComponentDir %>/mo/": ["**/*.js", "!**/Gruntfile.js"]
                }
            },
            "eventmaster": {
                use: {
                    "<%= meta.jsComponentDir %>/": "eventmaster.js"
                }
            },
            "nerv": {
                use: {
                    "<%= meta.jsComponentDir %>/": "nerv.js"
                }
            },
            "dollar": {
                use: {
                    "<%= meta.jsComponentDir %>/": "**/*.js"
                }
            },
            "soviet": {
                use: {
                    "<%= meta.jsComponentDir %>/": "soviet.js"
                }
            },
            "moui": {
                use: [{
                    cwd: "css/moui",
                    src: ["**"],
                    dest: "css/moui/"
                }, {
                    cwd: "asset",
                    src: ["**"],
                    dest: "pics/"
                }, {
                    src: ["**/*.js", "!**/Gruntfile.js"],
                    dest: "<%= meta.jsComponentDir %>/moui/"
                }]
            },
            "arkui": {
                use: [{
                    src: "**",
                    dest: "origin/arkui/"
                }, {
                    cwd: "pics",
                    src: "**",
                    dest: "pics/"
                }]
            }
        },

        shell: {
            make_arkui: {
                command: [
                    'mkdir <%= meta.originDir %>/arkui/css/',
                    "stylus <%= meta.originDir %>/arkui/stylus/ -o <%= meta.originDir %>/arkui/css/"
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        },

        furnace: {
            tpl: {
                options: {
                    importas: 'tpl',
                    exportas: 'amd'
                },
                files: [{
                    expand: true,     // Enable dynamic expansion.
                    cwd: 'tpl/',
                    src: ['**/*.tpl'], // Actual pattern(s) to match.
                    dest: '<%= meta.jsTplDir %>/',   // Destination path prefix.
                    ext: '.js'
                }]
            }
        },

        ozma: {
            main: {
                saveConfig: false,
                src: 'js/main.js',
                config: {
                    baseUrl: "<%= meta.jsComponentDir %>/",
                    distUrl: "<%= meta.targetDir %>/<%= meta.jsComponentDir %>/",
                    loader: "oz.js",
                    disableAutoSuffix: true
                }
            }
        },

        compass: {
            main: {
                options: {
                    config: 'css/config.rb',
                    sassDir: 'css',
                    cssDir: '<%= meta.targetDir %>/css',
                    imagesDir: '<%= meta.targetDir %>/pics',
                    relativeAssets: true,
                    outputStyle: 'expanded',
                    noLineComments: false,
                    require: [
                        'compass-normalize',
                        'ceaser-easing',
                        'animate',
                        'compass-recipes'
                    ],
                    environment: 'production'
                }
            }
        },

        imagemin: {
            main: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'pics/',
                    src: ['**/*.{png,jpg}'],
                    dest: '<%= meta.targetDir %>/pics/'
                }]
            }
        },

        htmlmin: {
            main: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'docs/',
                    src: ['**/*.html'],
                    dest: '<%= meta.publicDir %>/'
                }]
            }
        },

        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> */\n'
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.targetDir %>/js/',
                    src: ['**/*.js'],
                    dest: '<%= meta.distDir %>/js/'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.targetDir %>/css/',
                    src: ['**/*.css'],
                    dest: '<%= meta.distDir %>/css/'
                }]
            }
        },

        uglify: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.distDir %>/js/',
                    src: ['**/*.js'],
                    dest: '<%= meta.distDir %>/js/',
                    ext: '.min.js'
                }]
            }
        },

        cssmin: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.distDir %>/css/',
                    src: ['**/*.css'],
                    dest: '<%= meta.distDir %>/css/',
                    ext: '.min.css'
                }]
            }
        },

        copy: {
            origin_to_scss: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.originDir %>/arkui/css/',
                    src: ['**/*.css'],
                    dest: 'css/arkui/',
                    rename: function(dest, src) {
                        return dest 
                            + src.replace(/([^\/\\]+)\.css$/, '_$1.scss');
                    }
                }]
            },
            target_to_pub: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.targetDir %>/',
                    src: ['**'],
                    dest: '<%= meta.staticDir %>/'
                }]
            },
            dist_to_pub: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.distDir %>/',
                    src: ['**'],
                    dest: '<%= meta.staticDir %>/'
                }]
            },
            release_to_pub: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.releaseDir %>/',
                    src: ['**'],
                    dest: '<%= meta.staticDir %>/'
                }]
            },
            restore: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.releaseDir %>/',
                    src: ['**'],
                    dest: '<%= meta.distDir %>/'
                }]
            },
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.distDir %>/',
                    src: ['**'],
                    dest: '<%= meta.releaseDir %>/'
                }]
            }
        },

        jshint: {
            options: grunt.file.readJSON('jshint.json'),
            dev: {
                options: {
                    devel: true,
                    debug: true,
                    asi: true 
                },
                files: {
                    src: ['./*.js', 'js/**/*.js', '!<%= meta.jsComponentDir %>/**', '!<%= meta.jsTplDir %>/**']
                }
            },
            dist: {
                files: {
                    src: ['./*.js', 'js/**/*.js', '!<%= meta.jsComponentDir %>/**', '!<%= meta.jsTplDir %>/**']
                }
            }
        },

        complexity: {
            generic: {
                src: ['js/<%= pkg.name %>/*.js', '!<%= meta.jsTplDir %>/**'],
                options: {
                    cyclomatic: 10,
                    halstead: 25,
                    maintainability: 100
                }
            }
        },

        connect: {
            pub: {
                options: {
                    hostname: 'localhost',
                    port: 9001,
                    base: '<%= meta.publicDir %>/',
                    keepalive: true
                }
            }
        },

        watch: {
            js: {
                files: ['js/**/*.js', '!<%= meta.jsTplDir %>/**'],
                tasks: [
                    'dev:js',
                    'test'
                ]
            },
            css: {
                files: ['css/**/*.scss'],
                tasks: [
                    'dev:css',
                    'test'
                ]
            },
            tpl: {
                files: ['tpl/**/*.tpl'],
                tasks: [
                    'dev:tpl',
                    'test'
                ]
            },
            img: {
                files: ['pics/**/*.{png,jpg}'],
                tasks: [
                    'dev:img',
                    'test'
                ]
            },
            html: {
                files: ['docs/**/*.html'],
                tasks: [
                    'dev:html'
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-complexity');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-furnace');
    grunt.loadNpmTasks('grunt-ozjs');
    grunt.loadNpmTasks('grunt-dispatch');
    
    grunt.registerTask('dev:js', [
        'clean:target_js', 
        'ozma',
    ]);

    grunt.registerTask('dev:css', [
        'clean:target_css', 
        'compass',
    ]);

    grunt.registerTask('dev:html', [
        'clean:pub_html',
        'htmlmin'
    ]);

    grunt.registerTask('dev:img', [
        'clean:target_pics', 
        'imagemin', 
        'dev:css'
    ]);

    grunt.registerTask('dev:tpl', [
        'clean:jsTpl',
        'furnace:tpl', 
        'dev:js'
    ]);

    grunt.registerTask('update', [
        'clean:jsComponent',
        'clean:cssComponent',
        'dispatch'
    ]);

    grunt.registerTask('build_components', [
        'clean:origin_arkui',
        'shell:make_arkui',
        'copy:origin_to_scss',
    ]);

    grunt.registerTask('dev', [
        'dev:tpl',
        'dev:img',
        'dev:html'
    ]);

    grunt.registerTask('test', [
        'clean:pub_static',
        'copy:target_to_pub'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concat',
        'uglify', 
        'cssmin'
    ]);

    grunt.registerTask('restore', [
        'clean:pub_static',
        'copy:release_to_pub',
        'clean:dist',
        'copy:restore'
    ]);

    grunt.registerTask('default', [
        'build_components',
        'jshint:dist',
        'dev',
        'restore'
    ]);

    grunt.registerTask('publish', [
        'build_components',
        'jshint:dist',
        'dev',
        'build',
        'copy:release',
        'restore'
    ]);

    grunt.registerTask('deploy', [
        'clean:pub_static',
        'copy:dist_to_pub'
    ]);

};
