import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { DialogComponent } from './../dialog/dialog.component';

@Component({
  selector: 'table-hc',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

@Injectable()
export class TableComponent {
	public dataSource;
	public columns;
	public displayedColumns: string[];
	@Input() config;
	@Input() data;
	@Input() tab;
	@Input() app;
	@Input() contents;
	@ViewChild(MatSort) sort: MatSort;

	constructor(public dialog: MatDialog) {}
	
	ngOnInit() {
		this.columns = this.config.columns;
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
			console.log('The dialog was closed');
		  });
	}

	insertRow() {
		console.log(this.data);
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
			console.log('The dialog was closed');
		  });
	}
	
	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}
}