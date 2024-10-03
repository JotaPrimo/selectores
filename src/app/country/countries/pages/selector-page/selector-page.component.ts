import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../services/countries.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, Region, SmallCountry } from '../../../interfaces/country.interfaces';
import { Observable, filter, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'countries-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  // crie um form com validação para 3 campos region: country, border, todos devem ser required
  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
  ) { }


  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  handleSubmit() {
    console.log("submit");
  }

  // quando alterar o valor selecionado de um elemento
  // e quiser fazer algo, precisa de um listener

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.borders = []),
        switchMap((region) => this.countriesService.getCountriesByRegion(region)),
      )
      .subscribe(countries => {
        this.countriesByRegion = countries;
      });
  }

  onCountryChanged(): void {
    this.myForm.get('country')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value: string) => value.length > 0),
        switchMap((alphaCode) => this.countriesService.getCountryByAlphaCode(alphaCode)),
        switchMap((country) => this.countriesService.getCountryBordersByCodes(country.borders)),
      )
      .subscribe(countries => {
        this.borders = countries;
      });
  }
}
