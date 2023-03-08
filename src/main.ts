import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  /*  
              "src/js/menu.js",
              "src/js/bootstrap.js",
              "src/js/helpers.js",
              "src/assets/js/main.js",
              "src/assets/vendor/js/menu.js",
              "src/assets/vendor/js/helpers.js",
              "src/assets/vendor/js/bootstrap.js",
              "src/assets/vendor/libs/jquery/jquery.js"
              **/