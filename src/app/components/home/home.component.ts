import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CryptoJS from 'crypto-js';

export interface EntryInterface {
	id: String;
	name: String;
	contents: String[];
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent {
	public title = 'AXA Asia SSC - Health Check';
	public template;
	public data;
	public selectedApp;
	public dataLocation;
	public contents: Array<any>;
	public appId = 0;
	public password;
	public show = false;
	public bPass = false;
	
	private dataUrl = 'https://twyxn50h94.execute-api.ap-southeast-1.amazonaws.com/dev';
	private getContent = '/getHealthCheck/id/XXX';
	private getContentTemplate = '/getTemplate/id/XXX';
	private pass = 'U2FsdGVkX19IcYmA76hmFfJ0dKUW5tAAH5bxRifsEe0=';
	public msg = "Secret Password";
	

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
	
	updateEntries(entries: String[]) {
		this.data = null;
		this.getData({id:1});
	}

	getData(objApp) {
		if (objApp.id) {
			this.data = null;
			this.appId = objApp.id;
			let newUrl = this.getContent.replace(
				'XXX', objApp.id);
			this.http.get(this.dataUrl + newUrl)
				.subscribe((resp:EntryInterface) => {
					this.data = resp;
					console.log(resp);
					if (resp.hasOwnProperty('contents')) {
						this.contents = resp.contents;
						this.show = true;
					};
				});
		}
		
	}
	
	refresh() {
		this.show = false;
		let objApp = {id: this.appId};
		console.log('here', objApp);
		this.getData(objApp);
	}
	
	hasProp(o, name) {
	  if (o) {
		return o.hasOwnProperty(name);
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
	
	onChangePass() {
		console.log(this.password);
		var encrypted = CryptoJS.AES.decrypt(this.pass, this.msg);
		if (encrypted.toString(CryptoJS.enc.Utf8) == this.password) {
			this.bPass = true;
		}
	}
}