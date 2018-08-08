({
    toggleChangeHandler : function(component, event) {
        var service = component.find("service");
        service.saveRecord(function(result) {});
    },

    onInit : function(component, event, helper) {
        
        var harvestColumns = [
            {label: 'Date', fieldName: 'harvestDate', type: 'text'},
            {label: 'Qty', fieldName: 'qty', type: 'text'},
            {label: 'Supervisor', fieldName: 'supervisor', type: 'text'}
        ];
        component.set("v.harvestColumns", harvestColumns);

        var irrigationColumns = [
            {label: 'When', fieldName: 'when', type: 'text'},
            {label: 'Duration', fieldName: 'duration', type: 'text'},
            {label: 'Volume', fieldName: 'volume', type: 'text'}
        ];
        component.set("v.irrigationColumns", irrigationColumns);      

    },
            
    navigateToRecordHome : function(component) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": component.get("v.recordId"),
            "slideDevName": "detail"
        });
        navEvt.fire();
    },

    // A different record was selected
     recordChangeHandler : function(component, event) {
        var id = event.getParam("recordId");
         console.log('id' +id);
        component.set("v.recordId", id);
        var service = component.find("service");
        service.reloadRecord();
    },
    
    recordChangeHandlern : function(component, event) {
        var id = event.getParam("recordId");
        var changeType = event.getParams().changeType;
         console.log('record loaded' + changeType) ;
        if (changeType === "LOADED") {
            console.log('record loaded')
        }
        console.log('id' +id);
         var action = component.get("c.findById");
            action.setParams({
              "contactId": id
            });
            action.setCallback(this, function(a) {
                component.set("v.cont", a.getReturnValue());
                
            });
            $A.enqueueAction(action);
                component.set("v.recordId", id);
        component.set("v.height", "anil");
        
    },
    // The current record was updated by another component
    recordUpdatedHandler : function(component, event) {
        var changeType = event.getParams().changeType;
        if (changeType === "CHANGED") {
            var service = component.find("service");
            service.reloadRecord();
        }    
    },
    
    handleRecordUpdated: function(component, event, helper) {
        var eventParams = event.getParams();
        if(eventParams.changeType === "LOADED") {
           // record is loaded (render other component which needs record data value)
            console.log("Record is loaded successfully.");
        } else if(eventParams.changeType === "CHANGED") {
            // record is changed
        } else if(eventParams.changeType === "REMOVED") {
            // record is deleted
        } else if(eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving, or deleting the record
        }
    },

    
})