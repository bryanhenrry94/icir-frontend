import { Component, OnInit } from '@angular/core';
import { IPerfil } from '../../../../models/IPerfil';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Tipo_Accion } from 'src/app/models/Tipo_Accion';
import { NotificationService } from 'src/app/services/notification.service';

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
    private notifyService : NotificationService,
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

  onSubmit(){
    switch(this._accion){
      case Tipo_Accion.GRABAR:
        this.addUser();

        this.usuarioForm.reset();
      break;

      case Tipo_Accion.ACTUALIZAR:
        this.updateUser();
      break;
    }
  }

  addUser(){
    this.userService.addUser(this.usuarioForm.value).subscribe(
      res => {
        this.notifyService.showSuccess('Usuario registrado con éxito!', 'Sistema');
      }, err => {
        this.notifyService.showError('Error: ' + err.error, 'Sistema');
      }
    )
  }

  updateUser(){
    this.userService.updateUser(this.usuarioForm.getRawValue()).subscribe(
      res => {
        this.notifyService.showSuccess('Usuario actualizado con éxito!', 'Sistema');
      }, err => {
        this.notifyService.showError('Error: ' + err.error, 'Sistema');
      }
    )
  }
}
