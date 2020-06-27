import { Component, OnInit } from '@angular/core';
import { IPersona } from 'src/app/models/IPersona';
import { MatTableDataSource } from '@angular/material/table';
import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Tipo_Accion } from 'src/app/models/Tipo_Accion';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit {
  ELEMENT_DATA: IPersona[];
  displayedColumns: string[] = ['select', 'tipo_identificacion', 'identificacion', 'nombres', 'apellidos', 'direccion'];
  dataSource = new MatTableDataSource<IPersona>(this.ELEMENT_DATA);
  selection = new SelectionModel<IPersona>(false);
  selected: IPersona;

  constructor(
    private personaService: PersonaService,
    private route: Router,
    private notifyService: NotificationService
  ) { }

  nuevo(){
    this.personaService.set_accion(Tipo_Accion.GRABAR);
    this.route.navigate(['/home/personas/add']);
  }

  actualizar(){
    this.personaService.set_accion(Tipo_Accion.ACTUALIZAR);
    this.route.navigate(['/home/personas/add/'+ this.selected._id]);
  }

  consultar(){
    this.route.navigate(['/home/personas/detail/'+ this.selected._id]);
  }

  eliminar(){
    if(confirm('Desea eliminar el registro')){
      this.personaService.delete(this.selected._id)
      .subscribe(
        res => {
          this.notifyService.showSuccess(res.mensaje, 'Sistema');
          this.getPersonas();
        },
        err => {
          console.log(err);
          this.notifyService.showError(err.error, 'Sistema');
        }
      )
    }
  }

  ngOnInit(): void {
    this.getPersonas();
  }

  selectRow(checked: boolean, row: IPersona) {
    this.selected = null;

    if(checked) this.selected = row;

    this.selection.toggle(row);
  }

  getPersonas(){
    this.personaService.getPersonas().subscribe(
      res => {
         this.dataSource.data = res as IPersona[];
      }
      , err => {
        this.notifyService.showError(err.error, 'Sistema');
      }
    )
  }
}
