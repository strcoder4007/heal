import { Component, OnInit, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import filestack from 'filestack-js';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit, AfterViewInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    notes = [
        {
            name: "How to use:",
            time: "17:48&nbsp;&nbsp;02/04/2018",
            content: "You can add new notes by clicking on the \"create a note\" button above. New notes will be added in this section.<br>You can add photos, files and articles in the note. when you upload a file the file will be uploaded and a url will be generated. After clicking on \"add the note\" button, you can view your files."
        }
    ];
    showModal: Boolean = false;
    apiKey: String = 'A9CFNM6bKS2qOfMvu8SSQz';
    textAreaContent: string;

    constructor() {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

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

    uploadFiles() {
        const client = filestack.init(this.apiKey);
        client.pick({
            accept: ['.doc', '.pdf'],
            maxFiles: 1
        }).then(function (result) {
            return result.filesUploaded[0];
        }).then(x => {
            let fileUrl = x.url;
            let fileName = x.filename;
            document.getElementById("noteContent").innerHTML += "<a target=\"_blank\" href=\""+ fileUrl +"\"> "+fileName+" </a>";
            this.textAreaContent = document.getElementById("noteContent").innerHTML;
        });
    }


    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
