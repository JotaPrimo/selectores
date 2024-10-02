import { Injectable } from '@angular/core';
import { Region } from '../interfaces/country.interfaces';


// esse root indica que a mesma instancia estará a disposição
// para toda a aplicação
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania
  ];

constructor() { }

// o spread rompe as reações que existem com as regioes
// significa que se for alterado esse valor, o array original está protegido
// dessa alteração
get regions() {
  return [...this._regions];
}

}
