export interface IEmailVariable {
    id: number;    
    propertyName: string;
    propertyType: string;
    defaultValue?: string;
   
    creationTime?:string;
    creatorUserId?: string;
    lastModificationTime?:string;
    lastModifierUserId?: string;
    
  
    
  }