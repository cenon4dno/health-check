import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { 
	  MatAutocompleteModule,
	  MatBadgeModule,
	  MatBottomSheetModule,
	  MatButtonModule,
	  MatButtonToggleModule,
	  MatCardModule,
	  MatCheckboxModule,
	  MatChipsModule,
	  MatDatepickerModule,
	  MatDialogModule,
	  MatDividerModule,
	  MatExpansionModule,
	  MatGridListModule,
	  MatIconModule,
	  MatInputModule,
	  MatListModule,
	  MatMenuModule,
	  MatNativeDateModule,
	  MatPaginatorModule,
	  MatProgressBarModule,
	  MatProgressSpinnerModule,
	  MatRadioModule,
	  MatRippleModule,
	  MatSelectModule,
	  MatSidenavModule,
	  MatSliderModule,
	  MatSlideToggleModule,
	  MatSnackBarModule,
	  MatSortModule,
	  MatStepperModule,
	  MatTableModule,
	  MatTabsModule,
	  MatToolbarModule,
	  MatTooltipModule,
	  MatTreeModule,
	  MatFormFieldModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/common/table/table.component';
import { DialogComponent } from './components/common/dialog/dialog.component';
import { SettingsComponent } from './components/common/settings/settings.component';

@NgModule({
  declarations: [
    HomeComponent,
	TableComponent,
	DialogComponent,
	SettingsComponent
  ],
  imports: [
    BrowserModule,
	NgbModule.forRoot(),
	HttpClientModule,
	MatTableModule,
	MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
	MatSortModule,
	MatSelectModule,
	BrowserAnimationsModule,
	FormsModule,
	MatDialogModule
  ],
  providers: [],
  bootstrap: [HomeComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
