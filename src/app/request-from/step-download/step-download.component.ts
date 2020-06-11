import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';

import { RequestFormService, ResListType } from '../services/request-form.service';
import { refDocument } from '../models/form.model';

import { MyErrorStateMatcher } from '../error-list/error-list.component';


@Component({
  selector: 'app-step-download',
  templateUrl: './step-download.component.html',
  styleUrls: ['./step-download.component.scss']
})
export class StepDownloadComponent implements OnInit {
  @Input() fieldItem: any;
  @Input() fg: FormGroup;

  get refDocument(): string {
    return refDocument;
  }

  get options(): any {
    return this._options;
  }
  _options: [] = [];

  public matcher = new MyErrorStateMatcher();

  constructor(private reqForm: RequestFormService) {
     this.reqForm.resList$.pipe(filter(resList => (resList !== null))).subscribe((resList: ResListType) => {
       this._options = resList.options;
     });
  }

  ngOnInit() {
    // this.resList = this.reqForm.resList;
  }

}
