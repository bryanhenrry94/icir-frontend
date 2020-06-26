import { Component, OnInit } from '@angular/core';
import { Iglesia } from 'src/app/models/Iglesia';
import { ActivatedRoute } from '@angular/router';
import { IglesiaService } from 'src/app/services/iglesia.service';
import { AlertService } from 'src/app/alert/services/alert.service';

@Component({
  selector: 'app-iglesia-detail',
  templateUrl: './iglesia-detail.component.html',
  styleUrls: ['./iglesia-detail.component.css']
})
export class IglesiaDetailComponent implements OnInit {
  iglesia: Iglesia;

  constructor(
    private _route: ActivatedRoute,
    private iglesiaService: IglesiaService,
    private alertService: AlertService
    ) {
    this.iglesia = new Iglesia();
  }

  ngOnInit(): void {
    const _id = this._route.snapshot.paramMap.get('id');

    if(_id != null){
      this.getiglesia(_id);
    }
  }

  getiglesia(_id: string){
    this.iglesiaService.getIglesia(_id).subscribe(
      res => {
        this.iglesia  = res;
      },
      err => {
        this.alertService.warn(err.error);
      }
    )
  }
}
