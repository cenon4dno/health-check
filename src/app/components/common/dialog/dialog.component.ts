import { Component, Input, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface ConfigInterface {
	app: any;
	tab: String;
	row: String;
}

@Component({
    templateUrl: 'dialog.component.html',
    styleUrls: ['./dialog.component.css']
})

export class DialogComponent {
    public values = [];
    public keys = [];
    public qtd = [];
    public newData;
    public exception = ['app', 'row', 'tab']; // Do not show field
    public disabled = ['id', 'type']; // Not editable fields

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
          this.qtd = Object.assign([], this.values);
          console.log(this.values);
      }

    onCancelClick(): void {
      this.dialogRef.close();
    }

    onDeleteClick(): void {
        this.dialogRef.close();
      }

    onSaveClick(): void {
        console.log(this.data);
        console.log(this.data.selected);
        let selected = this.data.selected;
        let config = {app: "", row: "", tab: ""};
        this.exception.forEach(function(element) {
            console.log(config);
            console.log(element);
            config[element] = selected[element];
            delete selected[element];
        });
        console.log(selected);
        console.log(config);
        delete this.data.selected;
        console.log(this.data);

        let newUrl = this.updateContent.replace('XXX', config.app);

        // 
        var newData = {
            id: config.app,
            expression: "set contents[" + config.tab + "].entries[" + config.row + "] = :r",
            val: selected
        };

        console.log(JSON.stringify(newData));

         this.http.post(this.dataUrl + newUrl, this.newData)
		 	.subscribe((resp) => {
		 		console.log(resp);
		 	});
        this.dialogRef.close();
    }

}


