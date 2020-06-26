import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { AlertService } from '../../../../alert/services/alert.service';
import { IUsuario } from 'src/app/auth/models/IUsuario';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Tipo_Accion } from 'src/app/models/Tipo_Accion';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-user-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  ELEMENT_DATA: IUsuario[];
  displayedColumns: string[] = ['select', 'usuario', 'nombre', 'email', 'perfil'];
  dataSource = new MatTableDataSource<IUsuario>(this.ELEMENT_DATA);
  selection = new SelectionModel<IUsuario>(false);
  selected: IUsuario;

  constructor(
    public userService: UserService,
    private alertService: AlertService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  nuevo(){
    this.userService.set_accion(Tipo_Accion.GRABAR);
    this.route.navigate(['/home/usuarios/add']);
  }

  actualizar(){
    this.userService.set_accion(Tipo_Accion.ACTUALIZAR);
    this.route.navigate(['/home/usuarios/add/'+ this.selected._id]);
  }

  consultar(){
    this.route.navigate(['/home/usuarios/detail/'+ this.selected._id]);
  }

  eliminar(){
    if(confirm('Desea eliminar el registro')){
      this.userService.delete(this.selected._id)
      .subscribe(
        res => {
          this.alertService.success(res.mensaje);
          this.getUsers();
        },
        err => {
          console.log(err);
          this.alertService.warn(err);
        }
      )
    }
  }

  selectRow(checked: boolean, row: IUsuario) {
    this.selected = null;

    if(checked) this.selected = row;

    this.selection.toggle(row);
  }

  getUsers(){
    this.userService.getUsers()
    .subscribe(
      res => {
         this.dataSource.data = res as IUsuario[];
      }
      , err => {
        this.alertService.warn(err);
      }
    )
  }
}
