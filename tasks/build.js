
module.exports = function (grunt) {

    grunt.registerTask('build', [

        'clean',
        'ngmin',
        'uglify'

    ]);

};
