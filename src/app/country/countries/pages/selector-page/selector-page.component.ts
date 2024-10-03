import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../services/countries.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, Region, SmallCountry } from '../../../interfaces/country.interfaces';
import { switchMap } from 'rxjs';

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

  public countriesByRegion: SmallCountry[] = [];

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
      .pipe(
        // o switchMap faz subscrib imediatamente quando o é disparado um novo observable
        // é util quando queremos garantir que apenas um observable seja exetuado
        // como no caso da busca, todo novo valor enviado executaria um novo observable
        // o problema é que pode ser executado um observable antes do anterior ser executado
        // esse é o problema que o switchMap resolve
        switchMap(region => this.countriesService.getCountriesByRegion(region))
      )
      .subscribe(res => {
        console.log(res);
        this.countriesByRegion = res;
      })
  }

}
