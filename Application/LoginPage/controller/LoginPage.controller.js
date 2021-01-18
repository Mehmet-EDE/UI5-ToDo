sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function(Controller, MessageBox) {
    "use strict";
    return Controller.extend("SapUI5Tutorial.Application.LoginPage.controller.LoginPage", {
        onInit: function() {
            oModel.setProperty("/kayıt", {});
        },
        register: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RegisterPage");
        },
        onPress: function(oEvent) {
            var that = this;
            var oRouter = this.getOwnerComponent().getRouter()
            var model = oModel.getProperty("/kayıt");
            var mail = model.mail,
                sifre = model.sifre,
                i = 0;
            if (this.getView().byId("userName").getValue() == "" && this.getView().byId("pass").getValue() == "") {
                MessageBox.warning("Kullanıcı adı veya şifre boş olamaz");
            } else {
                login(mail, sifre).then(function(result) {
                    if (result.rows.length == 0) {
                        MessageBox.warning("kullanıcı adı veya şifre yanlış");
                        that.getView().byId("pass").setValue(null);
                    }
                    if (result.rows.length >= 1) {
                        oRouter.navTo("PersonelListe")
                        localStorage.setItem("role", result.rows[i].rolerow);
                        localStorage.setItem("id", result.rows[i].personelno);
                        that.getView().byId("userName").setValue(null);
                        that.getView().byId("pass").setValue(null);
                    }

                }).catch(function(err) {
                    alert("Hata: " + err.message)
                })
            }
        },
        giris: function(oEvent) {
            this.onPress();
        }
    })
})