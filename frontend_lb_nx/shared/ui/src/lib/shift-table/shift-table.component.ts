import { Component } from '@angular/core';
import {OrgEvent, Shift, ShiftType, User} from "@frontend-lb-nx/shared/entities";

const orgEvent: OrgEvent={
  id: "asdsad", name: "trollEvent", start: new Date(Date.now()), end: new Date(Date.now()), shifts: [],
}

const user1: User={
  id: "2312",
  name: "emil",
  roles: [],
  password: "xxxxx",
  email: "hallo@asadsa.de",
  firstname: "gunni",
  lastname: "jochen",
  titel: "Master of A",
  hygienepass: true,
  telephone: 231412124,
}

const user2: User={
  id: "2312",
  name: "goenndalf",
  roles: [],
  password: "xxxxx",
  email: "hallo@asadsa.de",
  firstname: "gunni",
  lastname: "jochen",
  titel: "Master of A",
  hygienepass: true,
  telephone: 231412124,
}

const shiftType:  ShiftType={
  id: "asdassadsd", name:"Barschicht"
}

const ELEMENT_DATA: Shift[] = [
  { description: 'Hydrogen', starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [], shiftType: shiftType},
  { description: 'Helium',starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [user1, user2], shiftType},
];

@Component({
  selector: 'frontend-lb-nx-shift-table',
  templateUrl: './shift-table.component.html',
  styleUrls: ['./shift-table.component.scss'],
})
export class ShiftTableComponent {
  displayedColumns: string[] = ['name', 'datetime', 'num_persons', 'persons', 'assign'];
  dataSource = ELEMENT_DATA;

  //change the row color
  checkNumPersons(rowData: Shift): string {
    const lengthUser = rowData.users?.length ?? 0
    console.log(lengthUser)
    if (lengthUser<rowData.headcount) {
      return "red"
    } else {
      return "green"
    }
  }

  showCheck(rowData: Shift): boolean {
    const lengthUser = rowData.users?.length ?? 0
    return lengthUser<rowData.headcount
  }

  mapToName(arr: User[]){
    return arr.map( (u)=> " "+u.name)
  }
}
