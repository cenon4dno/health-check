import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent {
	@Input() template;
	@Input() enabled;
	@Input() appId;
	@Input() tabId;
	@Output() enabler = new EventEmitter<boolean>();
	@Output() updater = new EventEmitter<boolean>();
	public message:string;
	private dataUrl = 'https://twyxn50h94.execute-api.ap-southeast-1.amazonaws.com/dev';
	private updateContent = '/updateHealthCheck/id/XXX';
	
    constructor(private http: HttpClient) {}
	
	ngOnInit() {
		this.message = this.template;
	}
	
	onCancel() {
		this.enabler.emit(false);
	}
	
	onUpdate() {
		let newUrl = this.updateContent.replace('XXX', this.appId);
        var newData = {
            id: '' + this.appId,
            expression: "set contents[" + this.tabId + "].template=:r",
            expressionVal: {":r": JSON.parse(this.message)}
        };
		console.log(newData);

        this.http.post(this.dataUrl + newUrl, newData)
		 	.subscribe((resp) => {
				this.updater.emit(true);
				this.enabler.emit(false);
		});
	}	
}


