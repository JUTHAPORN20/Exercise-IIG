public class AccountController{
    @AuraEnabled
    public static List<Account> fetchAccounts() {
        List<Account> accList = [SELECT Id, Name, Fax, Phone, Website, Type, Industry 
                                FROM Account];
        //return list of accounts
        return accList;
    }

    /*@AuraEnabled
    public static list<listViewWrapper> listValues(string objectInfo){
 
        list<listViewWrapper> oListViewWrapper = new list<listViewWrapper>();
 
        for(ListView lv : [SELECT id, Name, DeveloperName FROM ListView
                           WHERE sObjectType = : objectInfo ORDER By Name ASC]){ 
            listViewWrapper oWrapper = new listViewWrapper();
            oWrapper.label = lv.Name;
            oWrapper.developerName = lv.DeveloperName;
            oListViewWrapper.add(oWrapper);
        }
        return oListViewWrapper; 
    }
    
    //wrapper class to store listView details
    public class listViewWrapper{
        @AuraEnabled public string label{get;set;} 
        @AuraEnabled public string developerName{get;set;} 
    }*/
    

    //Select id,Title,FileType,CreatedBy.Name,ContentSize From contentDocument LIMIT 1000
}