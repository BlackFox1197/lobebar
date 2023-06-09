import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleFormDialogComponent } from './components/single-form-dialog/single-form-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShiftTableComponent } from './components/shift-table/shift-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EventOverviewComponent } from './components/event-overview/event-overview.component';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedServicesModule } from '@frontend-lb-nx/shared/services';
import { StoreModule } from '@ngrx/store';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegisterComponent } from './components/register/register.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SimpleTableComponent } from './components/simpleTable/simple-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SmallLoadingAnimationComponent } from './animations/components/small-loading-animation/small-loading-animation.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingOverlayComponent } from './animations/components/loading-overlay/loading-overlay.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FancyCircleLoaderComponent } from './animations/components/fancy-circle-loader/fancy-circle-loader.component';
import { AddShiftComponent } from './components/event-overview/add-shift/add-shift.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CountdownComponent } from './components/countdown/countdown.component';
import { RouterLink } from '@angular/router';
import { AchievementsOverviewComponent } from './components/achievements-overview/achievements-overview.component';
import { SingleAchievementComponent } from './components/achievements-overview/single-achievement/single-achievement.component';
import { SharedDirectivesModule } from '@frontend-lb-nx/shared/directives';
import { MatSortModule } from '@angular/material/sort';
import { UserBadgeComponent } from './components/achievements-overview/user-badge/user-badge.component';
import { StartEndDateInputComponent } from './components/start-end-date-input/start-end-date-input.component';
import { ShiftTableStore } from './components/shift-table/shift-table.store';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { LoadTilesComponent} from "./animations/components/load-tiles/load-tracks.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {EditStringDialogComponent} from "./components/dialogs/edit-string-dialog/edit-string-dialog.component";
import {
    ImportantDeleteDialogComponent
} from "./components/dialogs/important-delete-dialog/important-delete-dialog.component";
import {NumberInputDialogComponent} from "./components/dialogs/number-input-dialog/number-input-dialog.component";
import {EditDateTimeDialogComponent} from "./components/dialogs/edit-date-time-dialog/edit-date-time-dialog.component";
import {DropdownMenuDialogComponent} from "./components/dialogs/dropdown-menu-dialog/dropdown-menu-dialog.component";
import {ConfirmDialogComponent} from "./components/dialogs/confirm-dialog/confirm-dialog.component";

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        FormsModule,
        MatTableModule,
        MatIconModule,
        MatDatetimepickerModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,
        MatProgressSpinnerModule,
        StoreModule.forRoot({}),
        SharedServicesModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatDialogModule,
        MatExpansionModule,
        RouterLink,
        SharedDirectivesModule,
        MatSortModule,
        MatSnackBarModule,
        MatDividerModule,
        MatFormFieldModule,
    ],
  declarations: [
    SingleFormDialogComponent,
    LoadingOverlayComponent,
    SimpleTableComponent,
    ShiftTableComponent,
    LoginComponent,
    EventOverviewComponent,
    RegisterComponent,
    SmallLoadingAnimationComponent,
    FancyCircleLoaderComponent,
    AddShiftComponent,
    CountdownComponent,
    AchievementsOverviewComponent,
    SingleAchievementComponent,
    UserBadgeComponent,
    StartEndDateInputComponent,
    LoadTilesComponent,
      EditStringDialogComponent,
      ImportantDeleteDialogComponent,
      NumberInputDialogComponent,
      EditDateTimeDialogComponent,
      DropdownMenuDialogComponent,
      ConfirmDialogComponent,
  ],
  exports: [
      StartEndDateInputComponent,
    SingleFormDialogComponent,
    LoadingOverlayComponent,
    ShiftTableComponent,
    LoginComponent,
    SimpleTableComponent,
    EventOverviewComponent,
    SmallLoadingAnimationComponent,
    RegisterComponent,
    FancyCircleLoaderComponent,
    CountdownComponent,
    AchievementsOverviewComponent,
    SingleAchievementComponent,
    UserBadgeComponent,
    LoadTilesComponent,
      EditStringDialogComponent,
      ImportantDeleteDialogComponent,
  ],
  providers: [ShiftTableStore],
})
export class SharedUiModule {}
