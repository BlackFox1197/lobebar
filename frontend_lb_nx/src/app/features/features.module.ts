import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnUserOverviewComponent } from './own-user-overview/own-user-overview.component';
import { DetailsWithEditComponent } from './own-user-overview/details-with-edit/details-with-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from '@angular/cdk/dialog';
import { UsersOverviewComponent } from './users-overview/users-overview.component';
import { MatTableModule } from '@angular/material/table';
import { EventsOverviewComponent } from './events-overview/events-overview.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiModule } from '@frontend-lb-nx/shared/ui';
import { CalendarComponent } from './calendar/calendar.component';
import * as Globalize from 'globalize/dist/globalize';
import { CalendarCommonModule, CalendarMonthModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar/calendar-header/calender-header.component';
import { PointsComponent } from './points/points.component';
import { EventAddComponent } from './events-overview/event-add/event-add.component';
import {RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDatetimepickerModule} from "@mat-datetimepicker/core";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    DashboardComponent,
    OwnUserOverviewComponent,
    DetailsWithEditComponent,
    UsersOverviewComponent,
    EventsOverviewComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    PointsComponent,
    EventAddComponent,
  ],
  exports: [DashboardComponent, OwnUserOverviewComponent],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    DialogModule,
    CommonModule,
    MatTableModule,
    MatTabsModule,
    SharedUiModule,
    CalendarMonthModule,
    CalendarCommonModule,
    RouterLink,
    MatInputModule,
    MatDatepickerModule,
    MatDatetimepickerModule,
    FormsModule,
  ],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'de'}
  ]
})
export class FeaturesModule {}
