import { Component, OnInit } from '@angular/core';
import { IglesiaService } from 'src/app/services/iglesia.service';
import { AlertService } from 'src/app/alert/services/alert.service';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Tipo_Accion } from 'src/app/models/Tipo_Accion';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-iglesia-create',
  templateUrl: './iglesia-create.component.html',
  styleUrls: ['./iglesia-create.component.css']
})
export class IglesiaCreateComponent implements OnInit {
  private subscription: Subscription;
  _accion: Tipo_Accion;

  iglesiaForm: FormGroup;
  _id: FormControl;
  nombre: FormControl;
  direccion: FormControl;
  codigo: FormControl;
  codigo_postal: FormControl;
  fecha_creacion: FormControl;
  pastor: FormControl;
  email: FormControl;
  telefono: FormControl;
  whatsapp: FormControl;
  website: FormControl;
  facebook: FormControl;

  constructor(
    private iglesiaService: IglesiaService,
    private alertService: AlertService,
    private _route: ActivatedRoute,
    private fb: FormBuilder
  )
  {
    this._id = new FormControl({ value: null, disabled: true });
    this.nombre = new FormControl('', Validators.required);
    this.direccion = new FormControl('', Validators.required);
    this.codigo = new FormControl('', Validators.required);
    this.codigo_postal = new FormControl('', Validators.required);
    this.fecha_creacion = new FormControl('', Validators.required);
    this.pastor = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.telefono = new FormControl('');
    this.whatsapp = new FormControl('');
    this.website = new FormControl('');
    this.facebook = new FormControl('');

    const _id = this._route.snapshot.paramMap.get('id');

    if(_id != null){
      this.iglesiaService.getIglesia(_id).subscribe(
        res => {
          this.iglesiaForm.patchValue(res);
        }
      )
    }

    this.subscription = this.iglesiaService._accion$.subscribe(
      res => {
        this._accion = res;
      }
    )
  }

  ngOnInit(): void {
    this.iglesiaForm = this.fb.group({
      '_id': this._id,
      'nombre': this.nombre,
      'direccion': this.direccion,
      'codigo': this.codigo,
      'codigo_postal': this.codigo_postal,
      'fecha_creacion': this.fecha_creacion,
      'pastor': this.pastor,
      'email': this.email,
      'telefono': this.telefono,
      'whatsapp': this.whatsapp,
      'website': this.website,
      'facebook': this.facebook
    })

    if(this._accion == null) this._accion = Tipo_Accion.GRABAR;
  }

  onSubmit(){
    switch(this._accion){
      case Tipo_Accion.GRABAR:
        this.addIglesia();
      break;

      case Tipo_Accion.ACTUALIZAR:
        this.updateIglesia();
      break;
    }
  }

  addIglesia(){
    this.iglesiaService.addIglesia(this.iglesiaForm.value).subscribe(
      res => {

        this.alertService.success("iglesia registrada con éxito!");

        this.iglesiaForm.reset;
      },
      err => {
        this.alertService.warn("Error: " + err.error);
      }
    )
  }

  updateIglesia(){
    this.iglesiaService.updateIglesia(this.iglesiaForm.getRawValue()).subscribe(
      res => {

        this.alertService.success("iglesia actualizada con éxito!");

        this.iglesiaForm.reset;
      },
      err => {
        this.alertService.warn("Error: " + err.error);
      }
    )
  }
}
