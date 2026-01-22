import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Import Zone.js directly
import 'zone.js';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
