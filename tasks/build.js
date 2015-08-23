
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('build', 'Run all build tasks.', function(bump) {

        var tasks = [
            'clean',
            'ngmin',
            'uglify'
        ];

        if (bump) {

            if(['patch','minor','major'].indexOf(bump) > -1) {
                tasks.unshift('bump:' + bump);
            } else {
                grunt.fail.fatal('Wrong parameter name, please use one of following options: patch, minor or major.');
            }

        } else {
            grunt.log.subhead("You can increase version number automatically using parameter :patch, :minor or :major.");
        }

        grunt.task.run(tasks);

    });

};
