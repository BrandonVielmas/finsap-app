import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { IncomeService } from 'src/app/services/income.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  @ViewChild(IonModal) modal: any;

  public user: any;

  constructor(private _userService: UserService, private _incomeService: IncomeService) { }

  ngOnInit() {

    this.getInfoUser()

  }

  private getInfoUser() {
    this._userService.getUserAccount(1).subscribe(res => {
      this.user = res;
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


}
