sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/IconPool",
    "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/m/Text",
    "sap/m/MessageBox",
    'sap/m/MessageToast'
], function(Controller, MessageBox, MessageToast) {
    'use strict';
    var base
    return Controller.extend("SapUI5Tutorial.Application.Ticket.controller.Ticket", {
        onInit: function() {
            base = this;
            this.ticketListeleme();
            projead().then(function(res) {
                var projeler = Object.assign([], res.rows)
                oModel.setProperty("/projects", projeler)
            })
            getDurum().then(function(res) {
                var durumlar = Object.assign([], res.rows);
                oModel.setProperty("/durumlar", durumlar)
            })
        },
        ticketListeleme: function() {
            var dizi = [];
            oModel.setProperty("/projeler", {})
            var model = oModel.getProperty("/projeler")
            var id = localStorage.getItem("id")
            base.byId("addTicket").setVisible(false)
            var dizi = [],
                dizi2 = [],
                diziroller = [],
                diziticket = [];
            var stringQuery = ""
            var newstringQuery = "";
            console.log(stringQuery)
            getUid(id).then(function(res) {
                for (var i = 0; i < res.rows.length; i++) {
                    dizi2.push(res.rows[i].tid)
                    stringQuery += "tid=" + dizi2[i] + " OR ";
                    if (res.rows.length == 1) {
                        stringQuery = stringQuery.substr(0, stringQuery.length - 3)
                    }
                }
                stringQuery = stringQuery.substr(0, stringQuery.length - 3)
                getRole(stringQuery).then(function(res) {
                    newstringQuery = stringQuery.replaceAll("tid", "id")
                    for (var i = 0; i < res.rows.length; i++) {
                        dizi.push({
                            "id": res.rows[i].id,
                            "ad": res.rows[i].ad + " " + res.rows[i].soyad,
                            "role": res.rows[i].role,
                            "tid": res.rows[i].tid,
                            "uid": res.rows[i].uid
                        })
                        diziroller = dizi
                    }
                    getTicket(newstringQuery).then(function(res) {
                        var roleString = "";

                        for (var i = 0; i < res.rows.length; i++) {
                            var snc = diziroller.filter(a => a.role == "from" && a.tid == res.rows[i].id);
                            var sncRole = diziroller.filter(a => a.role == "cc" && a.tid == res.rows[i].id);
                            for (var k = 0; k < sncRole.length; k++) { roleString += sncRole[k].ad + ", "; }
                            roleString = roleString.substr(0, roleString.length - 2)
                            diziticket.push({
                                "id": res.rows[i].id,
                                "projead": res.rows[i].projead,
                                "konu": res.rows[i].konu,
                                "kimden": snc[0].ad,
                                "kime": roleString,
                                "başlangıç": res.rows[i].başlangıç,
                                "bitiş": res.rows[i].bitiş,
                                "durum": res.rows[i].durum
                            })
                            oModel.setProperty("/projeler", diziticket)
                            base.byId("deneme").setVisibleRowCount(diziticket.length);
                            roleString = "";
                        }
                    })
                })
            })
        },
        projeListesi: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("ProjeListe");
        },
        deneme: function(value) {
            if (value) {
                var model = oModel.getProperty("/projects")
                return model.find(a => a.proje_id == value).project_name
            }
        },
        durumFormatter: function(value) {
            if (value) {
                var model = oModel.getProperty("/durumlar")
                return model.find(a => a.id == value).durum
            }
        },
        ticketEkle: function(oEvent) {
            var ticketList = sap.ui.controller("SapUI5Tutorial.Application.ticketList.controller.ticketList");
            ticketList.ticketEdit();
        },
        contextMenu: function(oEvent) {
            oModel.setProperty("/dataSend", {})
            var path = oEvent.oSource.getBindingContext().sPath
            var dizi = [];
            var id = oModel.getProperty(path).id
            var model = oModel.getProperty(path);
            dizi.push({
                "projead": model.projead,
                "konu": model.konu,
                "kimden": model.kimden,
                "başlangıç": model.başlangıç,
                "bitiş": model.bitiş,
                "durum": model.durum,
                "id": id
            })
            oModel.setProperty("/dataSend", Object.assign({}, dizi))
            var ticketList = sap.ui.controller("SapUI5Tutorial.Application.ticketList.controller.ticketList");
            ticketList.ticketEdit();
        },
        logOutTicket: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("LoginPage");
            localStorage.clear();
        },
        ticketAdd: function(oEvent) {
            sap.ui.controller("SapUI5Tutorial.Application.ticketList.controller.ticketList").ticketAdd();
        }
    })
});