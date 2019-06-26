import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Pie
  public pieChartLabels:string[] = ['Ingresos', 'Egresos'];
  public pieChartData:number[] = [1900, 2000];
  public pieChartType:string = 'pie';
  public chartColors: any[] = [
    { 
      backgroundColor:["#5858FA", "#FA5858"] 
    }];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
