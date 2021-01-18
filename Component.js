'use strict'
jQuery.sap.require('SapUI5Tutorial.Router')
sap.ui.define(
    [
        'sap/ui/core/UIComponent',
        'sap/ui/model/json/JSONModel'
    ],
    function(UIComponent, JSONModel) {
        return UIComponent.extend('SapUI5Tutorial.Component', {
            metadata: {
                routing: {
                    config: {
                        routerClass: SapUI5Tutorial.Router,
                        viewType: 'XML',
                        targetAggregation: 'pages',
                        clearTarget: false
                    },
                    routes: [{
                            pattern: 'LoginPage',
                            viewPath: 'SapUI5Tutorial.Application.LoginPage.view',
                            name: 'LoginPage',
                            view: 'LoginPage',
                            targetControl: 'masterAppView'
                        },
                        {
                            pattern: '',
                            viewPath: 'SapUI5Tutorial.Application.LoginPage.view',
                            name: 'LoginPage',
                            view: 'LoginPage',
                            targetControl: 'masterAppView'
                        },
                        {
                            pattern: 'Dashboard',
                            viewPath: 'SapUI5Tutorial.Application.Dashboard.view',
                            name: 'Dashboard',
                            view: 'Dashboard',
                            targetControl: 'masterAppView'
                        },
                        {
                            pattern: 'RegisterPage',
                            viewPath: 'SapUI5Tutorial.Application.RegisterPage.view',
                            name: 'RegisterPage',
                            view: 'RegisterPage',
                            targetControl: 'masterAppView'
                        },
                        {
                            pattern: 'PersonelListe',
                            viewPath: 'SapUI5Tutorial.Application.PersonelListe.view',
                            name: 'PersonelListe',
                            view: 'PersonelListe',
                            targetControl: 'masterAppView'
                        },
                        {
                            pattern: 'ProjeListe',
                            viewPath: 'SapUI5Tutorial.Application.ProjeListe.view',
                            name: 'ProjeListe',
                            view: 'ProjeListe',
                            targetControl: 'masterAppView'
                        },
                        {
                            pattern: 'Ticket',
                            viewPath: 'SapUI5Tutorial.Application.Ticket.view',
                            name: 'Ticket',
                            view: 'Ticket',
                            targetControl: 'masterAppView'
                        },
                        {
                            pattern: 'TicketEkleme',
                            viewPath: 'SapUI5Tutorial.Application.TicketEkleme.view',
                            name: 'TicketEkleme',
                            view: 'TicketEkleme',
                            targetControl: 'masterAppView'
                        },
                        {
                            pattern: 'ticketList',
                            viewPath: 'SapUI5Tutorial.Application.ticketList.view',
                            name: 'ticketList',
                            view: 'ticketList',
                            targetControl: 'masterAppView'
                        },
                    ]
                }
            },
            init: function() {
                sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
                var mConfig = this.getMetadata().getConfig();
                this.getRouter().initialize();
            },
            createContent: function() {
                var oViewData = {
                    component: this
                }
                return sap.ui.view({
                    viewName: 'SapUI5Tutorial.RootApp',
                    type: sap.ui.core.mvc.ViewType.XML,
                    id: 'app',
                    viewData: oViewData
                })
            }
        })
    }
)