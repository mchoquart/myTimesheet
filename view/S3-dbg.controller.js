/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("hcm.mytimesheet.utils.DataManager");
jQuery.sap.require("hcm.mytimesheet.utils.ConcurrentEmployment");
jQuery.sap.require("hcm.mytimesheet.model.TimeEntry");
jQuery.sap.require("sap.ca.ui.dialog.factory");
jQuery.sap.require("sap.ca.ui.dialog.Dialog");
jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("hcm.mytimesheet.utils.InitialConfigHelper");
jQuery.sap.require("sap.ca.ui.model.type.Number");
/*global hcm:true */
sap.ca.scfld.md.controller.BaseFullscreenController
	.extend(
		"hcm.mytimesheet.view.S3", {
			extHookChangeHeaderFooterOptions: null,
			extHookAlterColumns: null,
			extHookChangeObjectBeforePost: null,
			extHookChangeFormatTime: null,                        //NOTE 2356935

			onInit: function() {

				sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
				this.oApplication = this.oApplicationFacade.oApplicationImplementation;
				this.oBundle = this.oApplicationFacade.oApplicationImplementation.getResourceBundle();
				this.oConfiguration = new hcm.mytimesheet.utils.InitialConfigHelper();
				this.oConfiguration.setResourceBundle(this.oBundle);
				if (!this.oService) {
					this.oService = new hcm.mytimesheet.Service();
				}
				var self = this;
				sap.ui.Device.orientation.attachHandler(function(oEvent) {
					if (oEvent.landscape) {
						if (sap.ui.Device.system.phone) {
							self.byId("MTS3_SUMMARY_GRID").setDefaultSpan("L6 M12 S12");
							self.byId("MTS3_SUMMARY_GRID").rerender();
						}
					}
				});
				this.oRouter.attachRouteMatched(function(oEvent) {

					if (oEvent.getParameter("name") === "S3") {
						//only invoke if a pernr has been selected
						if (self.oApplication.pernr) {
							self.initializeView();
							self.updateData();
						}
					}
				});

			},

			onAfterRendering: function() {
				var self = this;
				if (!this.oApplication.pernr) {
					try {
						var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
						var oStartUpParameters = sap.ui.component(sComponentId).getComponentData().startupParameters; //Get pernr from the cross app nav
						this.oApplication.pernr = oStartUpParameters.pernr[0];
						this.initializeView();
						this.initializeTable();
						this.updateData();
					} catch (o) {
						hcm.mytimesheet.utils.ConcurrentEmployment.getCEEnablement(this, function() {
							self.initializeView();
							self.initializeTable();
							self.updateData();
						});
					}

				}
			},

			initializeView: function() {
				var curDate = new Date();
				var oModel;
				var s3exchgModel = this.oApplication.getModel("S3exchangeModel");
				if (s3exchgModel) {
					oModel = this.setInitialInfoModelData(s3exchgModel.getProperty("/currentDate"));
					this.oApplication.setModel(null, "S3exchangeModel");
				} else {
					oModel = this.setInitialInfoModelData(curDate);
				}

				// this.updateData();
				this.getView().setModel(oModel);

				//setting the calendar model
				this.byId("WEEKLY_CALENDAR").setModel(oModel);
				this.calendarModel = oModel;
				//Reseting and disabling the Delete Button text 
				this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
				this.setBtnEnabled("deleteBtn", false);

				this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
				this.setBtnEnabled("SUBMIT_BTN", false);

				this.setBtnText("copyBtn", this.oApplicationFacade.getResourceBundle().getText("COPY"));
				this.setBtnEnabled("copyBtn", false);

				this.checkboxList = [];
				// new model for data excahnge with s31
				var S31modelexch = new sap.ui.model.json.JSONModel();
				this.oApplication.setModel(S31modelexch, "S31modelexch");

			},

			setInitialInfoModelData: function(curDate) {
				var oModel = new sap.ui.model.json.JSONModel({
					phone: sap.ui.Device.system.phone
				});
				var noOfWeeks = 13; //by default 2 weeks are shown
				if (sap.ui.Device.system.phone) {
					noOfWeeks = 6;
					this.byId("WEEKLY_CALENDAR").setWeeksPerRow(1); //in case of mobile devices 1 week is shown
					this.byId("MTS3_SECOND_INFO").setVisible(false);
					this.byId("MTS3_SUMMARY_GRID").rerender();

				}
				var firstday = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR")
					.getFirstDayOffset(), curDate.getDay()));

				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + noOfWeeks);
				this.oApplication.setModel(oModel, "TSM_WEEKLY");

				this.oService.getInitialInfos(this, this.oApplication.pernr, this.getDateStr(curDate), this.getDateStr(curDate));

				oModel.setProperty("/showSubmit", false);
				oModel.setProperty("/selected", this.getDateStr(curDate));
				oModel.setProperty("/selectedDate", curDate);
				oModel.setProperty("/year", curDate.getFullYear());
				oModel.setProperty("/start", this.getDateStr(curDate));
				oModel.setProperty("/weekStart", this.getDateStr(firstday));
				oModel.setProperty("/weekEnd", this.getDateStr(lastday));

				var InitalInfoModel = this.oConfiguration.getInitialInfoModel();

				this.releaseAllowed = InitalInfoModel.ReleaseDirectly === "TRUE";
				oModel.setProperty("/releaseAllowed", this.releaseAllowed);

				this.releaseFuture = (InitalInfoModel.ReleaseFuture === "TRUE");
				oModel.setProperty("/releaseFuture", this.releaseFuture);
				oModel.setProperty("/favoriteAvailable", InitalInfoModel.FavoriteAvailable);
				this.FavoriteAvailable = InitalInfoModel.FavoriteAvailable;
				this.setBtnEnabled("SUBMIT_BTN", false);
				this.clockEntry = (InitalInfoModel.ClockEntry === "TRUE");
				oModel.setProperty("/clockEntry", this.clockEntry);
				this.withTargetHours = InitalInfoModel.WithTargetHours;
				return oModel;
			},
			setWeekOverviews: function(noOfWeeks) {

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var weekData = oModel.getProperty("/days");

				var curDate = new Date(this.byId("WEEKLY_CALENDAR").getCurrentDate());
				var firstday = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR")
					.getFirstDayOffset(), curDate.getDay()));
				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + (7 * noOfWeeks - 1));

				oModel.setProperty("/weekStart", this.getDateStr(firstday));
				oModel.setProperty("/weekEnd", this.getDateStr(lastday));
				var first = firstday.getTime();
				// 		var firstday = new Date(first);
				// 		var lastday = new Date(last);
				var firstWeekLastDay, secondWeekFirstDay, i, totalAssignments, recordedHrsTxt, assignments;
				var targetHrsTxt, weekText, weekRange, totalTargetHrs, totalRecordedHrs, totalApprovedHours, approvedHrsTxt, entryArray1, entryArray2;

				//first week only
				//Set the title
				weekRange = [];
				// splitString = firstday.toDateString().split(" ");
				// weekRange[0] = splitString[1] + " " + splitString[2] + " - ";
				weekRange[0] = this.formatDateMMMDD(firstday);

				if (noOfWeeks === 1) {

					// 	splitString = lastday.toDateString().split(" ");formatDateMMMDD
					// 	weekRange[0] += splitString[1] + " " + splitString[2];
					weekRange[1] = this.formatDateMMMDD(lastday);
					weekText = this.oBundle.getText("WEEK_DATE_RANGE", [weekRange[0], weekRange[1]]);
					this.byId("MTS3_CURRENT_WEEK_INFO_1").setTitle(weekText);
					totalTargetHrs = 0;
					totalRecordedHrs = 0;
					totalApprovedHours = 0;
					totalAssignments = 0;
					entryArray1 = [];
					//find the statuses
					for (i = 0; i < weekData.length; i++) {
						totalTargetHrs += weekData[i].targetHours;
						totalRecordedHrs += weekData[i].recordedHours;
						totalApprovedHours += weekData[i].approvedHours;
						if (weekData[i].entries.length) {
							// 			totalAssignments++;
							entryArray1 = this.pushUniqueElements(weekData[i].entries, entryArray1);
						}
					}
					totalAssignments = entryArray1.length;
					//setting the sum to a max of 2 decimal points
					if (totalTargetHrs !== 0) {
						totalTargetHrs = this.formatTime(totalTargetHrs.toFixed(2));
					}
					if (totalRecordedHrs !== 0) {
						totalRecordedHrs = this.formatTime(totalRecordedHrs.toFixed(2));
					}
					if (totalApprovedHours !== 0) {
						totalApprovedHours = this.formatTime(totalApprovedHours.toFixed(2));
					}

					//setting the data
					if (totalRecordedHrs !== 0) {
						recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOURS", [totalRecordedHrs]);
					} else {
						recordedHrsTxt = this.oBundle.getText("NO_RECORDING");
					}
					if (totalAssignments === 1) {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENT");
					} else if (totalAssignments === 0) {
						assignments = this.oBundle.getText("NO_ASSIGNMENT");
					} else {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENTS", [totalAssignments]);
					}

					if (totalApprovedHours === 0) {
						approvedHrsTxt = " ";
					} else {
						approvedHrsTxt = this.oBundle.getText("TOTAL_APPROVED_HOURS", [totalApprovedHours]);
					}
					if (totalTargetHrs !== 0 && this.withTargetHours) {
						targetHrsTxt = this.oBundle.getText("TOTAL_TARGET_HOURS", [totalTargetHrs]);
					} else {
						targetHrsTxt = "  ";
					}
					this.byId("MTS3_CURRENT_WEEK_INFO_1").setNumber(recordedHrsTxt);
					this.byId("MTS3_TARGET_TIME_1").setText(targetHrsTxt);

					this.byId("MTS3_TXT_ASSIGNMENTS_1").setText(assignments);
					this.byId("MTS3_TXT_APPROVED_HOURS_1").setText(approvedHrsTxt);
				} else {
					firstWeekLastDay = first + ((7 * 1 - 1) * 24 * 60 * 60 * 1000);
					firstWeekLastDay = new Date(firstWeekLastDay);
					secondWeekFirstDay = first + 7 * 24 * 60 * 60 * 1000;
					secondWeekFirstDay = new Date(secondWeekFirstDay);
					//set all the hours of each to 0
					firstday.setHours(0, 0, 0, 0);
					firstWeekLastDay.setHours(0, 0, 0, 0);
					secondWeekFirstDay.setHours(0, 0, 0, 0);
					lastday.setHours(0, 0, 0, 0);
					//find and set the 2nd week data

					//set the number
					// 	splitString = firstWeekLastDay.toDateString().split(" ");
					// 	weekRange[0] += splitString[1] + " " + splitString[2];
					weekRange[1] = this.formatDateMMMDD(firstWeekLastDay);
					weekText = this.oBundle.getText("WEEK_DATE_RANGE", [weekRange[0], weekRange[1]]);
					this.byId("MTS3_CURRENT_WEEK_INFO_1").setTitle(weekText);
					//2nd week
					/*splitString = secondWeekFirstDay.toDateString().split(" ");
					weekRange[1] = splitString[1] + " " + splitString[2] + " - ";
					splitString = lastday.toDateString().split(" ");
					weekRange[1] += splitString[1] + " " + splitString[2];*/

					weekRange[2] = this.formatDateMMMDD(secondWeekFirstDay);
					weekRange[3] = this.formatDateMMMDD(lastday);
					weekText = this.oBundle.getText("WEEK_DATE_RANGE", [weekRange[2], weekRange[3]]);
					this.byId("MTS3_CURRENT_WEEK_INFO_2").setTitle(weekText);

					//1st week
					totalTargetHrs = [0, 0];
					totalRecordedHrs = [0, 0];
					totalApprovedHours = [0, 0];
					totalAssignments = [0, 0];
					entryArray1 = [];
					entryArray2 = [];

					for (i = 0; i < weekData.length; i++) {
						if (weekData[i].date.getTime() < secondWeekFirstDay.getTime()) {
							totalTargetHrs[0] += weekData[i].targetHours;
							totalRecordedHrs[0] += weekData[i].recordedHours;
							totalApprovedHours[0] += weekData[i].approvedHours;
							if (weekData[i].entries.length) {
								// totalAssignments[0]++; 
								entryArray1 = this.pushUniqueElements(weekData[i].entries, entryArray1);
							}
						} else {
							totalTargetHrs[1] += weekData[i].targetHours;
							totalRecordedHrs[1] += weekData[i].recordedHours;
							totalApprovedHours[1] += weekData[i].approvedHours;
							if (weekData[i].entries.length) {
								// totalAssignments[1]++;
								entryArray2 = this.pushUniqueElements(weekData[i].entries, entryArray2);
							}
						}
					}
					totalAssignments[0] = entryArray1.length;
					totalAssignments[1] = entryArray2.length;
					//setting the sum to a max of 2 decimal points
					for (i = 0; i < 2; i++) {
						if (totalTargetHrs[i] !== 0) {
							totalTargetHrs[i] = this.formatTime(totalTargetHrs[i].toFixed(2));
						}
						if (totalRecordedHrs[i] !== 0) {
							totalRecordedHrs[i] = this.formatTime(totalRecordedHrs[i].toFixed(2));
						}
						if (totalApprovedHours[i] !== 0) {
							totalApprovedHours[i] = this.formatTime(totalApprovedHours[i].toFixed(2));
						}
					}
					//setting data for the first week
					if (totalRecordedHrs[0] !== 0) {
						if (totalRecordedHrs[0] === "01:00") { //Note 2115732
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOUR", [totalRecordedHrs[0]]);
						} else {
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOURS", [totalRecordedHrs[0]]);
						}
					} //End Note 2115732
					else {
						recordedHrsTxt = this.oBundle.getText("NO_RECORDING");
					}
					// 	recordedHrsTxt = totalRecordedHrs[0] + " h";
					if (totalAssignments[0] === 1) {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENT");
					} else if (totalAssignments[0] === 0) {
						assignments = this.oBundle.getText("NO_ASSIGNMENT");
					} else {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENTS", [totalAssignments[0]]);
					}

					if (totalApprovedHours[0] === 0) {
						approvedHrsTxt = " ";
					} else {
						approvedHrsTxt = this.oBundle.getText("TOTAL_APPROVED_HOURS", [totalApprovedHours[0]]);
					}

					if (totalTargetHrs[0] !== 0 && this.withTargetHours) {
						targetHrsTxt = this.oBundle.getText("TOTAL_TARGET_HOURS", [totalTargetHrs[0]]);
					} else {
						targetHrsTxt = "  ";
					}
					this.byId("MTS3_CURRENT_WEEK_INFO_1").setNumber(recordedHrsTxt);
					this.byId("MTS3_TARGET_TIME_1").setText(targetHrsTxt);
					this.byId("MTS3_TXT_ASSIGNMENTS_1").setText(assignments);
					this.byId("MTS3_TXT_APPROVED_HOURS_1").setText(approvedHrsTxt);

					//setting data for the second week
					if (totalRecordedHrs[1] !== 0) {
						if (totalRecordedHrs[1] === "01:00") { //Note 2115732
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOUR", [totalRecordedHrs[1]]);
						} else {
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOURS", [totalRecordedHrs[1]]);
						}
					} //End Note 2115732
					else {
						recordedHrsTxt = this.oBundle.getText("NO_RECORDING");
					}

					if (totalAssignments[1] === 1) {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENT");
					} else if (totalAssignments[1] === 0) {
						assignments = this.oBundle.getText("NO_ASSIGNMENT");
					} else {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENTS", [totalAssignments[1]]);
					}

					if (totalApprovedHours[1] === 0) {
						approvedHrsTxt = " ";
					} else {
						approvedHrsTxt = this.oBundle.getText("TOTAL_APPROVED_HOURS", [totalApprovedHours[1]]);
					}
					if (totalTargetHrs[1] !== 0 && this.withTargetHours) {
						targetHrsTxt = this.oBundle.getText("TOTAL_TARGET_HOURS", [totalTargetHrs[1]]);
					} else {
						targetHrsTxt = "  ";
					}
					this.byId("MTS3_CURRENT_WEEK_INFO_2").setNumber(recordedHrsTxt);
					this.byId("MTS3_TARGET_TIME_2").setText(targetHrsTxt);
					this.byId("MTS3_TXT_ASSIGNMENTS_2").setText(assignments);
					this.byId("MTS3_TXT_APPROVED_HOURS_2").setText(approvedHrsTxt);
				}

			},
			getActualOffset: function(firstDayOffset, currentDay) {
				var constantOffset = 7;
				if (firstDayOffset > currentDay) {
					return currentDay + constantOffset - firstDayOffset;
				} else {
					return currentDay - firstDayOffset;
				}
			},

			pushUniqueElements: function(entries, entryData) {
				if (!entries) {
					return null;
				}
				for (var j = 0; j < entries.length; j++) {
					var str = entries[j].mainName + ":" + entries[j].mainCode + ",";
					for (var i = 0; typeof(entries[j].childNames) !== "undefined" && i < entries[j].childNames.length; i++) {
						str += entries[j].childNames[i] + ":" + entries[j].childCodes[i] + ",";
					}

					if (entryData.length) {
						for (i = 0; i < entryData.length; i++) {
							if (str === entryData[i]) {
								break;
							}
						}
						if (i === entryData.length) {
							entryData.push(str);
						}
					} else {
						entryData.push(str);
					}
				}
				return entryData;
			},
			formatDateMMMDD: function(oDate) {
				var month = oDate.getMonth();
				var day = oDate.getDate();

				var dateString = this.oBundle.getText("MONTH_" + month) + " " + day;

				return dateString;
			},

			formatTime: function(oTime) {
	          var timeString;                                                         //NOTE 2356935
				/**
				 * @ControllerHook Modify the format of the time
				 * This hook method can be used to chnage the format of the time from HH:MM to decimals
				 * It is called while it is changing the format.
				 * @callback hcm.mytimesheet.view.S3~extHookChangeFormatTime
				 * @param {object}  Object
				 * @return {object} Object
				 */	          
			  if(this.extHookChangeFormatTime)	                                      //NOTE 2356935
			  {                                                                       //NOTE 2356935
			  	timeString = extHookChangeFormatTime(oTime);                          //NOTE 2356935
			  } else                                                                  //NOTE 2356935
			  {                                                                       //NOTE 2356935
				var mins = oTime * 60;
				var h = Math.floor(mins / 60).toString();
				if (h.length === 1) {
					h = "0" + h;
				}
				var m = (mins % 60).toFixed(0);
				if (m.length === 1) {
					m = "0" + m;
				}
				timeString = h + ":" + m;                                             //NOTE 2356935
			  }                                                                       //NOTE 2356935
			  return timeString;                                                      //NOTE 2356935
			},

			parseDateYYYYMMdd: function(dateString) {
				var dateParse = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "YYYYMMdd"
				});
				return dateParse.parse(dateString);
			},
			formatDateYYYYMMdd: function(oDate) {
				if (typeof oDate === "string") {
					oDate = new Date(oDate);
				}

				var dateParse = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "YYYYMMdd"
				});
				return dateParse.format(oDate);
			},

			getPostData: function(day, entry) {
				var post = {};

				post.day = day;
				post.entry = entry;

				return post;

			},

			openConfirmationPopup: function(oSettings, isSubmit) {
				var self = this;
				var oElements = [];
				for (var i = 0; i < oSettings.additionalInformation.length; i++) {
					oElements.push(new sap.m.Label({
						text: oSettings.additionalInformation[i].label,
						design: "Bold"
					}));
					oElements.push(new sap.m.Text({
						text: oSettings.additionalInformation[i].text
					}));
				}
				var oForm = new sap.ui.layout.form.SimpleForm({
					minWidth: 1024,
					editable: false,
					maxContainerCols: 2,
					layout: "ResponsiveGridLayout",
					labelSpanL: 7,
					labelSpanM: 7,
					labelSpanS: 7,
					emptySpanL: 1,
					emptySpanM: 1,
					emptySpanS: 1,
					columnsL: 1,
					columnsM: 1,
					columnsS: 1,
					content: oElements
				});
				var oConfirmDialog = new sap.m.Dialog({
					title: oSettings.title,
					content: [oForm],
					beginButton: new sap.m.Button({
						text: oSettings.confirmButtonLabel,
						press: function() {
							self.submitTime(isSubmit);
							oConfirmDialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: this.oBundle.getText("CANCEL"),
						press: function() {
							oConfirmDialog.close();
						}
					})
				});
				oConfirmDialog.addStyleClass("sapUiContentPadding sapUiMediumMarginTopBottom");
				oConfirmDialog.open();
			},

			//Calculation for Release Entries
			releaseEntriesSummary: function(bUpdatePageData) {

				var oTableRef = this.byId("ENTRY_LIST_CONTENTS");
				var selectedItems = oTableRef.getSelectedItems();

				// Deleted Hours Summary
				var deletedHours = 0,
					deletedMinutes = 0,
					deletedTime = 0,
					numberOfItemsSelectedForSubmittion = 0;
				var dayIndex, entryIndex, entry, selectedDate, curDate = new Date();
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var oPageData = oModel.getData();
				//						var releaseFutureDates = oModel.getProperty("/releaseFuture");
				for (var i = 0; i < selectedItems.length; i++) {
					if (!selectedItems[i].data().header) {
						dayIndex = selectedItems[i].data().day;
						entryIndex = selectedItems[i].data().entry;
						entry = oPageData.days[dayIndex].entries[entryIndex];
						selectedDate = selectedItems[i].data().dateSelected;

						// when new entry line has been selected
						if (!entry) {
							continue;
						}

						if (entry.statusId === "MSAVE" && !(!this.releaseFuture && this.checkDate(selectedDate, curDate))) { // || entry.statusId === "REJECTED") {
							if (bUpdatePageData) {
								//updating the pagedata with Boolean Release Allowed as true
								this.updatePageData(false, dayIndex, entry, true);
							}
							deletedHours += entry.hours;
							deletedMinutes += entry.minutes;
							deletedTime += entry.time;
							deletedTime = parseFloat(deletedTime.toFixed(2));
							numberOfItemsSelectedForSubmittion++; //count for submitted entries
						}

						if (deletedMinutes > 59) {
							deletedMinutes -= 60;
							deletedHours++;
						}
					}
				}
				var releaseData = [];
				if (this.clockEntry) {
					deletedTime = deletedHours;
					deletedTime += (deletedMinutes / 60);
					deletedTime = parseFloat(deletedTime.toFixed(2));
				}

				releaseData.push(numberOfItemsSelectedForSubmittion);
				releaseData.push(deletedHours);
				releaseData.push(deletedMinutes);
				releaseData.push(deletedTime); // display total decimal time

				return releaseData;
			},

			onSubmit: function() {

				var releaseData = [];
				var oSettings = null,
					totalDurationText;
				releaseData = this.releaseEntriesSummary(false);
				totalDurationText = this.formatTime(releaseData[3].toString());
				/*sap.ca.ui.model.format.NumberFormat.getInstance({
					style: "standard"
				}).format(releaseData[3].toString());*/

				if (!this.clockEntry) {
					var totalDuration = this.oBundle.getText("TOTAL_DURATION");
					oSettings = {
						question: this.oBundle.getText("SUBMISSION_CONFIRMATION_SUMMARY"),
						//additionalInformation : [],
						additionalInformation: [{
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
							text: releaseData[0].toString()
						}, {
							label: totalDuration,
							text: totalDurationText
						}],
						showNote: false,
						title: this.oConfiguration.getText("SUBMISSION_CONFIRMATION"),
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				} else {
					oSettings = {
						question: this.oBundle.getText("SUBMISSION_CONFIRMATION_SUMMARY"),
						additionalInformation: [{
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
							text: this.formatTime(releaseData[0].toString())
						}, {
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_HOURS"),
							text: this.oBundle.getText("FULL_CONCATENATE_HOURSMIN", [releaseData[1], releaseData[2]])
						}],
						showNote: false,
						title: this.oConfiguration.getText("SUBMISSION_CONFIRMATION"),
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				}
				// var _this = this;

				// open confirmation popup
				this.openConfirmationPopup(oSettings, true);
				/*sap.ca.ui.dialog.confirmation.open(oSettings, function(response) {
					if (response.isConfirmed === true) {
						_this.submitTime(true);
					}
				});*/

			},

			submitTime: function(submitFlag) {
				var self = this;
				if (submitFlag) {
					this.releaseEntriesSummary(true);
				}

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var newDays = oModel.getData().days;
				this.errors = null;

				var updatedDays = [];
				var deletedDays = [];

				for (var i = 0; i < newDays.length; i++) {

					for (var j = 0; j < newDays[i].entries.length; j++) {

						if (newDays[i].entries[j].deleted && (newDays[i].entries[j].counter !== "" || newDays[i].entries[j].counter === null)) {
							deletedDays.push(this.getPostData(this.getDateTimeStr(newDays[i].date), newDays[i].entries[j]));
						} else {
							if (this.oldDays[i]) {
								for (var k = 0; k < this.oldDays[i].entries.length; k++) {
									if (newDays[i].entries[j].counter === this.oldDays[i].entries[k].counter && newDays[i].entries[j].counter !== "") {

										var item1 = newDays[i].entries[j];
										var item2 = this.oldDays[i].entries[k];

										if (item1.time !== item2.time || item1.notes !== item2.notes || item1.mainItem !== item2.mainItem || item1.subItems !== item2.subItems ||
											item1.hours !== item2.hours || item1.minutes !== item2.minutes || item1.startTime !== item2.startTime || item1.endTime !== item2
											.endTime) {

											if (!newDays[i].entries[j].deleted) {

												updatedDays.push(this.getPostData(this.getDateTimeStr(newDays[i].date), newDays[i].entries[j]));

											}
										}
									}
								}
							}
						}
						if (newDays[i].entries[j].statusId === "MSAVE" && newDays[i].entries[j].bToBeReleased) {

							updatedDays.push(this.getPostData(this.getDateTimeStr(newDays[i].date),

								newDays[i].entries[j]));

						}

					}
				}
				// lock UI until submit is done to prevent double click
				// sap.ui.getCore().lock();

				var batchUpdate = [];
				var batchDelete = [];

				if (updatedDays.length !== 0) {

					for (i = 0; i < updatedDays.length; i++) {
						updatedDays[i].entry = this.replaceSpecialChar(updatedDays[i].entry);

						batchUpdate.push(self.setPostObject(
							updatedDays[i].entry.counter,
							"U",
							updatedDays[i].day,
							updatedDays[i].entry.time,
							updatedDays[i].entry.mainName,
							updatedDays[i].entry.mainCode,
							updatedDays[i].entry.notes,
							updatedDays[i].entry.startTime,
							updatedDays[i].entry.endTime,
							updatedDays[i].entry.subItems,
							updatedDays[i].entry.childCodes,
							updatedDays[i].entry.childNames));
					}
				}

				if (deletedDays.length !== 0) {

					for (i = 0; i < deletedDays.length; i++) {
						deletedDays[i].entry = this.replaceSpecialChar(deletedDays[i].entry); //Note 1994402: Replacing Special Character

						batchDelete.push(self.setPostObject(
							deletedDays[i].entry.counter,
							"D",
							deletedDays[i].day,
							deletedDays[i].entry.time,
							deletedDays[i].entry.mainName,
							deletedDays[i].entry.mainCode,
							deletedDays[i].entry.notes,
							deletedDays[i].entry.startTime,
							deletedDays[i].entry.endTime,
							deletedDays[i].entry.subItems,
							deletedDays[i].entry.childCodes,
							deletedDays[i].entry.childNames));

					}
				}

				if (batchUpdate.length === 0 && batchDelete.length === 0) {
					// if there is nothing to submit, just act like a cancel
					sap.m.MessageToast.show(self.oConfiguration.getText("SUBMIT_SUCCESS"));

				} else {
					//     var combinedBatch = [];
					// 	combinedBatch = batchUpdate.concat(batchDelete);
					self.oService.submitTimeEntry(self, [], batchUpdate, batchDelete, function() {
						//NOTE 2274962
						if (batchDelete.length !== 0) {
							sap.m.MessageToast.show(self.oConfiguration.getText("DELETE_SUCCESS"));
						} else {
							sap.m.MessageToast.show(self.oConfiguration.getText("SUBMIT_SUCCESS"));
						}
						if (!self.errors) {
							self.updateData();
						}
					}, function(hasError, errorDates) {
						self.updateData();
					});
				}

			},

			setPostObject: function(Counter, TimeEntryOperation, WORKDATE, CATSAMOUNT, Name, Code, notes, startTime,
				endTime, subItems, childCodes, childNames) {
				var timeEntryUpdated = {
					Counter: Counter,
					TimeEntryOperation: TimeEntryOperation,
					TimeEntryDataFields: {
						WORKDATE: WORKDATE,
						CATSAMOUNT: "" + CATSAMOUNT,
						BEGUZ: startTime,
						ENDUZ: endTime
					}
				};

				// always setting to X for second screen
				if (TimeEntryOperation !== "D") {
					timeEntryUpdated.TimeEntryRelease = "X";
				}
				if (this.checkFieldName(Name) === true) { //Note 1959135: Added additional check
					timeEntryUpdated.TimeEntryDataFields[Name] = Code;
				}

				if (subItems && subItems !== "") {
					for (var i = 0; i < childNames.length; i++) {
						if (this.checkFieldName(childNames[i]) === true) { //Note 1959135: Added additional check
							timeEntryUpdated.TimeEntryDataFields[childNames[i]] = childCodes[i];
						}
					}
				}
				if (notes && notes !== "") {
					timeEntryUpdated.TimeEntryDataFields.LONGTEXT_DATA = notes;
					timeEntryUpdated.TimeEntryDataFields.LONGTEXT = "X";
				}

				/**
				 * @ControllerHook Modify the post object
				 * This hook method can be used to modify the object before the post call
				 * It is called when the decision options for the detail item are fetched successfully
				 * @callback hcm.mytimesheet.view.S3~extHookChangeObjectBeforePost
				 * @param {object} Post Object
				 * @return {object} Final Post Object
				 */

				if (this.extHookChangeObjectBeforePost) {
					timeEntryUpdated = this.extHookChangeObjectBeforePost(timeEntryUpdated);
				}

				return timeEntryUpdated;
			},

			checkDate: function(date, curDate) {
				if (date.getFullYear() >= curDate.getFullYear() && date.getMonth() >= curDate.getMonth() && date.getDate() > curDate.getDate()) {
					return true;
				}
				return false;
			},

			checkFieldName: function(fieldName) {
				var checkString = fieldName;
				if (checkString.match("DISPTEXT")) {
					return false;
				}
				if (checkString.match("CPR_OBJTEXT")) {
					return false;
				}
				if (checkString.match("CPR_TEXT")) {
					return false;
				}
				return true;
			},

			replaceAllOccurances: function(iString) {
				if (typeof iString === "undefined") {
					return null;
				}
				var vSearch = "/";
				var vReplace = "-";
				while (iString.indexOf(vSearch) > -1) {
					iString = iString.replace(vSearch, vReplace);
				}
				return iString;
			},
			replaceSpecialChar: function(entry) {
				if (typeof entry.mainName !== "undefined") {
					entry.mainName = this.replaceAllOccurances(entry.mainName);
				}
				if (typeof entry.subItems !== "undefined") {
					entry.subItems = this.replaceAllOccurances(entry.subItems);
				}
				if (typeof entry.childNames !== "undefined") {
					for (var i = 0; i < entry.childNames.length; i++) {
						entry.childNames[i] = this.replaceAllOccurances(entry.childNames[i]);
					}
				}

				return entry;
			},

			onCopy: function() {
				var oModel, oPageData, oViewData;
				var dayIndex;
				var entryIndex;
				var oTableRef = this.byId("ENTRY_LIST_CONTENTS");
				var selectedItem = [];
				selectedItem = oTableRef.getSelectedItems();

				dayIndex = selectedItem[0].data().day;
				entryIndex = selectedItem[0].data().entry;

				oModel = this.oApplication.getModel("TSM_WEEKLY");

				oPageData = oModel.getData();
				oPageData.days[dayIndex].entries[entryIndex].counter = "";

				oViewData = {
					entry: oPageData.days[dayIndex].entries[entryIndex],
					pageData: oPageData,
					dayIndex: dayIndex,
					entryIndex: entryIndex
				};

				this.oApplication.getModel("S31modelexch").setProperty("/editeddata", oViewData);
				this.oApplication.getModel("S31modelexch").setProperty("/copySelected", true);

				this.oApplication.getModel("S31modelexch").setProperty("/selectedDates", []);

				this.oRouter.navTo("S31", {
					context: oModel.getProperty("/selectedDate").toDateString() + "offset" + this.byId("WEEKLY_CALENDAR").getFirstDayOffset()
				}, true);

			},

			onItemSelectGotoEdit: function(oEvent) {
				var item = oEvent.getSource();
				var itemData = item.data();
				var oModel, oPageData, oViewData;
				var dayIndex = itemData.day;
				var entryIndex = itemData.entry;

				oModel = this.oApplication.getModel("TSM_WEEKLY");

				oPageData = oModel.getData();

				oViewData = {
					entry: oPageData.days[dayIndex].entries[entryIndex],
					pageData: oPageData,
					dayIndex: dayIndex,
					entryIndex: entryIndex
				};

				this.oApplication.getModel("S31modelexch").setProperty("/editeddata", oViewData);
				this.oApplication.getModel("S31modelexch").setProperty("/editentryview", true);

				this.oApplication.getModel("S31modelexch").setProperty("/selectedDates", [itemData.dateSelected]);

				this.oRouter.navTo("S31", {
					context: oModel.getProperty("/selectedDate").toDateString() + "offset" + this.byId("WEEKLY_CALENDAR").getFirstDayOffset()
				}, true);

			},

			onItemSelect: function(oEvent) {
				this.selectDateOnAllCheckBoxSelection(oEvent.getSource());

				if (oEvent.getSource().getSelectedItems().length === 0) {
					this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
					this.setBtnEnabled("deleteBtn", false);

					this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
					this.setBtnEnabled("SUBMIT_BTN", false);

					this.setBtnEnabled("copyBtn", false);

				} else {
					var selList = oEvent.getSource().getSelectedItems();
					var isHeader;
					for (var i = 0; i < selList.length; i++) {
						isHeader = selList[i].data().header;
						if (!isHeader) {
							this.findCount(oEvent);
						}

					}

				}

			},

			findCount: function(oEvent) {
				var selList = oEvent.getSource().getSelectedItems();
				var isHeader, selectedDate, curDate = new Date(),
					dayIndex, entryIndex, entry;
				var deleteCount = 0,
					submitCount = 0;
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var oPageData = oModel.getData();
				for (var i = 0; i < selList.length; i++) {
					isHeader = selList[i].data().header;
					selectedDate = selList[i].data().dateSelected;

					if (!isHeader) {
						deleteCount++;
						dayIndex = selList[i].data().day;
						entryIndex = selList[i].data().entry;
						entry = oPageData.days[dayIndex].entries[entryIndex];
						if (entry.statusId === "MSAVE" && !(!this.releaseFuture && this.checkDate(selectedDate, curDate))) {
							submitCount++;
						}
					}
				}

				if (submitCount === 0) {
					this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
					this.setBtnEnabled("SUBMIT_BTN", false);
				} else {
					this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT") + "(" + submitCount + ")");
					this.setBtnEnabled("SUBMIT_BTN", true);
				}

				if (deleteCount === 0) {
					this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
					this.setBtnEnabled("deleteBtn", false);
				} else {
					this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE") + "(" + deleteCount + ")");
					this.setBtnEnabled("deleteBtn", true);
				}

				//copy function
				if (deleteCount === 1 && oEvent.getSource().getSelectedItems().length === 1) {
					this.setBtnEnabled("copyBtn", true);
				} else {
					this.setBtnEnabled("copyBtn", false);
				}

			},

			onSelect: function(oEvent) {
				var selectedDate = new Date(oEvent.getParameter("date"));
				var didSelect = oEvent.getParameter("didSelect");
				this.selectDate(selectedDate, didSelect);
				// this.scrollTo(oEvent);
			},
			scrollTo: function(index) {
				var list = this.byId("ENTRY_LIST_CONTENTS");
				var item = list.getItems()[index];
				var scroll_to_y = item.$().get(0).offsetTop;
				this.byId("scroller").scrollTo(0, scroll_to_y, 500);
			},
			compareDays: function(a, b) {
				if (parseInt(a.dateStr, 10) > parseInt(b.dateStr, 10)) {
					return 1;
				} else {
					return -1;
				}
			},
			selectDate: function(selectedDate, selectedOrUnselected) {
				var dateStr = selectedDate.toDateString();
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var itemSelected = 0;
				oModel.setProperty("/selected", dateStr);
				//						var valuesPresent = false;
				if (this.entryListContents) {
					var items = this.entryListContents.getItems();
					var itemData;
					for (var i = 0; i < items.length; i++) {
						itemData = items[i].data();
						if (itemData.dateSelected.toDateString() === dateStr && !itemData.header) {
							items[i].setSelected(selectedOrUnselected);
							itemSelected = i;
						}
					}

					var selList = this.byId("ENTRY_LIST_CONTENTS").getSelectedItems();

					if (selList.length === 0) {
						this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
						this.setBtnEnabled("deleteBtn", false);
					} else {
						this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE") + "(" + selList.length + ")");
						this.setBtnEnabled("deleteBtn", true);
					}

					//Submit Button update

					var releaseSummaryInfo = this.releaseEntriesSummary(false);
					if (releaseSummaryInfo[0] === 0) {
						this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
						this.setBtnEnabled("SUBMIT_BTN", false);
					} else {
						this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT") + "(" + releaseSummaryInfo[0] + ")");
						this.setBtnEnabled("SUBMIT_BTN", true);
					}
					//copy button validation
					if (selList.length === 1) {
						this.setBtnEnabled("copyBtn", true);
					} else {
						this.setBtnEnabled("copyBtn", false);
					}
					if (selectedOrUnselected && itemSelected !== 0) {
						this.scrollTo(itemSelected);
					}

				}
			},

			// update calendar Data
			updateData: function() {
				// clean calendar
				var noOfWeeks;                                         //NOTE 2293728
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				oModel.setProperty("/red", "");
				oModel.setProperty("/green", "");
				oModel.setProperty("/grey", "");
				oModel.setProperty("/yellow", "");
				oModel.setProperty("/rejected", "");

				var weeklyCalendar = this.byId("WEEKLY_CALENDAR");
				weeklyCalendar.removeTypesOfAllDates();
				weeklyCalendar.unselectAllDates();
				oModel.setProperty("/activities", null);
				oModel.setProperty("/workingDayList", null);

				var self = this;
//BEGIN OF NOTE 2293728 				
				var InitalInfoModel = this.oConfiguration.getInitialInfoModel();
				if (sap.ui.Device.system.phone) {
					noOfWeeks = 1;
				} else {
				    noOfWeeks = 2;
				}
				var curDate = new Date(this.byId("WEEKLY_CALENDAR").getCurrentDate());
				// var firstday = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - this.getActualOffset(new Date(InitalInfoModel.StartDate.substring(0,4)+"-"+InitalInfoModel.StartDate.substring(4,6)+"-"+InitalInfoModel.StartDate.substring(6,8)).getDay(), curDate.getDay()));  //NOTE 2367454
				var firstday = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - this.getActualOffset(new Date(InitalInfoModel.StartDate.substring(0,4)+"/"+InitalInfoModel.StartDate.substring(4,6)+"/"+InitalInfoModel.StartDate.substring(6,8)).getDay(), curDate.getDay()));     //NOTE 2370738
				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + (7 * noOfWeeks - 1) );
				// update calendar
				this.oService.getWorkDays(this, this.oApplication.pernr, this.getDateStr(firstday), this.getDateStr(lastday), function(data) {
					self.getTimeSheetCalendar(data);
					if (oModel.getData().activities) {
						self.setWeeklyData(oModel.getData().activities);
					}
				});
				// this.oService.getWorkDays(this, this.oApplication.pernr, oModel.getData().weekStart, oModel.getData().weekEnd, function(data) {
				// 	self.getTimeSheetCalendar(data);
				// 	if (oModel.getData().activities) {
				// 		self.setWeeklyData(oModel.getData().activities);
				// 	}
				// });
				// update list
				this.oService.getTimeDataList(this, this.oApplication.pernr, this.getDateStr(firstday) , this.getDateStr(lastday), function(data) {
					oModel.setProperty("/activities", data);
					if (oModel.getData().workingDayList) {
						self.setWeeklyData(data);
					}
				});				
				// this.oService.getTimeDataList(this, this.oApplication.pernr, oModel.getData().weekStart, oModel.getData().weekEnd, function(data) {
				// 	oModel.setProperty("/activities", data);
				// 	if (oModel.getData().workingDayList) {
				// 		self.setWeeklyData(data);
				// 	}
				// });
//END OF NOTE 2293728				
				//Reseting Delete button on Submit and delete
				this.setBtnText("deleteBtn", self.oApplicationFacade.getResourceBundle().getText("DELETE"));
				this.setBtnEnabled("deleteBtn", false);
				this.setBtnText("SUBMIT_BTN", self.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
				this.setBtnEnabled("SUBMIT_BTN", false);
				this.setBtnEnabled("copyBtn", false);
			},
			getTimeSheetCalendar: function(data) {

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var now = new Date(),
					grey = [],
					yaction = [],
					done = [],
					maction = [],
					rejected = [];
				var currentSelectedDay = oModel.getData().selected,
					firstWorkingDay = null,
					futureWorkDays = [],
					missingdays = [];
				var hasSelectedDay = false;

				var workingDayList = [];

				// get first day of the week
				var firstDayOff = -1;
				if (data.length > 0) {
					var firstDay = data[0].FirstDayOfWeek;
					if (firstDay === null) {
						firstDayOff = -1;
					} else if (firstDay === "MONDAY") {
						firstDayOff = 1;
					} else if (firstDay === "TUESDAY") {
						firstDayOff = 2;
					} else if (firstDay === "WEDNESDAY") {
						firstDayOff = 3;
					} else if (firstDay === "THURSDAY") {
						firstDayOff = 4;
					} else if (firstDay === "FRIDAY") {
						firstDayOff = 5;
					} else if (firstDay === "SATURDAY") {
						firstDayOff = 6;
					} else if (firstDay === "SUNDAY") {
						firstDayOff = 0;
					}
				}

				for (var i = 0; i < data.length; i++) {
					var dateToWork = data[i].Date;
					var workingDay = data[i].WorkingDay === "TRUE";
					var date = new Date(parseInt(dateToWork.substring(0, 4), 10),
						parseInt(dateToWork.substring(4, 6), 10) - 1, parseInt(dateToWork.substring(6, 8), 10));
					workingDayList.push({
						date: dateToWork,
						workingDay: workingDay,
						targetHours: parseFloat(data[i].TargetHours.trim()),
						startTime: data[i].StartTime,
						endTime: data[i].EndTime
					});

					var status = data[i].Status;

					if (!workingDay) {
						// add to holidays to grey out
						grey.push(date);
					} else {

						if (!firstWorkingDay) {
							firstWorkingDay = dateToWork;
						}
						if (!hasSelectedDay && currentSelectedDay === dateToWork) {
							hasSelectedDay = true;
						}
						if (status === "YACTION") {
							// add missing days as yaction
							missingdays.push(data[i].Date);
							// fill yaction only if earlier then today
							if (now.getTime() > date.getTime()) {
								yaction.push(date);
							} else {
								futureWorkDays.push(date);
							}
						} else if (status === "MACTION") {
							maction.push(date);
						} else if (status === "REJECTED") {
							rejected.push(date);
						} else if (status === "DONE") {
							done.push(date);
						}
					}

				}

				oModel.setProperty("/workingDayList", workingDayList);
				var weeklyCal = this.byId("WEEKLY_CALENDAR");
				// set in calendar only if get meaningful value from service
				if (firstDayOff > 0) {
					weeklyCal.setFirstDayOffset(firstDayOff);
				}
				weeklyCal.toggleDatesType(futureWorkDays, sap.me.CalendarEventType.Type10, true);    //NOTE 2263704
				weeklyCal.toggleDatesType(maction, sap.me.CalendarEventType.Type04, true);
				weeklyCal.toggleDatesType(done, sap.me.CalendarEventType.Type01, true);
				weeklyCal.toggleDatesType(grey, sap.me.CalendarEventType.Type00, true);
				weeklyCal.toggleDatesType(yaction, sap.me.CalendarEventType.Type07, true);
				weeklyCal.toggleDatesType(rejected, sap.me.CalendarEventType.Type06, true);

				// set array of legend to global model
				var aLegend = {
					'yellow': maction,
					'green': done,
					'grey': grey,
					'red': yaction,
					'rejected': rejected,
					'FutureWorkingDays': futureWorkDays
				};

				var oLegendControl = this.byId("LEGEND");
				if (done.length > 0) {
					oLegendControl.setLegendForType01(this.oBundle.getText("FILLED_DAY"));
				} else if (oLegendControl.getLegendForType01()) { //Note 2115732
					oLegendControl.setLegendForType01(null);
				}
				if (maction.length > 0) {
					oLegendControl.setLegendForType04(this.oBundle.getText("FILLED_MANAGER"));
				} else if (oLegendControl.getLegendForType04()) {
					oLegendControl.setLegendForType04(null);
				}
				if (yaction.length > 0) {
					oLegendControl.setLegendForType07(this.oBundle.getText("MISSING_DAY"));
				} else if (oLegendControl.getLegendForType07()) {
					oLegendControl.setLegendForType07(null);
				}
				if (rejected.length > 0) {
					oLegendControl.setLegendForType06(this.oBundle.getText("REJECTED"));
				} else if (oLegendControl.getLegendForType06()) {
					oLegendControl.setLegendForType06(null);
				}
				if (futureWorkDays.length > 0) {
					oLegendControl.setLegendForNormal(this.oBundle.getText("WORKING_DAY"));
				} else if (oLegendControl.getLegendForNormal()) {
					oLegendControl.setLegendForNormal(null);
				}
				if (grey.length > 0) {
					oLegendControl.setLegendForType00(this.oBundle.getText("NON_WORKING_DAY"));
				} else if (oLegendControl.getLegendForType00()) {
					oLegendControl.setLegendForType00(null); //End Note 2115732
				}
				oLegendControl.setLegendForToday(this.oBundle.getText("CURRENT_DAY"));
				oLegendControl.setLegendForSelected(this.oBundle.getText("SELECTED_DAY"));
				oLegendControl.setLegendForSelected00(this.oBundle.getText("SELECTED_NW_DAY"));

				oModel = this.oApplication.getModel("TSM_WEEKLY");
				oModel.setProperty("/legendforS31", aLegend);

			},

			onAddNewEntry: function() {

				var selectedDatesFromCalendar = this.byId("WEEKLY_CALENDAR").getSelectedDates();
				var dateStr;
				for (var i = 0; i < selectedDatesFromCalendar.length; i++) {
					selectedDatesFromCalendar[i] = new Date(selectedDatesFromCalendar[i]);
				}
				/*if(selectedDatesFromCalendar.length !== 0){
				    dateStr = selectedDatesFromCalendar[0].toDateString();
				}
				else{
				    dateStr = this.oApplication.getModel("TSM_WEEKLY").getProperty("/selectedDate").toDateString();
				}*/
				dateStr = this.byId("WEEKLY_CALENDAR").getCurrentDate();
				this.oApplication.getModel("S31modelexch").setProperty("/selectedDates", selectedDatesFromCalendar);
				this.oApplication.getModel("S31modelexch").setProperty("/editentryview", false);

				this.oRouter.navTo("S31", {
					context: dateStr + "offset" + this.byId("WEEKLY_CALENDAR").getFirstDayOffset()
				}, true);

			},

			onCalendarWeekChange: function(oEv) {

				var curDate = new Date(oEv.getParameter("currentDate"));
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var selectedDates = oEv.getSource().getSelectedDates();
				var noOfWeeks = 13; //by default 2 weeks are shown
				if (sap.ui.Device.system.phone) {
					noOfWeeks = 6;
				}
				var firstday = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR")
					.getFirstDayOffset(), curDate.getDay()));

				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + noOfWeeks);

				oModel.setProperty("/showSubmit", false);
				oModel.setProperty("/selected", this.getDateStr(curDate));
				oModel.setProperty("/selectedDate", curDate);
				oModel.setProperty("/year", curDate.getFullYear());
				oModel.setProperty("/weekStart", this.getDateStr(firstday));
				// oModel.setProperty("/start", this.getDateStr(curDate));
				oModel.setProperty("/weekEnd", this.getDateStr(lastday));

				this.setBtnEnabled("SUBMIT_BTN", false);
				this.lastSelected = oModel.getData().selected;

				this.updateData();
				this.calendarModel = oModel;
				var d, arrayOfDates = [];
				for (var i = 0; i < selectedDates.length; i++) {
					d = new Date(selectedDates[i]);
					if (d.getTime() >= firstday && d.getTime() <= lastday.getTime()) {
						arrayOfDates.push(d);
					}
				}
				if (arrayOfDates.length > 0) {
					oEv.getSource().toggleDatesSelection(arrayOfDates, true);
				}
				//Reseting and disabling the Delete Button text 
				this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
				this.setBtnEnabled("deleteBtn", false);

				this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
				this.setBtnEnabled("SUBMIT_BTN", false);

				this.setBtnEnabled("copyBtn", false);
			},

			getDateStr: function(date) {
				return "" + date.getFullYear() + ("" + (date.getMonth() + 101)).substring(1) + ("" + (date.getDate() + 100)).substring(1);
			},

			getDateTimeStr: function(date) {
				return "" + date.getFullYear() + "-" + ("" + (date.getMonth() + 101)).substring(1) + "-" + ("" + (date.getDate() + 100)).substring(1) +
					"T00:00:00";
			},

			setWeeklyData: function(data) {
				//get the main model for this view
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var oPageData = {
					days: []
				};
				var lastRecordNumber = null,
					oDayData = null,
					date;
				var recordedHrs, approvedHrs, i, j, bHasEntries, insertPosition, lastDate = null;
				var oEntryData = {};
				var workingDayList = oModel.getData().workingDayList;
				for (i = 0; i < data.length; i++) {

					if (data[i].FieldName === "WORKDATE") {
						if (lastDate === null || data[i].FieldValue !== lastDate) {
							lastDate = data[i].FieldValue;
							date = new Date(parseInt(data[i].FieldValue.substring(0, 4), 10), parseInt(data[i].FieldValue
								.substring(4, 6), 10) - 1, parseInt(data[i].FieldValue.substring(6, 8), 10));
							oDayData = {
								date: date,
								dateStr: data[i].FieldValue,
								dateFormatted: this.convertDateFormat(date),
								targetHours: this.getTargetHours(data[i].FieldValue, workingDayList),
								entries: [],
								workingDay: this.getWorkingDay(data[i].FieldValue, workingDayList)
							};
							oPageData.days.push(oDayData);
							lastRecordNumber = null;
						}
					}
					if (lastRecordNumber === null || data[i].RecordNumber !== lastRecordNumber) {
						lastRecordNumber = data[i].RecordNumber;
						oEntryData = new hcm.mytimesheet.model.TimeEntry(0, "", data[i].Suggested === "TRUE", true);

						oDayData.entries.push(oEntryData);
					}
                    if (data[i].FieldName === "MEINH") {                               //NOTE 2370738
                      oEntryData.timeUnit = data[i].FieldValue;                        //NOTE 2370738
                    }                                                                  //NOTE 2370738
					
					oEntryData.setData(data[i]);
				}

				oPageData.days.sort(this.compareDays);                 

				for (i = 0; i < workingDayList.length; i++) {
					if (workingDayList[i].workingDay) {
						bHasEntries = false;
						insertPosition = oPageData.days.length;
						for (j = 0; j < oPageData.days.length; j++) {
							if (workingDayList[i].date === oPageData.days[j].dateStr) {
								bHasEntries = true;
								break;
							}
							if (workingDayList[i].date < oPageData.days[j].dateStr) {
								insertPosition = j;
								break;
							}
						}
						if (!bHasEntries) {
							// this is a working day which is not in the list, so we
							// need to add a blank entry
							date = new Date(parseInt(workingDayList[i].date.substring(0, 4), 10), parseInt(
								workingDayList[i].date.substring(4, 6), 10) - 1, parseInt(workingDayList[i].date.substring(6, 8),
								10));
							oDayData = {
								date: date,
								dateStr: workingDayList[i].date,
								dateFormatted: this.convertDateFormat(date),
								targetHours: this.getTargetHours(workingDayList[i].date, workingDayList),
								workingDay: workingDayList[i],
								entries: []
							};
							oPageData.days.splice(insertPosition, 0, oDayData);
						}

					}
				}
				for (i = 0; i < oPageData.days.length; i++) {
					//find the recorded hours
					recordedHrs = 0;
					approvedHrs = 0;
					for (j = 0; j < oPageData.days[i].entries.length; j++) {
						recordedHrs += oPageData.days[i].entries[j].time;
						if (oPageData.days[i].entries[j].statusId === "DONE") {
							approvedHrs += oPageData.days[i].entries[j].time;
						}
					}
					oPageData.days[i].recordedHours = recordedHrs;
					oPageData.days[i].approvedHours = approvedHrs;
				}
				this.oldDays = jQuery.extend(true, {}, oPageData.days);
				oModel.setProperty("/days", oPageData.days);

				this.loadListWithoPageData(oPageData);

			},
			TimeEntry: function(time, childName, bExisting) {
				var x = {};
				x.time = time;
				x.hours = Math.floor(time);
				x.minutes = Math.round((time - Math.floor(time)) * 60);
				x.newEntry = !bExisting;
				x.mainItem = null;
				x.subItems = childName;
				x.notes = null;
				x.startTime = "";
				x.endTime = "";
				x.counter = "";
				x.hasNotes = false;
				x.showTime = bExisting;
				x.showError = false;
				x.error = "";
				x.status = "";
				//statusId for Status color in WeekEntry View
				x.statusId = "";
				return x;
			},
			getWorkingDay: function(date, workingDayList) {
				if (workingDayList) {
					for (var i = 0; i < workingDayList.length; i++) {
						if (workingDayList[i].date === date) {
							return workingDayList[i];
						}
					}
				}
				return null;
			},

			getTargetHours: function(date, workingDayList) {
				var workingDay = this.getWorkingDay(date, workingDayList);
				if (workingDay) {
					return workingDay.targetHours;
				}
				return 0;
			},
			convertDateFormat: function(date) {
				return sap.ui.core.format.DateFormat.getDateInstance({
					style: "medium"
				}).format(date);
			},

			YYYYMMDDtoDate: function(date_str) {
				var y = parseInt(date_str.substr(0, 4), 10);
				var m = parseInt(date_str.substr(4, 2), 10) - 1;
				var d = parseInt(date_str.substr(6, 2), 10);

				return new Date(y, m, d, 0, 0, 0, 0);
			},

			loadListWithoModel: function() {
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				this.loadListWithoPageData(oModel.getData());
			},

			loadListWithoPageData: function(oPageData) {
				if (oPageData.days === null) {
					return;
				}

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var selectedDate = this.convertDateFormat(this.YYYYMMDDtoDate(oModel.getData().selected));
				for (var i = 0; i < oPageData.days.length; i++) {
					var oDay = oPageData.days[i];
					oDay.selected = (selectedDate === oDay.dateFormatted);
				}
				this.loadList(oPageData.days);
			},
			initializeTable: function() {
				this.entryListContents = this.byId("ENTRY_LIST_CONTENTS");
				var headerCol = new sap.m.Column({
					hAlign: "Left",
					/*demandPopin: true,
					minScreenWidth: "Tablet",
					popinDisplay: "Inline",*/
					header: new sap.m.Label({
						design: "Bold",
						text: "{i18n>COST_ASSIGNMENT}"
					})
				});
				this.entryListContents.addColumn(headerCol);
				if (this.clockEntry) {

					headerCol = new sap.m.Column({
						hAlign: "Center",
						demandPopin: true,
						minScreenWidth: "Tablet",
						popinDisplay: "Inline",
						header: new sap.m.Label({
							design: "Bold",
							text: "{i18n>START_TIME}"
						})
					});

					this.entryListContents.addColumn(headerCol);

					headerCol = new sap.m.Column({
						hAlign: "Center",
						demandPopin: true,
						minScreenWidth: "Tablet",
						popinDisplay: "Inline",
						header: new sap.m.Label({
							design: "Bold",
							text: "{i18n>END_TIME}"
						})
					});

					this.entryListContents.addColumn(headerCol);

				}

				headerCol = new sap.m.Column({
					hAlign: "Center",
					demandPopin: true,
					minScreenWidth: "Tablet",
					popinDisplay: "Inline",
					header: new sap.m.Label({
						design: "Bold",
						text: "{i18n>DURATION}"
					})
				});

				this.entryListContents.addColumn(headerCol);

				headerCol = new sap.m.Column({
					hAlign: "Right",
					demandPopin: true,
					minScreenWidth: "Tablet",
					popinDisplay: "Inline",
					header: new sap.m.Label({
						design: "Bold",
						text: "{i18n>STATUS}"
					})
				});
				/**
				 * @ControllerHook Modify the clumns in the table
				 * This hook method can be used to add and remove columns for the table used to display the entries
				 * It is called after the standard columns are added to the table
				 * @callback hcm.mytimesheet.view.S3~extHookAlterColumns
				 * @param {object} Table Header Object
				 * @return {object} Table Footer Object
				 */

				if (this.extHookAlterColumns) {
					headerCol = this.extHookAlterColumns(headerCol);
				}
				this.entryListContents.addColumn(headerCol);
			},
			loadList: function() {
				// load the main model for the view
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var days = oModel.getData().days;
				var self = this,
					recordedHrsTxt, date, target, recordedHrs;

				this.entryListContents.removeAllItems(); //removes all items from the table
				//Add columns
				for (var i = 0; i < days.length; i++) {
					if (days[i].entries.length) {
						date = days[i].date;
						// 	date = (date.toDateString()).substring(4);
						date = this.formatDateMMMDD(date);

						//new approach
						var oWeekEntryDayHeader = new sap.m.GroupHeaderListItem({
							// 		type: "Inactive"
							title: date,
							upperCase: false
						});
						oWeekEntryDayHeader.addCustomData(new sap.ui.core.CustomData({
							key: "dateSelected",
							value: days[i].date
						}));
						oWeekEntryDayHeader.addCustomData(new sap.ui.core.CustomData({
							key: "header",
							value: true
						}));
						var oObject = new sap.m.ObjectIdentifier({
							title: date
						});
						// 	oWeekEntryDayHeader.addCell(oObject);

						/*if (this.clockEntry) {
						oWeekEntryDayHeader.addCell(new sap.m.Label({
							text: " "
						}));
						oWeekEntryDayHeader.addCell(new sap.m.Label({
							text: " "
						}));
					}*/
						// 	recordedHrsTxt = days[i].recordedHours + " h out of " + days[i].targetHours + " h";
						// target = days[i].targetHours.toFixed(2);
						/*target = sap.ca.ui.model.format.NumberFormat.getInstance({
									style: 'standard'
								}).format(days[i].targetHours.toFixed(2));
					recordedHrs = sap.ca.ui.model.format.NumberFormat.getInstance({
									style: 'standard'
								}).format(days[i].recordedHours.toFixed(2));*/
						target = this.formatTime(days[i].targetHours.toFixed(2));
						recordedHrs = this.formatTime(days[i].recordedHours.toFixed(2));
						if (parseFloat(target, 10) !== 0 && this.withTargetHours) {
							if (parseFloat(recordedHrs, 10) === 1) { //Note 2115732
								recordedHrsTxt = this.oBundle.getText("WEEKLY_RECORDED_HOUR", [recordedHrs, target]);
							} else {

								recordedHrsTxt = this.oBundle.getText("WEEKLY_RECORDED_HOURS", [recordedHrs, target]);
							}
						} //End Note 2115732
						else {
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOURS", [recordedHrs]);
						}
						oWeekEntryDayHeader.setCount(recordedHrsTxt);
						/*oWeekEntryDayHeader.addCell(new sap.m.Label({
						text: recordedHrsTxt
					}));
					oWeekEntryDayHeader.addCell(new sap.m.Label({
						text: " "
					}));*/
						this.entryListContents.addItem(oWeekEntryDayHeader);

						// set whether this day is selected or not
						// 	oWeekEntryDayHeader.setSelected(days[i].selected);

						// load the items for this day entry
						for (var j = 0; j < days[i].entries.length; j++) {
							var list_item_entry = days[i].entries[j];

							var oSingleListEntry = new sap.m.ColumnListItem({
								type: "Navigation",
								tap: function(oEvent) {
									self.onItemSelectGotoEdit(oEvent);
								}
							});
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "day",
								value: i
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "entry",
								value: j
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "dateformated",
								value: days[i].dateFormatted
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "dateSelected",
								value: days[i].date
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "selectedDate",
								value: days[i].dateStr
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "header",
								value: false
							}));

							oObject = new sap.m.ObjectIdentifier({
								title: list_item_entry.mainItem,
								text: list_item_entry.subItems,
								badgeNotes: list_item_entry.hasNotes
							});
							if (list_item_entry.showError || list_item_entry.rejectionReason) {
								var cell = new sap.ui.layout.VerticalLayout();
								cell.addContent(oObject);

								if (list_item_entry.showError) {
									cell.addContent(new sap.m.ObjectStatus({
										text: list_item_entry.error,
										state: sap.ui.core.ValueState.Error
									}));
								} else {
									cell.addContent(new sap.m.ObjectStatus({
										text: list_item_entry.rejectionReason,
										state: sap.ui.core.ValueState.Error
									}));
								}
								oSingleListEntry.addCell(cell);
							} else {
								oSingleListEntry.addCell(oObject);
							}
							// 		var hrsMinText = list_item_entry.hours + this.oBundle.getText("HOURS_LABEL") + " " + list_item_entry.minutes + this.oBundle.getText("MINUTES_LABEL");
							//Datetime
							var timeParser = sap.ca.ui.model.format.DateFormat.getTimeInstance({
								pattern: "HHmmss"
							});
							var timeFormatter = sap.ca.ui.model.format.DateFormat.getTimeInstance({
								style: "medium"
							});
							var startTimeFormatted;
							var endTimeFormatted;
							var formattedDecimal = this.formatTime(list_item_entry.time.toFixed(2));
							if (this.clockEntry) {
								if (list_item_entry.startTime !== list_item_entry.endTime) { //Note: 2141131 clock time duration field
									startTimeFormatted = timeParser.parse(list_item_entry.startTime);
									oSingleListEntry.addCell(new sap.m.Label({
										text: timeFormatter.format(startTimeFormatted),
										design: "Bold"
									}));
									endTimeFormatted = timeParser.parse(list_item_entry.endTime);
									oSingleListEntry.addCell(new sap.m.Label({
										text: timeFormatter.format(endTimeFormatted),
										design: "Bold"
									}));
									oSingleListEntry.addCell(new sap.m.Label({
										//Checks and adds a dot or comma as required
										text: formattedDecimal,
										design: "Bold"
										/*sap.ca.ui.model.format.NumberFormat.getInstance({
									style: 'standard'
								}).format(list_item_entry.time.toFixed(2))*/
									}));
								} else { //Note: 2141131 clock time duration field
									oSingleListEntry.addCell(new sap.m.Label({
										text: "-",
										design: "Bold"
									}));
									oSingleListEntry.addCell(new sap.m.Label({
										text: "-",
										design: "Bold"
									}));
									oSingleListEntry.addCell(new sap.m.Label({
										text: formattedDecimal,
										design: "Bold"
									}));
								} //Note: 2141131 clock time duration field	

							} else {

								oSingleListEntry.addCell(new sap.m.Label({
									//Checks and adds a dot or comma as required
									text: formattedDecimal,
									design: "Bold"
									/*sap.ca.ui.model.format.NumberFormat.getInstance({
									style: 'standard'
								}).format(list_item_entry.time.toFixed(2))*/
								}));
							}

							// Adding the status in the table
							var stateOfStatus;
							if (list_item_entry.statusId === "REJECTED") { //Note:Save should also be in red color         
								stateOfStatus = sap.ui.core.ValueState.Error;
							} else if (list_item_entry.statusId === "MSAVE") {
								stateOfStatus = sap.ui.core.ValueState.NONE;
							} else {
								stateOfStatus = sap.ui.core.ValueState.Success;
							}
							oSingleListEntry.setType("Navigation");
							oSingleListEntry.addCell(new sap.m.ObjectStatus({
								text: list_item_entry.status,
								state: stateOfStatus
							}));

							this.entryListContents.addItem(oSingleListEntry);

						}
					}
					/*if (jQuery.device.is.phone) {
					this.byId("WEEKLY_PAGE").setTitle(
						this.oBundle.getText("SUMMARY", [
									                                 this.convertDateFormat(this.parseDateYYYYMMdd(oModel.getData().start)),
									                                 this.convertDateFormat(this.parseDateYYYYMMdd(oModel.getData().end))
									                                 ]));
				}*/
					/*if (jQuery.device.is.phone || jQuery.device.is.tablet) {
					var oSwipeContent = new sap.m.Button({
						text: this.oBundle.getText("DELETE"),
						type: "Reject"
					});
					self = this;
					oSwipeContent.attachPress(function() {
						var oData = oModel.getData();
						oData.days[self.dayIndex].entries[self.entryIndex].deleted = true;
						self.loadListWithoModel();
					});
					this.byId("ENTRY_LIST_CONTENTS").setSwipeContent(oSwipeContent);
				}*/

					//Filling the object headers with data

				}
				if (sap.ui.Device.system.phone) {
					this.setWeekOverviews(1);
				} else {
					this.setWeekOverviews(2);
				}

			},

			// code added for delete functionailty
			onDelete: function() {
				var oTableRef = this.byId("ENTRY_LIST_CONTENTS");
				var selectedItems = [];
				selectedItems = oTableRef.getSelectedItems();
				// Deleted Hours Summary
				var deletedHours = 0;
				var deletedMinutes = 0;
				var deletedTime = 0;
				var numberOfItemsGettingDeleted;
				var dayIndex;
				var entryIndex;
				var entry;
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var oPageData = oModel.getData();
				var oSettings = null;
				numberOfItemsGettingDeleted = selectedItems.length;
				for (var i = 0; i < selectedItems.length; i++) {
					dayIndex = selectedItems[i].data().day;
					entryIndex = selectedItems[i].data().entry;
					entry = oPageData.days[dayIndex].entries[entryIndex];
					this.updatePageData(true, dayIndex, entry, false);
					if (entry.subItems !== this.oApplicationFacade.getResourceBundle().getText("ADD_NEW")) {
						deletedHours += entry.hours;
						deletedMinutes += entry.minutes;
						deletedTime += entry.time;
						deletedTime = parseFloat(deletedTime.toFixed(2));
					} else {
						numberOfItemsGettingDeleted--;
					}
					if (deletedMinutes > 59) {
						deletedMinutes -= 60;
						deletedHours++;
					}
				}
				if (this.clockEntry) {

					oSettings = {
						question: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY"),
						additionalInformation: [{
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
							text: numberOfItemsGettingDeleted.toString()
						}, {
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_HOURS"),
							text: this.oBundle.getText("FULL_CONCATENATE_HOURSMIN", [deletedHours, deletedMinutes])
						}],
						showNote: false,
						title: this.oConfiguration.getText("DELETE_CONFIRMATION"),
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				} else {
					var totalDuration = this.oBundle.getText("TOTAL_DURATION");
					oSettings = {
						question: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY"),
						additionalInformation: [{
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
							text: numberOfItemsGettingDeleted.toString()
						}, {
							label: totalDuration,
							text: this.formatTime(deletedTime.toString())
							/*sap.ca.ui.model.format.NumberFormat.getInstance({
									style: "standard"
								}).format(deletedTime.toString())*/
						}],
						showNote: false,
						title: this.oConfiguration.getText("DELETE_CONFIRMATION"),
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				}

				this.openConfirmationPopup(oSettings, false);

				/*var _this = this;
				sap.ca.ui.dialog.confirmation.open(oSettings, function(response) {
					if (response.isConfirmed === true) {
						_this.submitTime(false);
					}
				});*/
			},
			updatePageData: function(bDeleted, dayIndex, entry, bToBeReleased) {
				if (!entry) {
					return;
				}

				this.entry = entry;
				this.dayIndex = dayIndex;
				if (bDeleted) {
					this.entry.deleted = true;
				}
				if (bToBeReleased) {
					this.entry.bToBeReleased = true;
				}

				// Prepare entry
				this.entry.newEntry = false;
				this.entry.showTime = true;
				if (!this.clockEntry) {
					this.entry.hours = parseInt(this.entry.hours, 10);
					this.entry.minutes = parseInt(this.entry.minutes, 10);
				} else {
					this.entry.startTime = entry.startTime;
					this.entry.endTime = entry.endTime;
					this.entry.hours = entry.hours;
					this.entry.minutes = entry.minutes;
					this.entry.time = entry.time;
				}

				this.entry.hasNotes = (this.entry.notes && this.entry.notes.length > 0) ? true : false;

				/*if (this.dayIndex < 0) {
					// this is a multi-day entry
					var calendar = this.byId("weeklyCalendar");
					var selectedDates = calendar.getSelectedDates();
					for (var i = 0; i < selectedDates.length; i++) {
						var entries = this.getDateEntries(selectedDates[i]);
						entries.push(jQuery.extend(true, {}, this.entry));

					}
				}*/
			},

			selectDateOnAllCheckBoxSelection: function(tblCntrl) {

				var listItems = tblCntrl.getItems();
				var selItems = tblCntrl.getSelectedItems();
				var selectedDates = [];
				var unSelectedDates = [];
				var j = 0;
				for (var i = 0; i < listItems.length; i++) {

					if (selItems[j] && (listItems[i].data().dateSelected === selItems[j].data().dateSelected)) {
						selectedDates.push(selItems[j].data().dateSelected);
						if (j < selItems.length) {
							j++;
						}
					} else {
						unSelectedDates.push(listItems[i].data().dateSelected);
					}

				}

				this.byId("WEEKLY_CALENDAR").toggleDatesSelection(unSelectedDates, false);
				this.byId("WEEKLY_CALENDAR").toggleDatesSelection(selectedDates, true);

				selectedDates = [];
				unSelectedDates = [];
			},

			getHeaderFooterOptions: function() {

				var that = this;
				var objHdrFtr = {
					sI18NFullscreenTitle: "TIMESHEET_TITLE",

					oEditBtn: {
						id: "QUICK_FILL_BTN",
						sI18nBtnTxt: "CREATE",
						onBtnPressed: function(evt) {
							that.onAddNewEntry(evt);
						}
					},

					buttonList: [{
						sId: "copyBtn",
						sI18nBtnTxt: "Copy",
						onBtnPressed: function(evt) {
							that.onCopy(evt);
						}
					}, {
						sId: "deleteBtn",
						sI18nBtnTxt: "DELETE",
						onBtnPressed: function(evt) {
							that.onDelete(evt);
						}
					}, {
						sId: "SUBMIT_BTN",
						sI18nBtnTxt: "SUBMIT",
						onBtnPressed: function(evt) {
							that.onSubmit(evt);
						}
					}]

				};
				var m = new sap.ui.core.routing.HashChanger();
				var oUrl = m.getHash();
				if (oUrl.indexOf("Shell-runStandaloneApp") >= 0) {
					objHdrFtr.bSuppressBookmarkButton = true;
				}
				/**
				 * @ControllerHook Modify the footer buttons
				 * This hook method can be used to add and change buttons for the detail view footer
				 * It is called when the decision options for the detail item are fetched successfully
				 * @callback hcm.mytimesheet.view.S3~extHookChangeHeaderFooterOptions
				 * @param {object} Header Footer Object
				 * @return {object} Header Footer Object
				 */

				if (this.extHookChangeHeaderFooterOptions) {
					objHdrFtr = this.extHookChangeHeaderFooterOptions(objHdrFtr);
				}

				return objHdrFtr;
			}

		});