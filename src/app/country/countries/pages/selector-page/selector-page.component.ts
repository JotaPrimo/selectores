import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../services/countries.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, Region } from '../../../interfaces/country.interfaces';

@Component({
  selector: 'countries-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

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


  ngOnInit(): void {
    this.onRegionChange();
  }


  handleSubmit() {
    console.log("submit");
  }

  // quando alterar o valor selecionado de um elemento
  // e quiser fazer algo, precisa de um listener

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChange(): void {
    // nesse ponto o construtor já foi criado e as propriedades tmbm
    // essa logica me permite acompanhar as alterações do form
    this.myForm.get('region')!.valueChanges
    .subscribe(region => {
      console.log( {region} );
      this.countriesService.getCountriesByRegion(region)
    })
  }

}
