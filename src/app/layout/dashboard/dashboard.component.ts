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
    notes = [];
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
        var date = new Date();
        this.notes.push(
            {
                name: "How to use:",
                time: date.getHours() + ":"+date.getMinutes()+"&nbsp;&nbsp;"+ date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear(),
                content: "You can add new notes by clicking on the \"create a note\" button above. New notes will be added in this section."
            }
        );
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
        let content = document.getElementById("noteContent").innerHTML;
        this.notes.unshift({
            name: '',
            time: curTime,
            content: content
        })
        this.showModal = false;
    }


    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
