import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'src/app/services/cliente.service';
import { FacturaService } from 'src/app/services/factura.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ClienteComponent } from './cliente/cliente.component';
import { DialogoProductosComponent } from './dialogo-productos/dialogo-productos.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})

export class VentaComponent implements OnInit {
  public detalles!: any;
  public total !: any;
  public iva !: any;
  public subtotales !: any;
  public cliente !: any;
  public producto !: any;
  public dataSource: any;
  public indexPrueba !: number;
  public longitud = 0;
  public editando: boolean = false;
  public mostrarDatos: boolean = false;
  public formulario = this.formBuilder.group({
    idCliente: ['', Validators.required],
    idProducto: ['', Validators.required],
    cantidad: ['', Validators.required]
  });
  columnas: string[] = ['idProducto','nombreProducto', 'cantidad', 'importe', 'acciones'];
  constructor(
    public snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private _clienteService: ClienteService,
    private _productoService: ProductoService,
    private _facturaService: FacturaService,
    public dialogo: MatDialog
  ) { 
    this.detalles = [];
    this.subtotales = [];
  }

  ngOnInit(): void {
  }

  escogerCliente(){
    const ref = this.dialogo.open(ClienteComponent, {
      data: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%',
      disableClose: true,
      autoFocus: true
    })
    ref.afterClosed().subscribe(result => {
      if (this.formulario.value.idProducto == '') {
        this.formulario = this.formBuilder.group({
          idCliente: [result, Validators.required],
          idProducto: ['', Validators.required],
          cantidad: ['', Validators.required]
        })
      } else {
        this.formulario = this.formBuilder.group({
          idCliente: [result, Validators.required],
          idProducto: [this.producto.id, Validators.required],
          cantidad: ['', Validators.required]
        })
      }
      const id = result
      if (id == null || id == 0) {
        this.cliente = null
        this.cargarDatosCliente(this.cliente);
        return
      }
      this._clienteService.getCliente(id).subscribe(data => {
        this.cliente = data
        this.cargarDatosCliente(this.cliente);

        console.log(this.cliente)
      }, error => {
        this.snackbar.open('El cliente no existe', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.cliente = null
        this.cargarDatosCliente(this.cliente);

      })
    })
  }
  cargarDatosCliente(objeto: any) {
    if (objeto == null) {
      this.mostrarDatos = false
      return
    }
    this.mostrarDatos = true
  }
  escogerProducto(){
      const ref = this.dialogo.open(DialogoProductosComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '80%',
        width: '80%',
        disableClose: true,
        autoFocus: true
      })
      ref.afterClosed().subscribe(result => {
        if (this.formulario.value.idCliente == '') {
          this.formulario = this.formBuilder.group({
            idCliente: ['', Validators.required],
            idProducto: [result, Validators.required],
            cantidad: ['', Validators.required]
          })
        } else {
          this.formulario = this.formBuilder.group({
            idCliente: [this.cliente.id, Validators.required],
            idProducto: [result, Validators.required],
            cantidad: ['', Validators.required]
          })
        }
        const id = result
        if (id == null || id == 0) {
          this.producto = null
          return
        }
        this._productoService.getProducto(id).subscribe(data => {
          this.producto = data
        }, error => {
          console.log(error)
          this.producto = null
        })
      })
    
  }

  anadir(){

   //if (this.formulario.value.cantidad == 0 )
   //return

    for (let numero in this.detalles) {
      if (this.detalles[numero].idproducto == this.producto.id && !this.editando) {
        this.snackbar.open('No puede repetir el producto', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.formulario = this.formBuilder.group({
          idCliente: [this.cliente.id, Validators.required],
          idProducto: ['', Validators.required],
          cantidad: ['', Validators.required]
        })
        return
      }
    }
    const detalle: any = {
      idproducto: this.producto.id,
      cantidad: this.formulario.value.cantidad,
      pu: this.producto.pu,
      idproductoNavigation: this.producto
    }
    if (detalle.cantidad > detalle.idproductoNavigation.stock) {
      this.snackbar.open('Solo ' + detalle.idproductoNavigation.stock + ' ' + detalle.idproductoNavigation.producto1 + ' en existencia', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
      return
    }
    if (this.editando) {
      this.detalles.splice(this.indexPrueba, 1);
      this.subtotales.splice(this.indexPrueba, 1);
    }
    this.subtotales.push(detalle.cantidad * detalle.pu)
    this.detalles.push(detalle)
    this.dataSource = new MatTableDataSource(this.detalles);
    this.longitud = this.dataSource._renderData._value.length;
    this.formulario = this.formBuilder.group({
      idCliente: [this.cliente.id, Validators.required],
      idProducto: ['', Validators.required],
      cantidad: ['', Validators.required]
    })
    this.total = this.subtotales.reduce((a: any, b: any) => a + b, 0);
    this.iva = this.total * 0.12 + this.total
    this.editando = false;
  
  }

  editar(objeto : any , index : number){
    this.formulario = this.formBuilder.group({
      idCliente: [this.cliente.id, Validators.required],
      idProducto: [objeto.idproducto, Validators.required],
      cantidad: [objeto.cantidad, Validators.required]
    })
    this.producto = objeto.idproductoNavigation;
    
    this.editando = true;
    this.indexPrueba = index
  }
  eliminar(index : number){
    this.detalles.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.detalles);
    this.longitud = this.dataSource._renderData._value.length;
    this.subtotales.splice(index, 1);
    this.total = this.subtotales.reduce((a: any, b: any) => a + b, 0);
    this.iva = this.total * 0.12 + this.total
  }

  facturar(){
    this.total = this.subtotales.reduce((a: any, b: any) => a + b, 0);
    this.iva = this.total * 0.12 + this.total
    const factura: any = {
      total: this.iva,
      idcliente: this.cliente.id,
      idclienteNavigation: this.cliente,
      detalles: this.detalles
    }
        this._facturaService.postFactura(factura).subscribe(data => {
          this.snackbar.open('Venta realizada con éxito', '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
        }, error => {
          this.snackbar.open('Hubo un error al realizar la venta', '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
        })
        window.location.reload()
  }
  cancelar(){
    window.location.reload()
  }
}
