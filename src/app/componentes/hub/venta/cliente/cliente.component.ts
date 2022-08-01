import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  columnas: string[] = ['cedula', 'nombre', 'direccion', 'telefono', 'revisar'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public data;
  constructor(
    private injector: Injector,
    private clienteService: ClienteService,
    public dialogo: MatDialog,
    public snack: MatSnackBar,
  ) {
    this.data = this.injector.get(MAT_DIALOG_DATA, false);
  }

  ngOnInit(): void {
    this.cargarClientes();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cargarClientes() {
    this.clienteService.getClientes().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log(error)
    })
  }

}
