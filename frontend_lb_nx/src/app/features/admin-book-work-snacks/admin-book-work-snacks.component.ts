import {Component, ElementRef, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  selectEWTypes,
  selectSnackTypes
} from "../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {UsersOverviewStore} from "../overviews/users-overview/users-overview.store";
import {filter, Observable, of} from "rxjs";
import {User} from "@frontend-lb-nx/shared/entities";
import {map} from "rxjs/operators";
import {MatSelect} from "@angular/material/select";
import {InSiteAnimations} from "@frontend-lb-nx/shared/ui";
import {selectLoggedIn} from "@frontend-lb-nx/shared/services";

@Component({
  selector: 'frontend-lb-nx-admin-book-work-snacks',
  templateUrl: './admin-book-work-snacks.component.html',
  styleUrls: ['./admin-book-work-snacks.component.scss'],
  animations: [InSiteAnimations.sequentialFadeIn],
})
export class AdminBookWorkSnacksComponent {

  $users = this.usersStore.selectUsers$
  $loading = this.usersStore.selectLoading$;
  $snackTypes = this.store.select(selectSnackTypes)
  $extraWorkTypes = this.store.select(selectEWTypes)

  $filteredUsers = this.$users


  $isLoggedIn = this.store.select(selectLoggedIn).pipe();
  $clickedUser?: Observable<User>

  constructor(private store: Store, private usersStore: UsersOverviewStore) {
    this.$isLoggedIn.subscribe(isLoggedIn => {
        if (isLoggedIn) {
            this.usersStore.loadUsers()
        }
    })
  }

  onKey(event: Event) {
    const {target} = event
    if(target){
      const searchString = (target as HTMLTextAreaElement).value
      this.$filteredUsers = this.filterUsersByAnyString(searchString, this.$users)
    }
  }

  getStringAttributes(user: User){
    const attr =Object.values(user)
    //remove id
    attr.shift()
    return attr.filter(attr=> typeof attr==="string")
  }

  private filterUsersByAnyString(value: string, users$: Observable<User[]>): Observable<User[]> {
    const filterValue = value.toLowerCase();
    return users$.pipe(
        map($users => $users.filter(user =>
            Object.values(user).some(attr =>
            typeof attr === 'string' && attr.toLowerCase().includes(filterValue)
            )
        ))
    );
  }



  clickUser(user: User) {
    if(this.$clickedUser!=undefined){
      this.$clickedUser=undefined
      setTimeout(() => {
        this.$clickedUser=of(user);
      }, 500);
    }else{
      this.$clickedUser=of(user)
    }
  }

  clickIfOneUser() {
    if(this.$filteredUsers.pipe(map($users => $users.length==1))){
      if(this.$clickedUser!=undefined){
        this.$clickedUser=undefined
        setTimeout(() => {
          this.$clickedUser=this.$filteredUsers.pipe(map($users=>$users[0]))
        }, 500);
      }else{
        this.$clickedUser=this.$filteredUsers.pipe(map($users=>$users[0]))
      }
    }
  }

  protected readonly Object = Object;
  protected readonly of = of;
}
