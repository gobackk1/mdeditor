const mix = require('laravel-mix');

mix.sass('resources/sass/app.scss', 'public/css')
  .options({
    processCssUrls: false,
    postCss:[
      require('autoprefixer')({ grid:true }),
      require('css-declaration-sorter')({
          order: 'smacss'
        }),
      require('css-mqpacker')()
    ]
  });

mix.browserSync({
    host: '192.168.33.10',
    proxy: {
        target: "http://192.168.33.10:8000",
        ws: true
    },
    browser: "google chrome",
    files: [
       './**/*.css',
       './app/**/*',
       './config/**/*',
       './resources/views/**/*.blade.php',
       './resources/sass/*.scss',
       './resources/js/**/*',
       './resources/views/*.blade.php',
       './routes/**/*'
    ],
    watchOptions: {
      usePolling: true,
      interval: 100
    },
    reloadOnRestart: true
  })
  .js('resources/js/app.js', 'public/js')
  // .sass('resources/sass/app.scss', 'public/css')
  .version();
