import { Component, OnInit } from '@angular/core';
import { Temperature } from './temperature';
import { PeopleService } from './people.service';

@Component({
  selector: 'temperature',
  template: `
  <section *ngIf="temperature">
  <section>
    <h2>Current Room Temperature {{temperature.fahrenheit}}&deg;F/{{temperature.celsius}} &deg;C </h2>
    <h3>As of {{temperature.dateTime}}</h3>
  </section>
  `
})
export class TemperatureComponent implements OnInit{
  temperature: Temperature;
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private peopleService : PeopleService){ }

  ngOnInit(){
    this.peopleService
      .getTemp()
      .subscribe(
         /* happy path */ t => this.temperature = t,
         /* error path */ e => this.errorMessage = e,
         /* onComplete */ () => this.isLoading = false);
  }
}
