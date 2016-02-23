module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
      dist: {
        options: {
          sourceMap: true
        },
        src: 'src/modlog.js',
        dest: 'dist/modlog.min.js'
      }
    }
  })
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.registerTask('default', ['uglify:dist'])
}
