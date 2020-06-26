import { Component, OnInit } from '@angular/core';
import { MovimientoCaja } from 'src/app/models/MovimientoCaja';
import { MovimientoCajaService } from 'src/app/services/movimiento-caja.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert/services/alert.service';
import { Persona } from 'src/app/models/Persona';
import { TipoMovimiento } from 'src/app/models/TipoMovimiento';
import { Caja } from 'src/app/models/Caja';
import { Iglesia } from 'src/app/models/Iglesia';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { TipoMovimientoCreateComponent } from '../../tipo_movimiento/tipo-movimiento-create/tipo-movimiento-create.component';
import { PersonaCreateComponent } from 'src/app/modules/general/persona/persona-create/persona-create.component';
import { PersonaService } from 'src/app/services/persona.service';
import { TipoMovimientoService } from 'src/app/services/tipo-movimiento.service';
import { CajaService } from 'src/app/services/caja.service';
import { IglesiaService } from 'src/app/services/iglesia.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movimiento-caja-update',
  templateUrl: './movimiento-caja-update.component.html',
  styleUrls: ['./movimiento-caja-update.component.css']
})
export class MovimientoCajaUpdateComponent implements OnInit {
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
    public dialog: MatDialog,
    private movimientoCajaService: MovimientoCajaService,
    private _route: ActivatedRoute,
    private route: Router
  )
  {
    this.movimientoCaja = new MovimientoCaja();
  }

  ngOnInit(): void {
    this.getIglesias();
    this.getPersonas();

    const _id = this._route.snapshot.paramMap.get('id');

    if(_id != null){
      this.getMovimientoCaja(_id);
    }
  }

  getMovimientoCaja(_id: string){
    this.movimientoCajaService.getMovimientoCaja(_id).subscribe(
      res => {
        this.movimientoCaja = res;

        this.change_iglesia(res.iglesia);
      },
      err => {
        this.alertService.warn('Error: ' + err);
      }
    )
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

  updateMovimientoCaja(form: NgForm){
    if(!form.valid) return;

    this.movimientoCajaService.updateMovimientoCaja(this.movimientoCaja).subscribe(
      res => {
        this.route.navigate(['/home/movimiento_caja']);
        this.alertService.success('movimiento de caja actualizado con éxito');
      },
      err => {
        this.alertService.warn('Error: ' + err);
      }
    )
  }
}
