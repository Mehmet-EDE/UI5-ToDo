sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function(Controller, MessageBox) {
    "use strict";
    var that;
    var navCon;
    return Controller.extend("SapUI5Tutorial.Application.ticketList.controller.ticketList", {
        onInit: function() {
            that = this;
            navCon = this.byId("navCon");
        },
        ticketList: function(oEvent) {
            navCon.to(that.byId("p1"))
            oModel.setProperty("/dataSend", undefined)
            oModel.setProperty("/ticketEdit", undefined)
            oModel.setProperty("/editValues").null
            sap.ui.controller("SapUI5Tutorial.Application.Ticket.controller.Ticket").ticketListeleme();
            sap.ui.controller("SapUI5Tutorial.Application.TicketEkleme.controller.TicketEkleme").clearInput();
        },
        ticketAdd: function(oEvent) {
            navCon.to(that.byId("p2"))
            sap.ui.controller("SapUI5Tutorial.Application.TicketEkleme.controller.TicketEkleme").clearInput();
            sap.ui.controller("SapUI5Tutorial.Application.TicketEkleme.controller.TicketEkleme").setValues();
            oModel.setProperty("/dataSend", undefined)
            oModel.setProperty("/ticketEdit", undefined)
            oModel.setProperty("/editValues", {})
        },
        ticketEdit: function(oEvent) {
            navCon.to(that.byId("p2"));
            sap.ui.controller("SapUI5Tutorial.Application.TicketEkleme.controller.TicketEkleme").ticketUpdate();
        },
    })
})