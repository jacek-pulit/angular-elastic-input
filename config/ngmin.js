
module.exports = {

    default: {
        files: [{
            expand: true,
            cwd: '<%= cfg.src %>/',
            src: '*.js',
            dest: '<%= cfg.dist %>/'
        }]
    }

};
