@IsTest
private class AccountIndustryBatchTest {

    @TestSetup
    static void makeData() {
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < 5; i++) {
            accounts.add(new Account(Name = 'Test Account ' + i));
        }
        accounts.add(new Account(Name = 'Account With Industry', Industry = 'Technology'));
        insert accounts;
    }

    @IsTest
    static void testBatchUpdatesBlankIndustry() {
        Test.startTest();
        Database.executeBatch(new AccountIndustryBatch(), 200);
        Test.stopTest();

        List<Account> updated = [SELECT Id, Industry FROM Account WHERE Name LIKE 'Test Account %'];
        for (Account acc : updated) {
            System.assertEquals('Other', acc.Industry, 'Industry should be set to Other');
        }
    }

    @IsTest
    static void testBatchLeavesExistingIndustryUntouched() {
        Test.startTest();
        Database.executeBatch(new AccountIndustryBatch(), 200);
        Test.stopTest();

        Account withIndustry = [SELECT Industry FROM Account WHERE Name = 'Account With Industry'];
        System.assertEquals('Technology', withIndustry.Industry, 'Existing industry should not be changed');
    }
}
