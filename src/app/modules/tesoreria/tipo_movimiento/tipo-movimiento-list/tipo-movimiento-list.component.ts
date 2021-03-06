import { Component, OnInit } from '@angular/core';
import { ITipoMovimiento } from 'src/app/models/ITipoMovimiento';
import { MatTableDataSource } from '@angular/material/table';
import { TipoMovimientoService } from 'src/app/services/tipo-movimiento.service';
import { Tipo_Accion } from 'src/app/models/Tipo_Accion';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-tipo-movimiento-list',
  templateUrl: './tipo-movimiento-list.component.html',
  styleUrls: ['./tipo-movimiento-list.component.css']
})
export class TipoMovimientoListComponent implements OnInit {
  ELEMENT_DATA: ITipoMovimiento[];
  displayedColumns: string[] = ['select', 'codigo', 'signo', 'nombre'];
  dataSource = new MatTableDataSource<ITipoMovimiento>(this.ELEMENT_DATA);
  selection = new SelectionModel<ITipoMovimiento>(false);
  selected: ITipoMovimiento;

  constructor(
    private tipoMovimientoService: TipoMovimientoService,
    private notifyService: NotificationService,
    private route: Router
  ) { }

  nuevo(){
    this.tipoMovimientoService.set_accion(Tipo_Accion.GRABAR);
    this.route.navigate(['/home/tipo_movimiento/add']);
  }

  actualizar(){
    this.tipoMovimientoService.set_accion(Tipo_Accion.ACTUALIZAR);
    this.route.navigate(['/home/tipo_movimiento/add/'+ this.selected._id]);
  }

  consultar(){
    this.route.navigate(['/home/tipo_movimiento/detail/'+ this.selected._id]);
  }

  eliminar(){
    if(confirm('Desea eliminar el registro')){
      this.tipoMovimientoService.delete(this.selected._id)
      .subscribe(
        res => {
          this.notifyService.showSuccess(res.mensaje, 'Sistema');
          this.getTipoMovimientos();
        },
        err => {
          this.notifyService.showError(err.error, 'Sistema');
        }
      )
    }
  }

  selectRow(checked: boolean, row: ITipoMovimiento) {
    this.selected = null;

    if(checked) this.selected = row;

    this.selection.toggle(row);
  }

  ngOnInit(): void {
    this.getTipoMovimientos();
  }

  getTipoMovimientos(){
    this.tipoMovimientoService.getTipoMovimientos().subscribe(
      res => {
        this.dataSource.data = res as ITipoMovimiento[];
      },
      err => {
        this.notifyService.showError(err.error, 'Sistema');
      }
    )
  }
}
