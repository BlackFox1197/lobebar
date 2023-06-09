import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {DoneExtraWorkTypes, OrgEvent, Shift, ShiftType, SnackType, User} from "@frontend-lb-nx/shared/entities";
import {on, Store} from "@ngrx/store";
import {
  changeShiftAssignment,
  EditDesc,
  selectShiftsError,
  selectUser,
  ShiftEffects
} from "@frontend-lb-nx/shared/services";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { ShiftTableStore } from './shift-table.store';
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  EditStringDialogComponent
} from "../dialogs/edit-string-dialog/edit-string-dialog.component";
import {
  ImportantDeleteDialogComponent
} from "../dialogs/important-delete-dialog/important-delete-dialog.component";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {filter, take} from "rxjs";

@Component({
  selector: 'frontend-lb-nx-shift-table',
  templateUrl: './shift-table.component.html',
  styleUrls: ['./shift-table.component.scss'],
  providers: [ShiftTableStore],
})
export class ShiftTableComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @Input() shifts: Shift[] = []
  @Input() orgEvent: OrgEvent={
    name: "",
    start: new Date(),
    end: new Date(),
    shifts: this.shifts
  }
  @Input() showEditDelete=false
  @Input() showAssign=true
  @Output() deleteShiftEvent = new EventEmitter<Shift>();
  @Input() log=false;


  $shiftsFromStore = this.shiftTableStore.selectShifts;

  elementsDatasource: MatTableDataSource<Shift> = new MatTableDataSource<Shift>();

  displayedColumns: string[] = ['datetime', 'description', 'num_persons', 'persons', 'assign'];
  user: User|undefined = undefined

  $deletingError = this.store.select(selectShiftsError);

  loadingShift = false;

  constructor(private store: Store, public shiftTableStore: ShiftTableStore, private snackBar: MatSnackBar, public dialog: MatDialog) {
    this.$shiftsFromStore.subscribe(next => this.setTableData(next));
    this.store.select(selectUser).subscribe(next => this.user=next)
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(this.log){
      console.log("shift-table: ngOnChanges")
    }
    if (changes['shifts'] !== undefined) {
      // console.log("shift-table: ngOnChanges: shifts changed")
      this.shiftTableStore.$updateShifts(changes['shifts'].currentValue);
      // this.setTableData(changes['data'].currentValue);
    }
  }

  ngOnInit(): void {
    this.shiftTableStore.$updateShifts(this.shifts);
    // this.setTableData(this.shifts);
  }
  ngAfterViewInit() {
    if (this.paginator !== undefined) {
      this.elementsDatasource.paginator = this.paginator;
    }
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
    const userIds = rowData.users?.map(u=>u.id)
    if(userIds?.includes(this.user?.id)){
      return false
    }
    return lengthUser<rowData.headcount
  }

  showUncheck(rowData: Shift): boolean{
    const userIds = rowData.users?.map(u=>u.id)
    if(userIds?.includes(this.user?.id)){
      return true
    }
    return false
  }

  // assignShift(shift: Shift, assign: boolean){
  //   const shiftCopy = Object.assign({}, shift)
  //   if(assign){
  //     if(this.user!=undefined){
  //       if(shift.users!=undefined){
  //         const userIds=shift.users.map(u=>u.id)
  //         if(userIds.indexOf(this.user["id"])==-1){
  //           this.store.dispatch(changeShiftAssignment({shift, deassign: !assign}));
  //           shiftCopy.users=shift.users?.concat(this.user)
  //         }
  //       }
  //     }
  //     this.shifts = this.shifts.map(function(s) { return s.id == shift.id ? shiftCopy : s; });
  //   }else{
  //     if(this.user!=undefined){
  //       if(shift.users!=undefined){
  //         const userIds=shift.users.map(u=>u.id)
  //         if(userIds.indexOf(this.user["id"])!=-1){
  //           this.store.dispatch(deassignShift({shift}))
  //           shiftCopy.users=shiftCopy.users?.filter(user=>user.id!== this.user?.id)
  //         }
  //       }
  //     }
  //   }
  //   this.shifts = this.shifts.map(function(s) { return s.id == shift.id ? shiftCopy : s; });
  //   this.setTableData(this.shifts);
  // }

  assignShift(shift: Shift, assign: boolean){
    const deassign = !assign;
    this.shiftTableStore.$changeAssignment({shift, deassign})
  }

  openEditShiftDialog(type: Shift, error?: number) {
    const dialogRef = this.dialog.open(EditStringDialogComponent, {data: {name: type.description, displayString: 'Beschreibung', errorcode: error}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const shiftUpdated = {...type, description: result};
        this.shiftTableStore.$editName({shift: shiftUpdated})
      }
    });
  }

  openDeleteShiftDialog(shift: Shift, isError = false) {

    const dialogRef = this.dialog.open(ImportantDeleteDialogComponent, {data: {name: shift.type.name, shift: shift, isError: isError}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteShiftEvent.emit(shift);

      }
    });
  }

  mapToName(arr: User[]){
    return arr.map( (u)=> " "+u.username)
  }

  /**
   * convert the array to the table data
   */
  setTableData(elements: Shift[]): void{
    this.elementsDatasource.data = elements;
  }

}
