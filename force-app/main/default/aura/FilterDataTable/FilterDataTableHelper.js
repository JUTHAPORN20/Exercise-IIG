({
    fetchAccountHelper : function(component, event, helper) {
        // set label to acctColumns
        component.set('v.acctColumns',[
            {label: 'Account Name', fieldName: 'Name', type: 'Name', target: '_blank'},

            {label: 'Fax', fieldName: 'Fax', type: 'Fax'},

            {label: 'Phone', fieldName: 'Phone', type: 'Phone'},

            {label: 'Website', fieldName: 'Website', type: 'url'},

            {label: 'Type', fieldName: 'Type', type: 'Picklist'},
            
            {label: 'Industry', fieldName: 'Industry', type: 'Picklist'},

            {label: 'View', type: 'button', 
            typeAttributes: { label: 'View Details', name: 'view_details', title: 'Click to View Details'}},
        ]);

        var action = component.get("c.ListAccount"); // get apex controller
        action.setParam({}); // sent param
        action.setCallback(this, function(response){

            var state = response.getState();
            if (state === 'SUCCESS') {
                component.set('v.acctList', response.getReturnValue())
            }
        });
        $A.enqueueAction(action);
    },

    fetchListViewHelper : function(component, event, helper) {
        var action = component.get("c.listValues");
        action.setParams({});

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var listViewResult = response.getReturnValue();
                if(listViewResult.length > 0){
                    // set listViewResult attribute with response
                    component.set("v.listViewResult", listViewResult);
                }            
            } 
            else if (state === "INCOMPLETE") {
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
})
