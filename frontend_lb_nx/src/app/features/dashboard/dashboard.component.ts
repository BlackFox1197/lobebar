import { Component } from '@angular/core';
import {selectLoggedIn, selectOutstandingShifts, selectUser, selectUserLoaded} from "@frontend-lb-nx/shared/services";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Store} from "@ngrx/store";
import {tap} from "rxjs";

@Component({
  selector: 'frontend-lb-nx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  $userNameObs= this.store.select(selectUser)
  $outStandingShiftsObs = this.store.select(selectOutstandingShifts)
      //.pipe(tap(user => console.log(user)));

  constructor(private store:Store) {
  }
}
