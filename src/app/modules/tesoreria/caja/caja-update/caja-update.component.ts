import { Component, OnInit } from '@angular/core';
import { Caja } from 'src/app/models/Caja';
import { Iglesia } from 'src/app/models/Iglesia';
import { Usuario } from 'src/app/auth/models/Usuario';
import { IglesiaService } from 'src/app/services/iglesia.service';
import { UserService } from 'src/app/services/user.service';
import { CajaService } from 'src/app/services/caja.service';
import { AlertService } from 'src/app/alert/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-caja-update',
  templateUrl: './caja-update.component.html',
  styleUrls: ['./caja-update.component.css']
})
export class CajaUpdateComponent implements OnInit {
  caja: Caja;
  iglesias: Iglesia[];
  usuarios: Usuario[];

  constructor(
    private iglesiaService: IglesiaService,
    private usuarioService: UserService,
    private cajaService: CajaService,
    private alertService: AlertService,
    private route: Router,
    private _route: ActivatedRoute
  ) {
    this.caja = new Caja()
  }

  ngOnInit(): void {
    const _id = this._route.snapshot.paramMap.get('id');

    if(_id != null){
      this.getCaja(_id);
    }

    this.getIglesias();
    this.getUsuarios();
  }

  getCaja(_id: string){
    this.cajaService.getCaja(_id).subscribe(
      res=>{
        this.caja = res;
      },
      err =>{
        this.alertService.warn('Error: ' + err);
      }
    )
  }

  getIglesias(){
    this.iglesiaService.getIglesias().subscribe(
      res => {
        this.iglesias = res as Iglesia[];
      },
      err => {
        this.alertService.warn('Error: ' + err.error);
      }
    )
  }

  getUsuarios(){
    this.usuarioService.getUsers().subscribe(
      res => {
        this.usuarios = res as Usuario[];
      },
      err => {
        console.log(err);
      }
    )
  }

  updateCaja(){
    this.cajaService.updateCaja(this.caja).subscribe(
      res => {
        this.route.navigate(['/home/cajas']);
        this.alertService.success('Caja actualizada con éxito!');
      },
      err => {
        this.alertService.warn('Error: ' + err.error);
      }
    )
  }
}
