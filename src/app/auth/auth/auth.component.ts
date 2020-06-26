import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../alert/services/alert.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  usuarioForm: FormGroup;
  usuario: FormControl;
  contrasena: FormControl;

  constructor(
    private authService: AuthService,
    private route: Router,
    private alertService: AlertService,
    fb: FormBuilder
  ) {
      this.usuario = new FormControl('', Validators.required);
      this.contrasena = new FormControl('', Validators.required);
      this.usuarioForm= fb.group({
        'usuario': this.usuario,
        'contrasena': this.contrasena
    });
  }

  ngOnInit() {

  }

  login(){
    this.authService.login(this.usuarioForm.value)
    .subscribe(
      res => {
          localStorage.setItem('USER_DATA', JSON.stringify(res));

          this.route.navigate(['home']);

          this.alertService.success("Bienvenido " + res.username);
      },
      err => {
        this.alertService.warn(err.error);
      }
    )
  }
}
