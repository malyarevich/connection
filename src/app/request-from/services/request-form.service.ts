import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from '~/environments/environment';
import { ignoredDocumentsForDownloadId, StepRadioEnum, customerTypeToConnect, documentsForDownload, IPetInit, defaultPetInit } from '../models/form.model';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '~/app/services/auth.service';

export interface IOptionSteps {
  [StepRadioEnum.typeConnection]?: string;
  [StepRadioEnum.askFrom]?: string;
  [StepRadioEnum.specialRights]?: string;
  [StepRadioEnum.documents]?: string;
}

export type ResListType = {
  options: any[]
}

export const defaultBranches: ResListType = {
  options: [
    {
      "id": 0,
      "label": "м.Запоріжжя"
    },
    {
        "id": 1,
        "label": "Бердянський"
    },
    {
        "id": 2,
        "label": "Більмацький"
    },
    {
        "id": 3,
        "label": "Василівський"
    },
    {
        "id": 4,
        "label": "Веселівський"
    },
    {
        "id": 5,
        "label": "Вільнянський"
    },
    {
        "id": 6,
        "label": "Гуляйпольский"
    },
    {
        "id": 7,
        "label": "Запорізький"
    },
    {
        "id": 8,
        "label": "Кам`янсько-Дніпровський"
    },
    {
        "id": 9,
        "label": "Мелітопольский"
    },
    {
        "id": 10,
        "label": "Оріхівський"
    },
    {
        "id": 11,
        "label": "Пологівський"
    },
    {
        "id": 12,
        "label": "Приазовський"
    },
    {
        "id": 13,
        "label": "Приморський"
    },
    {
        "id": 14,
        "label": "Токмацький"
    },
    {
        "id": 15,
        "label": "Якимівський"
    }
  ]
}

@Injectable({
  providedIn: 'root'
})
export class RequestFormService {
  requestFormGroup: FormGroup;
  isSubmitted = false;
  userDocFiles = {};
  resList$: BehaviorSubject<ResListType> = new BehaviorSubject<ResListType>(defaultBranches); // options
  doneSteps$: BehaviorSubject<IOptionSteps> = new BehaviorSubject<IOptionSteps>({
    typeConnection: null,
    askFrom: null,
    specialRights: null,
    documents: null,
  });

  get resList(): ResListType {
    return this.resList$.getValue();
  }
  set resList(value: ResListType) {
    this.resList$.next(value);
  }

  get doneSteps(): IOptionSteps {
    return this.doneSteps$.getValue();
  }

  set doneSteps(value: IOptionSteps) {
    this.doneSteps$.next(value);
  }

  private _documentsForDownload$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  get documentsForDownload$(): Observable<any> {
    return this._documentsForDownload$.asObservable();
  }

  get documentsForDownload(): any {
    return this._documentsForDownload$.getValue();
  }

  set documentsForDownload(list: any) {
    this._documentsForDownload$.next(list);
  }

  constructor(private http: HttpClient, private auth: AuthService) {
    // const petition = this.getApiList();
    // console.log('petition', petition);
    this.auth.token$.pipe(filter(token => (token !== null))).subscribe((token: string) => {
      this.takeResList(token);
    })
    // Инициализируем новую форм группу

    this.requestFormGroup = new FormGroup({
      // ******************************** RADIO Group ********************************
      clientType: new FormGroup({
        [StepRadioEnum.askFrom]: new FormControl(
          {
            value: null, // from who
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required // обязательное поле
          ]) // Validations
        ),
        [StepRadioEnum.typeConnection]: new FormControl(
          {
            value: null, // is by self
            disabled: false // off/on
          },
        ),
        [StepRadioEnum.specialRights]: new FormControl(
          {
            value: null, // from who
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required // обязательное поле
          ]) // Validations
        ),
      }),

      // ******************************** sectionRequest Fields ********************************
      personalInfo: new FormGroup({
        cellPdf3: new FormControl(
          {
            value: "191919", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf4: new FormControl(
          {
            value: "181818", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf5: new FormControl(
          {
            value: "171717", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf6: new FormControl(
          {
            value: "161616", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf7: new FormControl(
          {
            value: "151515", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf8: new FormControl(
          {
            value: "141414", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf9: new FormControl(
          {
            value: "131313", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf10: new FormControl(
          {
            value: "", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf11: new FormControl(
          {
            value: "111111", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf12: new FormControl(
          {
            value: "101010", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf13: new FormControl(
          {
            value: "999", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf14: new FormControl(
          {
            value: "888", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf15: new FormControl(
          {
            value: "777", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
          ]) // Validations
        ),
        cellPdf16: new FormControl(
          {
            value: "666", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf17: new FormControl(
          {
            value: "555", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf18: new FormControl(
          {
            value: "", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
          ]) // Validations
        ),
        cellPdf19: new FormControl(
          {
            value: "333", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf20: new FormControl(
          {
            value: "222", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        cellPdf21: new FormControl(
          {
            value: "111", // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        )
      }),

      personalInfoOptions: new FormGroup({
        cellPdf6: new FormControl(
          {
            value: 0, // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
          ])
        ),
        cellPdf10: new FormControl(
          {
            value: 1, // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
          ])
        ),
        cellPdf15: new FormControl(
          {
            value: 1, // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
          ])
        ),
        cellPdf18: new FormControl(
          {
            value: 2, // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
          ])
        ),
      }),

      // ******************************** sectionContacts Fields ********************************
      contacts: new FormGroup({
        passwordCustomer: new FormControl(
          {
            value: '12345678', // state
            disabled: false // off/on
            
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(8)
          ]) // Validations
        ),

        edrpouIpn: new FormControl(
          {
            value: 'ЯЯ88776655', // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(50) // max length
          ]) // Validations
        ),
        namePib: new FormControl(
          {
            value: 'Иванов Иван Иванович', // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(150) // max length
          ]) // Validations
        ),
        addressUr: new FormControl(
          {
            value: 'Улица 1', // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.minLength(3), // мин длина строки
            Validators.maxLength(100) // max length
          ]) // Validations
        ),
        addressPost: new FormControl(
          {
            value: 'Улица 2', // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required // обязательное поле
          ]) // Validations
        ),
  
        email: new FormControl(
          {
            value: 'email@email.com', // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.email
          ]) // Validations
        ),
        phone: new FormControl(
          {
            value: '+380101102103', // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required, // обязательное поле
            Validators.min(3), // мин длина строки
            Validators.maxLength(15) // max length
          ]) // Validations
        ),
      }),

      // ******************************** sectionLocation Fields ********************************
      location: new FormGroup({
        branchId: new FormControl(
          {
            value: null, // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required // обязательное поле
          ]) // Validations
        ),
        address: new FormControl(
          {
            value: 'Улица 3', // state
            disabled: false // off/on
          },
          Validators.compose([
            Validators.required // обязательное поле
          ]) // Validations
        ),
      }), 

      ////////////////////////////////RADIO FROUP 
    });

    // вкл функцию слежения за изменениями ЗНАЧЕНИЙ в форме
    this.requestFormGroup.statusChanges.subscribe(result => {
      // console.log(result);
    });

    this.doneSteps$
      .subscribe((data) => {
        if (this.doneSteps.specialRights && this.doneSteps.askFrom && this.doneSteps.typeConnection) {
          this.filterDocumentsForDownload(this.doneSteps.specialRights + this.doneSteps.askFrom + this.doneSteps.typeConnection);
        }
      }); // name is group
  }


  filterDocumentsForDownload(strategyId: string) {
    const documents = [];
    const { numberList } = customerTypeToConnect.find(elem => (strategyId === elem.id));
    numberList.forEach(id => {
      documents.push(documentsForDownload[id]);
    });
    this.documentsForDownload = documents;
    // console.log(this.documentsForDownload);
  }

  isPreviousStepDone(step: string, index: number = 0) {

    if (Object.values(StepRadioEnum)[index - 1] && (index > 0)) {
      return this.doneSteps[Object.values(StepRadioEnum)[index - 1]] !== null;
    }
    return true;
  }

  isDoneStep(stepId: string) {
    return this.doneSteps[stepId];
  }

  changeUserDocFiles(event: Event) {
    const target: any = event.target; // for compilation clear
    this.userDocFiles[target.id] = target.files[0];

    const formdata = new FormData()
    formdata.append('pdf', target.files[0]);

    const urlLoadingUserDocFiles = `${environment.urlUploadFiles}`;
    this.http.post(`${urlLoadingUserDocFiles}?token=${this.auth.token}`, formdata).subscribe(
      // success
      (successResponse: any) => {
        this.userDocFiles[target.id] = successResponse.filename;
        console.log(successResponse);
      },
      // error
      error => {
        console.log('error of loading to serverSide', error);
      }
    );
  }

  getFieldControlById(id: string, fg: FormGroup = null): AbstractControl {
    return fg ? fg.controls[id] : this.requestFormGroup.controls[id];
  }

  // TODO: remove
  getFormValueById(id: string) {
    return this.requestFormGroup.value[id];
  }

  hasUserDocFiles(id: string) {
    return !!this.userDocFiles[id];
  }

  getFormGroup(): FormGroup {
    return this.requestFormGroup;
  }

  // Documents
  isDocumentIgnored(id: string) {
    return !!ignoredDocumentsForDownloadId.find(elem => {
      return elem === id;
    });
  }

  isDocumentsSelected(): boolean {
    let isAllSelected = this.documentsForDownload.length > 0;
    this.documentsForDownload.forEach(documentItem => {
      if (!this.hasUserDocFiles(documentItem.id)) {
        if (!this.isDocumentIgnored(documentItem.id)) {
          isAllSelected = false;
        }
      }
    });
    return isAllSelected;
  }

  mergeByServerModel(form: any, files: any): any {
    // console.log('values', form)
    // console.log('files', files)
    return {
      "EDRPOU": form.contacts.edrpouIpn,
      "Password": form.contacts.passwordCustomer, // NOT SURE
      "NamePib": form.contacts.namePib,
      "addressUr": form.contacts.addressUr,
      "AddressPost": form.contacts.addressPost,
      "Email": form.contacts.email,
      "Phone": form.contacts.phone,
      "Status": 1, // NOT SURE
      "CustomerTypeToConnect": form.clientType.specialRights + form.clientType.askFrom + form.clientType.typeConnection,
      "BranchId": form.location.branchId,
      "Address": form.location.address,
      "onsentEcp": files.onsentEcp,
      "propertyRights": files.propertyRights,
      "situationPlan": files.situationPlan,
      "passport": files.passport,
      "teo": files.teo,
      "supplyContract": files.supplyContract,
      "severalOwners": files.severalOwners,
      "extractEd": files.extractEd,
      "foundingDocument": files.foundingDocument,
      "appointmentManager": files.appointmentManager,
      "extractRp": files.extractRp,
      "financialDetails": files.financialDetails,
      "situationDocument": files.situationDocument,
      "proxy": files.proxy,
      "powerTechConditions": files.powerTechConditions,
      "powersupplyContract": files.powersupplyContract,
      "powerExtractE": files.powerExtractE,
      "powerFoundingDocument": files.powerFoundingDocument,
      "powerAppointmentManager": files.powerAppointmentManager,
      "powerPayerPDV": files.powerPayerPDV,
      "powerPayerPNP": files.powerPayerPNP,
      "powerPayerStatus": files.powerPayerStatus,
      "another": files.another,
      "powerSituationPlan": files.powerSituationPlan
    };
  }

  // Pet Init List
  getComposedDataForBackend(form: any, files: any): any | IPetInit {
    return {
      "EDRPOU": form.contacts.edrpouIpn,
      "Password": form.contacts.passwordCustomer, // NOT SURE
      "NamePib": form.contacts.namePib,
      "addressUr": form.contacts.addressUr,
      "AddressPost": form.contacts.addressPost,
      "Email": form.contacts.email,
      "Phone": form.contacts.phone,
      "Status": 1, // NOT SURE
      "CustomerTypeToConnect": form.clientType.specialRights + form.clientType.askFrom + form.clientType.typeConnection, // NOT SURE
      "BranchId": form.location.branchId,
      "Address": form.location.address,
      // documents
      "onsentEcp": files.onsentEcp ? files.onsentEcp : '',
      "propertyRights": files.propertyRights ? files.propertyRights : '',
      "situationPlan": files.situationPlan ? files.situationPlan : '',
      "passport": files.passport ? files.passport : '',
      "teo": files.teo ? files.teo : '',
      "supplyContract": files.supplyContract ? files.supplyContract : '',
      "severalOwners": files.severalOwners ? files.severalOwners : '',
      "extractEd": files.extractEd ? files.extractEd : '',
      "foundingDocument": files.foundingDocument ? files.foundingDocument : '',
      "appointmentManager": files.appointmentManager ? files.appointmentManager : '',
      "extractRp": files.extractRp ? files.extractRp : '',
      "financialDetails": files.financialDetails ? files.financialDetails : '',
      "situationDocument": files.situationDocument ? files.situationDocument : '',
      "proxy": files.proxy ? files.proxy : '',
      "powerTechConditions": files.powerTechConditions ? files.powerTechConditions : '',
      "powersupplyContract": files.powersupplyContract ? files.powersupplyContract : '',
      "powerExtractE": files.powerExtractE ? files.powerExtractE : '',
      "powerFoundingDocument": files.powerFoundingDocument ? files.powerFoundingDocument : '',
      "powerAppointmentManager": files.powerAppointmentManager ? files.powerAppointmentManager : '',
      "powerPayerPDV": files.powerPayerPDV ? files.powerPayerPDV : '',
      "powerPayerPNP": files.powerPayerPNP ? files.powerPayerPNP : '',
      "powerPayerStatus": files.powerPayerStatus ? files.powerPayerStatus : '',
      "another": files.another ? files.another : '',
      "powerSituationPlan": files.powerSituationPlan ? files.powerSituationPlan : ''
    };
  }

  sendForm() {
    
    const data: any | IPetInit = this.getComposedDataForBackend(this.requestFormGroup.value, this.userDocFiles);

    // console.log('data this.requestFormGroup', this.requestFormGroup);
    // if (this.requestFormGroup.valid && this.petitionTo && this.petitionFrom) {
    if (this.requestFormGroup.valid) {
      // console.log('data from front', data);
      this.http
        .post(`${environment.urlSendForm}?token=${this.auth.token}`, data)
        .subscribe(
          item => {
            console.log('success, response by server', item);
            this.isSubmitted = true;
          },
          error => {
            console.error;
          }
        );
    }
  }

  // return this.http.get(`${environment.apiFB}/?api_token=${environment.api_token}`)
  getApiList(token: string): Observable<any> {
    return this.http.get(`${environment.apiFB}?token=${token}`)
      .pipe(
        map(response => response)
      )
  }

  takeResList(inputToken: string) {
    this.http.get(`${environment.apiFB}branches/?token=${inputToken}`).subscribe(
      (res: ResListType) => {
        // console.log("res", res)
        this.resList = res;
      }, console.error)
  }

}
