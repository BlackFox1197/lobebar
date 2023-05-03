import { createAction, props } from '@ngrx/store';
import {DoneExtraWorkTypes, ShiftType} from "@frontend-lb-nx/shared/entities";

export const loadShiftTypes = createAction(
  '[ShiftType] Load ShiftTypes'
);

export const loadShiftTypesSuccess = createAction(
  '[ShiftType] Load ShiftTypes Success',
  props<{ shiftTypes: ShiftType[], ew_types: DoneExtraWorkTypes[] }>()
);

export const loadShiftTypesFailure = createAction(
  '[ShiftType] Load ShiftTypes Failure',
  props<{ error: number }>()
);

export const addShiftType = createAction(
    '[ShiftType] Adding ShiftType',
    props<{shiftType: ShiftType}>()
);

export const addShiftTypeSuccess = createAction(
    '[ShiftType] Adding ShiftType Success',
    props<{shiftType: ShiftType}>()
)

export const addShiftTypeFailure = createAction(
    '[ShiftType] Adding ShiftType Failure',
    props<{error: number}>()
)

export const addExtraWorkType = createAction(
    '[EW_Type] Adding EW_Type',
    props<{ew_type: DoneExtraWorkTypes}>()
);

export const addExtraWorkTypeSuccess = createAction(
    '[EW_Type] Adding EW_Type Success',
    props<{ew_type: DoneExtraWorkTypes}>()
)

export const addExtraWorkTypeFailure = createAction(
    '[EW_Type] Adding EW_Type Failure',
    props<{error: number}>()
)

export const deleteShiftType = createAction(
    '[ShiftType] Deleting ShiftType',
    props<{shiftType: ShiftType}>()
);

export const deleteShiftTypeSuccess = createAction(
    '[ShiftType] Deleting ShiftType Success',
    props<{shiftType: ShiftType}>()
)

export const deleteShiftTypeFailure = createAction(
    '[ShiftType] Deleting ShiftType Failure',
    props<{error: number}>()
)


export const deleteEWT = createAction(
    '[EW_Type] Deleting EW_Type',
    props<{ew_type: DoneExtraWorkTypes}>()
);

export const deleteEWTSuccess = createAction(
    '[EW_Type] Deleting EW_Type Success',
    props<{ew_type: DoneExtraWorkTypes}>()
)

export const deleteEWTFailure = createAction(
    '[EW_Type] Deleting EW_Type Failure',
    props<{error: number}>()
)

