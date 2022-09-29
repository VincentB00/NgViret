import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item.model';
import { Response } from '../models/user.model';
import { EncryptionService } from './encryption.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class ItemService 
{
  
  constructor(private httpClient: HttpClient, private userService: UserService, private es: EncryptionService) { }

  getAll(groupID: number): Observable<Item[]>
  {
    return this.httpClient.get<Item[]>(`${environment.api}/items/${groupID}`);
  }

  createNewItem(item: Item): Observable<Item>
  {
    item = this.es.encryptObject(structuredClone(item));
    return this.httpClient.post<Item>(`${environment.api}/items`, item);
  }

  modifyItem(item: Item): Observable<Response>
  {
    item = this.es.encryptObjectWithKey(structuredClone(item), item.publicKey!);
    return this.httpClient.put<Response>(`${environment.api}/items`, item);
  }

  deleteItem(itemID: number): Observable<Response>
  {
    return this.httpClient.delete<Response>(`${environment.api}/items/${itemID}`);
  }
}
