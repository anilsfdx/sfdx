({
	submitForm: function(component, event, helper) {    
    if(helper.validateItemForm(component)){
        // Create the new item
        var newItem = component.get("v.newItem");
        helper.createItem(component, newItem);
    }
        
        },
        
        CreateItem: function(component, Event) {
    var addItem = component.getEvent("addItem");
    var formitem = component.get("v.NewItem");
    addItem.setParams({ "item": formitem });
    addItem.fire();
           
},

CreateItem2: function(component, event, helper) {
    
    
    console.log('Create record');          
         //getting the candidate information 
        var NewItem = component.get("v.NewItem"); 
        console.log(NewItem);
         //Validation 
        
         //Calling the Apex Function 
        var action = component.get("c.saveItem");           
         //Setting the Apex Parameter 
         action.setParams({ 
            NewItem : NewItem 
         }); 
         console.log('call apex clss');  
          
         //Setting the Callback 
         action.setCallback(this,function(a){ 
            //get the response state 
             var state = a.getState(); 
              console.log(state);
             //check if result is successfull 
             if(state == "SUCCESS"){ 
                 //Reset Form 
                 var NewItem = {'sobjectType': 'Camping_Item__c', 
                                     'Name': '', 
                                     'Quantity__c': '', 
                                     'Price__c': '',  
                                     'Packed__c': '' 
                                    }; 
                 //resetting the Values in the form 
                 component.set("v.NewItem",NewItem); 
                 component.set("v.isOpen",true);
                // component.set("v.message","Record created Succesfully"); 
                 
             } else if(state == "ERROR"){ 
                
                 var errors = a.getError();
                 console.log('Errors' +errors);
                 component.set("v.message",errors[0].message);
             } 
         }); 
          
 		//adds the server-side action to the queue         
       $A.enqueueAction(action); 
        
    },
    
    closeModel: function(component, event, helper) {
      // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
      component.set("v.isOpen", false);
   },
   
   Next: function(component, Event) {
     component.set("v.next", true);
     component.set("v.back", false);
           
},

   Back: function(component, Event) {
     component.set("v.next", false);
     component.set("v.back", true);
           
},
})