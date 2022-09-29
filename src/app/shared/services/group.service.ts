import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group, GroupNode } from '../models/group.model';
import { Response } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService 
{

  haveChange: boolean = false;

  constructor(private httpClient: HttpClient) { }

  getAllGroup(): Observable<Group[]>
  {
    return this.httpClient.get<Group[]>(`${environment.api}/groups`);
  }

  getAllRelatedGroup(): Observable<Group[]>
  {
    return this.httpClient.get<Group[]>(`${environment.api}/groups/related`);
  }

  getGroup(groupID: number): Observable<Group>
  {
    return this.httpClient.get<Group>(`${environment.api}/groups/${groupID}`);
  }

  getAllGroupNode(): Observable<GroupNode[]>
  {
    return this.httpClient.get<GroupNode[]>(`${environment.api}/groups/node`);
  }

  createGroup(group: Group): Observable<Response>
  {
    return this.httpClient.post<Response>(`${environment.api}/groups`, group);
  }

  modifyGroup(group: Group): Observable<Response>
  {
    return this.httpClient.put<Response>(`${environment.api}/groups`, group);
  }

  deleteGroup(groupID: number): Observable<Response>
  {
    return this.httpClient.delete<Response>(`${environment.api}/groups/${groupID}`);
  }

}
