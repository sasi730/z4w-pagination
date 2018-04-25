﻿import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import * as _ from 'underscore';

import { PagerService } from './_services/pager.service'

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    constructor(private http: Http, private pagerService: PagerService) { }
public sasi:any;
public s:any;

    // array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    ngOnInit() {
        // get dummy data
        this.http.get('./dummy-data.json')
            .map((response: Response) => response.json())
            .subscribe(data => {
                this.s=7;
                // set items to json response
                this.allItems = data;
this.sasi=this.s;
                // initialize to page 1
                this.setPage(this.sasi);
            });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}