import { Component, Input, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface ConfigInterface {
	app: any;
	tab: String;
	row: String;
    count: String;
    dialogType: String;
}

@Component({
    templateUrl: 'dialog.component.html',
    styleUrls: ['./dialog.component.css']
})

export class DialogComponent {
    public values = [];
    public keys = [];
    public qtd;
	public tempQtd;
    public exception = ['app', 'row', 'tab', 'dialogType', 'count']; // Do not show field
    public disabled = ['id']; // Not editable fields

    private dataUrl = 'https://twyxn50h94.execute-api.ap-southeast-1.amazonaws.com/dev';
	private updateContent = '/updateHealthCheck/id/XXX';

    constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private http: HttpClient) {
          this.keys = Object.keys(this.data.selected);
          for (let prop of this.keys) {
            this.values.push(this.data.selected[prop]);
          }
          this.qtd = this.data.selected;
		  this.tempQtd = Object.assign({}, this.qtd);
      }

    onCancelClick(): void {
	  this.tempQtd = Object.assign(this.qtd);
      this.dialogRef.close();
    }
	
	onInsertClick(): void {
        let selected = this.tempQtd;
        let config = {app: "", row: "", tab: "", count: "", dialogType: ""};
        let id = selected.count;
        this.exception.forEach(function(element) {
            config[element] = selected[element];
            delete selected[element];
        });
        selected.id = id;
        delete this.data.selected;
        let newUrl = this.updateContent.replace('XXX', config.app);
        var newData = {
            id: '' + config.app,
            expression: "set contents[" + config.tab + "].entries[" + config.count + "]=:r",
            expressionVal: {":r": selected},
            val: selected
        };
		this.data.entries.push(selected);
		this.http.post(this.dataUrl + newUrl, newData)
			.subscribe((resp) => {
		});
        this.dialogRef.close();
    }

    onDeleteClick(): void {
        let selected = this.tempQtd;
        let config = {app: "", row: "", tab: ""};
        this.exception.forEach(function(element) {
            config[element] = selected[element];
        });

        this.data.entries.splice(config.row, 1);

        let newUrl = this.updateContent.replace('XXX', config.app);

        var newData = {
            id: '' + config.app,
            expression: "set contents[" + config.tab + "].entries=:r",
            expressionVal: {":r": this.data.entries},
        };

        this.http.post(this.dataUrl + newUrl, newData)
		 	.subscribe((resp) => {
		});
        this.dialogRef.close();
    }

    onUpdateClick(): void {
        let selected = this.tempQtd;
        let config = {app: "", row: "", tab: ""};
        this.exception.forEach(function(element) {
            config[element] = selected[element];
            delete selected[element];
        });
        delete this.data.selected;

        let newUrl = this.updateContent.replace('XXX', config.app);

        var newData = {
            id: '' + config.app,
            expression: "set contents[" + config.tab + "].entries[" + config.row + "]=:r",
            expressionVal: {":r": selected},
            val: selected
        };

		this.data.entries[config.row] = this.tempQtd;
        this.http.post(this.dataUrl + newUrl, newData)
		 	.subscribe((resp) => {
		 	});
        this.dialogRef.close();
    }

}


