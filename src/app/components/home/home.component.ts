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
  public contents;
  private dataUrl = 'https://twyxn50h94.execute-api.ap-southeast-1.amazonaws.com/dev';
	private getContent = '/getHealthCheck/id/XXX';
	private getContentTemplate = '/getTemplate/id/XXX';
	public appId = 0;

	constructor(private http: HttpClient) {
		this.getTemplate();
	}
	
	getTemplate() {
		let newUrl = this.getContentTemplate.replace(
			'XXX', '0');
		this.http.get(this.dataUrl + newUrl)
			.subscribe((resp) => {
				this.template = resp;
			});
	}
	
	getData(strApp) {
		if (strApp.id) {
			this.data = null;
			this.appId = strApp.id;
			this.selectedApp = strApp.name;
			let newUrl = this.getContent.replace(
				'XXX', strApp.id);
			this.http.get(this.dataUrl + newUrl)
				.subscribe((resp) => {
					this.data = resp;
					this.contents = resp.contents;
					console.log(this.contents);
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