import {Component, Input} from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";
import {SingleFormDialogComponent} from "@frontend-lb-nx/shared/ui";
import {User} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";
import {selectUser} from "@frontend-lb-nx/shared/services";
import {
  EditStringDialogComponent
} from "../../../../../../shared/ui/src/lib/components/dialogs/edit-string-dialog/edit-string-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Validators} from "@angular/forms";
import {UsersOverviewStore} from "../../users-overview/users-overview.store";

//pass the types for the dialog
enum DetailType{
  nameType="Namen",
  firstnameType="Vornamen",
  lastnameType="Nachnamen",
  titelType="Titel",
  emailType="Email",
  handyNrType="Handynummer",
  passwordType="asswort",
}

@Component({
  selector: 'frontend-lb-nx-details-with-edit',
  templateUrl: './details-with-edit.component.html',
  styleUrls: ['./details-with-edit.component.scss'],
})


export class DetailsWithEditComponent {
  res: string | undefined;
  detailType=DetailType

  name="asdasdsad"
  @Input() user?: User;

  constructor(public dialog: MatDialog, private store: Store, private usersOverviewStore: UsersOverviewStore){
  }
  //open dialog and pass data and width
  openDialog(input: keyof User, type: string): void {
    // const dialogRef = this.dialog.open(EditStringDialogComponent, {data: {name: "(this.user as any)[input]"}})
    const dialogRef = this.dialog.open(EditStringDialogComponent, {data: {name: (this.user as any)[input], displayString: type, validators: [Validators.required, Validators.minLength(2)]}});
    //get the result from the dialog
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        console.log(result)
        console.log('The dialog was closed');
        const newUser = Object.assign({}, this.user);
        if(this.user != undefined){
          (newUser as any)[input] = result;
          newUser.roles=[]
          this.usersOverviewStore.updateUser({user: newUser})
        }

      }
    });
  }
}

