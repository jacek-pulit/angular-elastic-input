
module.exports = function(grunt) {

    // Initial config
    var options = {
        pkg: grunt.file.readJSON('package.json'),

        cfg: {
            src: 'src',
            dist: 'dist'
        },

        meta: {
            banner: '/** \n' +
                    ' * <%= pkg.name %> \n' +
                    ' * <%= pkg.description %> \n' +
                    ' * @version: <%= pkg.version %> \n' +
                    ' * @author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                    ' * @license: <%= pkg.license %> \n' +
                    ' * @build: <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT Z") %> \n' +
                    ' */'
        }
    };

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Loads the various task configuration files
    var configs = require('load-grunt-configs')(grunt, options);

    // Load tasks from the tasks folder
    grunt.loadTasks('tasks');

    // Init grunt
    grunt.initConfig(configs);

};
