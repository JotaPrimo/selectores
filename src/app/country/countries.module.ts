import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// componentes
import { SelectorPageComponent } from './index';
import { CountriesRoutingModule } from './countries-routing.module';

@NgModule({
  declarations: [
    SelectorPageComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule
  ]
})
export class CountriesModule { }
