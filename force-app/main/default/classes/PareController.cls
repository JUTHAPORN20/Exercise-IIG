public with sharing class PareController {
    
    @AuraEnabled
    public static List<Lead> fieldLeads(string objectInfo){
        list<Lead> leadList = [SELECT Name, Company, Email 
                                FROM Lead];
        return leadList;
    }
}
