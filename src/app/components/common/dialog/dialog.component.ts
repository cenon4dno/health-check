import { Component, Input, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HomeComponent } from './../../home/home.component';

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
    public newData;
    public exception = ['app', 'row', 'tab', 'dialogType', 'count']; // Do not show field
    public disabled = ['id']; // Not editable fields

    private dataUrl = 'https://twyxn50h94.execute-api.ap-southeast-1.amazonaws.com/dev';
	private updateContent = '/updateHealthCheck/id/XXX';

    constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private http: HttpClient) {
          console.log(this.data);
          this.keys = Object.keys(this.data.selected);
          for (let prop of this.keys) {
            this.values.push(this.data.selected[prop]);
          }
          this.qtd = this.data.selected;
      }

    onCancelClick(): void {
      this.dialogRef.close();
    }

    onInsertClick(): void {
        console.log(this.qtd);
        let selected = this.qtd;
        let config = {app: "", row: "", tab: "", count: "", dialogType: ""};
        let id = selected.count;
        this.exception.forEach(function(element) {
            console.log(selected);
            config[element] = selected[element];
            delete selected[element];
        });
        selected.id = id;
        console.log(selected);
        delete this.data.selected;

        let newUrl = this.updateContent.replace('XXX', config.app);

        var newData = {
            id: '' + config.app,
            expression: "set contents[" + config.tab + "].entries[" + config.count + "]=:r",
            expressionVal: {":r": selected},
            val: selected
        };

        console.log(JSON.stringify(newData));

         this.http.post(this.dataUrl + newUrl, newData)
		 	.subscribe((resp) => {
		 		console.log(resp);
		 	});
        this.dialogRef.close();
    }


    onDeleteClick(): void {
        let selected = this.qtd;
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
                 //LAUNCH EMITTER
		});
        this.dialogRef.close();
    }

    onSaveClick(): void {
        let selected = this.qtd;
        let config = {app: "", row: "", tab: ""};
        this.exception.forEach(function(element) {
            console.log(selected);
            config[element] = selected[element];
            delete selected[element];
        });
        console.log(selected);
        delete this.data.selected;

        let newUrl = this.updateContent.replace('XXX', config.app);

        var newData = {
            id: '' + config.app,
            expression: "set contents[" + config.tab + "].entries[" + config.row + "]=:r",
            expressionVal: {":r": selected},
            val: selected
        };

        console.log(JSON.stringify(newData));

         this.http.post(this.dataUrl + newUrl, newData)
		 	.subscribe((resp) => {
		 		console.log(resp);
		 	});
        this.dialogRef.close();
    }

}


