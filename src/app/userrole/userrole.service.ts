
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserrole } from './iuserrole';
import { GenericApiService } from 'fastCodeCore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserroleService extends GenericApiService<IUserrole> { 
  
  constructor(private httpclient: HttpClient) { 
    super(httpclient, { apiUrl: environment.apiUrl }, "userrole");
  }
  
}
