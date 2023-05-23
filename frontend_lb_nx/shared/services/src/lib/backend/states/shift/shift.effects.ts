import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';
import * as ShiftActions from './shift.actions';
import {selectOrgEventsState, selectOwnUser, selectUser, ShiftsBackendService} from "@frontend-lb-nx/shared/services";
import {addMonthsToDate, dateToUnix} from "../../../../../../../src/app/core/utils/date-functions";
import {Store} from "@ngrx/store";
import * as ShiftTypeActions from "../shift-types/shift-type.actions";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class ShiftEffects {


  loadOwnShifts$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ShiftActions.loadOwnShifts),
        switchMap((action) =>
            this.shiftsService.getShiftsUser(dateToUnix(new Date()), dateToUnix(addMonthsToDate(new Date(), 120)), action.userId).pipe(
                map((shifts) => {
                  return ShiftActions.loadOwnShiftsSuccess({ownShifts: shifts})
                }),
                catchError((error) => of(ShiftActions.loadOwnShiftsFailure({ error })))
            )));
  });

    loadOutstandingShifts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ShiftActions.loadOutstandingShifts),
            withLatestFrom(this.store.select(selectUser)),
            switchMap(([action, user]) =>
                this.shiftsService.getOutstandingShifts(user?.id?? "", dateToUnix(new Date()), dateToUnix(addMonthsToDate(new Date(), 120))).pipe(
                    map((shifts) => {
                        return ShiftActions.loadOutstandingShiftsSuccess({outstandingShifts: shifts})
                    }),
                    catchError((error) => of(ShiftActions.loadOutstandingShiftsFailure({ error })))
                )));
    });


    addShiftToEvent$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(ShiftActions.addShiftToEvent),
            switchMap((action)=>
                this.shiftsService.addShiftToEvent(action.shift, action.event).pipe(
                    map((returnedShift)=>{
                        return ShiftActions.addShiftToEventSuccess({shift: returnedShift});
                    }),
                    catchError((error)=> of(ShiftActions.addShiftToEventFailure({error})))
                ))
        );
    })

   // editName$ = createEffect(()=>{
   //     return this.actions$.pipe(
   //         ofType(ShiftActions.EditDesc),
   //         switchMap((action)=>{
   //             return this.shiftsService.update(action.shift).pipe(
   //                 map(()=>{
   //                     return ShiftActions.EditDescSuccess({shift: action.shift});
   //             }),
   //                 catchError((error: HttpErrorResponse)=> of(ShiftActions.EditDescFailure({error: error.status})))
   //             );
   //         })
   //     )
   // })

    // assignShift$ = createEffect(()=>{
    //     return this.actions$.pipe(
    //         ofType(ShiftActions.changeShiftAssignment),
    //         switchMap((action)=>
    //         this.shiftsService.assign(action.shift).pipe(
    //             map(()=>{
    //                 return ShiftActions.changeShiftAssignmentSuccess({shift: action.shift});
    //             }),
    //             catchError((error)=>of(ShiftActions.changeShiftAssignmentFailure({error})))
    //         ))
    //     )
    // })
    //
    // deassignShift$ = createEffect(()=>{
    //     return this.actions$.pipe(
    //         ofType(ShiftActions.deassignShift),
    //         switchMap((action)=>
    //             this.shiftsService.assign(action.shift, true).pipe(
    //                 map(()=>{
    //                     return ShiftActions.deassignShiftSuccess({shift: action.shift});
    //                 }),
    //                 catchError((error)=>of(ShiftActions.deassignShiftFailure({error})))
    //             ))
    //     )
    // })
    //
    changeShiftAssignment$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(ShiftActions.changeShiftAssignment),
            switchMap((action)=>
                this.shiftsService.assign(action.shift, action.deassign).pipe(
                    map(()=>{
                        return ShiftActions.changeShiftAssignmentSuccess({shift: action.shift, deassign: action.deassign});
                    }),
                    catchError((error)=>of(ShiftActions.changeShiftAssignmentFailure({error, deassign: action.deassign})))
                ))
        )
    });

  constructor(private actions$: Actions, private shiftsService: ShiftsBackendService, private store: Store) {}
}
