global with sharing class IntemController {
    
    

   
    @AuraEnabled
    public static List<String> getAssetClasses() {
        List<String> values = new List<String>();
        values.add('');
       for(Integer i = 1; i<=10;i++)
        {
    values.add( 'anil' +i);
         }
     system.debug('values' +values);
    
    return values;
    }
    
    @AuraEnabled
    public static Sector__c[] getSectors() {
        return [SELECT Id, Name FROM Sector__c ORDER BY Name];
    }
    
}