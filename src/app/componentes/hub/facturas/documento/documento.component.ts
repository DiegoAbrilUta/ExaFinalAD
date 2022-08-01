import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacturaService } from 'src/app/services/factura.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  estilo : string;
}
@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {
  idCliente: number  = 0;
  factura : any
  constructor(
    @Inject(MAT_DIALOG_DATA) public productoID: any,
    private facturaService : FacturaService,
  ) {
    this.factura = {
      id: 0,
      fecha: "",
      total: 0,
      idcliente: 0,
      idclienteNavigation: {
        id: 0,
        nombre: "",
        apellido: "",
        direccion: "",
        cedula: "",
        telf: ""
      },
      detalles: [
        {
          id: 0,
          idfactura: 0,
          idproducto: 0,
          cantidad: 0,
          pu: 0,
          idproductoNavigation: {
            id: 0,
            producto1: "",
            stock: 0,
            pu: 0,
            estado: ""
          }
        }
      ]
    }
   }

  ngOnInit(): void {
    this.idCliente = parseInt(localStorage.getItem('id')!.toString());
    this.obtenerFacturaCompleta(parseInt(this.idCliente.toString()))
  }

  obtenerFacturaCompleta(id : number){
    this.facturaService.getFactura(id).subscribe(data =>{
      this.factura = data
    })
  }
}
