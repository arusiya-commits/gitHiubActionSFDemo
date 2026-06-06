public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT Id, Name, Email, Phone, Title, Account.Name
            FROM Contact
            WITH SECURITY_ENFORCED
            ORDER BY Name ASC
            LIMIT 50
        ];
    }
}
