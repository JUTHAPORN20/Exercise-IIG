({
    doInit : function(component, event, helper) {
        helper.fetchAccountHelper(component, event, helper);
        helper.fetchListViewHelper(component, event, helper);
    },

    selectChange : function(component, event, helper) {
        //console.log(component.get('v.testval'));
        var lstViewName = event.getSource().get("v.value");
        console.log("value: " + lstViewName);

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

        var action = component.get("c.ChangeList");
        action.setParams({
            "lstViewName" : lstViewName
        });

        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === 'SUCCESS') {
                component.set('v.acctList', response.getReturnValue())
            }
        });
        $A.enqueueAction(action);
    },

    openSubtabAccountDetails : function (component, event, helper) {
        var row = event.getParam('row');
        var thisId = row.Id;
        
        /*var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
          "url": "/lightning/r/Account/"+thisId +"/view"
        });
        urlEvent.fire();*/

        var workspaceAPI = component.find("workspace");
            workspaceAPI.openTab({
                url: '/lightning/n/Filter_data',
                
            }).then(function(response) {
                workspaceAPI.openSubtab({
                    parentTabId: response,
                    url: '/lightning/r/Account/'+ thisId +'/view',
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    },

})
