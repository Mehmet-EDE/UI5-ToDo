sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/DialogType"
], function(Controller, MessageBox, MessageToast) {
    "use strict";
    var foto;
    return Controller.extend("SapUI5Tutorial.Application.RegisterPage.controller.Registerpage", {
        onInit: function() {
            oModel.setProperty("/kisi", {})
        },
        onPress: function(oEvent) {
            var model = oModel.getProperty("/kisi");
            var ad = model.ad,
                soyad = model.soyad,
                mail = model.mail;
            controlLogin(mail).then(function(res) {
                if (res.rows[0]["count(mailprs)"] <= 0) {
                    kayıtol(ad, soyad, mail, foto).then(function(res) {
                        MessageToast.show("Kayıt başarılı")
                    })
                } else {
                    MessageToast.show("Mail kullanımda!")
                }
            }).catch(function(err) {
                alert(err)
            })
        },
        succes: function(oEvent, res, err) {
            kayıtol().then(function(res) {
                alert("Kayıt başarılı");
            }).catch(function(err) {
                alert(err)
            })
        },
        onChange: function(oEvent) {
            var aFiles = oEvent.getParameters().files;
            var currentFile = aFiles[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                foto = e.target.result
            };
            reader.readAsDataURL(currentFile)
        },
        HomePage: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("LoginPage");
        },
    })
})