public with sharing class ContactController {
    @AuraEnabled
    public static List<Contact> getContacts() {
        List<Contact> contacts = 
                [SELECT Id, Name, Phone, Email FROM Contact];
        //Add isAccessible() check
        return contacts;
    }
    
   @AuraEnabled
    public static Contact findById(String contactId) {
        system.debug('ctid' +contactId );
        return [SELECT id, name, Email
                    FROM Contact WHERE Id = :contactId];
    }
}