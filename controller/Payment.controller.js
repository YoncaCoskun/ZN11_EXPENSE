jQuery.sap.require("sap.ui.model.odata.AnnotationHelper");
sap.ui.define([
'sap/m/MessagePopover',
'sap/m/MessagePopoverItem',
'sap/m/Link',
	'jquery.sap.global',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/ui/model/odata/AnnotationHelper',
	'sap/m/Popover',
	'sap/m/Button',
	'jquery.sap.global',
		'sap/m/Dialog',
		'sap/m/List',
		'sap/m/StandardListItem',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/Filter'
], function(MessagePopover, MessagePopoverItem, Link, jQuery, Fragment, Controller, JSONModel, AnnotationHelper, Popover, Button, Dialog,Filter) {
		"use strict";
	var usersTo = [];
	var multiUserTo = [];
	var usersInf = [];
	var multiUserInf = [];
	var attachFiles = [];
		var CController = Controller.extend("zn11_expense.controller.Payment", {
				model: new sap.ui.model.json.JSONModel(),

				onInit: function() {
//					var that = this;
//					var Model = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZN11_BPM_SRV");
//					var oJasonModel = new sap.ui.model.json.JSONModel();
//
//					Model.read("/BudgetSet", null, null, true,
//						function(oData, response) {
//							oJasonModel.setData(oData);
//
//							console.log(oData);
//
//						});
//					that.getView().setModel(oJasonModel, "JasonModel");
//					this.getView().byId("idProductsTable").setModel(this.getView().getModel("JasonModel"));

				},
				fixedSizeDialog: null,
				onAfterRendering: function() {
					// Create a simple RadioButtonGroup with three items

				},
				oMessageDialog: null,
		bShowResetEnabled: false,
		bIsReseted: false,

		onAddMessageDialogPress: function() {
			var onAddMessageDialogPress = this.getDialogMessage();
			this.bIsReseted = false;

			onAddMessageDialogPress.open();
		},
			getDialogMessage: function() {
			this.oMessageDialog = sap.ui.xmlfragment("zn11_expense.view.AddMessageDialog", this);
			this.getView().addDependent(this.oMessageDialog);

			// 			var oModel = new JSONModel(jQuery.sap.getModulePath("zn11_expense/mockserver", "/Products.json"));
			// 			this.getView().setModel(oModel);

			return this.oMessageDialog;
		},
			onAddTo: function(oEvent) {
			var oUserToDialog = this.getDialogUser();
			var oUserInfDialog = this.getDialogUserInf();
			var that = this;
			var Model = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZN11_BPM_SRV");
			var oJasonModel = new sap.ui.model.json.JSONModel();

			Model.read("/UserSet", null, null, true,
				function(oData, response) {
					oJasonModel.setData(oData);
					//	console.log(oData);

				});
			that.getView().setModel(oJasonModel, "JModel");
			that.getView().setModel(oJasonModel, "JsonModel");

			var buttonId = oEvent.getSource().getId();

			if (buttonId === "addButtonTo") {
				sap.ui.getCore().byId("idUserTblTo").setModel(that.getView().getModel("JModel"));
				oUserToDialog.open();
			} else {
				sap.ui.getCore().byId("idUserTblInf").setModel(that.getView().getModel("JsonModel"));
				oUserInfDialog.open();
			}

		},
			getDialogUser: function() {
			if (!this.oUserToDialog) {
				this.oUserToDialog = sap.ui.xmlfragment("zn11_expense.view.UserToDialog", this);
				this.getView().addDependent(this.oUserToDialog);
			}

			return this.oUserToDialog;
		},
		getDialogUserInf: function() {
			if (!this.oUserInfDialog) {
				this.oUserInfDialog = sap.ui.xmlfragment("zn11_expense.view.UserInfDialog", this);
				this.getView().addDependent(this.oUserInfDialog);
			}

			return this.oUserInfDialog;
		},
		onExit: function() {
			if (this.oUserToDialog) {
				this.oUserToDialog.destroy();
			}
			if (this.oUserInfDialog) {
				this.oUserInfDialog.destroy();
			}
		},
				clickPayment: function() {

					var selectDown = this.getView().byId("RB-Down").getSelected();

					if (selectDown === true) {
						this.getView().byId("idType").setValue("Invoice"); //Type
						this.getView().byId("idSubject").setValue(null); //Subject
						this.getView().byId("idInsAmount").setValue("0"); //Installment Amount
						this.getView().byId("idComment").setValue(null); //Comment
						this.getView().byId("idBudAmount").setValue("29.000"); //VAT Budget Amount
						this.getView().byId("idTRY0").setValue("TRY"); //dolu
						this.getView().byId("idPayAmount").setValue("4.000"); //Payment Amount
						this.getView().byId("idTRY1").setValue("TRY"); //dolu
						this.getView().byId("idAmount").setValue("200"); //VAT Amount
						this.getView().byId("idTax").setValue("0,00"); //Withholding Tax
						this.getView().byId("idIncAmount").setValue("4200"); //VAT Incl. Amount
						this.getView().byId("idTRY2").setValue("TRY"); //dolu

					} else {
						this.getView().byId("idType").setValue("Invoice"); //Type
						this.getView().byId("idSubject").setValue(null); //Subject
						this.getView().byId("idInsAmount").setValue("4200"); //Installment Amount
						this.getView().byId("idComment").setValue(null); //Comment
						this.getView().byId("idBudAmount").setValue("29.000"); //VAT Budget Amount
						this.getView().byId("idTRY0").setValue("TRY"); //dolu
						this.getView().byId("idPayAmount").setValue("4.000"); //Payment Amount
						this.getView().byId("idTRY1").setValue("TRY"); //dolu
						this.getView().byId("idAmount").setValue("200"); //VAT Amount
						this.getView().byId("idTax").setValue("0,00"); //Withholding Tax
						this.getView().byId("idIncAmount").setValue("4200"); //VAT Incl. Amount
						this.getView().byId("idTRY2").setValue("TRY"); //dolu
					}

				},
					handleSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("FirstName", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
			handleClose: function(oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			var tableId = oEvent.getSource().getId();

			if (tableId === "idUserTblTo") {
				usersTo.push(aContexts.map(function(oContext) {
					return oContext.getObject().FirstName + " " + oContext.getObject().LastName;
				}).join(", "));
				for (var a = 0; a < usersTo.length; a++) {
					var userTo = usersTo[a];
					multiUserTo = userTo.split(",");
				}

				if (multiUserTo != null) {
					for (var j = 0; j < multiUserTo.length; j++) {
						var vList1 = new sap.m.StandardListItem({
							title: multiUserTo[j]
						});
						sap.ui.getCore().byId("addTbl1").addItem(vList1);
					}
					console.log(multiUserTo);
				}
			} else if (tableId === "idUserTblInf") {
				usersInf.push(aContexts.map(function(oContext) {
					return oContext.getObject().FirstName + " " + oContext.getObject().LastName;
				}).join(", "));

				for (var b = 0; b < usersInf.length; b++) {
					var userInf = usersInf[b];
					multiUserInf = userInf.split(",");
				}
				if (multiUserInf != null) {
					for (var k = 0; k < multiUserInf.length; k++) {
						var vList2 = new sap.m.StandardListItem({
							title: multiUserInf[k]
						});
						sap.ui.getCore().byId("addTbl2").addItem(vList2);
					}
					console.log(multiUserInf);
				}
			}
		},
		onCloseDialog: function() {
			this.oMessageDialog.close();
			this.oMessageDialog.destroy();
		},
			handleDelete: function(oEvent) {

			var tableId = oEvent.getSource().getId();
			//delete item

			if (tableId === "addTbl1") {
				var oList1 = sap.ui.getCore().byId("addTbl1");
				var item1 = oEvent.getParameter("listItem");
				oList1.removeItem(item1);
			} else {
				var oList2 = sap.ui.getCore().byId("addTbl2");
				var item2 = oEvent.getParameter("listItem");
				oList2.removeItem(item2);
			}

		},
			onAttachAdd: function() {
			var oAttachAddDialog = this.getDialogAttach();

			oAttachAddDialog.open();

		},
		getDialogAttach: function() {
			if (!this.oAttachAddDialog) {
				this.oAttachAddDialog = sap.ui.xmlfragment("zn11_expense.view.AttachDialogPayment", this);
				this.getView().addDependent(this.oAttachAddDialog);
			}

			return this.oAttachAddDialog;
		},
				//Attachment close butonu
		onCloseAttachDialogPayment: function(oEvent) {
			if (!this.oAttachAddDialog) {
				this.oAttachAddDialog = sap.ui.xmlfragment("zn11_expense.view.AttachDialogPayment", this.getView().getController());

			}
			var oFileUploader = sap.ui.getCore().byId("fileuploadPayment");
			oFileUploader.setValue("");
			this.oAttachAddDialog.close();
			
		
			//kac adet file eklenmiş onu ekrana gösterme
			var form = sap.ui.getCore().byId("simpleFormMessage");
			for (var m = 0; m < attachFiles.length; m++) {
			    debugger;
				    var oButton = new sap.ui.commons.Button({
									text: attachFiles[m].name,
									icon: "sap-icon://attachment",
									lite: true,
									width: "60%",
									id: "button"+attachFiles[m].name,
									press: function(oEvent) {
										alert("Dosyalarr!!" + oEvent.getSource().getId());
									
									}
								});
								form.addContent(oButton);
				}
					attachFiles = [];
		},
				//File Upload
		uploadFile: function() {

			var oFileUploader = sap.ui.getCore().byId("fileuploadPayment");
			var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
			var form = sap.ui.getCore().byId("simpleFormAttach");
			console.log(form);

			console.log(file);

			try {
				if (file) {
					this._bUploading = true;
					var that = this;
					/****************To Fetch CSRF Token*******************/
					var a = "/sap/opu/odata/sap/ZN11_BPM_SRV/";
					var f = {
						headers: {
							"X-Requested-With": "XMLHttpRequest",
							"Content-Type": "application/atom + xml",
							DataServiceVersion: "2.0",
							"x-csrf-token": "Fetch"
						},
						requestUri: a,
						method: "GET"
					};
					var oHeaders;
					var sUrl = "/sap/opu/odata/sap/ZN11_BPM_SRV/";
					var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
					sap.ui.getCore().setModel(oModel);
					OData.request(f, function(data, oSuccess) {
						var oToken = oSuccess.headers['x-csrf-token'];
						oHeaders = {
							"x-csrf-token": oToken,
							"slug": "QF"
						};
						/*	* * * * * * * * * * * * * * * To Fetch CSRF Token * * * * * * * * * * * * * * * * * * * /
/ * * * * * * * * * * * * * * * * * * * To Upload File * * * * * * * * * * * * * * * * * * * * * * * * */
						var oURL = "/sap/opu/odata/sap/ZN11_BPM_SRV" + "/FileSet('" + file.name + "')/$value";
						jQuery.ajax({
							type: 'PUT',
							url: oURL,
							headers: oHeaders,
							cache: false,
							contentType: file.type,
							processData: false,
							data: file,
							success: function() {
								sap.m.MessageToast.show("File Uploaded Successfully");
								oFileUploader.setValue("");
                                
                                attachFiles.push(file);
                                //attach butonları yaratma
								var oButton = new sap.ui.commons.Button({
									text: file.name,
									icon: "sap-icon://attachment",
									lite: true,
									width: "20%",
									id: "button_"+file.name,
									press: function(oEvent) {
										alert("Dosyalarr!!" + oEvent.getSource().getId());
										debugger;
									}
								});
								form.addContent(oButton);

							},
							error: function() {
								sap.m.MessageToast.show("File Upload Error!");
							}
						});
					});
				}
			} catch (oException) {
				jQuery.sap.log.error("File upload failed: \n" + oException.message);
			}
                console.log(attachFiles);
		},
				onAddBudget: function() {

				// 	var oModel = new JSONModel(jQuery.sap.getModulePath("zn11_expense/mockserver", "/Products.json"));

					var oDialog;
					var oBudgetNum = new sap.ui.commons.TextField({
						value: "",
						enabled: true
					});
					var oVATAmount = new sap.ui.commons.TextField({
						value: "",
						enabled: true
					});
					var oUsedAmount = new sap.ui.commons.TextField({
						value: "",
						enabled: true
					});
					var oRemAmount = new sap.ui.commons.TextField({
						value: "",
						enabled: true

					});

					var oForm = new sap.ui.layout.form.SimpleForm({
						editable: true,
						content: [
				        new sap.ui.commons.Label({
								text: "Budget Number"
							}), oBudgetNum,
				        new sap.ui.commons.Label({
								text: "VAT Excl. Amount(TRY)"
							}), oVATAmount,
				        new sap.ui.commons.Label({
								text: "Used Amount(TRY)"
							}), oUsedAmount,
				        new sap.ui.commons.Label({
								text: "Remaining Amount(TRY)"
							}), oRemAmount
						]
					});
					oDialog = new sap.m.Dialog({
							title: "Related Budget Number",
							rightButton: new sap.m.Button({
									text: "Add",
									type: sap.m.ButtonType.Emphasized,
									icon: "sap-icon://add",
									press: function() {
										var Model = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZN11_BPM_SRV");
		
                                    var oEntry = {};
                                    oEntry.BudgetNum = oBudgetNum.getValue();
                                    oEntry.VatAmount = oVATAmount.getValue();
                                    oEntry.UsedAmount = oUsedAmount.getValue();
                                    oEntry.RemAmount = oRemAmount.getValue();
								

                                Model.create("/BudgetSet", oEntry, {
                                method: "POST",
                                success: function() {
                                           console.log("SUCCESS");
                                           
                                         },
                                error: function() {
                                           console.log("ERROR");
                                        }
                                    });
									Model.refresh(true);
								
									this.oParent.close();
										}
									}),
								leftButton: new sap.m.Button({
									text: "Close",
									type: sap.m.ButtonType.Emphasized,
									icon: "sap-icon://decline",
									press: function() {
									        this.oParent.close();
										}
									}),
								content: [oForm]
							}); oDialog.open();

					}

				});

			return CController;

		});