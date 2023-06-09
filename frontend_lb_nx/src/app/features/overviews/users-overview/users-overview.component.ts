import { Component } from '@angular/core';
import {
  DoneExtraWorkTypes,
  ShiftType,
  User,
  UserFunctions,
  UserRoles,
  userRolesMap
} from "@frontend-lb-nx/shared/entities";
import {UsersOverviewStore} from "./users-overview.store";
import {loadUser} from "@frontend-lb-nx/shared/services";
import {Observable} from "rxjs";
import {
  ImportantDeleteDialogComponent
} from "../../../../../shared/ui/src/lib/components/dialogs/important-delete-dialog/important-delete-dialog.component";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {
  ShiftType_DoneEW_AddComponentDialog
} from "../../../../../shared/ui/src/lib/components/dialogs/shift-type-done-ew-add/shift-type_-done-e-w_-add-component-dialog.component";
import {
  DropdownMenuDialogComponent
} from "../../../../../shared/ui/src/lib/components/dialogs/dropdown-menu-dialog/dropdown-menu-dialog.component";

@Component({
  selector: 'frontend-lb-nx-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss'],
})
export class UsersOverviewComponent {
  displayedColumns: string[] = ['position', 'name', 'email', 'telefonnr', 'fullname', 'punkte', 'balance','approved', 'role' ,'delete'];
  $usersLoading = this.usersOverviewStore.selectLoading$;
  readonly users$= this.usersOverviewStore.selectUsers$;
  //$deletingError = this.usersOverviewStore.selectDeletingError$;

  constructor(private usersOverviewStore: UsersOverviewStore, public dialog: MatDialog) {
    this.usersOverviewStore.loadUsers();
  }

  deleteUser(user: User, isError = false) {

    const dialogRef = this.dialog.open(ImportantDeleteDialogComponent, {data: {name: user.username, isError: isError}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // type.name = result;
        this.usersOverviewStore.deleteUser({user: user})
        //TODO update state and show erros
        //this.$deletingError.pipe(map((loading,) => loading.adding)).subscribe({next: (value) => this.loadingEWT = value})
      }
    });


  }

  approveUser(user: User) {
    this.usersOverviewStore.approveUser({user: user})
  }

  genHighestRole(valueUserRole: number) {
    return userRolesMap.get(valueUserRole)
  }

  openDialog(currentRole: string, user: User): void {
    const dialogRef = this.dialog.open(DropdownMenuDialogComponent, {data: {
      displayString: "Rolle von "+user.username+" ändern.",
        currentRole: userRolesMap.get(UserFunctions.getRole(user)),
        choices: [...userRolesMap.values()],
      }});

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const uppercaseRole = "ROLE_"+result.toUpperCase()
        const userCopy = Object.assign({}, user)
        userCopy.roles = []
        userCopy.roles=userCopy.roles.concat([uppercaseRole])
        this.usersOverviewStore.updateUserRole(userCopy)

      }
      console.log('The dialog was closed');
    });
  }

  protected readonly UserRoles = UserRoles;
  protected readonly UserFunctions = UserFunctions;
}
