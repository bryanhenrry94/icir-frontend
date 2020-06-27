import { Component, OnInit } from '@angular/core';
import { IPerfil } from '../../../../models/IPerfil';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/auth/models/Usuario';
import { NotificationService } from 'src/app/services/notification.service';



@Component({
  selector: 'app-user-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {
  user: Usuario;

  roles: IPerfil[] = [
    {codigo: 'ADM', nombre: 'Administrador'},
    {codigo: 'TES', nombre: 'Tesorero'},
    {codigo: 'PAS', nombre: 'Pastor'}
  ];

  constructor(
    private userService: UserService,
    private _route: ActivatedRoute,
    private notifyService: NotificationService
    )
    {
      this.user = new Usuario();
    }

  ngOnInit(): void {
    const username = this._route.snapshot.paramMap.get('id');

    if(username != null){
      this.getUser(username);
    }
  }

  getUser(_id: string){
    this.userService.getUser(_id).subscribe(
      res => {
        this.user = res;
      },
      err => {
        this.notifyService.showError(err.error, 'Sistema');
      }
    )
  }
}
