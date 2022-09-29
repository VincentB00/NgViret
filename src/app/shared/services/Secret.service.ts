import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValueOption } from '../models/secret.model';

@Injectable({
  providedIn: 'root'
})
export class SecretService {

  constructor(private httpClient: HttpClient) { }

  public generateSecret(valueOption: ValueOption): Observable<{secret: string}>
  {
    return this.httpClient.post<{secret: string}>(`${environment.api}/secrets`, valueOption);
  }
}
