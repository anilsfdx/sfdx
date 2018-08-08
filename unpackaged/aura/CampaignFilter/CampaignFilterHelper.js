({
	 assetClassChangeHandler : function(component, event, helper) {
        var fundFilterChangeEvent = $A.get("e.c:CampaignFilterChange");
        fundFilterChangeEvent.setParams({
            "assetClass": event.getParam("value")
        });
        CampaignFilterChangeEvent.fire();
	}
})