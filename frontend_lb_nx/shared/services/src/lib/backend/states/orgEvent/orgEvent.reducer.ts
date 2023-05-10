import { Action, createReducer, on } from '@ngrx/store';
import * as OrgEventActions from './orgEvent.actions';
import {OrgEvent, OrgEventClass} from "@frontend-lb-nx/shared/entities";
import * as ShiftTypeActions from "../shift-types/shift-type.actions";

export const orgEventFeatureKey = 'orgEvent';

export interface OrgEventsState {
    comingEvents: OrgEvent[]
    pastEvents: OrgEvent[]
    orgEvent: OrgEvent;

    // those timestamps are for controlling from when the events are loaded
    lowerTimestamp: number;
    higherTimestamp: number;

    isLoading: boolean;
    error?: number
}

const monthSeconds = 60*60*24*30;
export const orgEventInitialState: OrgEventsState = {
    lowerTimestamp: Math.floor((Date.now() / 1000) - monthSeconds * 3),
    higherTimestamp: Math.floor((Date.now() / 1000) + monthSeconds * 9),
    comingEvents: [],
    pastEvents: [],
    isLoading: false,
    orgEvent: new OrgEventClass()
};

export const reducer = createReducer(
  orgEventInitialState,
    on(OrgEventActions.loadOrgEvents, state => state),
    on(OrgEventActions.loadOrgEventsSuccess, (state, {orgEventsPast, orgEventsFuture}) => { return {...state, comingEvents: orgEventsFuture, pastEvents: orgEventsPast, isLoading: false}}),
    on(OrgEventActions.loadOrgEventsFailure, (state, {error}) => ({...state, error, success: false})),

    on(OrgEventActions.loadMoreFromFuture || OrgEventActions.loadMoreFromPast, (state) => {return{...state, isLoading: true}}),
    on(OrgEventActions.loadMoreSuccess, (state, {orgEvents, months}) => {
       if(months > 0){
           return {...state, comingEvents: [...state.comingEvents, ...orgEvents], higherTimeStamp: state.higherTimestamp + monthSeconds * months, isLoading: false}
         }else{
              return {...state, pastEvents: [...orgEvents, ...state.pastEvents], lowerTimestamp: state.lowerTimestamp - monthSeconds * - months, isLoading: false}
       }
    }),

    on(OrgEventActions.addOrgEvent, (state) => {return{...state, isLoading: true}}),
    on(OrgEventActions.addOrgEventSuccess, (state,{orgEvent})=>{return{...state, orgEvent: orgEvent, isLoading: false}}),
    on(OrgEventActions.addOrgEventFailure, (state, {error}) => ({...state, error, success: false})),

    on(OrgEventActions.deleteOrgEvent, (state) => {return{...state, isLoading: true}}),
    on(OrgEventActions.deleteOrgEventSuccess, (state,{orgEvent})=>{return{...state, orgEvent: state.orgEvent , isLoading: false}}),
    on(OrgEventActions.deleteOrgEventFailure, (state, {error}) => ({...state, error, success: false})),
);
