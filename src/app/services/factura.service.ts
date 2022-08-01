import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
private api = 'api/Facturas/';
  constructor(private http : HttpClient) { }

  getFacturas(): Observable<any>{
   return this.http.get(environment.urlGlobal+this.api);
  }
  postFactura(factura : any): Observable<any>{
   return this.http.post(environment.urlGlobal+this.api,factura)
  }
  getFactura(id : number): Observable<any>{
    return this.http.get(environment.urlGlobal+this.api+id);
  }
}
