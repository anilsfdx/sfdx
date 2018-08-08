({
	loadAssetClasses : function(component) {
        var action = component.get("c.getAssetClasses");
    	action.setCallback(this, function(response) {
            var assetClasses = response.getReturnValue();
            component.set("v.assetClasses", assetClasses);
            console.log("Asset classes retrieved from server" +assetClasses);
    	});
    	$A.enqueueAction(action);
	}

})