public class DataTableController {
    
    @AuraEnabled
    public static List<Account> ListAccount() {
        List<Account> accountList = [SELECT Id, Name, Fax, Phone, Website, Type, Industry 
                                        FROM Account
                                        ORDER BY Name DESC];
        //return list of accounts
        return accountList;
    }

    @AuraEnabled
    public static list<listViewWrapper> listValues(){
        
        list<listViewWrapper> oListViewWrapper = new list<listViewWrapper>();
 
        for(ListView lv : [SELECT id, Name, DeveloperName FROM ListView
                            WHERE sObjectType='Account' 
                            AND DeveloperName != 'PlatinumandGoldSLACustomers'
                            ORDER By Name ASC]){ 
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
    }

    @AuraEnabled
    public static List<Account> ChangeList(string lstViewName) {
        List<Account> ChangeAcct = new List<Account>();
        System.debug(lstViewName);
        if (lstViewName == 'AllAccounts') {
            ChangeAcct = [SELECT Id, Name, Fax, Phone, Website, Type, Industry 
                            FROM Account 
                            ORDER BY Name DESC];
            
        }
        else if (lstViewName == 'MyAccounts') {
            ChangeAcct = [SELECT Id, Name, Fax, Phone, Website, Type, Industry 
                            FROM Account
                            WHERE CreatedById = :UserInfo.getUserId() 
                            ORDER BY Name DESC];
        }
        else if (lstViewName == 'NewLastWeek') {
            ChangeAcct = [SELECT Id, Name, Fax, Phone, Website, Type, Industry 
                            FROM Account
                            WHERE CreatedDate = LAST_WEEK 
                            ORDER BY Name DESC];
        }
        else if (lstViewName == 'NewThisWeek') {
            ChangeAcct = [SELECT Id, Name, Fax, Phone, Website, Type, Industry 
                            FROM Account
                            WHERE CreatedDate = THIS_WEEK 
                            ORDER BY Name DESC];
            
        }
        // else if (lstViewName == 'PlatinumandGoldSLACustomers') {
        //     ChangeAcct = [SELECT Id, Name, Fax, Phone, Website, Type, Industry 
        //                     FROM Account];
        // }
        else if (lstViewName == 'RecentlyViewedAccounts') {
            ChangeAcct = [SELECT Id, Name, Fax, Phone, Website, Type, Industry 
                            FROM Account
                            WHERE LastViewedDate != NULL 
                            ORDER BY LastViewedDate DESC];
        }
        System.debug(ChangeAcct);
        return ChangeAcct;
    }
    
}
