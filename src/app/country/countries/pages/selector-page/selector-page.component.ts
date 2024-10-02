import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../services/countries.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Region } from '../../../interfaces/country.interfaces';

@Component({
  selector: 'countries-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent {

  // crie um form com validação para 3 campos region: country, borders, todos devem ser required
  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) { }


  handleSubmit() {
    console.log("submit");
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

}
