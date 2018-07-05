import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public title = 'AXA Asia SSC - Health Check';
  public template;
  public data;
  public selectedApp;
  public dataLocation;
  private templateUrl = 'assets/template.json';
  private dataUrl = 'assets/data/XXX.json';

	constructor(private http: HttpClient) {
		this.getTemplate();
	}
	
	getTemplate() {
		this.http.get(this.templateUrl)
			.subscribe((resp) => {
				this.template = resp;
			});
	}
	
	getData(strAppName) {
		if (strAppName) {
			this.data = null;
			this.selectedApp = strAppName;
			let newUrl = this.dataUrl.replace(
				'XXX', strAppName.toLowerCase());
			this.http.get(newUrl)
				.subscribe((resp) => {
					this.data = resp;
				});
		}
		
	}
	
	hasProp(o, name) {
	  if (o) {
		return o.hasOwnProperty(name);
	  }
	  
	  return false;
	}
	
	getTableConfig(id) {
		if (this.template && this.template.hasOwnProperty('tablePerTab')) {
			var configs = this.template.tablePerTab.find(x => x.id == id);
			return configs;
		}
		
		return false;
	}
	
	getTableContent(id) {
		if (this.data && this.data.hasOwnProperty('contents')) {
			
			 var contents = this.data.contents.find(x => x.id == id);
			 return contents;
			 
		}
		
		return false;
	}
}