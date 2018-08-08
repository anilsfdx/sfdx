({
	onCampingSelected : function(component, event, helper) {
        //debugger
        var boatSelected=event.getParam("id");
        console.log('id'+boatSelected);
        component.set("v.id",boatSelected);
		component.find("service").reloadRecord() ;
	},
})