import { Component, OnInit } from '@angular/core';
import { IMovimientoCaja } from 'src/app/models/IMovimientoCaja';
import { MatTableDataSource } from '@angular/material/table';
import { MovimientoCajaService } from 'src/app/services/movimiento-caja.service';
import { AlertService } from 'src/app/alert/services/alert.service';

@Component({
  selector: 'app-movimiento-caja-list',
  templateUrl: './movimiento-caja-list.component.html',
  styleUrls: ['./movimiento-caja-list.component.css']
})
export class MovimientoCajaListComponent implements OnInit {
  ELEMENT_DATA: IMovimientoCaja[];
  displayedColumns: string[] = ['iglesia', 'fecha', 'caja', 'signo', 'tipo_movimiento', 'persona', 'valor', 'search', 'edit', 'delete'];
  dataSource = new MatTableDataSource<IMovimientoCaja>(this.ELEMENT_DATA);

  constructor(
    private movimientoCajaService: MovimientoCajaService,
    private alertService: AlertService
  ) { }

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

  delete(_id: string){
    if(confirm('Desea eliminar el registro')){
      this.movimientoCajaService.delete(_id)
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
}
