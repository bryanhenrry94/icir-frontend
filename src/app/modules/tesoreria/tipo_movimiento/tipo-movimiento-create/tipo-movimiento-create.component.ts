import { Component, OnInit, Inject } from '@angular/core';
import { TipoMovimiento } from 'src/app/models/TipoMovimiento';
import { TipoMovimientoService } from 'src/app/services/tipo-movimiento.service';
import { AlertService } from 'src/app/alert/services/alert.service';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-tipo-movimiento-create',
  templateUrl: './tipo-movimiento-create.component.html',
  styleUrls: ['./tipo-movimiento-create.component.css']
})
export class TipoMovimientoCreateComponent implements OnInit {
  tipoMovimiento: TipoMovimiento;

  constructor(
    private tipoMovimientoService: TipoMovimientoService,
    private alertService: AlertService,
    private dialogRef: MatDialogRef<TipoMovimientoCreateComponent>,
    @Inject(MAT_DIALOG_DATA) data

  ) {
    this.tipoMovimiento = new TipoMovimiento();
   }

  ngOnInit(): void {
  }

  addTipoMovimiento(form: NgForm){
    this.tipoMovimientoService.addTipoMovimiento(this.tipoMovimiento).subscribe(
      res => {
        this.alertService.success('tipo movimiento registrado con éxito!');

        this.dialogRef.close(JSON.stringify(res));

        form.resetForm();
      },
      err => {
        this.alertService.warn('Error: ' + err);
      }
    )
  }
}
