export const environment = {
  production: false,
  'sspa-apps-map': {
    'single-spa-angular': 'http://localhost:20222/main.js',
    '@actionanand/single-spa-react': 'http://localhost:20223/actionanand-single-spa-react.js',
    '@actionanand/single-spa-vue': 'http://localhost:20224/js/app.js',
    '@actionanand/single-spa-svelte': 'http://localhost:20225/actionanand-single-spa-svelte.js',
    '@actionanand/single-spa-footer': 'http://localhost:20226/actionanand-single-spa-footer.js',
    '@actionanand/single-spa-404': 'http://localhost:20227/actionanand-single-spa-404.js',
    '@actionanand/single-spa-vanilla-js': 'http://localhost:20228/index.js',
    '@actionanand/utility': 'http://localhost:20229/actionanand-utility.js',
    'single-spa-sidebar': 'http://localhost:20251/main.js',
  } as { [key: string]: string },
};
