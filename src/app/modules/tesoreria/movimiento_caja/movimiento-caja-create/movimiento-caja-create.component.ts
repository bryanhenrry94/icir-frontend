import { Component, OnInit, OnDestroy } from '@angular/core';
import { Iglesia } from 'src/app/models/Iglesia';
import { IglesiaService } from 'src/app/services/iglesia.service';
import { Caja } from 'src/app/models/Caja';
import { CajaService } from 'src/app/services/caja.service';
import { TipoMovimientoService } from 'src/app/services/tipo-movimiento.service';
import { TipoMovimiento } from 'src/app/models/TipoMovimiento';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PersonaCreateComponent } from 'src/app/modules/general/persona/persona-create/persona-create.component';
import { TipoMovimientoCreateComponent } from '../../tipo_movimiento/tipo-movimiento-create/tipo-movimiento-create.component';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/persona.service';
import { FormGroup, FormControl, Form, Validators, FormBuilder } from '@angular/forms';
import { MovimientoCajaService } from 'src/app/services/movimiento-caja.service';
import { Subscription } from 'rxjs';
import { Tipo_Accion } from 'src/app/models/Tipo_Accion';
import { ActivatedRoute } from '@angular/router';
import { IPersona } from 'src/app/models/IPersona';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-movimiento-caja-create',
  templateUrl: './movimiento-caja-create.component.html',
  styleUrls: ['./movimiento-caja-create.component.css']
})
export class MovimientoCajaCreateComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  _accion: Tipo_Accion;

  movimientoCajaForm: FormGroup;
  _id: FormControl;
  fecha: FormControl;
  iglesia: FormControl;
  caja: FormControl;
  signo: FormControl;
  tipo_movimiento: FormControl;
  referencia: FormControl;
  persona: FormControl;
  valor: FormControl;

  iglesias: Iglesia[];
  cajas: Caja[];
  tipoMovimientos: TipoMovimiento[];
  personas: Persona[];

  constructor(
    private iglesiaService: IglesiaService,
    private cajaService: CajaService,
    private notifyService : NotificationService,
    private tipoMovimientoService: TipoMovimientoService,
    private personaService: PersonaService,
    private movimientoCajaService: MovimientoCajaService,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog
  )
  {
    this._id = new FormControl({value:'', disabled: true});
    this.fecha = new FormControl(new Date(), Validators.required);
    this.iglesia = new FormControl('', Validators.required);
    this.caja = new FormControl('', Validators.required);
    this.signo = new FormControl('', Validators.required);
    this.tipo_movimiento = new FormControl('', Validators.required);
    this.referencia = new FormControl('');
    this.persona = new FormControl('');
    this.valor = new FormControl('', Validators.required);

    const _id = this._route.snapshot.paramMap.get('id');

    if(_id != null){
      this.movimientoCajaService.getMovimientoCaja(_id).subscribe(
        res => {
          this.movimientoCajaForm.patchValue(res);
        }
      )
    }

    this.subscription = this.movimientoCajaService._accion$.subscribe(
      res => {
        this._accion = res;
      }
    )

    this.iglesia.valueChanges.subscribe(
      res => {
        this.cajaService.getCajasByIglesia(res._id).subscribe(
          res => {
            this.cajas = res as Caja[];
          },
          err => {
            this.notifyService.showError('Error: ' + err.error, 'Sistema');
          }
        )
      }
    )

    this.caja.valueChanges.subscribe(
      res => {

      }
    )

    this.signo.valueChanges.subscribe(
      res => {
        this.tipoMovimientoService.getTipoMovimientosBySigno(res).subscribe(
          res => {
            this.tipoMovimientos = res as TipoMovimiento[];
          },
          err => {
            this.notifyService.showError('Error: ' + err.error, 'Sistema');
          }
        )
      }
    )
  }

  ngOnInit(): void {
    this.getIglesias();
    this.getPersonas();

    this.movimientoCajaForm = this.fb.group({
      '_id': this._id,
      'fecha': this.fecha,
      'iglesia': this.iglesia,
      'caja': this.caja,
      'signo': this.signo,
      'tipo_movimiento': this.tipo_movimiento,
      'referencia': this.referencia,
      'persona': this.persona,
      'valor': this.valor
    });

    if(this._accion == null) this._accion = Tipo_Accion.GRABAR;
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  getIglesias(){
    this.iglesiaService.getIglesias().subscribe(
      res => {
        this.iglesias = res as Iglesia[];
      },
      err => {
        this.notifyService.showError('Error: ' + err.error, 'Sistema');
      }
    )
  }

  getPersonas(){
    this.personaService.getPersonas().subscribe(
      res => {
        this.personas = res as Persona[];
      },
      err => {
        this.notifyService.showError('Error: ' + err.error, 'Sistema');
      }
    )
  }

  openDialogPersonaCreate() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = { };

    const dialogRef = this.dialog.open(PersonaCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      res => {
        this.getPersonas();
      }
    )
  }

  openDialogTipoMovimientoCreate(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = { };

    const dialogRef = this.dialog.open(TipoMovimientoCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog TipoMovimientoCreate result: ${result}`);
    });
  }

  onSubmit(){
    if(!confirm('Se procedera a grabar la transacción, desea continuar?')) return;

    switch(this._accion){
      case Tipo_Accion.GRABAR:
        this.addMovimientoCaja();
      break;

      case Tipo_Accion.ACTUALIZAR:
        this.updateMovimientoCaja();
      break;
    }
  }

  addMovimientoCaja(){
    this.movimientoCajaService.addMovimientoCaja(this.movimientoCajaForm.value).subscribe(
      res => {
        this.notifyService.showSuccess('movimiento de caja registado con éxito', 'Sistema');
      },
      err => {
        this.notifyService.showError('Error: ' + err.error, 'Sistema');
      }
    )
  }

  updateMovimientoCaja(){
    this.movimientoCajaService.updateMovimientoCaja(this.movimientoCajaForm.getRawValue()).subscribe(
      res => {
        this.notifyService.showSuccess('movimiento actualizado con éxito!', 'Sistema');
      }, err => {
        this.notifyService.showError('Error: ' + err.error, 'Sistema');
      }
    )
  }

  comparePersonas(i1: IPersona, i2: IPersona){
    return i1 && i2 && i1._id===i2._id;
  }

  compareItems(i1, i2) {
    return i1 && i2 && i1.id===i2.id;
  }
}
