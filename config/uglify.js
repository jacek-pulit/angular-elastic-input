
module.exports = {

    options: {
        banner: "<%= meta.banner %>\n(function(){\n",
        footer: "\n})();"
    },

    default: {
        files: [{
            expand: true,
            cwd: '<%= cfg.dist %>/',
            src: '*.js',
            dest: '<%= cfg.dist %>/',
            ext: '.min.js'
        }]
    }

};
