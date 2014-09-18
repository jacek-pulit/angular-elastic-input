
module.exports = {

    options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
    },

    default: {
        src: [
            '<%= cfg.src %>/*.js'
        ]
    }

};
