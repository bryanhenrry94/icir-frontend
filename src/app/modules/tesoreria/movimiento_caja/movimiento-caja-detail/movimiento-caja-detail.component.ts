import { Component, OnInit } from '@angular/core';
import { MovimientoCaja } from 'src/app/models/MovimientoCaja';
import { MovimientoCajaService } from 'src/app/services/movimiento-caja.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movimiento-caja-detail',
  templateUrl: './movimiento-caja-detail.component.html',
  styleUrls: ['./movimiento-caja-detail.component.css']
})
export class MovimientoCajaDetailComponent implements OnInit {
  movimientoCaja: MovimientoCaja;

  constructor(
    private movimientoCajaService: MovimientoCajaService,
    private _route: ActivatedRoute
  )
  {
    this.movimientoCaja = new MovimientoCaja();
  }

  ngOnInit(): void {
    const _id = this._route.snapshot.paramMap.get('id');

    if(_id != null){
      this.getMovimientoCaja(_id);
    }
  }

  getMovimientoCaja(_id: string){
    this.movimientoCajaService.getMovimientoCaja(_id).subscribe(
      res => {
        this.movimientoCaja = res;
      }
    )
  }
}
