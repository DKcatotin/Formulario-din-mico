import { bootstrapApplication } from '@angular/platform-browser';
import { DynamicFormComponent } from './app/dynamic-form/dynamic-form.component';

bootstrapApplication(DynamicFormComponent)
  .catch(err => console.error(err));
