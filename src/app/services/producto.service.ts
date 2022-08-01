import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private api = 'api/Productos/';
  constructor(private http : HttpClient) { }

   getProductosConStock(): Observable<any>{
     return this.http.get(environment.urlGlobal+this.api);
   }

   getProducto(id: number) : Observable<any>{
     return this.http.get(environment.urlGlobal+this.api+id)
   }
}
