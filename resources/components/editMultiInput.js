sap.ui.define([
    'sap/m/MultiInput',
], function(MultiInput) {
    var base;
    return MultiInput.extend("SapUI5Tutorial.resources.components.editMultiInput", {

        metadata: {
            properties: {
                placeholder: { type: 'string', defaultValue: "Kime" },
                text: { type: "string" },

                height: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "400px"
                },
                width: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "910px"
                },
                sId: {
                    type: "string",
                    defaultValue: "customMultiınput"
                },

            },
            events: {
                selectPerson: {
                    parameters: {
                        data: { type: "any" },

                    }
                },
            }
        },
        renderer: {},
        init: function() {
            base = this
            if (MultiInput.prototype.init) MultiInput.prototype.init.apply(this, arguments);

            base.attachLiveChange(function(oEvent) {
                oModel.setProperty("/ticket", {});
                var model = oModel.getProperty("/ticket");
                var dizi = [];
                if (oEvent.mParameters.value.length >= 3) {
                    listele().then(function(res) {
                        var len = res.rows.length;
                        for (var i = 0; i < len; i++) {
                            model.ad = res.rows[i].ad;
                            model.soyad = res.rows[i].soyad;
                            idkisi = model.id = res.rows[i].personelno;
                            dizi.push({
                                "ad": model.ad + " " + model.soyad,
                                "id": model.id
                            })
                            oModel.setProperty("/ticket", dizi)
                        }
                    })
                } else if (oEvent.mParameters.value.length <= 3) {
                    oModel.setProperty("/ticket", {})
                }
            })

            base.attachTokenUpdate(function(oEvent) {
                var a = oEvent.mParameters.type;
                if (a == "removed") {
                    base.fireEvent("selectPerson", {
                        data: oEvent.mParameters.removedTokens[0].getKey()
                    })
                } else {
                    base.fireEvent("selecPerson", {
                        data: oEvent.mParameters.addedTokens[0].getKey()
                    })
                }

            })
        },
    });
})