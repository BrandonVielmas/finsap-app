import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { delay } from 'rxjs';
import { ExpensesService } from 'src/app/services/expenses.service';
import { IncomeService } from 'src/app/services/income.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  @ViewChild(IonModal) modal: any;
  @ViewChild(IonModal) modalAggGasto: any;

  public user: any;
  public expenses: any[] | undefined;
  public expensesAux: any[] | undefined;
  public verFiltros: boolean = false;

  public fechaFiltroFechas: any;


  public descripcionGasto: string = "";
  public montoGasto: any;

  public isModeAddgastoOpen = false;

  constructor(private _userService: UserService, private _incomeService: IncomeService, private _expensesService: ExpensesService) { }

  ngOnInit() {

    this.getInfoUser()

  }

  private getInfoUser() {
    this._userService.getUserAccount(1).subscribe(res => {
      this.user = res;
      if(res) {
        this._expensesService.getExpensesByUser(1).subscribe(data => {
          this.expenses = data;
          this.expensesAux = data;
        });
      }
    })
  }

  public handleCard() {
    
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

  handleInput(e: any) {
    let ingreso = parseFloat(e.target.value);
    if(!isNaN(ingreso) && ingreso > 0) {
      this.guardarIngreso(ingreso, this.user.userId)
    }
    
  }

  closeModalAddGasto() {
    this.isModeAddgastoOpen = false;
  }

  openModalAddGasto() {
    this.isModeAddgastoOpen = true;
  }

  confirmModalAddGasto() {

    const expense = {
      userId: this.user.userId,
      amountSpent: this.montoGasto,
      expenseDescription: this.descripcionGasto,
    }
    this._expensesService.insertExpenseByUser(expense).subscribe(async res => {
      if(res) {
        this.getInfoUser()
        this.closeModalAddGasto()
        this.montoGasto = null;
        this.descripcionGasto = '';
      }
    })

  }


  // onWillDismiss(e: any) {
  //   let ingreso = parseFloat(e.target.value);
  //   console.log(e.detail)
  //   if(!isNaN(ingreso) && ingreso > 0 && e.detail.role === 'confirm') {
  //     this.guardarIngreso(ingreso, this.user.userId)
  //   }
  // }

  private guardarIngreso(ingreso: number, userId: number) {
    this._incomeService.saveIncomeUser(ingreso, userId).subscribe(res => {
      if(res) {
        this.getInfoUser()
      }
    })
  }

  public onChangeInputDate(e: any) {

    this.expenses = this.expensesAux
    
    const fechaSeleccionadaDate = new Date(e.detail.value)
    const year = fechaSeleccionadaDate.getFullYear();
    const month = String(fechaSeleccionadaDate.getMonth() + 1).padStart(2, '0');
    const day = String(fechaSeleccionadaDate.getDate()).padStart(2, '0');
    const fechaFormateada = `${year}-${month}-${day}`;

    this.aplicarFiltroGastos(fechaFormateada)

  }

  private aplicarFiltroGastos(fecha: any) {
    this.expenses = this.expenses?.filter(f => {
      return f.createDate === fecha
    });
  }

  public handleToggleFiltros(event: any) {
    this.verFiltros = event.detail.checked
    if(!this.verFiltros) { this.expenses = this.expensesAux; }
  }


}
