import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FacturaService } from 'src/app/services/factura.service';
import { DocumentoComponent } from './documento/documento.component';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  tabla: any[] = []
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnas: string[] = ['ID', 'cedula', 'cliente', 'fecha', 'total', 'revisar'];
  constructor(
    private facturaService: FacturaService,
    public facturamodal: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.obtenerfacturas();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerfacturas() {
    this.facturaService.getFacturas().subscribe(data => {
      for (let index in data) {
        this.tabla.push({
          id: data[index].id,
          cedula: data[index].idclienteNavigation.cedula,
          cliente: data[index].idclienteNavigation.nombre + " " + data[index].idclienteNavigation.apellido,
          fecha: data[index].fecha,
          total: data[index].total
        })
      }
      this.dataSource = new MatTableDataSource<any>(this.tabla);
      this.dataSource.paginator = this.paginator;
    })
  }

  verFactura(id: number) {
    const referencia = this.facturamodal.open(DocumentoComponent,{
      data: id,
      maxWidth: '60vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%',
      disableClose: true,
      autoFocus: true
    })
  }
}
