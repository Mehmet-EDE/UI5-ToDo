sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
    "use strict";
    var path;
    var foto;
    return Controller.extend("SapUI5Tutorial.Application.PersonelListe.controller.PersonelListe", {
        onInit: function(oEvent) {
            this.byId("adminInput").setVisible(false)
            var dizi = [];
            this.idPerson();
            oModel.setProperty("/getListStaff", {});
            var model = oModel.getProperty("/getListStaff");
            this.getView().byId("editBtn").setVisible(false)
            this.getView().byId("deleteBtn").setVisible(false)
            this.personelListele();
        },
        onSelect: function(oEvent) {
            path = oEvent.getParameters().listItem.getBindingContextPath();
            var ad = this.getView().byId("nameInput").setValue(oModel.getProperty(path).ad);
            var soyad = this.getView().byId("surnameInput").setValue(oModel.getProperty(path).soyad);
            var mail = this.getView().byId("mailInput").setValue(oModel.getProperty(path).mail);
            var id = oModel.getProperty(path).id;
            this.getView().byId("editBtn").setVisible(true)
            this.getView().byId("saveBtn").setVisible(false)
            this.getView().byId("deleteBtn").setVisible(true)
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
        onEdit: function(oEvent) {
            var that = this;
            var ad = oModel.getProperty("/getListStaff/ad");
            var soyad = oModel.getProperty("/getListStaff/soyad");
            var mail = oModel.getProperty("/getListStaff/mail")
            var id = oModel.getProperty(path).id;
            editEmployee(ad, soyad, mail, foto, id).then(function(res) {
                MessageToast.show("Düzenleme Başarılı");
                that.getView().byId("editBtn").setVisible(false)
                that.getView().byId("deleteBtn").setVisible(false)
                that.getView().byId("saveBtn").setVisible(true)
                that.personelListele();
            }).catch(function(err) {
                MessageBox.alert(err)
            })
        },
        logOut: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("LoginPage");
            localStorage.clear();
        },
        idPerson: function(oEvent) {
            var idKisi = localStorage.getItem("id")
            var roleKisi = localStorage.getItem("role")

            if (idKisi == 1 && roleKisi == "1")
                this.byId("adminInput").setVisible(true)
        },
        onPress: function(oEvent) {
            var that = this;
            var ad = this.getView().byId("nameInput").getValue(),
                soyad = this.getView().byId("surnameInput").getValue(),
                mail = this.getView().byId("mailInput").getValue();
            this.getView().byId("editBtn").setVisible(false)
            this.getView().byId("saveBtn").setVisible(true)
            controlLogin(mail).then(function(res) {
                if (res.rows[0]["count(mailprs)"] <= 0) {
                    kayıtol(ad, soyad, mail, foto).then(function(result) {
                        that.personelListele();
                        MessageToast.show("Çalışan eklendi");
                    }).catch(function(err) {
                        sap.m.MessageBox.alert(err)
                    })
                }
            }).catch(function(err) {
                MessageBox.alert(err);
            })
        },
        projeList: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("ProjeListe");
        },
        onDelete: function(oEvent) {
            var that = this;
            var id = oModel.getProperty(path).id;
            deleteEmployee(id).then(function(res) {
                MessageToast.show("Personel kovuldu");
                that.getView().byId("editBtn").setVisible(false)
                that.getView().byId("deleteBtn").setVisible(false)
                that.getView().byId("saveBtn").setVisible(true)
                that.personelListele();
            }).catch(function(err) {
                MessageBox.alert(err);
            })
        },
        personelListele: function() {
            listele().then(function(res, err) {
                var dizi = [];
                var model = oModel.getProperty("/getListStaff");
                var i;
                for (i = 0; i < res.rows.length; i++) {
                    model.ad = res.rows[i].ad;
                    model.soyad = res.rows[i].soyad;
                    model.foto = res.rows[i].foto;
                    model.mail = res.rows[i].mailprs;
                    model.id = res.rows[i].personelno;
                    dizi.push({
                        "ad": model.ad,
                        "soyad": model.soyad,
                        "fotoğraf": model.foto,
                        "mail": model.mail,
                        "id": model.id
                    })
                    oModel.setProperty("/getListStaff", dizi)
                }
            }).catch(function(err) {
                alert(err.message)
            })
        },
    })

})