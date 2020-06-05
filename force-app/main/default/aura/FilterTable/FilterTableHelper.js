({
    fetchAccHelper : function(component, event, helper) {
        component.set('v.mycolumns', [
            {label: 'Account Name', fieldName: 'linkName', type: 'url', 
            typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'} },
            
            /* Create button -> click to view detail account in row table
            {label: 'View', type: 'button', 
            typeAttributes: { label: 'View Details', name: 'view_details', title: 'Click to View Details'}},*/

            {label: 'Fax', fieldName: 'Fax', type: 'Fax'},

            {label: 'Phone', fieldName: 'Phone', type: 'Phone'},

            {label: 'Website', fieldName: 'Website', type: 'url'},

            {label: 'Type', fieldName: 'Type', type: 'Picklist'},
            
            {label: 'Industry', fieldName: 'Industry', type: 'Picklist'},

            ]);
        // c.fetchAccounts - AccountController apex class
        var action = component.get("c.fetchAccounts");
        action.setParams({
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                // Click in record - Set link account
                var records =response.getReturnValue();
                records.forEach(function(record){
                    record.linkName = "/lightning/r/Account/"+record.Id +"/view";
                });
                // Click in record - Set component - records -> acctList
                component.set("v.acctList",records);

                component.set("v.acctList", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
})