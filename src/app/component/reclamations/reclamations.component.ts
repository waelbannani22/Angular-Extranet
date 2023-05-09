import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CHAINE_VIDE } from 'src/app.constants';
import { fileSizeValidator } from 'src/app/helper/Validation';
import { XMLTOJSON } from 'src/app/helper/xml-tojson.service';
import { LoginPharmacienService } from 'src/app/services/login-pharmacien.service';
import { SuggestionsReclamation } from 'src/app/services/models/suggestions-reclamation.model';
import { SuggestionsReclamationsService } from 'src/app/services/reclamation.service';
import { TokenStorageService } from 'src/app/services/token-storage-service.service';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit {

  myGroup: FormGroup = new FormGroup({
    convention: new FormControl(''),
    titre: new FormControl(''),
    description: new FormControl(''),
    qualification:new FormControl(''),
    byteFile: new FormControl(''),
    nature:new FormControl('')
  });
  collapsed = false;
  dataSource!: SuggestionsReclamation[];
  //TypeReclamation=[]
   TypeReclamation: any[] = [];

  contentReady = (e: {
    component: { expandRow: (arg0: string[]) => void };
  }) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };
  submited = false;
   //getter
   get f(): { [key: string]: AbstractControl } {
    return this.myGroup.controls;
  }
  constructor(
    private suggesReclamService: SuggestionsReclamationsService,
    private xmlToJson: XMLTOJSON,
    private formBuilder: FormBuilder,
    private loginService:LoginPharmacienService,
    private router:Router
  ) { 
    if (!loginService.isAuthenticated()){
       loginService.logOut()
       
    }
    this.Click()
    
    this.suggesReclamService.getTableReferentielByCodeType('TREC').subscribe(async (res:any) => {
      try {
        if(res!=null){
          const jsonObj = this.xmlToJson.xmlToJson(res);
          this.TypeReclamation=jsonObj['Envelope']['Body']['getTableReferentielByCodeTypeResponse']['return']
          console.log(jsonObj)
        }
      } catch (error) {
        console.info(error)
      }
    })
    
  }

  ngOnInit(): void {
    this.myGroup = this.formBuilder.group({
      convention:['',Validators.required],
      titre:['',Validators.required],
      description:['',Validators.required],
      qualification:['',Validators.required],
      byteFile:['',fileSizeValidator(2)],
      nature:['',]
      
    },{
    
    });

  }
  onSubmit(){
    this.submited = true;
    console.log("launched created rec")
    const titre=this.myGroup.value.titre
    const convention=this.myGroup.value.convention
    const description =this.myGroup.value.description
    const qualitfication=this.myGroup.value.qualification
    const nature=this.myGroup.value.nature
    const byteFile =this.myGroup.value.byteFile
   
    //console.log(qualitfication)
    console.log("is my variables correct: "+this.myGroup.valid)
    if(this.myGroup.valid){
       console.log("in created rec")
        this.suggesReclamService.createReclamation(byteFile,CHAINE_VIDE,CHAINE_VIDE,"EMPLOYEUR_X",CHAINE_VIDE
        ,CHAINE_VIDE,CHAINE_VIDE,description,"0",titre,"réclamation",qualitfication).subscribe(res=>{
          console.log("success")
          window.location.reload()
        },
        err=>{
          console.log(err)
        }
        )
    }else{
      return
    }
     
    
   
  }
  Click() {
    console.log('clicked');
    this.suggesReclamService
      .getListReclamationByMatricule(
        0,
        999,
        CHAINE_VIDE,
        CHAINE_VIDE,
        CHAINE_VIDE,
        8,
        CHAINE_VIDE,
        CHAINE_VIDE,
        CHAINE_VIDE,
        CHAINE_VIDE,
        CHAINE_VIDE,
        CHAINE_VIDE,
       CHAINE_VIDE
      )
      .subscribe(
        async (data) => {
          try {
            if (data != null) {
            // console.log(data)
              const jsonObj = this.xmlToJson.xmlToJson(data);
              console.log('jsonobj=', jsonObj);
              if(jsonObj !=null ){
                const resultJson= this.suggesReclamService.getDataListReclamationByMatricule(jsonObj)
                //console.log(resultJson)
               
               const filteredResult= resultJson.filter(rec=>rec.matriculeAdherent=="EMPLOYEUR_X")
               this.dataSource=filteredResult
                console.log(filteredResult.length)
                
              }else{
                console.log('erreur');
              }
            } else {
              console.log('data null');
            }
          } catch (error) {
            console.log('error convert' + error);
          }
        },
        (err) => {
          console.log('erreur');
        }
      );
  }

}
