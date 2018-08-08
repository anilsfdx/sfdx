({
    scriptsLoaded : function(component) {

        var data = {
            labels: ["Packed", "Unpacked"],
            datasets: [
                {
                    data: [0, 0, 1],
                    backgroundColor: [
                        "rgba(126,139,228,.8)",
                        "rgba(84,105,141,.8)",
                        "#E0E5EE"
                    ],
                        hoverBackgroundColor: [
                        "rgba(126,139,228,.8)",
                        "rgba(84,105,141,.8)",
                        "#E0E5EE"
                    ]
                }
            ]
        };

        var ctx = component.find("chart").getElement();
        component.chart = new Chart(ctx,{
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutoutPercentage: 60,
                legend: {
                    position: "right",
                    display: false
                }
            }

        });

    },

    campItemsChangeHandler: function(component) {
        if (component.chart && component.chart.data && component.chart.data.datasets[0]) {
            var campItems = component.get("v.getItems");
            var merchandise = JSON.parse(event.dataTransfer.getData("campItems"));
          var mixItem = {
            qty: merchandise.Quantity__c,
            name: merchandise.Name,
            price: merchandise.Price__c,
        };
             console.log('mixItem' +mixItem);
             campItems.push(mixItem);
            if (campItems && Array.isArray(campItems)) {
                var map = {};
                campItems.forEach(function(mixItem1) {
                    map[mixItem1.name] = (map[mixItem1.name] || 0) + (mixItem1.qty * mixItem1.price);
                });
                var data = [
                    map.Packed || 0,
                    map.Unpacked || 0,
                ];
                component.chart.data.datasets[0].data = data;
                component.chart.update();
            }
        }
    }

})