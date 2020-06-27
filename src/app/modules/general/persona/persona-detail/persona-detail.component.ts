import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/persona.service';
import { ActivatedRoute } from '@angular/router'
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-persona-detail',
  templateUrl: './persona-detail.component.html',
  styleUrls: ['./persona-detail.component.css']
})
export class PersonaDetailComponent implements OnInit {
  persona: Persona;

  constructor(
    private personaService: PersonaService,
    private _route: ActivatedRoute,
    private noyifyService: NotificationService
  ) {
    this.persona = new Persona();
  }

  ngOnInit(): void {
    const _id = this._route.snapshot.paramMap.get('id');

    if(_id != null){
      this.getPersona(_id);
    }
  }

  getPersona(_id: string){
    this.personaService.getPersona(_id).subscribe(
      res => {
        this.persona = res;
      },
      err => {
        this.noyifyService.showError('Error: ' + err.error, 'Sistema');
      }
    )
  }
}
