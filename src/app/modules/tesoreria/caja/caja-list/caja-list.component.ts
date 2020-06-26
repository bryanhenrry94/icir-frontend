import { Component, OnInit } from '@angular/core';
import { ICaja } from 'src/app/models/ICaja';
import { MatTableDataSource } from '@angular/material/table';
import { CajaService } from 'src/app/services/caja.service';
import { AlertService } from 'src/app/alert/services/alert.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Tipo_Accion } from 'src/app/models/Tipo_Accion';

@Component({
  selector: 'app-caja-list',
  templateUrl: './caja-list.component.html',
  styleUrls: ['./caja-list.component.css']
})
export class CajaListComponent implements OnInit {
  ELEMENT_DATA: ICaja[];
  displayedColumns: string[] = ['select','iglesia', 'codigo', 'nombre', 'moneda', 'responsable'];
  dataSource = new MatTableDataSource<ICaja>(this.ELEMENT_DATA);
  selection = new SelectionModel<ICaja>(false);
  selected: ICaja;

  constructor(
    private cajaService: CajaService,
    private alertService: AlertService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getCajas();
  }

  nuevo(){
    this.cajaService.set_accion(Tipo_Accion.GRABAR);
    this.route.navigate(['/home/cajas/add']);
  }

  actualizar(){
    this.cajaService.set_accion(Tipo_Accion.ACTUALIZAR);
    this.route.navigate(['/home/cajas/add/'+ this.selected._id]);
  }

  consultar(){
    this.route.navigate(['/home/cajas/detail/'+ this.selected._id]);
  }

  eliminar(){
    if(confirm('Desea eliminar el registro')){
      this.cajaService.delete(this.selected._id)
      .subscribe(
        res => {
          this.alertService.success(res.mensaje);
          this.getCajas();
        },
        err => {
          console.log(err);
          this.alertService.warn(err);
        }
      )
    }
  }

  selectRow(checked: boolean, row: ICaja) {
    this.selected = null;

    if(checked) this.selected = row;

    this.selection.toggle(row);
  }

  getCajas(){
    this.cajaService.getCajas()
    .subscribe(
      res => {
         this.dataSource.data = res as ICaja[];
      }
      , err => {
        this.alertService.warn(err);
      }
    )
  }
}
