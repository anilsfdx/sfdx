({
	doInit: function(component, event, helper) {
        //debugger
        helper.onInit(component, event,helper);
    },
    onSave : function(component, event, helper) {
        debugger
		var boat = component.get("v.boat");
        var boatr = component.get("v.boatReview");
        console.log("boat review "+boatr.Boat__c)
       // alert(boat.Id)
        
        component.set("v.boatReview.Boat__c",boat.Id);
        
        
        component.find("service").saveRecord(function(saveResult){
            if(saveResult.state==="SUCCESS" || saveResult.state === "DRAFT")
            {
                
               var resultsToast = $A.get("e.force:showToast");
                if(resultsToast)
                {
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": "Boat Review Created"
                    });
                    resultsToast.fire(); 
                }
                else
                {
                    alert('Boat Review Created');
                }
            }
            
            var boatReviewAddedEvnt=component.getEvent("boatReviewAdded");
            boatReviewAddedEvnt.fire();
            helper.onInit(component,event,helper);
           
        });
	},
    onRecordUpdated: function(component, event, helper) {
    }
})