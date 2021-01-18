sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function(Controller, Dialog, DialogType, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend("SapUI5Tutorial.Application.ProjeListe.controller.ProjeListe", {
        onInit: function(oEvent) {
            var dizi = [];
            oModel.setProperty("/listele", {});
            var model = oModel.getProperty("/listele");
            projelistele().then(function(res) {
                for (var i = 0; i < res.rows.length; i++) {
                    model.ad = res.rows[i].project_name;
                    model.id = res.rows[i].proje_id

                    dizi.push({
                        "ad": model.ad,
                        "id": model.id
                    })
                    oModel.setProperty("/listele", dizi)
                }
            }).catch(function(err) {
                alert(err.message)
            })
        },
        onPress: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var id = localStorage.getItem("id");
            var role = localStorage.getItem("role");
            oRouter.navTo("PersonelListe");
        },
        logOut: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("LoginPage");
            localStorage.clear();
        },
        ticketPage: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("ticketList");
        },
        listele: function(oEvent) {
            join().then(function(res) {}).catch(function(err) {
                alert(err.message)
            })
        },
        addProject: function(oEvent) {
            oModel.setProperty("/proje", {})
            var that = this;
            var model = oModel.getProperty("/proje")
            if (!this.adProject) {
                this.adProject = new sap.m.Dialog({
                        title: "Proje ekle",
                        contentWidth: "550px",
                        contentHeight: "300px",
                        resizable: true,
                        content: new sap.m.Input({
                            id: "projectInput",
                            value: "{/listele/ad}"
                        }),
                        beginButton: new sap.m.Button({
                            text: "Kaydet",
                            id: "saveBtn",
                            press: function() {
                                var a = sap.ui.getCore().byId("projectInput").getValue();
                                var inputDeger = a.trim();
                                var id = localStorage.getItem("id");
                                var deger = oModel.oData.listele.id
                                if (inputDeger == "") {
                                    MessageBox.alert("Boş proje eklenemez");
                                } else if (deger != null) {
                                    editProject(inputDeger, deger).then(function(res) {
                                        that.projeSelect();
                                        that.adProject.close();
                                        sap.m.MessageToast.show("Başarıyla Düzenlendi")
                                    })
                                } else {
                                    addprojecttbl(inputDeger).then(function(res) {
                                        that.projeSelect();
                                        that.adProject.close();
                                        sap.m.MessageToast.show("Proje eklendi")
                                    })
                                }
                            }
                        }),
                        endButton: new sap.m.Button({
                            text: "Kapat",
                            press: function() {
                                sap.ui.getCore().byId("projectInput").setValue()
                                oModel.setProperty("/editProject", {})
                                this.adProject.close();
                                this.getView().addDependent(this.adProject);
                                var dizi = [];
                                oModel.setProperty("/listele", {});
                                var model = oModel.getProperty("/listele");
                                projelistele().then(function(res) {
                                    var i;
                                    for (i = 0; i < res.rows.length; i++) {
                                        model.ad = res.rows[i].project_name;
                                        model.id = res.rows[i].proje_id

                                        dizi.push({
                                            "ad": model.ad,
                                            "id": model.id
                                        })
                                        oModel.setProperty("/listele", dizi)
                                    }
                                }).catch(function(err) {
                                    sap.m.MessageBox.information(err)
                                })
                                sap.ui.getCore().byId("projectInput").setValue("");
                            }.bind(this)
                        })
                    },
                    this);
            }

            this.adProject.open();
        },
        projeSelect: function(oEvent) {
            oModel.setProperty("/listele", {})
            var model = oModel.getProperty("/listele");
            var dizi = [];
            projelistele().then(function(res) {
                var i;
                for (i = 0; i < res.rows.length; i++) {
                    model.ad = res.rows[i].project_name;
                    model.id = res.rows[i].proje_id

                    dizi.push({
                        "ad": model.ad,
                        "id": model.id
                    })
                    oModel.setProperty("/listele", dizi)
                }
            }).catch(function(err) {
                sap.m.MessageBox.warning(err)
            })
        },
        editProject: function(oEvent) {
            var path = oEvent.oSource.getBindingContextPath()
            var deger = oModel.getProperty(path)
            oModel.setProperty("/listele", JSON.parse(JSON.stringify(deger)))
            this.addProject();
        },
        handleDelete: function(oEvent) {
            var path = oEvent.getParameter("listItem").getBindingContextPath()
            var deger = oModel.getProperty(path).id
            var that = this;
            deleteProject(deger).then(function(res) {
                that.projeSelect();
                sap.m.MessageToast.show("Silme işlemi başarılı")
            }).catch(function(err) {
                alert(err);
            })
        }
    })
})