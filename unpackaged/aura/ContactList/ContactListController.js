({
    onInit : function(component, event, helper) {

        var columns = [
            {label: 'Name', fieldName: 'Name', type: 'text', sortable: true},
            {label: 'phone', fieldName: 'Phone', type: 'text', sortable: true},
            {label: 'Email', fieldName: 'Email', type: 'text', sortable: true},
      
        ];

        component.set("v.columns", columns);

        var action = component.get("c.getContacts");
        //action.setStorable();
        action.setCallback(this, function (response) {
            //console.log('getHarvestFields: ' + (performance.now() - startTime));
            var fields = response.getReturnValue();
            component.set("v.tableData", fields);
            component.set("v.treeData", helper.buildTreeData(fields));
            // setTimeout(function() {
            //     console.log('--render');
            //     var content = component.find("content").getElement();
            //     console.log(content.innerHTML);
            //     if (content) {
            //         var items = content.getElementsByClassName('slds-tree__item')
            //         console.log(items.length);
            //     }
            // }, 5000);
        });
        var startTime = performance.now();
        $A.enqueueAction(action);

    },

    
        
    onTableView : function(component, event, helper) {
        var map = component.find('map');
        $A.util.addClass(map, 'slds-hide');
        component.set('v.viewMode', 'table');
    },
        
    onTreeView : function(component, event, helper) {
        var map = component.find('map');
        $A.util.addClass(map, 'slds-hide');
        component.set('v.viewMode', 'tree');
    },

    onRowSelection : function(component, event, helper) {
        component.set('v.selectedItems', event.getParam('selectedRows'));
    },

    onMapRecordSelection: function(component, event, helper) {
        component.set('v.selectedItems', event.getParam('selectedRecords'));
    },

    onTreeItemSelected : function(component, event, helper) {
        var recordId = event.getParam("name");
        if (recordId) {
            var selectEvent = $A.get("e.ltng:selectSObject");
            selectEvent.setParams({"recordId": recordId, channel: "Contacts"});
            selectEvent.fire();
        }
    },

    

})