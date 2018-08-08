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
                var data = response.getReturnValue();
                
                 var actions = [
            { label: 'Show details', name: 'show_details' }
        ];
          

                var columns = [{
                        label: 'Name',
                        fieldName: 'Name',
                        type: 'text',
                        sortable: true
                    }, {
                        label: 'Quantity',
                        fieldName: 'Quantity__c',
                        type: 'number',
                        sortable: true
                    }, {
                        label: 'Packed',
                        fieldName: 'Packed__c',
                        type: 'boolean',
                        sortable: true
                    }, {
                        label: 'Price',
                        fieldName: 'Price__c',
                        type: 'number',
                        sortable: true
                    },
                    { type: 'action', typeAttributes: { rowActions: actions } }

                ];
                var filteredata = [];
                data.forEach(function(item) {
                        console.log(item);
                        if (item.Quantity__c > 3) {
                            filteredata.push(item);

                        }
                    }


                );
                component.set("v.columns", columns);
                component.set("v.tableData", filteredata);

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


    },

    CampaignFilterChangeHandler: function(component, event, helper) {
        var filterObject = component.get("v.filterObject");

        if (event.getParam("assetClass") !== undefined) {
            filterObject = event.getParam("assetClass");
        }
        console.log(filterObject);

        var action = component.get("c.getItems");

        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state == "SUCCESS") {
                component.set("v.items", response.getReturnValue());
                var data = response.getReturnValue();
                
               var actions = [
            { label: 'Show details', name: 'show_details' }
        ];
                var columns = [{
                        label: 'Name',
                        fieldName: 'Name',
                        type: 'text',
                        sortable: true
                    }, {
                        label: 'Quantity',
                        fieldName: 'Quantity__c',
                        type: 'number',
                        sortable: true
                    }, {
                        label: 'Packed',
                        fieldName: 'Packed__c',
                        type: 'boolean',
                        sortable: true
                    }, {
                        label: 'Price',
                        fieldName: 'Price__c',
                        type: 'number',
                        sortable: true
                    },
                    { type: 'action', typeAttributes: { rowActions: actions } }

                ];
                var filteredata = [];
                data.forEach(function(item) {
                        console.log(filterObject);
                        if (filterObject != '') {
                            if (item.Name == filterObject) {
                                filteredata.push(item);

                            }


                        } else {
                            filteredata.push(item);
                        }

                    }


                );
                component.set("v.columns", columns);
                component.set("v.tableData", filteredata);

            } else {
                console.log("Failed with state: " + state);
            }
        });

        // Send action off to be executed
        $A.enqueueAction(action);



    },
    handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        console.log('handle row action');
        var row = event.getParam('row');
        switch (action.name) {
        
            case 'show_details':
              
                var navEvt = $A.get("e.force:navigateToSObject");
                navEvt.setParams({
                    "recordId": row.Id,
                    "slideDevName": "detail"
                });
                navEvt.fire();
     
        }
    },
    
    getSelectedName: function (cmp, event) {
    var selectedRows = event.getParam('selectedRows');
    // Display that fieldName of the selected rows
    for (var i = 0; i < selectedRows.length; i++){
        alert("You selected: " + selectedRows[i].Name);
    }
},

 CampingSelected: function (cmp, event) {
  debugger;
   var selectedRows = event.getParam('selectedRows');
   console.log('event started');
    // Display that fieldName of the selected rows
    for (var i = 0; i < selectedRows.length; i++){
       var id =  selectedRows[i].Id;
    }
    var appEvent = $A.get("e.c:CampingSelected");
          
        appEvent.setParams({
            "id": id
        });
        appEvent.fire();  
}



})