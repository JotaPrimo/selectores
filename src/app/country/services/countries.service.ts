import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, combineLatest, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


// esse root indica que a mesma instancia estará a disposição
// para toda a aplicação
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  readonly URL_COUNTRY_SERVICE: string = 'https://restcountries.com/v3.1';

  private _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania
  ];

  constructor(
    private httpCliente: HttpClient
  ) { }

  // o spread rompe as reações que existem com as regioes
  // significa que se for alterado esse valor, o array original está protegido
  // dessa alteração
  get regions() {
    return [...this._regions];
  }

  getCountriesByRegion( region: Region ): Observable<SmallCountry[]> {
    if ( !region ) return of([]);

    const url: string = `${ this.URL_COUNTRY_SERVICE }/region/${ region }?fields=cca3,name,borders`;

    return this.httpCliente.get<Country[]>(url)
      .pipe(
        map( countries => countries.map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        }))),
      )
  }
  
  getCountryByAlphaCode( alphaCode: string ): Observable<SmallCountry> {
    const url = `${ this.URL_COUNTRY_SERVICE }/alpha/${ alphaCode }?fields=cca3,name,borders`;
    return this.httpCliente.get<Country>( url )
      .pipe(
        map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
      )
  }

  getCountryBordersByCodes( borders: string[] ): Observable<SmallCountry[]> {
    if ( !borders || borders.length === 0 ) return of([]);

    const countriesRequests:Observable<SmallCountry>[]  = [];

    borders.forEach( code => {
      const request = this.getCountryByAlphaCode( code );
      countriesRequests.push( request );
    });


    return combineLatest( countriesRequests );
  }

}
