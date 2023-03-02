import { Injectable } from '@angular/core';
import { Option } from '../webshop/options';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class FilterValuesServiceService {

  abstract getValues(id: any): Observable<Option>;

}
