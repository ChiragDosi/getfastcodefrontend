
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITd1 } from './itd-1';
import {GenericApiService} from 'fastCodeCore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Td1Service extends GenericApiService<ITd1> { 
  constructor(private httpclient: HttpClient) { 
    super(httpclient, { apiUrl: environment.apiUrl }, "td1");
  }
  
  
}
