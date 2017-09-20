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
	'sap/ui/model/resource/ResourceModel',
			'sap/m/MessageToast',
					'sap/ui/model/Filter'
], function(MessagePopover, MessagePopoverItem, Link, jQuery, Fragment, Controller, JSONModel, AnnotationHelper, Popover, Button,
	ResourceModel, MessageToast, Filter) {
	"use strict";
//test
	var usersTo = [];
	var budgetId = "";
	var multiUserTo = [];
	var usersInf = [];
	var multiUserInf = [];
	var attachFiles = [];
	var count = 0;
	var idNum = 0;
	var columnListItemNewLine;
	var inputArrayId = [];
	var buttonArrayId = [];
	var tableList = [];
	var oInstallments = [];
	//var budgetID;
	/*var budgetId;
	var department;
	var type;
	var desc;
	var subDesc;*/
	var twoEntry = [];

	var CController = Controller.extend("zn11_expense.controller.Budget", {
	
		
		model: new sap.ui.model.json.JSONModel(),
		onInit: function() {

			/*var that = this;
			var sServiceUrl = "/RESTAdapter/BudgetAllocationSelect";
			var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl);
			var oJsonModel = new sap.ui.model.json.JSONModel();

			oModel.read("", null, null, true, function(oData) {
				oJsonModel.setData(oData);
				console.log(oData.results);
			});
			that.getView().setModel(oJsonModel, "JModel");
			this.getView().byId("budgetAllocation").setModel(this.getView().getModel("JModel"));
			*/
			var oThat = this;
			var oModel = new sap.ui.model.json.JSONModel();
			var budgetModel = new sap.ui.model.json.JSONModel();
			var budgetIdModel = new sap.ui.model.json.JSONModel();
			var selects = [];
			var selectId = [];
			var budgetId ;
		     
		        var aData = jQuery.ajax({
		            type : "GET",
		            contentType : "application/json",
		            url : "http://dperppo01d.n11.local:50000/RESTAdapter/b2b/SearchHelp/DEPARTMENT=HR&INPUT_BUDGET_DEPARTMENT",
		            dataType : "json",
		            async: false, 
		            success : function(data,textStatus, jqXHR) {
		                oModel.setData({modelData : data}); 
		                console.log(data);
		                
		                for(var i = 0; i < data.T_RESULT.item.length; i++) {
		                   var text = data.T_RESULT.item[i];	                    
		                    var array = text.STRING.split('@');
		                    budgetId = array[0];
		                    selects.push(text);
		                   // selectId.push(budgetId);
		                    
		                    
		                 }
		               
		                console.log(selects);
		                
		    			budgetModel.setData(selects);
		    			//budgetIdModel.setData(Id);
		    			var Budget = oThat.getView().byId("idBudget");
		    		    Budget.setModel(budgetModel, "budgetModel");
		    		    console.log(Budget);
		    		    
		    			var fText = oThat.getView().byId('idText');
		    			Budget.bindItems("budgetModel>/", fText);
		    			
		                
		            }
		        
		        });
		        
		      
	    		var persData = jQuery.ajax({
	                type : "GET",
	                contentType : "application/json",
	                url : "http://dperppo01d.n11.local:50000/RESTAdapter/b2b/SearchHelp/PERNR=0000100042&PERSONEL",
	                dataType : "json",
	                async: false, 
	                success : function(data,textStatus, jqXHR) {
	                }

	            });
	    		var personelData = persData.responseJSON.T_RESULT.item.STRING;
	    		
	    		
	    		 var arrayPers = personelData.split('@');
	    		 
	    		 
	    		 oThat.getView().byId('requestOwner').setValue(arrayPers[1] + " " + arrayPers[2]);
	    		 oThat.getView().byId('department').setValue(arrayPers[3]);
	    		 oThat.getView().byId('requestNum').setValue(arrayPers[0]);
	    		 oThat.getView().byId('title').setValue(arrayPers[4]);
	    		 
	    		
	            
		        

		        
		},
		
		
    	onSaveChange: function() {
    		var that = this;
    		var aData = jQuery.ajax({
                type : "GET",
                contentType : "application/json",
                url : "http://dperppo01d.n11.local:50000/bpmodata/tasks.svc/TaskCollection?$filter=Status eq 'READY'",
                dataType : "json",
                async: false, 
                success : function(data,textStatus, jqXHR) {
                }

            });
    		var TaskInstanceID = aData.responseJSON.d.results["0"].InstanceID;
            
            var startTypeINPUT = jQuery.ajax({
                type : "GET",
                contentType : "application/json",
                url : "http://dperppo01d.n11.local:50000/bpmodata/taskdata.svc/"+ TaskInstanceID +"/InputData('"+ TaskInstanceID +"')?$format=json&$expand=startTypeINPUT/start/DO_BudgetApproval/Installments/row,startTypeINPUT/start/DO_BudgetApproval/Head,startTypeINPUT/start/DO_BudgetApproval/Details,startTypeINPUT/start/DO_BudgetApproval/Amount",
                dataType : "json",
                async: false, 
                success : function(data,textStatus, jqXHR) {
                }

            });
            
        var Amount = startTypeINPUT.responseJSON.d.startTypeINPUT.start.DO_BudgetApproval.Amount;
        var Head = startTypeINPUT.responseJSON.d.startTypeINPUT.start.DO_BudgetApproval.Head;
        var Details = startTypeINPUT.responseJSON.d.startTypeINPUT.start.DO_BudgetApproval.Details;
        var Installments = startTypeINPUT.responseJSON.d.startTypeINPUT.start.DO_BudgetApproval.Installments;
        
        that.getView().byId("idDepartment").setValue(Details.Department),
        that.getView().byId("idDesc").setValue(Details.Desc),
        that.getView().byId("idSubDesc").setValue(Details.SubDesc),
        that.getView().byId("idType").setValue(Details.Type),
        that.getView().byId("brExp").setValue(Details.brExp),
        that.getView().byId("explanation").setValue(Details.explanation),
        that.getView().byId("periodEnd").setValue(Details.periodEnd),
        that.getView().byId("periodStart").setValue(Details.periodStart),
        that.getView().byId("purpose").setValue(Details.purpose),
        that.getView().byId("remBudget").setValue(Details.remBudget),
        that.getView().byId("subject").setValue(Details.subject),
        that.getView().byId("supplier").setValue(Details.supplier)
        
        
        
            
            
		},
		
		onPdfExport: function() {
			var oURL = "/RESTAdapter/BudgetApproval/Attachment";
			var doc;
			var imgData;
			
			 html2canvas($('#__panel1'), {
		            onrendered: function(canvas) { 
		                 imgData = canvas.toDataURL(
		                    'image/png');     
		                 doc = new jsPDF('1', 'mm', [242, 700]);
		                doc.addImage(imgData, 'PNG',  0, 0);
		                doc.save('doc.pdf');
		            }
		        });
			 
			 setTimeout(function(){
					
				
			 var FileData = {"MT_UI_BudgetApproval_Attachment": {
			        "FileContent": imgData,
			        "FileName": "doc.png"
			    }}
				
			 jQuery.ajax({
			        type: 'POST',
			        url: oURL,
			        data: JSON.stringify(FileData),
			        dataType: "json",
			        headers: {
		                "Content-Type": "application/json"              	
		            },
			        success: function(result) {
			        	alert("Success");
			        }
			    });
			 },2000);
		},
		
		
		sendAction:function(){
			var that = this;
			debugger;
			var vCount, vMonth, vInsAmount;
			for (var i = 0; i < tableList.length; i++) {
				vCount = tableList[i].mAggregations.cells["0"].mProperties.text;
				vMonth = tableList[i].mAggregations.cells["1"].mProperties.value;
				vInsAmount = tableList[i].mAggregations.cells["2"].mProperties.value;

				oInstallments.push({
					rowNumber: vCount,
					Month: vMonth,
					InstallmentAmount: vInsAmount
				});
			}
			console.log(oInstallments);

		
			var oEntry = {"ProcessStartEvent": {"BudgetApproval": {
			    "Amount": {
			        "CurrencyType": that.getView().byId("CurrencyType").getSelectedKey(),
			        "Currency": that.getView().byId("currency").getValue(),
			        "totalAmount": that.getView().byId("totalAmount").getValue(),
			        "totalAmountTRY": that.getView().byId("totalAmount").getValue(),
			        "approvalNecessary": true
			    },
			    "Details": {
			        "Budget": that.getView().byId("idDepartment").getValue(),
			        "Department": "CUSTOMER VALUE",
			        "Desc": that.getView().byId("idDesc").getValue(),
			        "SubDesc": that.getView().byId("idSubDesc").getValue(),
			        "Type": that.getView().byId("idType").getValue(),
			        "brExp": that.getView().byId("brExp").getValue(),
			        "explanation": that.getView().byId("explanation").getValue(),
			        "formType": "",//that.getView().byId("formType").getSelectedIndex(),
			        "periodEnd": that.getView().byId("periodEnd").getValue(),
			        "periodStart": that.getView().byId("periodStart").getValue(),
			        "purpose": that.getView().byId("purpose").getValue(),
			        "relatedParty": that.getView().byId("relatedParty").getSelectedKey(),
			        "remBudget": that.getView().byId("remBudget").getValue(),
			        "subject": that.getView().byId("subject").getValue(),
			        "supplier": that.getView().byId("supplier").getValue()
			    },
			    "Head": {
			        "department": that.getView().byId("department").getValue(),
			        "requestDate": that.getView().byId("requestDate").getValue(),
			        "requestNum": that.getView().byId("requestNum").getValue(),
			        "requestOwner": that.getView().byId("requestOwner").getValue(),
			        "requestTime": that.getView().byId("requestTime").getValue(),
			        "title": that.getView().byId("title").getValue()
			    },
			    "Installments": {"row": oInstallments}
			}}};
			   
			var username,password;
			var oHeaders;
			var oToken;
			username="nozcan";
			password="1234qwer";
			jQuery.ajax({
				  url: "http://dperppo01d.n11.local:50000/bpmodata/startprocess.svc/itelligence.com.tr/budget/BPM_Budget_Approval/$metadata",
				  headers: {"x-csrf-token": "Fetch",
					  "Authorization":"Basic "+btoa(username+":"+password)},
				  async: false,
				  method: 'GET'
				}).then(function(data,status,xhr) {
					  oToken = xhr.getResponseHeader('x-csrf-token');
					  oHeaders = {
								"x-csrf-token": oToken
							};
					});
			var oURL = "http://dperppo01d.n11.local:50000/bpmodata/startprocess.svc/itelligence.com.tr/budget/BPM_Budget_Approval/StartData";
			
//			var oEntry = {"ProcessStartEvent": {"BudgetApproval": {
//			    "Amount": {
//			        "CurrencyType": "",
//			        "Currency": "TRY",
//			        "totalAmount": "945",
//			        "totalAmountTRY": "945",
//			        "approvalNecessary": true
//			    },
//			    "Details": {
//			        "Budget": "17001",
//			        "Department": "CUSTOMER VALUE",
//			        "Desc": "CV",
//			        "SubDesc": "OUTSRC COST FOR CALL CENTER",
//			        "Type": "2017 OPEX",
//			        "brExp": "BR EXP TEXT",
//			        "explanation": "EXPLANATION TEXT",
//			        "formType": "Donation",
//			        "periodEnd": "20171231",
//			        "periodStart": "20170901",
//			        "purpose": "PURPOSE TEXT",
//			       "relatedParty": "",
//			        "remBudget": "1255",
//			        "subject": "2017 BAF DENEME",
//			        "supplier": ""
//			    },
//			    "Head": {
//			        "department": "IT",
//			        "requestDate": "20170907",
//			        "requestNum": "2017-BAF-0013",
//			        "requestOwner": "",
//			        "requestTime": "",
//			        "title": "DIRECTOR"
//			    },
//			    "Installments": {"row": [
//			        {
//			            "InstallmentAmount": "",
//			            "Month": "",
//			            "rowNumber": ""
//			        },
//			        {
//			            "InstallmentAmount": "",
//			            "Month": "",
//			            "rowNumber": ""
//			        }
//			    ]}
//			}}};
			jQuery.ajax({
		        type: 'POST',
		        url: oURL,
		        data: JSON.stringify(oEntry),
		        dataType: "json",
		        headers: {
	                "X-CSRF-Token": oToken,
	                "Content-Type": "application/json"              	
	            },
		        success: function(result) {
		        	
		        }
		    });
			
			this.onPdfExport();
		},
		
		sendActionOLD: function() {
			var that = this;
			var BudgetApproval = {};
			var ProcessStartEvent = {};
			var eInstallments = {};
			var Installments = {
					row: []
				};
			var Head = {};
			var Details = {};
			var Amount = {};
			var oneEntry = [];
			var oEntry = [];
			

			Head.requestOwner = that.getView().byId("requestOwner").getValue();
			Head.department = that.getView().byId("department").getValue();
			Head.title = that.getView().byId("title").getValue();
			Head.requestNum = that.getView().byId("requestNum").getValue();
			Head.requestDate = that.getView().byId("requestDate").getValue();
			Head.requestTime = that.getView().byId("requestTime").getValue();
			Head.requestTime = that.getView().byId("status").getValue();
			
			oEntry.Head = Head;
			
			Details.Department = that.getView().byId("idDepartment").getValue();
			Details.Type = that.getView().byId("idType").getValue();
			Details.Desc = that.getView().byId("idDesc").getValue();
			Details.SubDesc = that.getView().byId("idSubDesc").getValue();
			Details.Budget = that.getView().byId("idBudget").getSelectedKey();
			Details.periodStart = that.getView().byId("periodStart").getValue();
			Details.periodEnd = that.getView().byId("periodEnd").getValue();
			Details.supplier = that.getView().byId("supplier").getValue();
			Details.subject = that.getView().byId("subject").getValue();
			Details.remBudget = that.getView().byId("remBudget").getValue();
			Details.purpose = that.getView().byId("purpose").getValue();
			Details.explanation = that.getView().byId("explanation").getValue();
			Details.formType = that.getView().byId("formType").getSelectedIndex();
			Details.relatedParty = that.getView().byId("relatedParty").getSelectedKey();
			Details.brExp = that.getView().byId("brExp").getValue();
			
			oEntry.Details = Details;
			
			
			
			Amount.CurrencyType = that.getView().byId("CurrencyType").getSelectedKey();
			Amount.currency = that.getView().byId("currency").getValue();
			Amount.totalAmount = that.getView().byId("totalAmount").getValue();
			Amount.totalAmountTRY = that.getView().byId("totalAmount").getValue();
			
			oEntry.Amount = Amount;
			
			
			
		/*	Installments.row.push({
				rowNumber : that.getView().byId("totalAmount").getValue(),
				Month : that.getView().byId("CurrencyType").getSelectedKey(),
				InstallmentAmount : that.getView().byId("currency").getValue()
				
			});
			
			Installments.row.push({
				rowNumber : that.getView().byId("totalAmount").getValue(),
				Month : that.getView().byId("CurrencyType").getSelectedKey(),
				InstallmentAmount : that.getView().byId("currency").getValue()
			});
			*/
			
			
			oEntry.Installments = oInstallments;
			
			oneEntry.BudgetApproval = oEntry;
			twoEntry.ProcessStartEvent = oneEntry;
			
			
//			var oEntry = oEntry.concat(oInstallments);
			
			
//			console.log(twoEntry);
//			this.sendData();
			
		},
		
		
		
		setFormat:function(value){
			if (value) {
				/*var array = value.split('@');
				budgetId = array[0];
				department = array[1];
				type = array[2];
				desc = array[3];
				subDesc = array[4];*/
				//var array = value.split('@');
				//budgetID = array[0];
				return value;
			
			} else {
				return value;
			}
		},
		onAfterRendering: function() {
			
		},
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
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
			/*var oUserToDialog = this.getDialogUser();
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
*/
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
		handleSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("FirstName", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		handleClose: function(oEvent) {
			var aContexts = oEvent.getParameter("edContexts");
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
				this.oAttachAddDialog = sap.ui.xmlfragment("zn11_expense.view.AttachDialogBudget", this);
				this.getView().addDependent(this.oAttachAddDialog);
			}

			return this.oAttachAddDialog;
		},

		//Attachment close butonu
		onCloseAttachDialog: function(oEvent) {
			if (!this.oAttachAddDialog) {
				this.oAttachAddDialog = sap.ui.xmlfragment("zn11_expense.view.AttachDialogBudget", this.getView().getController());

			}
			var oFileUploader = sap.ui.getCore().byId("fileupload");
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

			var oFileUploader = sap.ui.getCore().byId("fileupload");
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
		selectChange:function(oEvent){
			var oThat = this;
			var selectItem = oEvent.oSource.getSelectedItem().getText();
			console.log(selectItem);
			
			var array = selectItem.split('@');
			budgetId = array[0];
			var department = array[1];
			var type = array[2];
			var desc = array[3];
			var subDesc = array[4];
					
			
			
			oThat.getView().byId("idDepartment").setValue(department);
			oThat.getView().byId("idType").setValue(type);
			oThat.getView().byId("idDesc").setValue(desc);
			oThat.getView().byId("idSubDesc").setValue(subDesc);
			
			
			setTimeout(function(){
				oThat.byId("idBudget").setValue(budgetId);
			},10);
				
			
	
	
			
		},
		addListInput: function(oEvent) {
			var oThat = this;
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1;
			var yyyy = today.getFullYear();
			if (dd < 10) {
				dd = '0' + dd;
			} else {
				dd = dd.toString();
			}

			if (count !== 0) {
				mm = (mm + count);
				var newMM = mm % 12;
				var newYYYY = Math.floor(mm / 12);
				if (newMM < 10) {
					if (newMM === 0) {
						newMM = 12;
						newYYYY = newYYYY - 1;
					} else {
						newMM = '0' + newMM;
					}
				} else {
					newMM = newMM;
				}
				yyyy = yyyy + newYYYY;
				today = yyyy.toString() + newMM.toString() + dd;

			} else {
				if (mm < 10) {
					mm = '0' + mm;
				}
				today = yyyy + mm + dd;
			}

			var oDatePicker1 = new sap.ui.commons.DatePicker();
			oDatePicker1.setYyyymmdd(today);
			count = count + 1;
			idNum = idNum + 1;
			
			var buttonId = "_button" + count;
			var inputId = "_text" + count;

			columnListItemNewLine = new sap.m.ColumnListItem({
				type: sap.m.ListType.Inactive,
				unread: false,
				cells: [
					new sap.m.Label({
						text: idNum,
						editable: false
					}),
					new sap.m.Input({
						type: "Text",
						value: oDatePicker1.getValue(),
						editable: false
					}),
					new sap.m.Input({
						type: "Text",
						value: "",
						id: "_text" + count,
						liveChange: function() {
							var inputNo = 0;
							var toplam = 0;
							for (var a = 0; a < inputArrayId.length; a++) {
								var input = sap.ui.getCore().byId(inputArrayId[a]).getValue();
								inputNo = parseInt(input);
								if (inputNo > 0) {
									toplam = toplam + inputNo;
								}

							}
							console.log(toplam);
							oThat.getView().byId("idTotalAmount").setValue(toplam);
						}
					}),
					new sap.m.Button({
						icon: "sap-icon://delete",
						width: "30%",
						id: buttonId,
						press: function(oEvent) {
							debugger;
							if (oEvent.getSource().getParent().getParent().getItems().length > 0) {
								var row = oEvent.getSource().getParent().getId();
								oEvent.getSource().getParent().getParent().removeItem(row);
								count--;
								idNum--;
								var sButton = "_button" + (count);
								if (count > -1) {
									inputArrayId.splice(count, 1);
								}
								if (count > -1) {
									tableList.splice(count, 1);
								}
								if (count > -1) {
									buttonArrayId.splice(count, 1);
								}
								sap.ui.getCore().byId(sButton).setVisible(true);
							}

						},
						visible: true
					})
				]
			});
			oThat.getView().byId("mainViewTbl").addItem(columnListItemNewLine);
			tableList.push(columnListItemNewLine);
			inputArrayId.push(inputId);
			buttonArrayId.push(buttonId);
			console.log(buttonArrayId);

			debugger;
			//bır oncekının delete butonunu sil veya gizle
			var oncekiButton;
			if (count === 1) {
				oncekiButton = "_button" + (count);
				sap.ui.getCore().byId(oncekiButton).setVisible(true);
			} else {
				oncekiButton = "_button" + (count - 1);
				sap.ui.getCore().byId(oncekiButton).setVisible(false);
			}
			console.log(oncekiButton);

		}
		
		


	});

	return CController;

});