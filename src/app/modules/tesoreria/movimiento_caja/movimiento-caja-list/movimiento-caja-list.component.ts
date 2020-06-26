import { Component, OnInit } from '@angular/core';
import { IMovimientoCaja } from 'src/app/models/IMovimientoCaja';
import { MatTableDataSource } from '@angular/material/table';
import { MovimientoCajaService } from 'src/app/services/movimiento-caja.service';
import { AlertService } from 'src/app/alert/services/alert.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Tipo_Accion } from 'src/app/models/Tipo_Accion';

@Component({
  selector: 'app-movimiento-caja-list',
  templateUrl: './movimiento-caja-list.component.html',
  styleUrls: ['./movimiento-caja-list.component.css']
})
export class MovimientoCajaListComponent implements OnInit {
  ELEMENT_DATA: IMovimientoCaja[];
  displayedColumns: string[] = ['select', 'iglesia', 'fecha', 'caja', 'signo', 'persona', 'valor'];
  dataSource = new MatTableDataSource<IMovimientoCaja>(this.ELEMENT_DATA);
  selection = new SelectionModel<IMovimientoCaja>(false);
  selected: IMovimientoCaja;

  constructor(
    private movimientoCajaService: MovimientoCajaService,
    private alertService: AlertService,
    private route: Router
  ) { }

  nuevo(){
    this.movimientoCajaService.set_accion(Tipo_Accion.GRABAR);
    this.route.navigate(['/home/movimiento_caja/add']);
  }

  actualizar(){
    this.movimientoCajaService.set_accion(Tipo_Accion.ACTUALIZAR);
    this.route.navigate(['/home/movimiento_caja/add/'+ this.selected._id]);
  }

  consultar(){
    this.route.navigate(['/home/movimiento_caja/detail/'+ this.selected._id]);
  }

  eliminar(){
    if(confirm('Desea eliminar el registro')){
      this.movimientoCajaService.delete(this.selected._id)
      .subscribe(
        res => {
          this.alertService.success(res.mensaje);
          this.getMovimientoCajas();
        },
        err => {
          console.log(err);
          this.alertService.warn(err);
        }
      )
    }
  }

  selectRow(checked: boolean, row: IMovimientoCaja) {
    this.selected = null;

    if(checked) this.selected = row;

    this.selection.toggle(row);
  }

  ngOnInit(): void {
    this.getMovimientoCajas();
  }

  getMovimientoCajas(){
    this.movimientoCajaService.getMovimientoCajas()
    .subscribe(
      res => {
         this.dataSource.data = res as IMovimientoCaja[];
      }
      , err => {
        this.alertService.warn(err);
      }
    )
  }
}
