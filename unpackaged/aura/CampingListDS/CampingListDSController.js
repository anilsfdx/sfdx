({
    CreateItem: function(component, event, helper) {


        console.log('Create record');
        //getting the candidate information 
        var NewItem = component.get("v.NewItem");
        console.log(NewItem);
        //Validation 

        //Calling the Apex Function 
        var action = component.get("c.saveItem");
        //Setting the Apex Parameter 
        action.setParams({
            NewItem: NewItem
        });
        console.log('call apex clss');

        //Setting the Callback 
        action.setCallback(this, function(a) {
            //get the response state 
            var state = a.getState();
            console.log(state);
            //check if result is successfull 
            if (state == "SUCCESS") {
                //Reset Form 
                var NewItem = {
                    'sobjectType': 'Camping_Item__c',
                    'Name': '',
                    'Quantity__c': '',
                    'Price__c': '',
                    'Packed__c': ''
                };
                //resetting the Values in the form 
                console.log('success created record');
                component.set("v.NewItem", NewItem);
                component.set("v.isOpen", true);
                component.set("v.message","Record created Succesfully"); 

            } else if (state == "ERROR") {

                var errors = a.getError();
                console.log('Errors' + errors);
                component.set("v.message", errors[0].message);
            }
        });

        //adds the server-side action to the queue         
        $A.enqueueAction(action);

    }

    ,



    // Load items from Salesforce
    doInit: function(component, event, helper) {

        // Create the action
        var action = component.get("c.getItems");

        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state == "SUCCESS") {
                component.set("v.items", response.getReturnValue());
                
            } else {
                console.log("Failed with state: " + state);
            }
        });

        // Send action off to be executed
        $A.enqueueAction(action);
    },
    handleAddItem: function(component, event, helper) {
        var action = component.get("c.saveItem");
        console.log('event begins');
        var NewItem = event.getParam("item");
        console.log('newitem' + NewItem)
        var lstItems = component.get("v.items");
        console.log('arry of items' + JSON.stringify(lstItems));
        lstItems.push(NewItem);
        component.set("v.items", lstItems);
        console.log("After:" + lstItems);
        action.setParams({
            "NewItem": NewItem
        });
        action.setCallback(this, function(response) {
            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {

                console.log('record created');
                component.set("v.isOpen", true);
                var NewItem = {
                    'sobjectType': 'Camping_Item__c',
                    'Name': '',
                    'Quantity__c': '',
                    'Price__c': '',
                    'Packed__c': ''
                };
            }
        });
        $A.enqueueAction(action);
    },

    closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.isOpen", false);
    }
})