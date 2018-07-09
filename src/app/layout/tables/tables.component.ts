import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import filestack from 'filestack-js';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {

    notes = [];
    showModal: Boolean = false;
    apiKey: String = 'A9CFNM6bKS2qOfMvu8SSQz';
    textAreaContent: string;

    constructor() {}


    openCompose() {
        this.textAreaContent = "";
        this.showModal = true;
    }
    closeCompose() {
        this.showModal = false;
    }

    addNote() {
        var date = new Date();
        let curTime = date.getHours() + ":"+date.getMinutes()+"&nbsp;&nbsp;"+ date.getDate()+"/"+date.getMonth()+1+"/"+date.getFullYear();
        let name = (<HTMLInputElement>document.getElementById("noteName")).value;
        let content = document.getElementById("noteContent").innerHTML;
        if(name.length && content.length) {
            this.notes.unshift({
                name: name,
                time: curTime,
                content: content
            })
        }
        this.showModal = false;
    }

    uploadPhotos() {
        const client = filestack.init(this.apiKey);
        client.pick({
            accept: ['image/*'],
            maxFiles: 1
        }).then(function (result) {
            return result.filesUploaded[0].url;
        }).then(fileUrl => {
            document.getElementById("noteContent").innerHTML += "<img style=\"padding: 5px\" class=\"col-xs-12\" src=\""+ fileUrl +"\" height=\"auto\" width=\"100%\"/><br>";
            this.textAreaContent = document.getElementById("noteContent").innerHTML;
        });
    }


    ngOnInit() {
        var date = new Date();
        this.notes.push(
            {
                name: "How to use:",
                time: date.getHours() + ":"+date.getMinutes()+"&nbsp;&nbsp;"+ date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear(),
                content: "You can add new picture note by clicking on the \"Create a picture note\" button above.<br>You can add:<ul><li>Title</li><li>Description</li><li>Photos</li></ul>"                
            }
        );
    }
}
