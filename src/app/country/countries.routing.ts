import { Routes } from '@angular/router';

import { SelectorPageComponent } from './countries/pages/selector-page/selector-page.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'selector', component: SelectorPageComponent },
      { path: '**', redirectTo: 'selector' },
    ]
  }
];
