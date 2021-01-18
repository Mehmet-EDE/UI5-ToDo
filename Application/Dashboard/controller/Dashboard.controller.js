sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	var base;
	return Controller.extend("SapUI5Tutorial.Application.Dashboard.controller.Dashboard", {
        onInit: function () {
        //   alert("sa")
        },
        onPress:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("LoginPage")
            window.location.reload(false);
        }
    })
})