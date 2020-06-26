import { Component, OnInit } from '@angular/core';
import { MovimientoCaja } from 'src/app/models/MovimientoCaja';
import { Iglesia } from 'src/app/models/Iglesia';
import { IglesiaService } from 'src/app/services/iglesia.service';
import { AlertService } from 'src/app/alert/services/alert.service';
import { Caja } from 'src/app/models/Caja';
import { CajaService } from 'src/app/services/caja.service';
import { TipoMovimientoService } from 'src/app/services/tipo-movimiento.service';
import { TipoMovimiento } from 'src/app/models/TipoMovimiento';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PersonaCreateComponent } from 'src/app/modules/general/persona/persona-create/persona-create.component';
import { TipoMovimientoCreateComponent } from '../../tipo_movimiento/tipo-movimiento-create/tipo-movimiento-create.component';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/persona.service';
import { NgForm } from '@angular/forms';
import { MovimientoCajaService } from 'src/app/services/movimiento-caja.service';

@Component({
  selector: 'app-movimiento-caja-create',
  templateUrl: './movimiento-caja-create.component.html',
  styleUrls: ['./movimiento-caja-create.component.css']
})
export class MovimientoCajaCreateComponent implements OnInit {
  movimientoCaja: MovimientoCaja;
  iglesias: Iglesia[];
  cajas: Caja[];
  tipoMovimientos: TipoMovimiento[];
  personas: Persona[];

  constructor(
    private iglesiaService: IglesiaService,
    private cajaService: CajaService,
    private alertService: AlertService,
    private tipoMovimientoService: TipoMovimientoService,
    private personaService: PersonaService,
    private movimientoCajaService: MovimientoCajaService,
    public dialog: MatDialog
  ) {
    this.movimientoCaja = new MovimientoCaja();
  }

  ngOnInit(): void {
    this.getIglesias();
    this.getPersonas();
  }

  getIglesias(){
    this.iglesiaService.getIglesias().subscribe(
      res => {
        this.iglesias = res as Iglesia[];
      },
      err => {
        this.alertService.warn('Error: ' + err.error);
      }
    )
  }

  change_iglesia(iglesia: Iglesia){
    this.cajaService.getCajasByIglesia(iglesia._id).subscribe(
      res => {
        this.cajas = res as Caja[];
      },
      err => {
        this.alertService.warn('Error: ' + err.error);
      }
    )
  }

  change_caja(caja: Caja){

  }

  change_radio(signo: string){
    this.tipoMovimientoService.getTipoMovimientosBySigno(signo).subscribe(
      res => {
        this.tipoMovimientos = res as TipoMovimiento[];
      },
      err => {
        this.alertService.warn('Error: ' + err.error);
      }
    )
  }

  getPersonas(){
    this.personaService.getPersonas().subscribe(
      res => {
        this.personas = res as Persona[];
      },
      err => {
        this.alertService.warn('Error: ' + err.error);
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

  addMovimientoCaja(form: NgForm){
    if(!form.valid) return;

    console.log(this.movimientoCaja);

    this.movimientoCajaService.addMovimientoCaja(this.movimientoCaja).subscribe(
      res => {
        this.alertService.success('movimiento de caja registado con éxito');

        form.resetForm();
      },
      err => {
        this.alertService.warn('Error: ' + err.error);
      }
    )
  }
}
