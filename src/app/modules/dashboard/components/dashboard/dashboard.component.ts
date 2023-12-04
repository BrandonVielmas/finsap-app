import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { UserService } from 'src/app/services/user.service';

export interface objetoFecha {
  year: string;
  month: string;
  day: string;
}

export interface InfoUser {
  accountBalance: string,
  userName: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {

  public fechaInicio: string = new Date().toISOString();
  public fechaFin: string = new Date().toISOString();
  public infoUser!: InfoUser;
  public infoGraficas: any;

  constructor(private _userService: UserService) { }

  ngOnInit() { 

    // const fechas = {
    //   fechaInicio: this.getObjetoFecha(this.fechaInicio),
    //   fechaFin: this.getObjetoFecha(this.fechaFin)
    // }

    const fechas = {
      fechaInicio: {
        "year": "2023",
        "month": "12",
        "day": "01"
      },
      fechaFin: {
        "year": "2023",
        "month": "12",
        "day": "15"
      },
    }

    this._userService.getUserAccount(1, fechas).subscribe(res => {
      this.infoUser = res.infoUser
      this.infoGraficas = res.infoGraficas
      this.construirGrafica()
    })

  }

  construirGrafica(): void {

    const dataSeries = this.infoGraficas.datosGraficas.map((item: any) => parseFloat(item.Total))
    const dataLabels = this.infoGraficas.datosGraficas.map((item: any) => {
      return `${item.description} $${item.Total}`
    })
    let options = {
      series: dataSeries,
      labels: dataLabels,
      chart: {
        type: 'pie',
      },
      plotOptions: {
        pie: {
          customScale: 1,
          donut: {
            labels: {
              show: false,
              total: {
                show: true,
                label: ''
              }
            }
          }
        }
      }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

  }

  public traerInfoFiltrada(): void {
    const inicio: objetoFecha = this.getObjetoFecha(this.fechaInicio);
    const fin: objetoFecha = this.getObjetoFecha(this.fechaFin);
  }

  getObjetoFecha(fecha: string) : objetoFecha {
    return {
      year: fecha.substring(0, 10).replace(/[^0-9]+/g, "").substring(0,4),
      month: fecha.substring(0, 10).replace(/[^0-9]+/g, "").substring(4,6),
      day: fecha.substring(0, 10).replace(/[^0-9]+/g, "").substring(6,8)
    }
  }


}
