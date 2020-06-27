import { Component, OnInit } from '@angular/core';
import { Caja } from 'src/app/models/Caja';
import { ActivatedRoute } from '@angular/router';
import { CajaService } from 'src/app/services/caja.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-caja-detail',
  templateUrl: './caja-detail.component.html',
  styleUrls: ['./caja-detail.component.css']
})
export class CajaDetailComponent implements OnInit {
  caja: Caja;

  constructor(
    private cajaService: CajaService,
    private _route: ActivatedRoute,
    private notifyService: NotificationService,
  )
  {
    this.caja = new Caja();
  }

  ngOnInit(): void {
    const _id = this._route.snapshot.paramMap.get('id');

    if(_id != null){
      this.getCaja(_id);
    }
  }

  getCaja(_id: string){
    this.cajaService.getCaja(_id).subscribe(
      res=>{
        this.caja = res;
      },
      err =>{
        this.notifyService.showError('Error: ' + err.error, 'Sistema');
      }
    )
  }
}
