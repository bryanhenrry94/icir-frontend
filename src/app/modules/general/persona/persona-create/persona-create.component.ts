import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ITipoIdentificacion } from 'src/app/models/ITipoIdentificacion';
import { PersonaService } from 'src/app/services/persona.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ValidarCedRuc  } from '../../../../utils/validarCedRuc';
import { Subscription } from 'rxjs';
import { Tipo_Accion } from 'src/app/models/Tipo_Accion';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-persona-create',
  templateUrl: './persona-create.component.html',
  styleUrls: ['./persona-create.component.css']
})
export class PersonaCreateComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  validarCedRuc: ValidarCedRuc;

  personaForm: FormGroup;
  _id: FormControl;
  tipo_identificacion: FormControl;
  identificacion: FormControl;
  nombres: FormControl;
  apellidos: FormControl;
  direccion: FormControl;
  email: FormControl;
  telefono: FormControl;

  _accion: Tipo_Accion;

  disableIdentificacion = true;

  tipoIdentificacion: ITipoIdentificacion[] = [
    { codigo: 'CED', nombre: 'CEDULA' },
    { codigo: 'RUC', nombre: 'RUC' },
    { codigo: 'PAS', nombre: 'PASAPORTE' },
  ];

  constructor(
    private personaService: PersonaService,
    private notifyService : NotificationService,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonaCreateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.validarCedRuc = new ValidarCedRuc();

    this._id = new FormControl({ value: null, disabled: true });
    this.tipo_identificacion = new FormControl('', Validators.required);
    this.identificacion = new FormControl({value: '', disabled: false}, Validators.required);
    this.nombres = new FormControl('', Validators.required);
    this.apellidos = new FormControl('', Validators.required);
    this.direccion = new FormControl('');
    this.email = new FormControl('');
    this.telefono = new FormControl('');

    const _id = this._route.snapshot.paramMap.get('id');

    if(_id!=null) {
      this.personaService.getPersona(_id).subscribe(
        res => {
          this.personaForm.patchValue(res);
        }
      )
    }

    this.subscription = this.personaService._accion$.subscribe(
      res => {
        this._accion = res;
      }
    )
  }

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      '_id': this._id,
      'tipo_identificacion': this.tipo_identificacion,
      'identificacion': this.identificacion,
      'nombres': this.nombres,
      'apellidos': this.apellidos,
      'direccion': this.direccion,
      'email': this.email,
      'telefono': this.telefono
    })

    this.personaForm.get('tipo_identificacion').valueChanges.subscribe(
      value => {

      }
    )

    if(this._accion == null) this._accion = Tipo_Accion.GRABAR;
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  change_tipoIdentificacion(value: string){

  }

  onBlur_Identificacion(identificacion: string){
    if(this.tipo_identificacion.value == ''){
      alert('Seleccione el Tipo de Identificacón!');
      this.identificacion.setValue('');
    }

    //VALIDAR CEDULA
    this.personaService.existeIdentificacion(identificacion).subscribe(
      res => {
        if(res){
          alert('El número de identificación ya existe en la base de datos!');
          this.identificacion.setValue('');
        }
      }
    )
  }

  onSubmit(){
    switch(this._accion){
      case Tipo_Accion.GRABAR:
        this.addPersona();
      break;

      case Tipo_Accion.ACTUALIZAR:
        this.updatePersona();
      break;
    }
  }

  addPersona(){
    this.personaService.addPersona(this.personaForm.value).subscribe(
      res => {
        this.notifyService.showSuccess('Persona registrado con éxito!', 'Sistema');

        if(this.dialogRef != null){
          this.dialogRef.close(JSON.stringify(res));
        }
      },
      err => {
        this.notifyService.showError('Error: ' + err, 'Sistema');
      }
    )
  }

  updatePersona(){
    this.personaService.updatePersona(this.personaForm.getRawValue()).subscribe(
      res => {
        this.notifyService.showSuccess('Persona actualizada correctamente!', "Sistema");

        if(this.dialogRef != null){
          this.dialogRef.close(JSON.stringify(res));
        }
      },
      err => {
        this.notifyService.showError('Error: ' + err, "Sistema");
      }
    )
  }
}
