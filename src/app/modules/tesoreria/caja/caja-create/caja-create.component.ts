import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Iglesia } from 'src/app/models/Iglesia';
import { IglesiaService } from 'src/app/services/iglesia.service';
import { Usuario } from 'src/app/auth/models/Usuario';
import { CajaService } from 'src/app/services/caja.service';
import { AlertService } from 'src/app/alert/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Tipo_Accion } from 'src/app/models/Tipo_Accion';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-caja-create',
  templateUrl: './caja-create.component.html',
  styleUrls: ['./caja-create.component.css']
})
export class CajaCreateComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  _accion: Tipo_Accion;

  cajaForm: FormGroup;
  _id: FormControl;
  iglesia: FormControl;
  codigo: FormControl;
  nombre: FormControl;
  moneda: FormControl;
  responsable: FormControl;
  estado: FormControl;

  IglesiaSelected: Iglesia[] = [];

  iglesias: Iglesia[];
  usuarios: Usuario[];

  constructor(
    private iglesiaService: IglesiaService,
    private usuarioService: UserService,
    private cajaService: CajaService,
    private alertService: AlertService,
    private _route: ActivatedRoute,
    private fb: FormBuilder
  )
  {
    this._id = new FormControl({value:'', disabled: true});
    this.iglesia = new FormControl(this.IglesiaSelected, Validators.required);
    this.codigo = new FormControl('', Validators.required);
    this.nombre = new FormControl('', Validators.required);
    this.moneda = new FormControl('', Validators.required);
    this.responsable = new FormControl('', Validators.required);
    this.estado = new FormControl('', Validators.required);

    const _id = this._route.snapshot.paramMap.get('id');

    if(_id != null){
      this.cajaService.getCaja(_id).subscribe(
        res => {
          this.cajaForm.patchValue(res);
        }
      )
    }

    this.subscription = this.cajaService._accion$.subscribe(
      res => {
        this._accion = res;
      }
    )
  }

  compareItems(i1, i2) {
    return i1 && i2 && i1.id===i2.id;
  }

  ngOnInit(): void {
    this.getIglesias();
    this.getUsuarios();

    this.cajaForm = this.fb.group({
      '_id': this._id,
      'iglesia': this.iglesia,
      'codigo': this.codigo,
      'nombre': this.nombre,
      'moneda': this.moneda,
      'responsable': this.responsable,
      'estado': this.estado
    });

    if(this._accion == null) this._accion = Tipo_Accion.GRABAR;

    this.iglesia.valueChanges.subscribe(
      res => {

      }
    );

    this.responsable.valueChanges.subscribe(
      res => {

      }
    )
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
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

  onSubmit(){
    switch(this._accion){
      case Tipo_Accion.GRABAR:
        this.addCaja();
      break;

      case Tipo_Accion.ACTUALIZAR:
        this.updateCaja();
      break;
    }
  }

  addCaja(){
    console.log(this.cajaForm.value);

    this.cajaService.addCaja(this.cajaForm.value).subscribe(
      res => {
        this.alertService.success('Caja registrado con éxito!');
      }, err => {
        this.alertService.warn('Error: ' + err.error);
      }
    )
  }

  updateCaja(){
    this.cajaService.updateCaja(this.cajaForm.getRawValue()).subscribe(
      res => {
        this.alertService.success('Caja actualizado con éxito!');
      }, err => {
        this.alertService.warn('Error: ' + err.error);
      }
    )
  }
}
