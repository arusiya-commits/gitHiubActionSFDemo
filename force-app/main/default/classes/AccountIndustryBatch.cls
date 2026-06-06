public with sharing class AccountIndustryBatch implements Database.Batchable<SObject>, Database.Stateful {
    private Integer recordsUpdated = 0;

    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(
            'SELECT Id, Industry FROM Account WHERE Industry = NULL WITH SECURITY_ENFORCED'
        );
    }

    public void execute(Database.BatchableContext bc, List<Account> scope) {
        for (Account acc : scope) {
            acc.Industry = 'Other';
        }
        Database.SaveResult[] results = Database.update(scope, false);
        for (Database.SaveResult sr : results) {
            if (sr.isSuccess()) {
                recordsUpdated++;
            }
        }
    }

    public void finish(Database.BatchableContext bc) {
        System.debug('AccountIndustryBatch complete. Records updated: ' + recordsUpdated);
    }
}
