sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "sap/m/MultiInput"
], function(Controller, MessageBox, MessageToast, History, MultiInput) {
    "use strict";
    var idkisi;
    var dizi = [];
    var dizi2 = [];
    var that;
    return Controller.extend("SapUI5Tutorial.Application.TicketEkleme.controller.TicketEkleme", {
        onInit: function(oEvent) {
            that = this;
            this.setValues();
            this.projectGetList();
        },
        setValues: function() {
            that.byId("selectDurum").setEditable(false)
            that.byId("kimdenMinput").setEditable(false)
            that.byId("selectDurum").setSelectedKey(1)
            that.byId("kimdenLabel").setVisible(false)
            that.byId("kimdenMinput").setVisible(false)
            that.byId("DP3").setDateValue(new Date());
            that.byId("DP4").setDateValue(new Date());
        },
        projectGetList: function() {
            oModel.setProperty("/ticketEdit", {})
            oModel.setProperty("/editValues", {})
            oModel.setProperty("/listele2", {});
            var model2 = oModel.getProperty("/listele2");
            projelistele().then(function(result) {
                var len = result.rows.length;
                for (var i = 0; i < len; i++) {
                    model2.ad = result.rows[i].project_name
                    model2.id = result.rows[i].proje_id
                    dizi2.push({
                        "ad": model2.ad,
                        "id": model2.id
                    })
                    oModel.setProperty("/listele2", dizi2)
                }
                getDurum().then(function(res) {
                    oModel.setProperty("/status", Object.assign([], res.rows))
                })
            }).catch(function(err) {
                alert(err);
            })
        },
        ticketUpdate: function(oEvent) {
            oModel.setProperty("/ticketEdit", {})
            oModel.setProperty("/editValues", {})
            if (!(!oModel.getProperty("/dataSend"))) {
                that.byId("selectDurum").setEditable(true)
                that.byId("Kaydet").setText("Düzenle")
                that.byId("kimdenLabel").setVisible(true)
                that.byId("kimdenMinput").setVisible(true)
                editTicket(oModel.oData.dataSend[0].id).then(function(res) {
                    oModel.setProperty("/editValues", Object.assign({}, res.rows[0]))
                    getTicketRole(oModel.oData.dataSend[0].id).then(function(result) {
                        var role = Object.assign([], result.rows)
                        oModel.setProperty("/ticketEdit", role)
                        var from = role.find(b => b.role == "from")
                        that.getView().byId("kimdenMinput").addToken(new sap.m.Token({ text: from.ad + " " + from.soyad, key: from.uid }))
                        var cc = role.filter(b => b.role == "cc")
                        for (var i = 0; i < cc.length; i++) {
                            that.getView().byId("multiInput3").addToken(new sap.m.Token({ text: cc[i].ad + " " + cc[i].soyad, key: cc[i].uid }))
                        }
                        that.byId("selectDurum").setSelectedKey(res.rows[0].durum)
                    })
                })
            } else {
                that.getView().byId("multiInput3").removeAllTokens()
                that.getView().byId("kimdenMinput").removeAllTokens()
            }
        },
        selectPerson: function(oEvent) {
            debugger
        },
        clearInput: function(oEvent) {
            that.byId("kimdenMinput").setVisible(false)
            that.byId("kimdenMinput").setEditable(false)
            that.byId("kimdenMinput").removeAllTokens();
            that.byId("multiInput3").removeAllTokens()
            that.byId("kimdenLabel").setVisible(false);
            that.byId("selectDurum").setEditable(false);
            that.byId("selectDurum").setSelectedKey(1);
            that.byId("Kaydet").setText("Kaydet")
        },
        onPress: function(oEvent) {
            var durum = this.byId("selectDurum").getSelectedKey()
            var tarih1 = this.byId("DP3").getValue(),
                tarih2 = this.byId("DP4").getValue(),
                proje_ad = this.byId("multiInput1").getValue(),
                diziler = [{
                    "id": parseInt(localStorage.getItem("id")),
                    "role": "from"
                }],
                projekonu = this.byId("InputKonu").getValue();
            var snc2 = dizi2.filter(d => d.ad == proje_ad)
            var projeadı = snc2[0].id
            var mInput = this.getView().byId("multiInput3");
            var a = mInput.getTokens().length;
            var kime, kimeReel;
            for (var i = 0; i < a; i++) {
                kime = mInput.getTokens()[i].mProperties.key;
                kimeReel = {
                    "id": parseInt(kime),
                    "role": "cc"
                }
                diziler.push(kimeReel)
            }
            if (that.byId("Kaydet").getText() == "Düzenle") {
                var idTicket = oModel.getProperty("/dataSend")[0].id;
                updateTicket(tarih1, tarih2, projeadı, projekonu, durum, idTicket).then(function(res) {
                    deleteRoles(idTicket).then(function(res) {
                        for (var i = 1; i < diziler.length; i++) {
                            updateRoles(diziler[i].role, diziler[i].id, idTicket).then(function(res) {
                                sap.m.MessageToast.show("Düzenleme başarılı.")
                                sap.ui.controller("SapUI5Tutorial.Application.ticketList.controller.ticketList").ticketList();
                            })
                        }
                    })
                }).catch(function(err) {
                    alert(err)
                })
            } else {
                ticketekle(tarih1, tarih2, projeadı, projekonu).then(function(result) {
                    var rowId = result.insertId;
                    MessageToast.show("Kayıt Başarılı");
                    for (var j = 0; j <= diziler.length; j++) {
                        ticketrole(rowId, diziler[j].role, diziler[j].id).then(function(result) {
                            new MessageToast.show("Kayıt Başarılı");
                            sap.ui.controller("SapUI5Tutorial.Application.ticketList.controller.ticketList").ticketList();
                        })
                    }
                })
            }
        },
        NavBack: function(oEvent) {
            sap.ui.controller("SapUI5Tutorial.Application.ticketList.controller.ticketList").ticketList();
        },
        ticketPage: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Ticket");
        },
        addStatus: function(oEvent) {
            var ekle = this.getView().byId("statusInput").getValue();
            var that = this;
            addStatus(ekle).then(function(res) {
                MessageToast.show("Durum eklendi");
                that.getView().byId("statusInput").setValue(null)
            })
        },
    });
});