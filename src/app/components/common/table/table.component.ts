import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatSortHeader } from '@angular/material';

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
	@ViewChild(MatSort) sort: MatSort;
	
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
	
	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}
}

