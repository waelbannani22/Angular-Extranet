import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CHAINE_VIDE } from 'src/app.constants';
import { XMLTOJSON } from 'src/app/helper/xml-tojson.service';
import { SuggestionsReclamation } from 'src/app/services/models/suggestions-reclamation.model';
import { SuggestionsReclamationsService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit {

  myGroup: FormGroup = new FormGroup({
  
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
  constructor(
    private suggesReclamService: SuggestionsReclamationsService,
    private xmlToJson: XMLTOJSON,
  ) { 
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
