import { Injectable } from '@angular/core';
import { CHAINE_VIDE } from 'src/app.constants';
declare var require: any;
@Injectable({
    providedIn: 'root'
})
export class XMLTOJSON {
    parser: any;
    options: any;
    jsonObj: any;
    constructor() {
        // Back office web service 'SOAP'
        this.parser = require('fast-xml-parser');
        const he = require('he');
        this.options = {
            attributeNamePrefix: '@_',
            attrNodeName: 'attr', // default is 'false'
            textNodeName: '#text',
            ignoreAttributes: true,
            ignoreNameSpace: true,
            allowBooleanAttributes: false,
            parseNodeValue: true,
            parseAttributeValue: false,
            trimValues: true,
            cdataTagName: '__cdata', // default is 'false'
            cdataPositionChar: '\\c',
            localeRange: CHAINE_VIDE, // To support non english character in tag/attribute values.
            parseTrueNumberOnly: true,
            attrValueProcessor: (a: any) => he.decode(a, { isAttributeValue: true }), // default is a=>a
            tagValueProcessor: (a: any) => he.decode(a) // default is a=>a
        };
    }
    xmlToJson(data: any): any {
        if (data != null) {
           // optional (it'll return an object in case it's not valid)
           if(this.parser.validate(data)===true){
             this.jsonObj = this.parser.parse(data, this.options);
           }
               
            

            // Intermediate obj
            

            const tObj = this.parser.getTraversalObj(data, this.options);
            this.jsonObj = this.parser.convertToJson(tObj, this.options);
            return this.jsonObj;
            
           //return JSON.stringify(this.jsonObj)
        }
        return null;
    }
}
