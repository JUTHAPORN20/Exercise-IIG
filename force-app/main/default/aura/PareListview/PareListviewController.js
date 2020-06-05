({
    doInit : function(component, event, helper) {
        var action = component.get("c.fieldLeads");
        
        action.setParams({
            "objectInfo" : component.get("v.objectInfo")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.objectInfo", objectInfo);

            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);

                    }
                    else {
                        console.log("Unknown error");
                    }
                }
            }

        });
        $A.enqueueAction(action);
    }
})
