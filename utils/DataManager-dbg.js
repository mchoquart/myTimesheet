/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.utils.DataManager");
jQuery.sap.require("sap.ui.model.odata.datajs");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("sap.ui.base.EventProvider");
jQuery.sap.require("hcm.mytimesheet.utils.InitialConfigHelper");
jQuery.sap.require("sap.m.MessageBox");

sap.ui.base.EventProvider
	.extend(
		"hcm.mytimesheet.Service", {
			metadata: {
				publicMethods: ["getModel", "getGeneralParameters",
								"getSpendingDataByHierarhyNodesAndPeriod",
								"getGenericLineItemsByHierNodesAndPeriod",
								"getTrendDataByHierarchyNodes", "setBundle"]
			},
			constructor: function() {
				this._nCounter = 0;
				this._busyDialog = new sap.m.BusyDialog();
			},

			_initialize: function(appController) {
				if (!this.oApplication) {
					this.oApplication = appController.oApplicationFacade.oApplicationImplementation;
					this.oConfiguration = appController.oConfiguration;
					this.oConnectionManager = appController.oApplication
						.getConnectionManager();
				}

				if (!this.oBundle) {
					this.oBundle = appController.oApplicationFacade.oApplicationImplementation.getResourceBundle();
				}
				this.oConfiguration.setResourceBundle(this.oBundle);
				this.oDataModel = this.oConnectionManager.getModel();
				this.oDataModel
					.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			},

			processError: function(oError) {
				var message = "";
				var messageDetails = "";
				if (oError.response) {
					var body = oError.response.body;
					try {
						body = JSON.parse(body);
						if (body.error.innererror && body.error.innererror.errordetails) {

							var errors = body.error.innererror.errordetails;
							for (var i = 0; i < errors.length; i++) {
								if (errors[i].code.match("/IWBEP")) {
									continue;
								}
								messageDetails += errors[i].code + " : " + errors[i].message + "\n";
							}

						}
						if (messageDetails === "") {
							messageDetails = body.error.code + " : " + body.error.message.value;
						}
						message = body.error.message.value;
					} catch (e) {
						jQuery.sap.log.warning("Could parse the response", ["parseError"], ["hcm.mytimesheet"]);
					}
				}
				if (message === "") {
					message = this.oBundle.getText("INTERNAL_ERROR");
				}
				if (messageDetails === "") {
					messageDetails = this.oBundle.getText("INTERNAL_ERROR_BODY");
				}
				var oMessage = {
					message: message,
					details: messageDetails,
					type: sap.m.MessageBox.Icon.ERROR
					// 	type: sap.ca.ui.message.Type.ERROR
				};

				try {
					sap.m.MessageBox.show(
						oMessage.message, {
							icon: oMessage.type,
							title: this.oBundle.getText("ERROR"),
							actions: [sap.m.MessageBox.Action.OK],
							details: oMessage.details,
							onClose: function(oAction) {}
						}
					);
				} catch (o) {
					oMessage.type = sap.ca.ui.message.Type.ERROR;
					sap.ca.ui.message.showMessageBox({
						type: sap.ca.ui.message.Type.ERROR,
						message: oMessage.message,
						details: oMessage.details
					});
				}

			},

			getPersonellAssignments: function(appController, fSuccess) {

				var self = this;
				this._initialize(appController);
				this.oDataModel
					.read(
						"/ConcurrentEmploymentSet",
						null, [],
						true,
						function(oData) {
							fSuccess(oData.results);
						},
						function(oError) {
							self.processError(oError);
						});

			},

			getWorkDays: function(appController, pernr, begda, endda, fSuccess) {
				// 		this.showBusy();
				var self = this;
				this._initialize(appController);
				this.oDataModel
					.read(
						"/WorkCalendars",
						null, ["$filter=Pernr eq '" + pernr
								  + "' and StartDate eq '" + begda
								  + "' and EndDate eq '"
								  + endda + "'"],
						true,
						function(oData) {
							fSuccess(oData.results);
							// 	self.hideBusy();
						},
						function(oError) {
							// 	self.hideBusy(true);
							self.processError(oError);
						});

			},

			getFavorites: function(appController, pernr, /*begda, endda,*/ fSuccess) {
				this.showBusy();
				var self = this;
				this._initialize(appController);
				this.oDataModel
					.read(
						"/Favorites",
						null, ["$filter=Pernr eq '" + pernr
								  + "'"],
						true,
						function(oData) {
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			createFavorite: function(appController, favObj, fSuccess) {
				this.showBusy();
				var self = this;
				this._initialize(appController);
				this.oDataModel.create("/Favorites", favObj, null, function(oData) {
						self.hideBusy();
						var toastMsg = self.oBundle.getText("FAVORITE_SUBMIT_SUCCESS");
						sap.m.MessageToast.show(toastMsg, {
							duration: 3000
						});
						fSuccess(oData);
					},
					function(oError) {
						self.processError(oError);
						self.hideBusy();
					});
			},

			updateFavorite: function(appController, favObj, fSuccess) {
				this.showBusy();
				var self = this;
				this._initialize(appController);
				var path = "/Favorites(ID='" + favObj.ID.trim() + "',Pernr='" + favObj.Pernr + "')";
				this.oDataModel.update(path, favObj, null, function(oData) {
						self.hideBusy();
						var toastMsg = self.oBundle.getText("FAVORITE_UPDATE_SUCCESS");
						sap.m.MessageToast.show(toastMsg, {
							duration: 3000
						});
						fSuccess(oData);
					},
					function(oError) {
						self.processError(oError);
						self.hideBusy();
					});
			},

			deleteFavorite: function(appController, favObj, fSuccess) {
				// this.showBusy();
				var self = this;
				this._initialize(appController);
				var path = "/Favorites(ID='" + favObj.ID.trim() + "',Pernr='" + favObj.Pernr + "')";
				this.oDataModel.remove(path, null, function(oData) {
						self.hideBusy();
						var toastMsg = self.oBundle.getText("FAVORITE_DELETE_SUCCESS");
						sap.m.MessageToast.show(toastMsg, {
							duration: 3000
						});
						fSuccess(oData);
					},
					function(oError) {
						self.processError(oError);
						self.hideBusy();
					});
			},

			getTimeDataList: function(appController, pernr, begda, endda, fSuccess) {
				this.showBusy();
				var self = this;

				this._initialize(appController);
				this.oDataModel
					.read(
						"/TimeDataList",
						null, ["$filter=Pernr eq '" + pernr
								  + "' and StartDate eq '" + begda
								  + "' and EndDate eq '"
								  + endda + "'"],
						true,
						function(oData) {
							for (var i = 0; i < oData.results.length; i++) {
								oData.results[i].Level = oData.results[i].Level.toString().trim();
							}
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			getWorkListCollection: function(appController, pernr, begDa, endDa, fSuccess) {
				this.showBusy();
				var self = this;

				this._initialize(appController);

				this.oDataModel
					.read(
						"/WorkListCollection",
						null, ["$filter=Pernr eq '" + pernr
								                + "' and StartDate eq '" + begDa + "' and EndDate eq '"
												+ endDa + "'"],
						true,
						function(oData) {
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			getProfileFields: function(appController, pernr, fSuccess) {
				this.showBusy();
				var self = this;

				this._initialize(appController);
				this.oDataModel
					.read(
						"/ProfileFields",
						null, ["$filter=Pernr eq '" + pernr
								                        + "'"],
						true,
						function(oData) {
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			getValueHelpList: function(pernr, fieldName,
				top, skip, searchString, fieldRelated, begDa, endDa, fSuccess) {
				this.showBusy();
				var self = this;
				var queryString = ["$filter=Pernr eq '" + pernr
								    + "' and FieldName eq '"
									+ fieldName + "'"];
				queryString[0] += " and StartDate eq '" + encodeURIComponent(begDa) + "'" + " and EndDate eq '" + encodeURIComponent(endDa) + "' "; //adding begin and end dates to the filter

				if (searchString) {
					queryString[0] += "and substringof('" + encodeURIComponent(searchString) + "',FieldValue)";
				}
				if (fieldRelated) {
					queryString[0] += "and FieldRelated eq '" + encodeURIComponent(fieldRelated) + "'";
				}
				queryString[0] += "&$top=" + top + "&$skip=" + skip;
				this._initialize();

				this.oDataModel
					.read(
						"/ValueHelpList",
						null,
						queryString,
						true,
						function(oData) {
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			getInitialInfos: function(appController, pernr, begda, endda) {

				this._initialize(appController);
				var self = this;
				this.oDataModel
					.read(
						"/InitialInfos",
						null, ["$filter=Pernr eq '" + pernr
								                    + "' and StartDate eq '" + begda
													+ "' and EndDate eq '"
													+ endda + "'"],
						false,
						function(oData) {
							//   oData.results[0].ClockEntry = "T";
							self.oConfiguration.setInitialInfoModel(oData.results[0]);
						},
						function(oError) {
							self.processError(oError);
						});

			},

			submitTimeEntry: function(appController, timeEntryCreated,
				timeEntryUpdated, timeEntryDeleted, fnSuccess,
				fnFailure) {
				this.showBusy();

				this._initialize(appController);
				var self = this;
// //BEGIN OF NOTE 2356935
// 				if(appController.entry){
// 					self.selectedDate = appController.entry.selectedDate;
// 				}
// //END OF NOTE 2356935
				var arrEntry1 = timeEntryCreated
					.concat(timeEntryUpdated);
				var finalEntry = arrEntry1.concat(timeEntryDeleted);

				var mainModel = this.oDataModel;
				// keep posts with errors
				this.errors = [];
				this.responseData = [];

				mainModel
					.refreshSecurityToken(
						function() {
							for (var i = 0; i < finalEntry.length; i++) {
								self.data = finalEntry[i];
								var batch = mainModel
									.createBatchOperation(
										"/TimeEntries",
										"POST",
										self.data);
								var batchchanges = [];
								batchchanges.push(batch);
								mainModel
									.addBatchChangeOperations(batchchanges);
							}

							mainModel
								.submitBatch(
									function(oData /*,oResponse,aErrorResponses*/ ) {
										var hasError = [],
											messageHdr = "",
											message = "",
											errFlag = false;
										self.errors = [];
										for (i = 0; i < oData.__batchResponses.length; i++) {
											message = "";

											if (oData.__batchResponses[i].response) {
												var body = oData.__batchResponses[i].response.body;
												try {
													body = JSON.parse(body);
													if (messageHdr === "") {
														messageHdr = body.error.message.value;
													}
													var errordetails = body.error.innererror.errordetails;
													for (var j = 0; j < errordetails.length; j++) {
														if (errordetails[j].code.match("/IWBEP")) {
															continue;
														}
														message += errordetails[j].code + ":" + errordetails[j].message + "\n";
														if (errordetails[j].severity === "error") {                                 //NOTE 2326142
															errFlag = true;
														}
													}
												} catch (e) {
													jQuery.sap.log.warning("Could parse the response", ["submitTimeEntry"], ["hcm.mytimesheet"]);
												}
												self.errors
													.push({
														counter: finalEntry[i].Counter,
														workdate: finalEntry[i].TimeEntryDataFields.WORKDATE,
														time: finalEntry[i].TimeEntryDataFields.CATSHOURS,
														message: message,
														messageHdr: messageHdr,
														errorFlag: errFlag,
														body: body
													});

											} else if (oData.__batchResponses[i].__changeResponses) {
												hasError[i] = false;
												self.responseData
													.push(oData.__batchResponses[i].__changeResponses[0].data);
											}

										}

										// after submit release busy icon and call success/fail functions
										self.hideBusy(true);
										self._initialize();
										var errorDates = [];
										if (self.errors.length > 0) {
											var messageList = "";
											for (i = 0; i < self.errors.length; i++) {
												var dateStr = self.errors[i].workdate;
												var y = parseInt(dateStr.substr(0, 4), 10);
												var m = parseInt(dateStr.substr(5, 2), 10) - 1;
												var d = parseInt(dateStr.substr(8, 2), 10);

												var dateError = self.formatDateMMMDD(new Date(y, m, d, 0, 0, 0, 0));
												errorDates.push((new Date(y, m, d, 0, 0, 0, 0)).toDateString());

												messageList += dateError + ":- \n" + self.errors[i].message + "\r\n";
											}
											var type;
											if (errFlag) {
												// type = sap.ca.ui.message.Type.ERROR;
												type = sap.m.MessageBox.Icon.ERROR;
											} else {
												// type = sap.ca.ui.message.Type.WARNING;
												type = sap.m.MessageBox.Icon.WARNING;
											}
											if (messageHdr === "") {
												messageHdr = self.oBundle.getText("INTERNAL_ERROR");
											}
											if (self.errors.length === 1 && self.errors[0].message === "") {
												messageList = self.oBundle.getText("INTERNAL_ERROR_BODY");
											}
											var oMessage = {
												message: messageHdr,
												details: messageList,
												type: type
											};

											try {
											 	if (errFlag) {              //NOTE 2293728	
												sap.m.MessageBox.show(
													oMessage.message, {
														icon: oMessage.type,
														title: self.oBundle.getText("ERROR"),
														actions: [sap.m.MessageBox.Action.OK],
														details: oMessage.details
														/*onClose: function(oAction) {
															fnFailure(hasError, errorDates);
														}*/
													}
												); } else {               //BEGIN OF NOTE 2293728
												 sap.m.MessageBox.show(
													oMessage.message, {
														icon: oMessage.type,
														title: self.oBundle.getText("WARNING"),
														actions: [sap.m.MessageBox.Action.OK],
										              	onClose: function(oAction){
														  	if(oAction === self.oBundle.getText("OK")){	
														  		 fnSuccess();                                    //NOTE 2370738
//                                                               var a = [];
//                                                               if( self.data.TimeEntryOperation === "C" ){
//                                                               self.data.TimeEntryOperation = "K";
// //BEGIN OF NOTE 2356935 
//                                                               for( i=0; i < self.selectedDate.length; i++ ) 
//                                                               {
//                                                                  self.data = $.extend(true, {}, self.data);
//                                                                  a[i] = self.data;
//                                                                  a[i].TimeEntryDataFields.WORKDATE = "" + new Date(self.selectedDate[i]).getFullYear() + "-" + ("" + (new Date(self.selectedDate[i]).getMonth() + 101)).substring(1) + "-" + ("" + (new Date(self.selectedDate[i]).getDate() + 100)).substring(1) +"T00:00:00";
//                                                                 }
// //END OF NOTE 2356935                                                                
//                                                               self.submitTimeEntry(self,a,[],[],fnSuccess,fnFailure);                                                              
//                                                               }else if(self.data.TimeEntryOperation === "U"){
//                                                                 self.data.TimeEntryOperation = "L";	
//                                                                 a.push(self.data);
//                                                                 self.submitTimeEntry(self,[],a,[],fnSuccess,fnFailure);                                                              
//                                                               }else if(self.data.TimeEntryOperation === "D"){
//                                                               	self.data.TimeEntryOperation = "M";
//                                                               	a.push(self.data);                                                   //NOTE 2367454
//                                                                 self.submitTimeEntry(self,[],[],a,fnSuccess,fnFailure);                                                              	
//                                                               }
                  
														  		
														  	}
														},
														details: oMessage.details
														/*onClose: function(oAction) {
															fnFailure(hasError, errorDates);
														}*/
													}
												);													
													
												}                       //END OF NOTE 2293728   
												fnFailure(hasError, errorDates);
											} catch (o) {
												if (type === sap.m.MessageBox.Icon.ERROR) {
													oMessage.type = sap.ca.ui.message.Type.ERROR;
												} else {
													oMessage.type = sap.ca.ui.message.Type.WARNING;
												}
												sap.ca.ui.message.showMessageBox({
													type: oMessage.type,
													message: oMessage.message,
													details: oMessage.details
												}, fnFailure(hasError, errorDates));
											}

										} else {
											fnSuccess();
										}
									},
									function(oError) {
										//error function for mainModel.submitBatch
										self.hideBusy(true);
										self.processError(oError);

									});

						}, function(oError) {
							//error function for mainModel.refreshSecurityToken
							self.hideBusy(true);
							self.processError(oError);
						}, true);

			},
			formatDateMMMDD: function(oDate) {
				var month = oDate.getMonth();
				var day = oDate.getDate();

				var dateString = this.oBundle.getText("MONTH_" + month) + " " + day;

				return dateString;
			},

			showBusy: function() {
				this._nCounter++;
				if (this._nCounter === 1) {
					this._busyDialog.open();

				}
			},

			hideBusy: function(forceHide) {
				if (this._nCounter === 0) {
					return;
				}
				this._nCounter = forceHide ? 0 : Math.max(0,
					this._nCounter - 1);
				if (this._nCounter > 0) {
					return;
				}
				this._busyDialog.close();
			}

		});