import { Component, Input, Output, ViewChild, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { DialogComponent } from './../dialog/dialog.component';
import { SettingsComponent } from './../settings/settings.component';

@Component({
  selector: 'table-hc',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

@Injectable()
export class TableComponent {
	public dataSource;
	public columns;
	public strTemplate;
	public bSettings = false;
	public displayedColumns: string[];

	@Input() data;
	@Input() tab;
	@Input() app;
	@Input() contents;
	@Output() homeRefresh = new EventEmitter<boolean>();
	@ViewChild(MatSort) sort: MatSort;

	constructor(public dialog: MatDialog,
		private cd: ChangeDetectorRef) {
	}
	
	ngOnInit() {
		this.columns = this.data.template;
		this.displayedColumns = this.columns.map(x=>x.columnDef);
		this.dataSource = new MatTableDataSource(this.data.entries);
	}
	
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); 
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	}

	getSelected(selected, ind) {
		selected = Object.assign(selected, {
			app: this.app,
			tab: this.tab,
			row: ind
		});
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '450px',
			height: '450px',
			data: Object.assign(this.data, {selected: selected})
	    });
	  
		dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
			this.cd.detectChanges();
		});
	}
	
	insertRow() {
		const selected = Object.assign(this.data.template, {
			app: this.app,
			tab: this.tab,
			dialogType: 'insert',
			count: this.data.entries.length + 1
		});
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '450px',
			height: '450px',
			data: Object.assign(this.data, {selected: selected})
		  });
	  
		  dialogRef.afterClosed().subscribe(result => {
			this.ngOnInit();
			this.cd.detectChanges();
		  });
	}
	
	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}
	
	settings() {
		this.strTemplate = JSON.stringify(this.data.template, undefined, 4);
		this.bSettings = !this.bSettings;
	}
	
	setSettings(setter: boolean) {
		this.bSettings = setter;
	}
	
	setSettingsUpdate(updated: boolean) {
		console.log('updated', updated);
		if (updated) {
			this.homeRefresh.emit(false);
		}
	}
}