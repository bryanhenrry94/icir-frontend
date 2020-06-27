import { Component, OnInit, Inject } from '@angular/core';
import { TipoMovimientoService } from 'src/app/services/tipo-movimiento.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Tipo_Accion } from 'src/app/models/Tipo_Accion';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-tipo-movimiento-create',
  templateUrl: './tipo-movimiento-create.component.html',
  styleUrls: ['./tipo-movimiento-create.component.css']
})
export class TipoMovimientoCreateComponent implements OnInit {
  private subscription: Subscription;

  tipoMovimientoForm: FormGroup;
  _id: FormControl;
  signo: FormControl;
  nombre: FormControl;

  _accion: Tipo_Accion

  constructor(
    private tipoMovimientoService: TipoMovimientoService,
    private notifyService : NotificationService,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TipoMovimientoCreateComponent>,
    @Inject(MAT_DIALOG_DATA) data

  )
  {
    this._id = new FormControl('');
    this.signo = new FormControl('', Validators.required);
    this.nombre = new FormControl('', Validators.required);

    const _id = this._route.snapshot.paramMap.get('id');

    if(_id!=null) {
      this.tipoMovimientoService.getTipoMovimiento(_id).subscribe(
        res => {
          this.tipoMovimientoForm.patchValue(res);
        }
      )
    }

    this.subscription = this.tipoMovimientoService._accion$.subscribe(
      res => {
        this._accion = res;
      }
    )

    if(this._accion == null) this._accion = Tipo_Accion.GRABAR;
  }

  ngOnInit(): void {
    this.tipoMovimientoForm = this.fb.group({
      '_id': this._id,
      'signo': this.signo,
      'nombre': this.nombre
    });
  }

  onSubmit(){
    switch(this._accion){
      case Tipo_Accion.GRABAR:
        this.addTipoMovimiento();
      break;

      case Tipo_Accion.ACTUALIZAR:
        this.updateTipoMovimientp();
      break;
    }
  }

  addTipoMovimiento(){
    this.tipoMovimientoService.addTipoMovimiento(this.tipoMovimientoForm.value).subscribe(
      res => {
        this.notifyService.showSuccess('tipo movimiento registrado con éxito!', 'Sistema');

        if(this.dialogRef != null){
          this.dialogRef.close(JSON.stringify(res));
        }
      },
      err => {
        this.notifyService.showError('Error: ' + err.error, 'Sistema');
      }
    )
  }

  updateTipoMovimientp(){
    this.tipoMovimientoService.updateTipoMovimiento(this.tipoMovimientoForm.getRawValue()).subscribe(
      res => {
        this.notifyService.showSuccess('Tipo Movimiento actualizado correctamente!', 'Sistema');

        if(this.dialogRef != null){
          this.dialogRef.close(JSON.stringify(res));
        }
      },
      err => {
        this.notifyService.showError('Error: ' + err.error, 'Sistema');
      }
    )
  }
}
