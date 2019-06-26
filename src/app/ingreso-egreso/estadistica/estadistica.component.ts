import { Component, OnInit } from '@angular/core';
import { TransaccionAPIService } from 'src/app/services/transaccion-api.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  public cliente;
  public ingresos;
  public egresos;

  constructor(private transaccion: TransaccionAPIService) { }

  ngOnInit() {
    this.getCliente();
    this.getIngresos();
  }

  getIngresos() {
    this.transaccion.getIncomes(this.cliente.id, new Date().getFullYear(), new Date().getMonth())
    .subscribe(result => {
      this.ingresos = JSON.parse(JSON.stringify(result));
      this.getEgresos();
    }, err => {
      console.log(err);
    });
  }

  getEgresos() {
    this.transaccion.getExpenses(this.cliente.id, new Date().getFullYear(), new Date().getMonth())
    .subscribe(result => {
      this.egresos = JSON.parse(JSON.stringify(result));
      this.showPieChart()
    }, err => {
      console.log(err);
    });
  }

  getCliente() {
    let cliente = {
      docId: "71653252",
      docIdType: "DNI",
      email: "marcesftwr2@gmail.com",
      id: 1,
      name: "Marcelo",
      phoneNumber: "956868516"
    }
    this.cliente = cliente;
  }

  // Graphs
  public showGraphs = false;

  // Pie
  public pieChartLabels: string[] = ['Ingresos', 'Egresos'];
  public pieChartData: number[] = [0, 0];
  public pieChartType: string = 'pie';
  public chartColors: any[] = [
    { 
      backgroundColor: ["#5858FA", "#FA5858"] 
    }];

  showPieChart() {
    this.pieChartData = [this.ingresos, this.egresos]
    this.showGraphs = true;
  }
  // Pie events
  public chartClicked(e: any): void {
    console.log(e);
  }
 
  public chartHovered(e: any): void {
    console.log(e);
  }

  // Bar

  public barChartData: any[]=[
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [42, 24, 71, 14, 31, 49, 30], label: 'Series C'}
    ];
    
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  
  public barChartType:string = 'bar';

    // Bar events
  public barClicked(e: any): void {
    console.log(e);
  }
 
  public barHovered(e: any): void {
    console.log(e);
  }
}
