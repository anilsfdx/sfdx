({
    doInit : function(component, event, helper) {
        var mydate = component.get("v.Item.Date__c");
        if(mydate){
            component.set("v.formatdate", new Date(mydate));
        }
    },
})