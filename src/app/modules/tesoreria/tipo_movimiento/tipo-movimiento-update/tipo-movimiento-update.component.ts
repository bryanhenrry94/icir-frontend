import { Component, OnInit } from '@angular/core';
import { TipoMovimiento } from 'src/app/models/TipoMovimiento';
import { TipoMovimientoService } from 'src/app/services/tipo-movimiento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/alert/services/alert.service';

@Component({
  selector: 'app-tipo-movimiento-update',
  templateUrl: './tipo-movimiento-update.component.html',
  styleUrls: ['./tipo-movimiento-update.component.css']
})
export class TipoMovimientoUpdateComponent implements OnInit {
  tipoMovimiento: TipoMovimiento;

  constructor(
    private tipoMovimientoService: TipoMovimientoService,
    private route: Router,
    private _route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.tipoMovimiento = new TipoMovimiento();
  }

  ngOnInit(): void {
    const _id = this._route.snapshot.paramMap.get('id');

    if(_id != null){
      this.getTipoMovimiento(_id);
    }
  }

  getTipoMovimiento(_id: string){
    this.tipoMovimientoService.getTipoMovimiento(_id).subscribe(
      res => {
        this.tipoMovimiento = res;
      },
      err => {
        this.alertService.warn('Error: ' + err);
      }
    )
  }

  updateTipoMovimiento(){
    this.tipoMovimientoService.updateTipoMovimiento(this.tipoMovimiento).subscribe(
      res => {
        this.route.navigate(['/home/tipo_movimiento/'])
        this.alertService.success('tipo de movimiento actualizado con éxito!');
      },
      err => {
        this.alertService.warn('Error: ' + err);
      }
    )
  }
}
