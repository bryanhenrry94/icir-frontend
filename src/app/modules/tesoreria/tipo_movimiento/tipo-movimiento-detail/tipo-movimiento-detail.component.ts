import { Component, OnInit } from '@angular/core';
import { TipoMovimiento } from 'src/app/models/TipoMovimiento';
import { TipoMovimientoService } from 'src/app/services/tipo-movimiento.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-tipo-movimiento-detail',
  templateUrl: './tipo-movimiento-detail.component.html',
  styleUrls: ['./tipo-movimiento-detail.component.css']
})
export class TipoMovimientoDetailComponent implements OnInit {
  tipoMovimiento: TipoMovimiento;

  constructor(
    private tipoMovimientoService: TipoMovimientoService,
    private _route: ActivatedRoute,
    private notifyService: NotificationService
  )
  {
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
        this.notifyService.showError('Error: ' + err.error, 'Sistema');
      }
    )
  }
}
