const sass = require("node-sass");

module.exports = grunt => {
  require("load-grunt-tasks")(grunt);

  let port = grunt.option("port") || 8000;
  let root = grunt.option("root") || ".";

  if (!Array.isArray(root)) root = [root];

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    meta: {
      banner:
        "/*!\n" +
        " * reveal.js <%= pkg.version %>\n" +
        " * http://revealjs.com\n" +
        " * MIT licensed\n" +
        " *\n" +
        " * Copyright (C) 2019 Hakim El Hattab, http://hakim.se\n" +
        " */"
    },

    uglify: {
      options: {
        banner: "<%= meta.banner %>\n",
        ie8: true
      },
      build: {
        src: "js/reveal.js",
        dest: "js/reveal.min.js"
      }
    },

    sass: {
      options: {
        implementation: sass,
        sourceMap: false
      },
      core: {
        src: "css/reveal.scss",
        dest: "css/reveal.css"
      },
      themes: {
        expand: true,
        cwd: "css/theme/source",
        src: ["*.sass", "*.scss"],
        dest: "css/theme",
        ext: ".css"
      }
    },

    autoprefixer: {
      core: {
        src: "css/reveal.css"
      }
    },

    cssmin: {
      options: {
        compatibility: "ie9"
      },
      compress: {
        src: "css/reveal.css",
        dest: "css/reveal.min.css"
      }
    },

    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        esnext: true,
        latedef: "nofunc",
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true,
        expr: true,
        loopfunc: true,
        globals: {
          head: false,
          module: false,
          console: false,
          unescape: false,
          define: false,
          exports: false,
          require: false
        }
      },
      files: ["gruntfile.js", "js/reveal.js"]
    },

    connect: {
      server: {
        options: {
          port: port,
          base: root,
          livereload: true,
          open: true,
          useAvailablePort: true
        }
      }
    },

    zip: {
      bundle: {
        src: [
          "index.html",
          "css/**",
          "js/**",
          "lib/**",
          "img/**",
          "plugin/**",
          "**.md"
        ],
        dest: "reveal-js-presentation.zip"
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: [
              "index.html",
              "css/**",
              "js/**",
              "lib/**",
              "img/**",
              "plugin/**",
              "**.md"
            ],
            dest: "dist/"
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            flatten: true,
            compress: true,
            src: [
              "node_modules/jquery/dist/jquery.min.js",
              "node_modules/ace-builds/src-noconflict/ace.js",
              "node_modules/ace-builds/src-noconflict/theme-monokai.js",
              "node_modules/ace-builds/src-noconflict/mode-html.js",
              "node_modules/ace-builds/src-noconflict/mode-css.js",
              "node_modules/ace-builds/src-noconflict/mode-javascript.js",
              "node_modules/ace-builds/src-noconflict/worker-html.js",
              "node_modules/ace-builds/src-noconflict/worker-css.js",
              "node_modules/ace-builds/src-noconflict/worker-javascript.js",
              "node_modules/album-art-component/build/album-art.js"
            ],
            dest: "plugin/"
          }
        ]
      }
    },

    watch: {
      js: {
        files: ["gruntfile.js", "js/reveal.js"],
        tasks: "js"
      },
      theme: {
        files: [
          "css/theme/source/*.sass",
          "css/theme/source/*.scss",
          "css/theme/template/*.sass",
          "css/theme/template/*.scss"
        ],
        tasks: "css-themes"
      },
      css: {
        files: ["css/reveal.scss"],
        tasks: "css-core"
      },
      test: {
        files: ["test/*.html"],
        tasks: "test"
      },
      html: {
        files: root.map(path => path + "/*.html")
      },
      markdown: {
        files: root.map(path => path + "/*.md")
      },
      options: {
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-nodeunit");
  grunt.loadNpmTasks("grunt-contrib-copy");

  // Default task
  grunt.registerTask("default", ["css", "js"]);

  // JS task
  grunt.registerTask("js", ["jshint", "uglify", "copy"]);

  // Theme CSS
  grunt.registerTask("css-themes", ["sass:themes"]);

  // Core framework CSS
  grunt.registerTask("css-core", ["sass:core", "autoprefixer", "cssmin"]);

  // All CSS
  grunt.registerTask("css", ["sass", "autoprefixer", "cssmin"]);

  // Package presentation to archive
  grunt.registerTask("package", ["default", "zip"]);

  // Serve presentation locally
  grunt.registerTask("serve", ["connect", "watch"]);

  // Run tests
  grunt.registerTask("test", ["jshint"]);

  grunt.registerTask("dist", ["default", "copy"]);
};
