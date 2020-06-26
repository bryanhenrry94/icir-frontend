import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IIGlesia } from 'src/app/models/IIglesia';
import { MatTableDataSource } from '@angular/material/table';
import { IglesiaService } from 'src/app/services/iglesia.service';
import { AlertService } from 'src/app/alert/services/alert.service';
import { Tipo_Accion } from 'src/app/models/Tipo_Accion';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-church-list',
  templateUrl: './iglesia-list.component.html',
  styleUrls: ['./iglesia-list.component.css']
})
export class IglesiaListComponent implements OnInit {
  ELEMENT_DATA: IIGlesia[];
  displayedColumns: string[] = ['select', 'nombre', 'direccion', 'pastor', 'email', 'telefono'];
  dataSource = new MatTableDataSource<IIGlesia>(this.ELEMENT_DATA);
  selection = new SelectionModel<IIGlesia>(false);
  selected: IIGlesia;


  constructor(
    private iglesiaService: IglesiaService,
    private alertService: AlertService,
    private route: Router
  ) {

  }

  ngOnInit(): void {
    this.getIglesias();
  }

  nuevo(){
    this.iglesiaService.set_accion(Tipo_Accion.GRABAR);
    this.route.navigate(['/home/iglesias/add']);
  }

  actualizar(){
    this.iglesiaService.set_accion(Tipo_Accion.ACTUALIZAR);
    this.route.navigate(['/home/iglesias/add/'+ this.selected._id]);
  }

  consultar(){
    this.route.navigate(['/home/iglesias/detail/'+ this.selected._id]);
  }

  eliminar(){
    if(confirm('Desea eliminar el registro')){
      this.iglesiaService.delete(this.selected._id)
      .subscribe(
        res => {
          this.alertService.success(res.mensaje);
          this.getIglesias();
        },
        err => {
          console.log(err);
          this.alertService.warn(err);
        }
      )
    }
  }

  selectRow(checked: boolean, row: IIGlesia) {
    this.selected = null;

    if(checked) this.selected = row;

    this.selection.toggle(row);
  }

  getIglesias(){
    this.iglesiaService.getIglesias().subscribe(
      res => {
         this.dataSource.data = res as IIGlesia[];
      }
      , err => {
        this.alertService.warn(err);
      }
    )
  }
}
