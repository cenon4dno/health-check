import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
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
	
	getValue(element, id) {
		return eval("element." + id);
	}

	getSelected(selected, ind) {
		console.log(this.contents);
		console.log(this.data);
		console.log(this.tab);
		console.log(this.app);
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
	
	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}
}