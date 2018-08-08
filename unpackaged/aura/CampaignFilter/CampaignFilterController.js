({
	assetClassChangeHandler : function(component, event, helper) {
        var CampaignFilterChangeEvent = $A.get("e.c:CampaignFilterChange");
        CampaignFilterChangeEvent.setParams({
            "assetClass": event.getParam("value")
        });
        CampaignFilterChangeEvent.fire();
	},
})