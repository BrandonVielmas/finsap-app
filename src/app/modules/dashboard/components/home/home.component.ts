import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  public user: any;

  constructor(private _userService: UserService) { }

  ngOnInit() {

    this._userService.getUserAccount(1).subscribe(res => {
      this.user = res;
      console.log(this.user);
    })

  }

}
