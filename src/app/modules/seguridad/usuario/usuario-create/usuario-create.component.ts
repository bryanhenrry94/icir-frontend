import { Component, OnInit } from '@angular/core';
import { IPerfil } from '../../../../models/IPerfil';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../alert/services/alert.service';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Tipo_Accion } from 'src/app/models/Tipo_Accion';

@Component({
  selector: 'app-user-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {
  private subscription: Subscription;
  _accion: Tipo_Accion;
  usuarioForm: FormGroup;

  _id: FormControl;
  usuario: FormControl;
  contrasena: FormControl;
  nombre: FormControl;
  email: FormControl;
  perfil: FormControl;

  roles: IPerfil[] = [
    {codigo: 'ADM', nombre: 'Administrador'},
    {codigo: 'TES', nombre: 'Tesorero'},
    {codigo: 'PAS', nombre: 'Pastor'}
  ];

  constructor(
    private userService: UserService,
    private _route: ActivatedRoute,
    private alertService: AlertService,
    private fb: FormBuilder
  )
  {
    this._id = new FormControl({ value: null, disabled: true });
    this.usuario = new FormControl('', Validators.required);
    this.contrasena = new FormControl('', Validators.required);
    this.nombre = new FormControl('', Validators.required);
    this.perfil = new FormControl('', Validators.required);
    this.email = new FormControl('');

    const _id = this._route.snapshot.paramMap.get('id');

    if(_id != null){
      this.userService.getUser(_id).subscribe(
        res => {
          this.usuarioForm.patchValue(res);
        }
      )
    }

    this.subscription = this.userService._accion$.subscribe(
      res => {
        this._accion = res;
      }
    )
  }

  ngOnInit(): void{
    this.usuarioForm = this.fb.group({
      '_id': this._id,
      'usuario': this.usuario,
      'contrasena': this.contrasena,
      'nombre': this.nombre,
      'perfil': this.perfil,
      'email': this.email
    })

    if(this._accion == null) this._accion = Tipo_Accion.GRABAR;
  }

  onSubmit(form: NgForm){
    switch(this._accion){
      case Tipo_Accion.GRABAR:
        this.addUser();
      break;

      case Tipo_Accion.ACTUALIZAR:
        this.updateUser();
      break;
    }

    form.resetForm();
  }

  addUser(){
    this.userService.addUser(this.usuarioForm.value).subscribe(
      res => {
        this.alertService.success('Usuario registrado con éxito!');
      }, err => {
        this.alertService.warn('Error: ' + err.error);
      }
    )
  }

  updateUser(){
    this.userService.updateUser(this.usuarioForm.getRawValue()).subscribe(
      res => {
        this.alertService.success('Usuario actualizado con éxito!');
      }, err => {
        this.alertService.warn('Error: ' + err.error);
      }
    )
  }
}
