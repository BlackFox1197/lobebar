import {Component, Input} from '@angular/core';
import {OrgEvent, Shift, ShiftType, User} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";
import {assignShift, selectUser} from "@frontend-lb-nx/shared/services";

@Component({
  selector: 'frontend-lb-nx-shift-table',
  templateUrl: './shift-table.component.html',
  styleUrls: ['./shift-table.component.scss'],
})
export class ShiftTableComponent {
  @Input() shifts: Shift[] = []
  @Input() orgEvent: OrgEvent={
    name: "",
    start: new Date(),
    end: new Date(),
    shifts: this.shifts
  }
  @Input() showEditDelete=false

  displayedColumns: string[] = ['datetime', 'description', 'num_persons', 'persons', 'assign'];
  user: User|undefined = undefined


  constructor(private store: Store) {
    this.store.select(selectUser).subscribe(next => this.user=next)
  }

  //change the row color
  checkNumPersons(rowData: Shift): string {
    const lengthUser = rowData.users?.length ?? 0
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

  assignShift(shift: Shift){
    const shiftCopy = Object.assign({}, shift)
    if(this.user!=undefined){
      if(shift.users!=undefined){
        const userIds=shift.users.map(u=>u.id)
        if(userIds.indexOf(this.user["id"])==-1){
          this.store.dispatch(assignShift({shift}))
          shiftCopy.users=shift.users?.concat(this.user)
        }
      }
    }
    this.shifts = this.shifts.map(function(s) { return s.id == shift.id ? shiftCopy : s; });
  }

  deleteShift(rowData: Shift){
    /*
    const index=ELEMENT_DATA.indexOf(rowData)
    ELEMENT_DATA.splice(index,1)
    const index2= this.shifts.indexOf(rowData)
    this.shifts.splice(index2, 1)
    console.log(this.shifts)
    if(this.orgEvent.shifts!=undefined){
      const index3 = this.orgEvent.shifts.indexOf(rowData)
      this.orgEvent.shifts.splice(index3, 1)
    }

     */
  }

  mapToName(arr: User[]){
    return arr.map( (u)=> " "+u.username)
  }
}
