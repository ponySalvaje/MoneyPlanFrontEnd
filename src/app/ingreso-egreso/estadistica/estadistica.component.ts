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
    this.getEgresosPorCategoria();
  }

  public pieChartLabelsEgresosPorCategoria = [];
  public pieChartDataEgresosPorCategoria = [];
  public showPieChartEgresosPorCategoria = false;

  public pieChartTypeEgresosPorCategoria: string = 'pie';
  public chartColorsEgresosPorCategoria: any[] = [
    { 
      backgroundColor: ["#5858FA", "#FA5858"] 
    }];

  // Pie events
  public chartClickedEgresosPorCategoria(e: any): void {
    console.log(e);
  }
 
  public chartHoveredEgresosPorCategoria(e: any): void {
    console.log(e);
  }

  getEgresosPorCategoria() {
    this.transaccion.getExpensesByCategory(this.cliente.id, new Date().getFullYear(), new Date().getMonth())
    .subscribe(result => {
      console.log(result);
      for (let i in result) {
        if (result[i].amount != 0) {
          this.pieChartLabelsEgresosPorCategoria.push(result[i].categoryName);
          this.pieChartDataEgresosPorCategoria.push(result[i].amount);
          console.log(this.pieChartDataEgresosPorCategoria);
          this.showPieChartEgresosPorCategoria = true;
        }
      }
    }, err => {
      console.log(err);
    })
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
      this.showPie();
      this.showBar();
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
  public showPieChart = false;
  public showBarChart = false;

  // Pie
  public pieChartLabels: string[] = ['Ingresos', 'Egresos'];
  public pieChartData: number[] = [0, 0];
  public pieChartType: string = 'pie';
  public chartColors: any[] = [
    { 
      backgroundColor: ["#5858FA", "#FA5858"] 
    }];

  showPie() {
    this.pieChartData = [this.ingresos, this.egresos]
    this.showPieChart = true;
  }
  // Pie events
  public chartClicked(e: any): void {
    console.log(e);
  }
 
  public chartHovered(e: any): void {
    console.log(e);
  }

  // Bar

  showBar() {
    this.barChartData = [
      {data: [this.ingresos, this.egresos], label: 'Mes'},
    ];
    this.showBarChart = true;
  }

  public barChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  public barChartData: any[];
    
  public barChartLabels: string[] = ['Ingresos', 'Egresos'];
  
  public barChartType:string = 'bar';

    // Bar events
  public barClicked(e: any): void {
    console.log(e);
  }
 
  public barHovered(e: any): void {
    console.log(e);
  }
}
