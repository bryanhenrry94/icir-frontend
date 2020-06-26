import { Component, OnInit } from '@angular/core';
import { ITipoMovimiento } from 'src/app/models/ITipoMovimiento';
import { MatTableDataSource } from '@angular/material/table';
import { TipoMovimientoService } from 'src/app/services/tipo-movimiento.service';
import { AlertService } from 'src/app/alert/services/alert.service';

@Component({
  selector: 'app-tipo-movimiento-list',
  templateUrl: './tipo-movimiento-list.component.html',
  styleUrls: ['./tipo-movimiento-list.component.css']
})
export class TipoMovimientoListComponent implements OnInit {
  ELEMENT_DATA: ITipoMovimiento[];
  displayedColumns: string[] = ['signo', 'nombre', 'search', 'edit', 'delete'];
  dataSource = new MatTableDataSource<ITipoMovimiento>(this.ELEMENT_DATA);

  constructor(
    private tipoMovimientoService: TipoMovimientoService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getTipoMovimientos();
  }

  getTipoMovimientos(){
    this.tipoMovimientoService.getTipoMovimientos().subscribe(
      res => {
        this.dataSource.data = res as ITipoMovimiento[];
      },
      err => {
        this.alertService.warn(err);
      }
    )
  }

  delete(_id: string){
    if(confirm('Desea eliminar el registro')){
      this.tipoMovimientoService.delete(_id)
      .subscribe(
        res => {
          this.alertService.success(res.mensaje);
          this.getTipoMovimientos();
        },
        err => {
          console.log(err);
          this.alertService.warn(err);
        }
      )
    }
  }
}
