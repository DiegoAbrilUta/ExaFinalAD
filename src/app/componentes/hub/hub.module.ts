import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HubRoutingModule } from './hub-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HubComponent } from './hub.component';
import { FacturasComponent } from './facturas/facturas.component';
import { VentaComponent } from './venta/venta.component';
import { ClienteComponent } from './venta/cliente/cliente.component';
import { DialogoProductosComponent } from './venta/dialogo-productos/dialogo-productos.component';
import { DocumentoComponent } from './facturas/documento/documento.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';


@NgModule({
  declarations: [
    HubComponent,
    FacturasComponent,
    VentaComponent,
    ClienteComponent,
    DialogoProductosComponent,
    DocumentoComponent,
    CrearClienteComponent
  ],
  imports: [
    CommonModule,
    HubRoutingModule,
    SharedModule
  ]
})
export class HubModule { }
