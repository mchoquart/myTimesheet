/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("sap.ui.model.odata.datajs");
jQuery.sap.require("hcm.mytimesheet.model.TimeEntry");
jQuery.sap.require("hcm.mytimesheet.utils.DataManager");
jQuery.sap.require("hcm.mytimesheet.utils.ConcurrentEmployment");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("sap.ca.ui.model.type.Number");
/*global hcm:true */
sap.ca.scfld.md.controller.BaseFullscreenController
	.extend(
		"hcm.mytimesheet.view.S31", {
			//controller hooks
			extHookChangeHeaderFooterOptions: null,
			extHookChangeObjectBeforePost: null,
			onInit: function() {
				sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
				this.RESULTS_TOP = 30;
				this.top = this.RESULTS_TOP;
				this.localSkip = 0;
				this.remoteSkip = 0;
				this.MODEL_SIZE_LIMIT = 1000;
				this.gv_fieldRelated = "";
				this.searchField_begDa = "";
				this.searchField_endDa = "";
				this.pagingEnabled = false;
				this.localTypeList = [];
				this.favoriteDeletedIds = [];
				this.remoteTypeList = [];
				this.resultsTotalCount = 0;
				this.remoteSearchPhrase = "";
				this.favoriteSelected = false;
				this.worklistSelectedObj = {};
				this.worklistItemSelected = false;
				this.continueSearchOnServerActive = false;
				this.initialize();
				this.entry = new hcm.mytimesheet.model.TimeEntry(0, "", false, true);
				var self = this;
				this.oRouter.attachRouteMatched(function(oEvent) {

					if (oEvent.getParameter("name") === "S31") {
						//only invoke if a pernr has been selected
						if (self.oApplication.pernr) {
							self.initializeView(oEvent.getParameter("arguments").context);
						} else {
							self.context = oEvent.getParameter("arguments").context;
						}
					}

				}, this);
			},

			onAfterRendering: function() {
				var self = this;
				if (!this.oApplication.pernr) {
					hcm.mytimesheet.utils.ConcurrentEmployment.getCEEnablement(this, function() {
						if (self.context) {
							self.initializeView(self.context);
						}
					});

				}
			},

			initializeView: function(context) {
				this.noneText = "(" + this.oBundle.getText("None") + ")";
				if (!this.oApplication.getModel("TSM_WEEKLY")) {
					var curDate = new Date();
					this.setInitialInfoModelData(curDate);
				}
				this.getHderFooterOptions();
				var createScreenModel = new sap.ui.model.json.JSONModel();
				this.oApplication.setModel(createScreenModel, "createScreenModel");

				this.worklistItemSelected = false;
				this.worklistSelectedObj = {};
				this.entry = new hcm.mytimesheet.model.TimeEntry(0, "", false, true);
				var firstDayOffSet = parseInt(context[context.indexOf("offset") + 6], 10);
				this.byId("weeklyCalendar").setFirstDayOffset(firstDayOffSet);
				var dateStr = decodeURIComponent(context),
					noOfWeeks;
				dateStr = dateStr.replace("offset", "");
				dateStr = dateStr.slice(0, -1);
				var weeklyModel = this.oApplication.getModel("TSM_WEEKLY");
				var date = new Date(dateStr);
				if (sap.ui.Device.system.phone) {
					this.byId("weeklyCalendar").setWeeksPerRow(1); //in case of mobile devices 1 week is shown
					noOfWeeks = 6;
				} else {
					noOfWeeks = 13;

				}
				var firstday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - this.getActualOffset(firstDayOffSet, date.getDay()));
				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + noOfWeeks);
				//Getting the weekly model
				if (weeklyModel.getData().createdFromS31) {

					this.clockEntry = weeklyModel.getProperty("/clockEntry");
					createScreenModel.setProperty("/start", this.getDateStr(firstday));
					createScreenModel.setProperty("/weekStart", this.getDateStr(firstday));
					createScreenModel.setProperty("/weekEnd", this.getDateStr(lastday));
					weeklyModel.setProperty("/weekStart", this.getDateStr(firstday));
					weeklyModel.setProperty("/weekEnd", this.getDateStr(lastday));
				} else {
					createScreenModel.setProperty("/start", this.getDateStr(firstday));
					createScreenModel.setProperty("/weekStart", this.getDateStr(firstday));
					createScreenModel.setProperty("/weekEnd", this.getDateStr(lastday));
					this.clockEntry = weeklyModel.getProperty("/clockEntry");
					this.releaseFuture = weeklyModel.getProperty("/releaseFuture");
					//Note 2115732 Correction for pop-up header starts here
					this.releaseAllowed = weeklyModel.getProperty("/releaseAllowed");
					//Note 2115732 Correction for pop-up header starts here
					this.FavoriteAvailable = weeklyModel.getProperty("/favoriteAvailable");
				}
				createScreenModel.setProperty("/clockEntry", this.clockEntry);
				createScreenModel.setProperty("/decimalTimeEntryVisible", !this.clockEntry);
				createScreenModel.setProperty("/editButtonEnabled", false);
				createScreenModel.setProperty("/updateButtonEnabled", false);
				//Initializing the view
				this.initView();
				//call Profile Fields
				this.getProfileFields();
				//call Worklist
				this.getWorkListCollection();
				//call favorites
				this.getFavoritesCollection();

				this.getView().setModel(createScreenModel);

			},

			initialize: function() {
				if (!this.oApplication) {

					this.oApplication = this.oApplicationFacade.oApplicationImplementation;

					this.oConfiguration = new hcm.mytimesheet.utils.InitialConfigHelper();
					this.oService = new hcm.mytimesheet.Service();
					this.oConnectionManager = this.oApplication.oConnectionManager;
					this.oBundle = this.oApplicationFacade.oApplicationImplementation
						.getResourceBundle();
					this.oConfiguration.setResourceBundle(this.oBundle);

				}

			},

			setInitialInfoModelData: function(curDate) {
				var oModel = new sap.ui.model.json.JSONModel();
				var noOfWeeks = 13; //by default 2 weeks are shown
				if (sap.ui.Device.system.phone) {
					noOfWeeks = 6;
					this.byId("weeklyCalendar").setWeeksPerRow(1); //in case of mobile devices 1 week is shown

				}

				var first = curDate.getTime() - (curDate.getDay() * 24 * 60 * 60 * 1000); // First day is the day of the month - the day of the week
				var last = first + (noOfWeeks * 24 * 60 * 60 * 1000); // last day is the first day + 6

				var firstday = new Date(first);
				var lastday = new Date(last);
				this.oApplication.setModel(oModel, "TSM_WEEKLY");

				this.oService.getInitialInfos(this, this.oApplication.pernr, this.getDateStr(curDate), this.getDateStr(curDate));
				oModel.setProperty("/showSubmit", false);
				oModel.setProperty("/selected", this.getDateStr(curDate));
				oModel.setProperty("/selectedDate", curDate);
				oModel.setProperty("/year", curDate.getFullYear());
				oModel.setProperty("/start", this.getDateStr(firstday));
				oModel.setProperty("/weekStart", this.getDateStr(firstday));
				oModel.setProperty("/weekEnd", this.getDateStr(lastday));
				oModel.setProperty("/createdFromS31", true);

				var InitalInfoModel = this.oConfiguration.getInitialInfoModel();

				this.releaseAllowed = InitalInfoModel.ReleaseDirectly === "TRUE";
				oModel.setProperty("/releaseAllowed", this.releaseAllowed);

				oModel.setProperty("/releaseFuture", InitalInfoModel.ReleaseFuture);
				this.releaseFuture = InitalInfoModel.ReleaseFuture;
				oModel.setProperty("/favoriteAvailable", InitalInfoModel.FavoriteAvailable);
				this.FavoriteAvailable = InitalInfoModel.FavoriteAvailable;
				this.clockEntry = (InitalInfoModel.ClockEntry === "TRUE");
				oModel.setProperty("/clockEntry", this.clockEntry);
				oModel.setProperty("/decimalTimeEntryVisible", !this.clockEntry);
				return oModel;
			},

			initView: function() {
				var s3Model = this.oApplication.getModel("S31modelexch");
				var weeklyModel = this.oApplication.getModel("TSM_WEEKLY");
				this.byId("timeAssignment").setValue("");
				// this.byId("favName").setValue("");
				var createScreenModel = this.oApplication.getModel("createScreenModel");
				var days = ["Sun", "Mon", "Tue", "Wed", "Thu",
                            "Fri", "Sat"];
				if (!s3Model) {
					s3Model = new sap.ui.model.json.JSONModel();
					s3Model.setProperty("/selectedDates", weeklyModel.getProperty("/selectedDate"));
					s3Model.setProperty("/editentryview", false);
					this.oApplication.setModel(s3Model, "S31modelexch");
				}
				if (!this.FavoriteAvailable) {
					this.byId("timeAssignmentLbl").setText(this.oBundle.getText("SELECT_WORKLIST"));
				}
				var weeklyCal = this.byId("weeklyCalendar");
				weeklyCal.setEnableMultiselection(true);

				// set selected dates from previous screen
				weeklyCal.unselectAllDates();
				/*weeklyCal.toggleDatesSelection(s3Model
          .getData().selectedDates, true);*/
				if (!s3Model.getProperty("/editentryview")) {
					weeklyCal.setEnableMultiselection(true);
					weeklyCal.toggleDatesSelection(s3Model
						.getData().selectedDates, true);
					if (s3Model.getProperty("/copySelected")) {
						this.edit_entry = false;
						this.edit_entry_data = this.clone(s3Model.getData().editeddata);
						this.byId("accountingInfoPanel").setExpanded(true);
						this.editdatafroms3 = s3Model.getData().editeddata;
						this.entry = this.editdatafroms3.entry;
						this.entry.time = sap.ca.ui.model.format.NumberFormat.getInstance({
							style: "standard"
						}).format(this.entry.time);
						createScreenModel.setProperty("/entry", this.entry);
						if (this.isClockEntry()) {
							this.byId("startTime").setValue(this.entry.startTime);
							this.byId("endTime").setValue(this.entry.endTime);
						} else {
							this.byId("decimalTimeEntryValue").setValue(this.entry.time);
						}

						//setting notes
						if (this.entry.hasNotes) {
							this.byId("S31TextArea").setValue(this.entry.notes);
						}
					} else {
						this.edit_entry = false;
						this.byId("decimalTimeEntryValue").setValue("");
						this.byId("startTime").setValue("");
						this.byId("endTime").setValue("");
						//    weeklyCal.setDisabledWeekDays([]);
						this.byId("timeAssignment").setValue("");
					}

				} else {
					weeklyCal.toggleDatesSelection(s3Model
						.getData().selectedDates, true);
					this.edit_entry = true;
					this.edit_entry_data = this.clone(s3Model.getData().editeddata);
					this.byId("accountingInfoPanel").setExpanded(true);
					//    HFoption.sI18NFullscreenTitle = this.oBundle.getText("TIMESHEET_EDIT_ENTRY_TITLE_SCREEN");
					weeklyCal.setEnableMultiselection(true);
					this.editdatafroms3 = s3Model.getData().editeddata;
					this.entry = this.editdatafroms3.entry;
					this.entry.time = sap.ca.ui.model.format.NumberFormat.getInstance({
						style: "standard"
					}).format(this.entry.time);
					createScreenModel.setProperty("/entry", this.entry);
					if (this.isClockEntry()) {
						if (this.entry.startTime !== this.entry.endTime) { //Note: 2141131 clock time duration field
							this.byId("startTime").setValue(this.entry.startTime);
							this.byId("endTime").setValue(this.entry.endTime);
						} else { //Note: Begin 2141131 clock time duration field
							this.byId("ClkTimeDecimalTimeEntryValue").setValue(this.entry.time);
						} //Note:End 2141131 clock time duration field			

					} else {
						this.byId("decimalTimeEntryValue").setValue(this.entry.time);
					}
					// disable calendar in edit mode

					/*var selectedDay = weeklyCal.getSelectedDates()
						.toString().substr(0, 3);
					var disableDates = [];
					for (var key in days) {
						if (!(selectedDay === days[key])) {
							disableDates.push(key);
						}
					}
					var disable = selectedDay ? disableDates : null;
					weeklyCal.setDisabledWeekDays(disable);*/

					if (this.entry.hasNotes) {
						this.byId("S31TextArea").setValue(this.entry.notes);
					}
				}

				if (weeklyCal.getSelectedDates().length > 1) {
					this.byId("createPanel").setHeaderText(
						this.oBundle.getText(
							"SUBMIT_HEADER_TEXT", [this.formatDateMMMDD(new Date(weeklyCal.getSelectedDates()[0])),
                 weeklyCal.getSelectedDates().length - 1]));

				} else if (weeklyCal.getSelectedDates().length === 1) {
					this.byId("createPanel").setHeaderText(
						this.oBundle
						.getText(
							"SUBMIT_HEADER_TEXT_SINGLE", [this.formatDateMMMDD(new Date(weeklyCal.getSelectedDates()[0]))]));

				} else {
					this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
					this.setBtnEnabled("SUBMIT_BTN", false);
				}

				if (s3Model.getData().pageData) {
					var legendArray = s3Model.getData().pageData.legendforS31;
					weeklyCal.toggleDatesType(legendArray.yellow, sap.me.CalendarEventType.Type04, true);
					weeklyCal.toggleDatesType(legendArray.green, sap.me.CalendarEventType.Type01, true);
					weeklyCal.toggleDatesType(legendArray.grey, sap.me.CalendarEventType.Type00, true);
					weeklyCal.toggleDatesType(legendArray.red, sap.me.CalendarEventType.Type07, true);
					weeklyCal.toggleDatesType(legendArray.rejected, sap.me.CalendarEventType.Type06, true);
				}

			},
			//deep copy of objects
			clone: function(obj) {
				// Handle the 3 simple types, and null or undefined
				if (obj === null || typeof obj !== "object") {
					return obj;
				}

				// Handle Object
				if (obj instanceof Object) {
					var copy = {};
					var attr = null;
					for (attr in obj) {
						if (obj.hasOwnProperty(attr)) {
							copy[attr] = this.clone(obj[attr]);
						}
					}
					return copy;
				}

				throw new Error("Unable to copy obj! Its type isn't supported.");
			},

			formatDateMMMDD: function(oDate) {
				var month = oDate.getMonth();
				var day = oDate.getDate();

				var dateString = this.oBundle.getText("MONTH_" + month) + " " + day;

				return dateString;
			},
			getActualOffset: function(firstDayOffset, currentDay) {
				var constantOffset = 7;
				if (firstDayOffset > currentDay) {
					return currentDay + constantOffset - firstDayOffset;
				} else {
					return currentDay - firstDayOffset;
				}
			},
			validate: function() {
				if (this.favoriteSelected) {
					this.byId("timeAssignment").setValue("");
				}
				this.byId("ClkTimeDecimalTimeEntryValue").setValue(""); //Note: 2141131 clock time duration field
				this.byId("ClkTimeDecimalTimeEntryValue").setEnabled(false); //Note: 2141131 clock time duration field
				this.dateTimeModified = true;
				this.validateSaveBtnVisibility();
			},
			check_for_changed_data: function() {
				var calendar = this.byId("weeklyCalendar");
				var selectedDates = calendar.getSelectedDates();
				var duration = null;
				if (this.isClockEntry()) {
					var startTime = this.byId('startTime').getValue();
					var endTime = this.byId('endTime').getValue();

				} else {
					duration = this.byId('decimalTimeEntryValue').getValue();
				}
				var note_text = this.byId('S31TextArea').getValue();
				var suggested_cost_assignment_data = this.byId('COST_ASSIGNMENT_RECENTLY_USED_LIST').getValue();

				if (this.edit_entry) {
					//for edit entry check for any changed data
					var edit_entry_data = this.edit_entry_data; //has the original data
					var new_selectedDates = this.getDateStr(new Date(selectedDates[0]));
					var original_date = edit_entry_data.pageData.days[edit_entry_data.dayIndex].dateStr;
					var original_notes = edit_entry_data.entry.notes;
					var original_main_name = edit_entry_data.entry.mainName;
					var original_main_code = edit_entry_data.entry.mainCode;
					var accounting_infos = this.getView().getModel('fordynamictypes').getData().types; //current values
					var itemName;
					var itemCode;
					var selected_accounting_info;
					var startString, endString;
					var index, index2;
					//checking for any change in the time entered
					if (this.isClockEntry()) {
						var original_start_time = edit_entry_data.entry.startTime;
						var original_end_time = edit_entry_data.entry.endTime;
						if (original_start_time !== startTime || original_end_time !== endTime)
							return true;
					} else {
						var original_duration = edit_entry_data.entry.time;
						if (original_duration !== duration)
							return true;
					}

					//checking if there is any change in the accounting infos
					for (index = 0; index < accounting_infos.length; index++) {

						itemName = accounting_infos[index].fieldName;
						//comparing the main item to check for any change
						if (itemName === original_main_name) {
							selected_accounting_info = accounting_infos[index].value;
							startString = accounting_infos[index].value.indexOf('(');
							endString = accounting_infos[index].value.indexOf(')');
							itemCode = accounting_infos[index].value.substring(startString + 1, endString);
							if (itemCode !== original_main_code) {
								return true;
							}
						}
						//checking the child items for any change
						for (index2 = 0; edit_entry_data.entry.childItems && edit_entry_data.entry.childItems[index2]; index2++) {
							if (edit_entry_data.entry.childNames[index2] === itemName) {
								selected_accounting_info = accounting_infos[index].value;
								startString = accounting_infos[index].value.indexOf('(');
								endString = accounting_infos[index].value.indexOf(')');
								itemCode = accounting_infos[index].value.substring(startString + 1, endString);
								if (edit_entry_data.entry.childCodes[index2] !== itemCode) {
									return true;
								}
							}
						}
					}

					if (selectedDates.length > 1 || original_date !== new_selectedDates || original_notes !== note_text) {
						return true;
					}
					//Incase no items have changed
					return false;
				} else {
					//for new entries check for any data entered
					var manual_cost_assignment_data = false;

					var typesArray = this.getView().getModel('fordynamictypes').getData().types;
					if (typesArray) {
						for (var i = 0; i < typesArray.length; i++) {
							if (typesArray[i].value.trim()) {
								manual_cost_assignment_data = true;
							}
						}
					}
					//checking if any of the fields have some value or not
					if (this.isClockEntry()) {
						if (selectedDates.length !== 0 || startTime !== "" || endTime !== "" || suggested_cost_assignment_data !== "" ||
							manual_cost_assignment_data)
							return true;
					} else {
						if (selectedDates.length !== 0 || (duration !== "0" && duration !== "") || suggested_cost_assignment_data !== "" ||
							manual_cost_assignment_data)
							return true;
					}
					return false;
				}
			},

			onTapOnDate: function(oEvent) {
				var dateSelected = oEvent.getSource()
					.getSelectedDates();
				var numberOfDatesSelected = dateSelected.length;
				if (this.edit_entry) {
					var dateParse = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "YYYYMMdd"
					});

					var editDate = dateParse.parse(this.edit_entry_data.pageData.days[this.edit_entry_data.dayIndex].dateStr);
					for (var i = 0; i < numberOfDatesSelected; i++) {
						var newDate = new Date(dateSelected[i]);
						if (!(newDate.getFullYear() === editDate.getFullYear() && newDate.getMonth() === editDate.getMonth() && newDate.getDate() ===
							editDate.getDate())) {
							oEvent.getSource().toggleDatesSelection([newDate.toDateString()], false);
						}
					}
					this.validateSaveBtnVisibility(oEvent);
					return;
				}
				this.validateSaveBtnVisibility(oEvent);
				if (numberOfDatesSelected > 1) {

					this.byId("createPanel").setHeaderText(
						this.oBundle.getText("SUBMIT_HEADER_TEXT", [
                 this.formatDateMMMDD(new Date(dateSelected[0])),
                 numberOfDatesSelected - 1]));
				} else if (numberOfDatesSelected === 1) {
					this.byId("createPanel").setHeaderText(
						this.oBundle.getText(
							"SUBMIT_HEADER_TEXT_SINGLE", [this.formatDateMMMDD(new Date(dateSelected[0]))]));

				} else if (numberOfDatesSelected === 0) {
					this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
				}

			},
			validateSaveBtnVisibility: function() {
				var timeFlag = false;
				//checking the type of time entry and setting the flag true only for valid times
				if (this.isClockEntry()) {
					var startTime = this.byId("startTime").getValue();
					var endTime = this.byId("endTime").getValue();
					var clkTimeDuration = this.byId("ClkTimeDecimalTimeEntryValue").getValue(); //Note: Begin 2141131 clock time duration field
					if ((clkTimeDuration !== "0") && clkTimeDuration !== "") {
						this.clkTimeDurationFilled = true;
					} else {
						this.clkTimeDurationFilled = false;
					}
					if (((startTime && endTime) && startTime !== endTime) || this.clkTimeDurationFilled) { //Note: End 2141131 clock time duration field
						timeFlag = true;
					} else {
						timeFlag = false;
					}

				} else {
					//condition for decimal inputs
					var decimalTimeEntryValue = this.byId("decimalTimeEntryValue").getValue();
					if ((decimalTimeEntryValue !== "0") && decimalTimeEntryValue !== "") {
						//if condition checks if any value has been entered for the decimal input control
						if (this._isValidDecimalNumber(decimalTimeEntryValue)) {
							timeFlag = true;
						} else {
							timeFlag = false;
						}

					} else {
						timeFlag = false;
					}
				}
				var selectedDate = this.byId("weeklyCalendar")
					.getSelectedDates().length;
				//var dateTimeValue = this.byId('DateTimeInputValue')
				//  .getValue();

				var flag = false;
				var typesArray = this.getView().getModel().getData().types;
				if (this.worklistItemSelected) {
					flag = true;
				} else if (typesArray) {
					for (var i = 0; i < typesArray.length; i++) {
						if (typesArray[i].value.trim() || typesArray[i].valueStateText.trim()) {
							flag = true;
							break;
						}
					}
				}

				if (flag && selectedDate && timeFlag) {
					this.setBtnEnabled("SUBMIT_BTN", true);
				} else {
					this.setBtnEnabled("SUBMIT_BTN", false);
				}
			},
			suggestionHelpChange: function(oEvent) {
				oEvent.getSource().setValue("");
				this.validateSaveBtnVisibility(oEvent);
			},

			onFavoriteItemSelection: function(oEvent) {
				this.validateSaveBtnVisibility(oEvent);
			},

			onFavValueChange: function() {
				//this.byId("updateBtn").setEnabled(true);
				this.byId("timeAssignment").setValue("");
			},

			onManualItemSelection: function(oEvent) {
				this.validateSaveBtnVisibility(oEvent);

			},

			timeAssignmentLiveChange: function() {
				this.byId("timeAssignment").setValue("");
			},

			manualHelpChange: function(oEvent) {
				if (this.favoriteSelected) {
					this.byId("timeAssignment").setValue("");
				}
				oEvent.getSource().setValueStateText(
					oEvent.getSource().getValue());
				oEvent.getSource().setValue(
					oEvent.getSource().getValue());
				this.validateSaveBtnVisibility(oEvent);
			},

			onDurationValueChange: function(oEvent) {
				this.validateSaveBtnVisibility(oEvent);
			},

			onDecimalTimeValueChange: function(oEvent) {
				if (this.favoriteSelected) {
					this.byId("timeAssignment").setValue("");
				}
				this.dateTimeModified = true;
				var decimalTimeEntryValue; //Note: Begin 2141131 clock time duration field
				if (!this.isClockEntry()) {
					decimalTimeEntryValue = this.byId("decimalTimeEntryValue").getValue();
				} else {
					decimalTimeEntryValue = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
				} //Note: End 2141131 clock time duration field
				if (this._isValidDecimalNumber(decimalTimeEntryValue)) {
					this.validateSaveBtnVisibility(oEvent);
				} else {
					this.setBtnEnabled("SUBMIT_BTN", false);
				}
			},

			_isValidDecimalNumber: function(number) {
				var numberString = number.toString();
				var decimalIndex = numberString.indexOf(".");
				var commaIndex = numberString.indexOf(",");
				if (decimalIndex > 0 && commaIndex > 0) {
					return false; //to make sure that user has entered either dot/comma but not both
				}
				var seperatorIndex = decimalIndex;
				if (seperatorIndex < 0) {
					seperatorIndex = numberString.indexOf(",");
				}
				var strCheck = "0123456789";
				var integerPart;
				var fractionalPart;
				var index = 0;
				var hasValue = false;
				if (seperatorIndex === -1) {
					integerPart = numberString;
					fractionalPart = "";
				} else {
					integerPart = numberString.slice(0, seperatorIndex);
					fractionalPart = numberString.slice(
						seperatorIndex + 1, numberString.length);
				}
				if (integerPart.length > 5) {
					return false;
				}
				for (index = 0; index < integerPart.length; index++) {
					if (strCheck.indexOf(integerPart[index]) === -1) {
						return false;
					} else {
						hasValue = true;
					}
				}

				if (fractionalPart.length > 2) {
					return false;
				}
				for (index = 0; index < fractionalPart.length; index++) {
					if (strCheck.indexOf(fractionalPart[index]) === -1) {
						return false;
					} else {
						hasValue = true;
					}
				}
				if (hasValue === false) {
					return false;
				}

				return true;
			},

			onNavButton: function() {

				var calendar = this.byId("weeklyCalendar");
				var selectedDate = calendar.getCurrentDate();
				var dateStr = selectedDate;
				selectedDate = dateStr + "offset" + calendar.getFirstDayOffset();
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setProperty("/currentDate", new Date(dateStr));
				this.oApplication.setModel(oModel, "S3exchangeModel");
				this.cleanUpOnBack();
				delete this.entry;
				//navigate to S3
				this.oRouter.navTo("S3", {
					context: selectedDate
				}, true);

			},
			cleanUpOnBack: function() {
				this.byId("timeAssignment").setValue("");
				this.byId("decimalTimeEntryValue").setValue("");
				this.byId("startTime").setValue("");
				this.byId("endTime").setValue("");
				delete this.worklistSelectedObj;
				this.worklistItemSelected = false;
				// this.byId("favName").setValue("");
				this.byId("weeklyCalendar").setDisabledWeekDays([]);
				this.byId("weeklyCalendar").unselectAllDates();
				this.byId("S31TextArea").setValue("");
				this.byId("ClkTimeDecimalTimeEntryValue").setValue(""); //Note: 2141131 clock time duration field
				var types = this.oApplication.getModel("accountingInfoModel").getData().types;
				for (var i = 0; i < types.length; i++) {
					if (types[i].value !== "" || types[i].valueStateText !== "") {
						types[i].value = "";
						types[i].valueStateText = "";
					}
				}

				this.byId("accountingInfoPanel").setExpanded(false);
				this.getView().getModel().setProperty("/types", types);
				this.oApplication.getModel("accountingInfoModel").setProperty("/types", types);
			},

			getDateStr: function(date) {
				return "" + date.getFullYear() + ("" + (date.getMonth() + 101)).substring(1) + ("" + (date.getDate() + 100)).substring(1);
			},

			getDateTimeStr: function(date) {
				return "" + date.getFullYear() + "-" + ("" + (date.getMonth() + 101)).substring(1) + "-" + ("" + (date.getDate() + 100)).substring(1) +
					"T00:00:00";
			},

			getValueHelpCollection: function(oselectedItem) {

				var self = this;
				var skip = 0;
				var selectedFieldName = (oselectedItem && oselectedItem.fieldName);
				if (this.remoteSearchPhrase) {
					skip = this.remoteSkip;
				} else {
					skip = this.localSkip;
				}
				//NOTE related input help
				var lc_separator = ";;";
				var lv_search_str = "";
				var length = this.getView().getModel('accountingInfoModel').getData().types.length;
				for (var i = 0; i < length; i++) {
					var fieldValue = this.getView().getModel('accountingInfoModel').getData().types[i].valueStateText;
					var fieldName = this.getView().getModel('accountingInfoModel').getData().types[i].fieldName;
					if (fieldValue.length !== 0 && fieldName !== selectedFieldName) {

						var lv_search_str_temp = fieldName + "=" + fieldValue;
						if (lv_search_str) {
							lv_search_str += lc_separator + lv_search_str_temp;
						} else {
							lv_search_str += lv_search_str_temp;
						}
					}
				}
				this.gv_fieldRelated = lv_search_str;

				var calendarRef = this.byId("weeklyCalendar");
				var selectedDates = calendarRef.getSelectedDates();
				if (selectedDates[0]) {
					var len = selectedDates.length;
					this.searchField_begDa = this.getDateStr(new Date(selectedDates[0]));
					this.searchField_endDa = this.getDateStr(new Date(selectedDates[len - 1]));
				} else {
					var oModel = this.oApplication.getModel("TSM_WEEKLY");
					this.searchField_begDa = (oModel.getProperty("/weekStart"));
					this.searchField_endDa = (oModel.getProperty("/weekEnd"));
				}
				this.oService
					.getValueHelpList(this.oApplication.pernr, (selectedFieldName || this.fieldName),

						this.top,
						skip,
						this.remoteSearchPhrase,
						this.gv_fieldRelated,
						this.searchField_begDa,
						this.searchField_endDa,
						function(data) {
							self.remoteSearchActive = false;
							var typeList = [];
							if (self.remoteSearch()) {

								typeList = self.localTypeList;
								self.remoteSearchActive = true;
								self.lastRemoteSearchPhrase = self.remoteSearchPhrase;
							} else {
								typeList = self.localTypeList;
							}

							// Add a "None" item to the list for
							// user to unselect
							// any type
							if (data.length > 0 && typeList.length === 0) {

								typeList.push({
									fieldValueId: self.noneText,
									fieldValue: self.noneText,
									fieldId: ""
								});

							}

							var flag;
							for (var i = 0; i < data.length; i++) {
								//Checking for duplicate values
								flag = 1;
								for (var j = 0; j < typeList.length; j++) {
									var vCheckFieldId = "(" + data[i].FieldId + ")";
									if (typeList[j].fieldValue === data[i].FieldValue && typeList[j].fieldId === vCheckFieldId) {
										flag = 0;
										break;
									}
								}
								if (flag === 1) {
									typeList
										.push({
											fieldValue: data[i].FieldValue,
											fieldId: "(" +
												data[i].FieldId +
												")",
											fieldValueId: data[i].FieldValue +
												" (" +
												data[i].FieldId +
												")"
										});
								}
							}

							function dynamicSort(property) {
								var sortOrder = 1;
								if (property[0] === "-") {
									sortOrder = -1;
									property = property.substr(1);
								}
								return function(a, b) {
									var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
									return result * sortOrder;
								};
							}
							typeList.sort(dynamicSort("fieldId"));
							// Check
							// self.oModel.setProperty("/typeList",
							self.oApplication.getModel("createScreenModel")
								.setProperty("/" + (oselectedItem && oselectedItem.fieldName),
									typeList);
							self.oApplication.getModel("createScreenModel").updateBindings();
							if (self.remoteSearch()) {
								self.remoteResultsLength = data.length;
								self
									.checkRemotePaging(self.remoteResultsLength);
							} else {
								self.localResultsLength = data.length;
								self
									.checkLocalPaging(
										self.localResultsLength,
										oselectedItem && oselectedItem.fieldName);
							}
						});
			},

			remoteSearch: function() {
				if ("remoteSearchPhrase" in this) {
					if (this.remoteSearchPhrase) {
						return this.remoteSearchPhrase;
					}
				}
				return false;
			},

			checkLocalPaging: function(recordCount) {
				//this.typeListControl = this.listOfManualItems[selectedFieldName];
				var typeListArray = this.typeListControl //this.listOfManualItems[selectedFieldName]
					.getItems();
				var typeListArrayLength = typeListArray.length;

				if (typeListArrayLength === 0 || typeListArrayLength >= this.MODEL_SIZE_LIMIT) {
					return;
				}

				if (typeListArray) {
					if (typeListArray[typeListArrayLength - 1]
						.getTitle() === this.oBundle
						.getText("TAP_TO_LOAD_MORE_LOADING")) {
						this.typeListControl
							.removeItem(typeListArray[typeListArrayLength - 1]);
					}
				}
				if (recordCount < this.top) {

					if (typeListArray[typeListArrayLength - 1].getTitle() === this.oBundle.getText("TAP_TO_LOAD_MORE") ||
						typeListArray[typeListArrayLength - 1].getTitle() === this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER")) {
						this.typeListControl
							.removeItem(typeListArray[typeListArrayLength -
								1]);
					}
				} else if (recordCount >= this.top) {
					// If tap to load more item is found in the list, do
					// nothing.
					if (typeListArray[typeListArrayLength - 1]
						.getTitle() === this.oBundle
						.getText("TAP_TO_LOAD_MORE")) {
						return;
					} else {
						// If continue search on server item is found in
						// the list, replace
						// with tap to load more item, else, add the tap
						// to load more item
						// to the list.
						if (typeListArray[typeListArrayLength - 1]
							.getTitle() === this.oBundle
							.getText("CONTINUE_SEARCH_ON_SERVER")) {
							typeListArray[typeListArrayLength - 1]
								.setTitle(this.oBundle
									.getText("TAP_TO_LOAD_MORE"));
						} else {

							this.loadMoreItem = new sap.m.StandardListItem({
								title: this.oBundle
									.getText("TAP_TO_LOAD_MORE"),
								active: true
							});

							this.typeListControl
								.addItem(this.loadMoreItem);
						}
					}
				}
			},

			checkRemotePaging: function(recordCount) {
				if (recordCount >= this.top ||
					!this.remoteSearchActive ||
					this.lastRemoteSearchPhrase !== this.remoteSearchPhrase) {
					var typeListArray = this.typeListControl.getItems();
					var typeListArrayLength = typeListArray.length;

					// Add continue search on server item if there is
					// nothing in the list.
					if (typeListArrayLength === 0 ||
						typeListArrayLength >= this.MODEL_SIZE_LIMIT) {
						this.noneTextItem = new sap.m.StandardListItem({
							title: this.noneText,
							active: true
						});

						this.typeListControl.insertItem(this.noneTextItem, 0);
						this.addContinueSearchItem(this.oBundle
							.getText("CONTINUE_SEARCH_ON_SERVER"));

						return;
					}

					// If continue search on server item is found in the
					// list, do nothing.
					if (typeListArray[typeListArrayLength - 1]
						.getTitle() === this.oBundle
						.getText("CONTINUE_SEARCH_ON_SERVER")) {
						return;
					} else {
						// If tap to load more item is found in the
						// list, replace with
						// continue search on server item, else add the
						// continue search on
						// server item.
						if (typeListArray[typeListArrayLength - 1]
							.getTitle() === this.oBundle
							.getText("TAP_TO_LOAD_MORE")) {
							typeListArray[typeListArrayLength - 1]
								.setTitle(this.oBundle
									.getText("CONTINUE_SEARCH_ON_SERVER"));
						} else {
							this
								.addContinueSearchItem(this.oBundle
									.getText("CONTINUE_SEARCH_ON_SERVER"));
						}
					}
				} else {
					typeListArray = this.typeListControl.getItems();
					typeListArrayLength = typeListArray.length;
					if (typeListArray[typeListArrayLength - 1].getTitle() === this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER") && recordCount < this.top) {
						this.typeListControl.removeItem(typeListArray[typeListArrayLength - 1]);
					}
				}
			},

			addContinueSearchItem: function() {

				this.continueSearchItem = new sap.m.StandardListItem({
					title: this.oBundle
						.getText("CONTINUE_SEARCH_ON_SERVER"),
					active: true
				});

				this.typeListControl.addItem(this.continueSearchItem);

				// Merge the 2 columns in the column list item directly
				// in the HTML so
				// that the continue search on server words don't wrap
				// in a single column.
				this.continueSearchItem
					.addEventDelegate({
						onAfterRendering: function() {
							$(
								this.continueSearchItem
								.$().context.firstChild)
								.attr("colspan", "2");
						}
					}, this);
			},

			tapToLoadMore: function(selectedItem) {
				/*this.loadMoreItem.setTitle(this.oBundle
        .getText("TAP_TO_LOAD_MORE_LOADING"));*/
				this.localSkip += this.top;
				this.getValueHelpCollection(selectedItem);
			},

			continueSearchOnServer: function(selectedItem) {
				/*this.continueSearchItem
        && this.continueSearchItem
          .setTitle(this.oBundle
            .getText("CONTINUE_SEARCH_ON_SERVER_LOADING"));*/
				this.remoteSearchPhrase = this.searchPhrase;

				if (this.firstRemoteSearch) {
					this.firstRemoteSearch = false;
					this.continueSearchOnServerActive = true;
				} else {
					this.remoteSkip += this.top;
				}

				this.getValueHelpCollection(selectedItem);
				return this.remoteSearchPhrase; //NOTE Search Help Disappearing Issue
			},

			refineSearchResult: function() {
				this.typeBinding = this.typeListControl
					.getBinding("items");
				var filters = [];
				if (this.searchPhrase) {
					filters.push(new sap.ui.model.Filter(
						"fieldValueId", sap.ui.model.FilterOperator.Contains, this.searchPhrase));
					filters.push(new sap.ui.model.Filter(
						"fieldValueId", sap.ui.model.FilterOperator.Contains, this.noneText));
				}
				this.typeBinding.filter(filters);
			},
			onLiveFavChange: function(evt) {
				//removing the titles
				//   var oEvent = evt;
				//             var source = oEvent.getSource();
				//             for (var i = 0; i < source.getItems().length; i++) {
				//             	if (source.getItems()[i].getTitle() === this.oBundle.getText("FAVORITE") ||
				//             		source.getItems()[i].getTitle() === this.oBundle.getText("WORKLIST") ||
				//             		source.getItems()[i].getTitle() === this.oBundle.getText("NO_WORKLIST") ||
				//             		source.getItems()[i].getTitle() === this.oBundle.getText("NO_FAVORITE")
				//             	) {
				//             		this.favDialogHeaders.push(source.removeItem(i));
				//             	}
				//             }
				//             var sValue = oEvent.getParameter("value");
				//             var oFilters = [];
				//             oFilters.push(new sap.ui.model.Filter("name",
				//             		sap.ui.model.FilterOperator.Contains, sValue));
				//             /*if (sValue) {
				//             	oFilters.push(new sap.ui.model.Filter("name",
				//             		sap.ui.model.FilterOperator.Contains, sValue));
				//             } else {
				//             	this.bindFavDialog(this.favoriteDialog);
				//             }*/
				//             if(!sValue){
				//                 try{
				//                     this.favoriteDialog.insertItem(this.favDialogHeaders[0], 0);
				//                     this.favoriteDialog.insertItem(this.favDialogHeaders[1], (this.favDialogHeaders[0].getCount() + 1));
				//                 }
				//                 catch(o){
				//                     jQuery.sap.log.warning("Could not add title", ["onLiveFavChange"], ["hcm.mytimesheet"]);
				//                 }
				//             }
				//             source.getBinding("items").filter(oFilters);

				var sFilterPattern = evt.getParameter("value");
				sFilterPattern = sFilterPattern.toLowerCase();
				var aListItems = evt.getSource().getItems();
				var bVisibility;
				var oGroupItem = null;
				var iCountInGroup = 0;
				// var somethingExist = false;
				for (var i = 0; i < aListItems.length; i++) {
					if (aListItems[i] instanceof sap.m.GroupHeaderListItem) {
						if (oGroupItem) {
							// if (iCountInGroup == 0) {
							//     oGroupItem.setVisible(false);
							// } else {
							// oGroupItem.setVisible(true);
							oGroupItem.setCount(iCountInGroup);
							//}
						}
						oGroupItem = aListItems[i];
						iCountInGroup = 0;
					} else {
						bVisibility = this.applySearchPatternToListItem(aListItems[i], sFilterPattern);
						aListItems[i].setVisible(bVisibility);
						if (bVisibility) {
							iCountInGroup++;
							// somethingExist = true;
						}
					}
				}
				if (oGroupItem) {
					// if (iCountInGroup == 0) {
					//     oGroupItem.setVisible(false);
					// } else {
					// oGroupItem.setVisible(true);
					if (oGroupItem.getTitle() !== this.oBundle.getText("NO_WORKLIST") || oGroupItem.getTitle() !== this.oBundle.getText("NO_WORKLIST")) {
						oGroupItem.setCount(iCountInGroup);
					}

					//}
				}

			},

			applySearchPatternToListItem: function(oItem, sFilterPattern) {
				if (sFilterPattern === "") {
					return true;
				}

				// if nothing found in unformatted data, check UI elements
				if ((oItem.getTitle() && oItem.getTitle().toLowerCase().indexOf(sFilterPattern) !== -1) ||
					(oItem.getDescription() && oItem.getDescription().toLowerCase().indexOf(sFilterPattern) !== -1) ||
					(oItem.getInfo() && oItem.getInfo().toLowerCase().indexOf(sFilterPattern) !== -1)) {
					return true;
				}
				return false;
			},

			onLiveChange: function(oEvent) {

				var sValue = oEvent.getParameter("value");
				var oFilters = [];
				oFilters.push(new sap.ui.model.Filter("fieldValueId",
					sap.ui.model.FilterOperator.Contains, sValue));
				/*oEvent.getSource().getBinding("items").filter(oFilters);
      if (oEvent.getSource().getBinding("items").filter(
        oFilters).getLength() < 1) {
       oEvent.getSource().setNoDataText();
      }*/

				this.searchPhrase = oEvent.getParameter("value");
				this.searchField = oEvent.getSource();
				if (this.searchPhrase) {
					//if (!this.continueSearchOnServerActive) {
					this.refineSearchResult(); //refreshes the filter->adds NONE text and the current search string
					//}
					if (this.searchPhrase !== this.remoteSearchPhrase) {
						this.resetRemoteSearch();
					}
					this.remoteSearchPhrase = this.searchPhrase;
					this.checkRemotePaging(this.remoteResultsLength);
				} else {
					// User has deleted all search phrase, revert to
					// local model
					this.refineSearchResult();
					this.remoteSearchPhrase = "";
					if (this.oApplication.getModel("createScrenModel")) {
						this.oApplication.getModel("createScrenModel").setProperty("typeList",
							this.localTypeList);
					}
					this.remoteSearchActive = false;
					this.checkLocalPaging(this.localResultsLength);
					this.resetRemoteSearch();
				}
			},

			resetRemoteSearch: function() {
				this.firstRemoteSearch = true;
				this.remoteSkip = 0;
				this.remoteTypeList = [];
				this.continueSearchOnServerActive = false;
				this.remoteSearchPhrase = "";
				this.remoteSearchActive = false;
			},

			clearSearchField: function() {
				if ("searchField" in this) {
					this.searchField.setValue("");
					this.typeBinding.filter([]);
				}
			},

			bindFavDialog: function(oSelectDialog1) {
				var combinedList, self = this;
				var oModel = self.oApplication.getModel("createScreenModel");

				var worklistHeader = new sap.m.GroupHeaderListItem({
					title: self.oBundle.getText("WORKLIST"),
					upperCase: false,
					count: oModel.getProperty("/projects").length
				});
				var noWorklistHeader = new sap.m.GroupHeaderListItem({
					title: self.oBundle.getText("NO_WORKLIST"),
					upperCase: false
				});

				if (this.FavoriteAvailable) {
					var favHeader = new sap.m.GroupHeaderListItem({
						title: self.oBundle.getText("FAVORITE"),
						upperCase: false,
						count: oModel.getProperty("/favorites").length
					});
					var noFavHeader = new sap.m.GroupHeaderListItem({
						title: self.oBundle.getText("NO_FAVORITE"),
						upperCase: false
					});
					combinedList = oModel.getProperty("/favorites").concat(oModel.getProperty("/projects"));

				} else {
					combinedList = oModel.getProperty("/projects");

				}
				oModel.setProperty("/combinedFavList", combinedList);

				var itemTemplate = new sap.m.StandardListItem({
					title: "{name}",
					description: "{subText}",
					info: "{info}",
					customData: [{
						key: "items",
						value: "{childs}"
     }, {
						key: "type",
						value: "{type}"
     }, {
						key: "id",
						value: "{id}"
     }, {
						key: "fieldId",
						value: "{fieldName}"
     }, {
						key: "fieldValue",
						value: "{fieldValue}"
     }]
				});

				// set model & bind Aggregation
				oSelectDialog1.setModel(self.oApplication.getModel("createScreenModel"));
				oSelectDialog1.bindAggregation("items", "/combinedFavList", itemTemplate);
				this.favoriteDialog = oSelectDialog1;
				if (this.FavoriteAvailable) {
					if (oModel.getProperty("/favorites").length === 0) {
						oSelectDialog1.insertItem(noFavHeader, 0);
					} else {
						oSelectDialog1.insertItem(favHeader, 0);
					}
					if (oModel.getProperty("/projects").length === 0) {
						oSelectDialog1.insertItem(noWorklistHeader, oModel.getProperty("/favorites").length + 1);
					} else {
						oSelectDialog1.insertItem(worklistHeader, oModel.getProperty("/favorites").length + 1);
					}

				} else {
					if (oModel.getProperty("/projects").length === 0) {
						oSelectDialog1.insertItem(noWorklistHeader, 0);
					} else {
						oSelectDialog1.insertItem(worklistHeader, 0);
					}

				}
			},

			onFavoriteInputHelp: function(oEvent) {
				var self = this,
					DialogHeader;
				this.favDialogHeaders = [];
				if (this.FavoriteAvailable) {
					DialogHeader = this.oBundle.getText("SELECT_FAVORITE");
				} else {
					DialogHeader = this.oBundle.getText("SELECT_WORKLIST");
				}
				var oSelectDialog1 = new sap.m.SelectDialog({
					title: DialogHeader,
					liveChange: [this.onLiveFavChange, this]

				});

				this.bindFavDialog(oSelectDialog1);
				oSelectDialog1.open();

				var input = arguments[0].getSource(),
					type, items, id;
				self = this;
				//Handling on item click event
				oSelectDialog1
					.attachConfirm(function(evt) {

						var selectedItem = evt.getParameter("selectedItem");
						if (selectedItem.data().type) {
							self.favoriteSelected = true;
							self.worklistItemSelected = false;
							type = selectedItem.data().type;
							items = selectedItem.data().items;
							id = selectedItem.data().id;
							var startTime = 0,
								time = 0,
								endTime = 0,
								i, j, typesArray;

							//Set Time Assignment
							//if (selectedItem.getDescription()) {
							if (selectedItem) {
								input.setValue(selectedItem.getTitle());
							}
							//setting the Time if applicable
							if (type === "F") {
								//getting the time if applicable
								for (var index = 0; index < self.favorites.length; index++) {
									if (self.favorites[index].id === id) {
										if (!self.isClockEntry()) {
											time = self.favorites[index].FavoriteDataFields.CATSHOURS;
											time = parseFloat(time, 10).toFixed(2);
											self.byId("decimalTimeEntryValue").setValue(time);
										} else {
											startTime = self.favorites[index].FavoriteDataFields.BEGUZ;
											endTime = self.favorites[index].FavoriteDataFields.ENDUZ;
											if (startTime !== endTime) { //Note: 2141131 clock time duration field
												var timeParser = sap.ca.ui.model.format.DateFormat.getTimeInstance({
													pattern: "HHmm"
												});
												var timeFormatter = sap.ca.ui.model.format.DateFormat.getTimeInstance({
													style: "short"
												});
												startTime = timeParser.parse(startTime);
												startTime = timeFormatter.format(startTime);
												endTime = timeParser.parse(endTime);
												endTime = timeFormatter.format(endTime);
												self.byId("startTime").setValue(self.favorites[index].FavoriteDataFields.BEGUZ);
												self.byId("endTime").setValue(self.favorites[index].FavoriteDataFields.ENDUZ);
												self.byId("ClkTimeDecimalTimeEntryValue").setEnabled(false); //Note: Begin 2141131 clock time duration field
											} else {
												time = self.favorites[index].FavoriteDataFields.CATSHOURS;
												time = parseFloat(time, 10).toFixed(2);
												self.byId("ClkTimeDecimalTimeEntryValue").setValue(time);
											} //Note: End 2141131 clock time duration field
										}
									}
								}
							} else {
								self.byId("decimalTimeEntryValue").setValue("");
								self.byId("startTime").setValue(""); //Note: Begin 2141131 clock time duration field
								self.byId("endTime").setValue("");
								self.byId("ClkTimeDecimalTimeEntryValue").setValue(""); //Note: End 2141131 clock time duration field
							}
							//setting the accounting infos
							typesArray = self.oApplication.getModel("accountingInfoModel").getData().types;
							//setting the accounting infos as initial 
							for (i = 0; i < typesArray.length; i++) {
								typesArray[i].value = "";
							}
							//Set the name
							// typesArray[0].value = selectedItem.getTitle();
							for (j = 0; j < items.length; j++) {
								for (i = 0; i < typesArray.length; i++) {

									if (typesArray[i].fieldName === items[j].name) {
										typesArray[i].value = items[j].value;
										typesArray[i].valueStateText = items[j].value;
										break;
									}
								}
							}

							self.byId("accountingInfoPanel").setExpanded(true);
							self.getView().getModel().setProperty("/types", typesArray);
							self.oApplication.getModel("accountingInfoModel").setProperty("/types", typesArray);
							self.validateSaveBtnVisibility(evt);
						} else {
							self.worklistItemSelected = true;
							self.favoriteSelected = false;
							input.setValue(selectedItem.getTitle());
							items = selectedItem.data().items;
							var fieldId = selectedItem.data().fieldId,
								fieldValue = selectedItem.data().fieldValue;
							typesArray = self.oApplication.getModel("accountingInfoModel").getData().types;
							//setting the accounting infos as initial 
							for (i = 0; i < typesArray.length; i++) {
								typesArray[i].value = "";
							}
							if (!self.worklistSelectedObj) {
								self.worklistSelectedObj = {};
							}
							if (self.checkFieldName(fieldId)) {
								self.worklistSelectedObj[fieldId] = fieldValue;
							}
							for (j = 0; j < items.length; j++) {
								if (self.checkFieldName(items[j].fieldName)) {
									self.worklistSelectedObj[items[j].fieldName] = items[j].fieldValue;
								}
								for (i = 0; i < typesArray.length; i++) {
									if (items[j].fieldName === "LTXA1") {
										self.byId("S31TextArea").setValue(items[j].name);
									}
									var txt = selectedItem.getTitle() + " " + "(" + fieldValue + ")";
									if (typesArray[i].fieldName === fieldId && typesArray[i].value !== txt) {
										typesArray[i].value = txt;
										typesArray[i].valueStateText = fieldValue;
									}
									if (typesArray[i].fieldName === items[j].fieldName) {
										typesArray[i].value = items[j].fieldValue;
										typesArray[i].valueStateText = items[j].name;
										break;
									}
								}
							}

							self.byId("accountingInfoPanel").setExpanded(true);
							self.getView().getModel().setProperty("/types", typesArray);
							self.oApplication.getModel("accountingInfoModel").setProperty("/types", typesArray);
							self.validateSaveBtnVisibility(evt);
						}

						oSelectDialog1.destroy();
						oSelectDialog1 = null;
					});

			},
			//listOfManualItems : {},
			onInputHelp: function() {
				var self = this;
				var selectedLItem = {};

				selectedLItem.name = arguments[0].getSource()
					.getValueStateText();
				selectedLItem.fieldName = arguments[0].getSource()
					.getName();

				var SelectTile = arguments[0].getSource().getParent()
					.getLabel().getText();

				var oSelectDialog1 = new sap.m.SelectDialog({
					title: SelectTile,
					/*noDataText : this.oBundle
         .getText('TAP_TO_LOAD_MORE_LOADING'),*/
					search: [this.onLiveChange, this],
					liveChange: [this.onLiveChange, this]
				});

				var itemTemplate = new sap.m.StandardListItem({
					title: "{fieldValue}",
					description: "{fieldId}",
					active: true
				});

				//self.listOfManualItems[selectedLItem.fieldName] = oSelectDialog1;
				self.typeListControl = oSelectDialog1;
				self.getValueHelpCollection(selectedLItem);

				// set model & bind Aggregation
				oSelectDialog1.setModel(self.oApplication.getModel("createScreenModel"));
				if (selectedLItem.fieldName.indexOf("/") >= 0) {
					selectedLItem.fieldName = selectedLItem.fieldName.split("/").join("-");
				}
				oSelectDialog1.bindAggregation("items", "/" +
					selectedLItem.fieldName, itemTemplate);

				oSelectDialog1.open();

				var input = arguments[0].getSource();

				// attach close listener
				oSelectDialog1
					.attachConfirm(function(evt) {
						var selectedItemEvent = evt
							.getParameter("selectedItem");
						if (selectedItemEvent) {
							self.selectedIndex = evt
								.getParameter("selectedItem")
								.getParent()
								.indexOfItem(evt.getParameter("selectedItem"));

							// when clciked on load more

							if (selectedItemEvent.getTitle() === self.oBundle
								.getText("TAP_TO_LOAD_MORE")) {
								self.tapToLoadMore(selectedLItem);
								oSelectDialog1.open();
								return;
							} else if (selectedItemEvent.getTitle() === self.oBundle
								.getText("CONTINUE_SEARCH_ON_SERVER")) {
								var searchtxt = self.continueSearchOnServer(selectedLItem);
								oSelectDialog1.open(searchtxt);
								return;
							} else if (selectedItemEvent.getTitle() === "(None)") {
								input.setValue("");
								input.setValueStateText("");
							} else {
								input.setValue(selectedItemEvent
									.getTitle() +
									" " +
									selectedItemEvent
									.getDescription());
								input
									.setValueStateText(selectedItemEvent
										.getDescription()
										.replace('(', "")
										.replace(")", ""));
							}
							self.validateSaveBtnVisibility(evt);

						}
						oSelectDialog1.destroy();

						oSelectDialog1 = null;
						self.localTypeList = [];
						self.remoteTypeList = [];
						self.resetRemoteSearch();
						self.top = self.RESULTS_TOP;
						self.remoteSkip = 0;
						self.localSkip = 0;
					});

				oSelectDialog1.attachCancel(function() {
					oSelectDialog1 = null;
					self.localTypeList = [];
					self.remoteTypeList = [];
					self.resetRemoteSearch();
					self.top = self.RESULTS_TOP;
					self.remoteSkip = 0;
					self.localSkip = 0;

				});

			},
			getFavoritesCollection: function() {
				var self = this;
				var FavDataFields, infos;
				if (this.FavoriteAvailable) {
					this.oService
						.getFavorites(
							this,
							this.oApplication.pernr,
							function(data) {

								var favCounter = 0;
								self.favorites = [];

								for (var i = 0; i < data.length; i++) {
									if (data[i].ObjType === "FW") {
										self.favorites[favCounter] = {
											name: data[i].Name,
											type: data[i].ObjType,
											id: data[i].ID,
											FavoriteDataFields: data[i].FavoriteDataFields,
											childs: [],
											info: "",
											active: true,
											subText: data[i].Field_Text
										};
									} else {
										if (parseFloat(data[i].FavoriteDataFields.CATSHOURS)) {
											infos = self.oBundle.getText("TOTAL_RECORDED_HOURS", [data[i].FavoriteDataFields.CATSHOURS]);
											if (infos.indexOf("Target:") >= 0) {
												infos = data[i].FavoriteDataFields.CATSHOURS + " h";
											}
										} else {
											var begda = data[i].FavoriteDataFields.BEGUZ,
												endda = data[i].FavoriteDataFields.ENDUZ;
											var timeParser = sap.ca.ui.model.format.DateFormat.getTimeInstance({
												pattern: "HHmm"
											});
											var timeFormatter = sap.ca.ui.model.format.DateFormat.getTimeInstance({
												style: "short"
											});
											begda = timeParser.parse(begda);
											begda = timeFormatter.format(begda);
											endda = timeParser.parse(endda);
											endda = timeFormatter.format(endda);
											infos = self.oBundle.getText("WEEK_DATE_RANGE", [begda, endda]);
											//   this.byId("startTime").setValue(begda);
											//   this.byId("endTime").setValue(endda);
										}
										self.favorites[favCounter] = {
											name: data[i].Name,
											type: data[i].ObjType,
											id: data[i].ID,
											FavoriteDataFields: data[i].FavoriteDataFields,
											childs: [],
											info: infos,
											active: true,
											subText: data[i].Field_Text
										};
									}
									favCounter++;

								}
								for (i = 0; i < favCounter; i++) {
									FavDataFields = self.favorites[i].FavoriteDataFields;
									for (var prop in FavDataFields) {
										if (prop !== "CATSHOURS" && prop !== "PERNR" && prop !== "BEGUZ" && prop !== "ENDUZ") {
											if (FavDataFields[prop] !== "" && typeof(FavDataFields[prop]) !== "undefined" && parseInt(FavDataFields[prop], 10) !== 0) {
												self.favorites[i].childs
													.push({
														name: prop,
														value: FavDataFields[prop]
													});
											}
										}
									}
								}
								self.oApplication.getModel("createScreenModel").setProperty(
									"/favorites", self.favorites);

								if (self.oApplication.getModel("createScreenModel").getProperty("/projects")) {
									if (self.oApplication.getModel("createScreenModel").getProperty("/favorites").length === 0 &&
										self.oApplication.getModel("createScreenModel").getProperty("/projects").length === 0) {
										self.byId("accountingInfoPanel").setExpanded(true);
										self.byId("timeAssignmentLbl").setVisible(false);
										self.byId("timeAssignment").setVisible(false);
									}
								}

							});
				}

			},

			// method added for f4 help
			getWorkListCollection: function() {

				this.workList = [];
				this.workListType = [];
				var self = this;

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				this.searchField_begDa = (oModel.getProperty("/weekStart"));
				this.searchField_endDa = (oModel.getProperty("/weekEnd"));

				this.oService
					.getWorkListCollection(
						this,
						this.oApplication.pernr,
						this.searchField_begDa,
						this.searchField_endDa,
						function(data) {
							// Create new worklist items for
							// every item
							// with
							// Level 0
							var workListCounter = 0;
							for (var i = 0; i < data.length; i++) {
								if (data[i].Level === 0) {
									self.workList[workListCounter] = {
										name: data[i].FieldValueText,
										childs: [],
										fieldName: data[i].FieldName,
										fieldValue: data[i].FieldValue,
										recordNumber: data[i].RecordNumber
									};
									workListCounter++;
								}
							}

							// Add other items with non Level 0
							// FieldText
							// into the
							// previously created Level 0 item.
							for (i = 0; i < data.length; i++) {
								if (data[i].Level !== 0) {
									for (var j = 0; j < self.workList.length; j++) {
										if (self.workList[j].recordNumber === data[i].RecordNumber) {
											self.workList[j].childs
												.push({
													name: data[i].FieldValueText,
													fieldName: data[i].FieldName,
													fieldValue: data[i].FieldValue
												});
										}
									}
								}
							}

							// Populate the HTML view model with
							// the
							// data
							var projects = [];
							for (i = 0; i < self.workList.length; i++) {
								var currentChildItems = [];
								var currentChildNames = [];
								var currentChildCodes = [];
								for (j = 0; j < self.workList[i].childs.length; j++) {
									currentChildItems
										.push(self.workList[i].childs[j].name);
									currentChildNames
										.push(self.workList[i].childs[j].fieldName);
									currentChildCodes
										.push(self.workList[i].childs[j].fieldValue);
								}
								projects
									.push({
										name: self.workList[i].name,
										subText: currentChildItems
											.join(", "),
										type: false,
										childs: self.workList[i].childs,
										fieldName: self.workList[i].fieldName,
										fieldValue: self.workList[i].fieldValue,
										fieldValueId: self.workList[i].name +
											currentChildItems
											.join(", ")
									});

							}
							self.workList = projects;

							self.oApplication.getModel("createScreenModel").setProperty(
								"/projects", self.workList);
							if (self.FavoriteAvailable) {
								if (self.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
									if (self.oApplication.getModel("createScreenModel").getProperty("/favorites").length === 0 &&
										self.oApplication.getModel("createScreenModel").getProperty("/projects").length === 0) {
										self.byId("accountingInfoPanel").setExpanded(true);
										self.byId("timeAssignmentLbl").setVisible(false);
										self.byId("timeAssignment").setVisible(false);
									} else {
										self.byId("timeAssignmentLbl").setVisible(true);
										self.byId("timeAssignment").setVisible(true);
									}
								}
							} else {
								if (self.oApplication.getModel("createScreenModel").getProperty("/projects").length === 0) {
									self.byId("accountingInfoPanel").setExpanded(true);
									self.byId("timeAssignmentLbl").setVisible(false);
									self.byId("timeAssignment").setVisible(false);

								} else {
									self.byId("timeAssignmentLbl").setVisible(true);
									self.byId("timeAssignment").setVisible(true);
								}
							}
						});
			},

			valueHelpDataForamtter: function(fieldName, fieldValue) {
				if (fieldName) {
					return fieldName + " (" + fieldValue + ")";

				}
			},

			durationDateForamtter: function(h, m) {
				return h + ":" + m;
			},

			getProfileFields: function() {
				this.profileFields = [];
				var self = this;
				var accountingInfoModel = new sap.ui.model.json.JSONModel();
				this.oApplication.setModel(accountingInfoModel, "accountingInfoModel");

				this.oService
					.getProfileFields(
						this,
						this.oApplication.pernr,
						function(data) {

							var editdatafroms3 = {},
								i;

							var editentrySelected = self.oApplication
								.getModel("S31modelexch")
								.getData().editentryview;
							var copyEntrySelected = self.oApplication
								.getModel("S31modelexch")
								.getData().copySelected;
							if (editentrySelected || copyEntrySelected) {
								editdatafroms3 = self.oApplication.getModel("S31modelexch")
									.getData().editeddata;
								self.validateSaveBtnVisibility();
							}
							/*if(self.FavoriteAvailable){
           self.profileFields[0] = {
               name : self.oBundle.getText("FAVORITE_NAME"),
               selectedName : self.oBundle.getText("FAVORITE_NAME"),
               fieldName : self.oBundle.getText("FAVORITE_NAME"),
               listType : "Active",
               labelVisible : true,
               typeVisible : true,
               fieldValue : "",
               value : "",
               valueStateText : "",
               ReadOnly : true,
               valueHelp: false,
               editButton: true
              };
           }*/

							for (i = 0; i < data.length; i++) {
								var name = data[i].FieldText;
								var fieldName = data[i].FieldName;
								var selectedName = self.NON_BREAKING_SPACE;
								var fieldValue = "";
								var readOnly = data[i].ReadOnly;
								if (self.editCostAssignment) {
									if (self.selectedMainName === fieldName) {
										fieldValue = self.selectedMainCode;
										selectedName = self.selectedMainItem;
									} else {
										if ("selectedChildItems" in self) {
											for (var j = 0; j < self.selectedChildNames.length; j++) {
												if (self.selectedChildNames[j] === fieldName) {
													fieldValue = self.selectedChildCodes[j];
													selectedName = self.selectedChildItems[j];
												}
											}
										}
									}
								}

								var valurforEntry = "";
								var valurforStateText = "";
								if (editdatafroms3 &&
									editdatafroms3.entry) {
									if (editdatafroms3.entry.childItems) {
										var code = editdatafroms3.entry.childCodes[editdatafroms3.entry.childNames
											.indexOf(fieldName)];
										var item = editdatafroms3.entry.childItems[editdatafroms3.entry.childNames
											.indexOf(fieldName)];
										if (code) {
											valurforEntry = item +
												' (' +
												code +
												')';
										}
										if (item) {
											valurforStateText = code;
										}

										if (!valurforEntry) {
											if (fieldName === editdatafroms3.entry.mainName) {
												valurforEntry = editdatafroms3.entry.mainItem +
													' (' +
													editdatafroms3.entry.mainCode +
													')';
												valurforStateText = editdatafroms3.entry.mainCode;
											}
										}

									} else {

										if (fieldName === editdatafroms3.entry.mainName) {
											valurforEntry = editdatafroms3.entry.mainItem +
												' (' +
												editdatafroms3.entry.mainCode +
												')';
											valurforStateText = editdatafroms3.entry.mainCode;
										}
									}
								}

								self.profileFields
									.push({
										name: name,
										selectedName: selectedName,
										fieldName: fieldName,
										listType: "Active",
										labelVisible: true,
										typeVisible: true,
										fieldValue: fieldValue,
										value: valurforEntry,
										valueStateText: valurforStateText,
										ReadOnly: readOnly.toLowerCase() === "true" ? false : true,
										valueHelp: true
									});

								//marking CPR fields as display only
								if (!self.checkDisplayFieldNames(fieldName)) {
									self.profileFields[i].ReadOnly = false;
								}

							}
							accountingInfoModel.setProperty("/types", self.profileFields);
							self.oApplication.setModel(accountingInfoModel, "accountingInfoModel");
							self.oApplication.getModel("createScreenModel").setProperty("/types", self.profileFields);
							self.getView().setModel(accountingInfoModel, "accountingInfoModel");
							self.validateSaveBtnVisibility();

						});

			},

			checkDisplayFieldNames: function(fieldName) {
				var arr = ["DISPTEXT", "CPR_", "LTXA1"];
				/* The possible fields
    "CPR_OBJTEXT", "CPR_OBJGEXTID", "CPR_TEXT", "CPR_EXTID"];*/
				for (var i = 0; i < arr.length; i++) {
					if (fieldName.match(arr[i])) {
						return false;
					}
				}
				return true;
			},

			onDone: function() {
				// clean in-line error message for the entry
				this.entry.showError = false;
				this.entry.error = "";

				this.resetMainAndChildItems();
				var mainItemFound = true;
				this.entry.notes = this.byId("S31TextArea").getValue();

				mainItemFound = false;
				// logic fetching data directly from input fields
				var inputList = this.byId("manualAccountingInfos")
					.getFormElements();
				var value;
				for (var j = 0; j < inputList.length; j++) {
					var key = inputList[j].getFields()[0].getName();
					//var value = inputList[j].getFields()[0].getValue() &&
					// inputList[j].getFields()[0].getValueStateText();
					if (inputList[j].getFields()[0].getValue().split('').indexOf('(') !== -1) {
						value = inputList[j].getFields()[0].getValueStateText();
					} else {
						value = inputList[j].getFields()[0].getValue();
					}
					if (!value) {
						value = inputList[j].getFields()[0]
							.getValue();
					}
					if (value) {
						if (!mainItemFound) {
							this.entry.mainItem = key;
							this.entry.mainName = key;
							this.entry.mainCode = value;
							mainItemFound = true;
						} else {
							if (!this.entry.childItems) {
								this.initializeChildItems();
								this.childItemsInitialized = true;
							}
							this.entry.childItems.push(key);
							this.entry.childNames.push(key);
							this.entry.childCodes.push(value);
						}
					}
				}

				if ("childItems" in this.entry) {
					if (this.entry.childItems.length > 1) {
						this.entry.subItems = this.entry.childItems
							.join(", ");
					} else if (this.entry.childItems.length === 1) {
						this.entry.subItems = this.entry.childItems[0];
					}
				}

				// Do something only if a mainItem exist.
				if (mainItemFound || this.worklistItemSelected) {
					this.onSubmit();
				} else {
					this.initializeChildItems();
				}
			},

			onSubmit: function() {
				// clean in-line error message for the entry
				this.entry.showError = false;
				this.entry.error = "";
				this.entry.rejectionReason = "";

				// return original data with the new/edited entry
				this.updatePageData();

			},

			updatePageData: function() {
				// Prepare entry
				var calendarRef = this.byId("weeklyCalendar");
				var selectedDates = calendarRef.getSelectedDates();
				//   var oModel = this.oApplication.getModel("TSM_WEEKLY");
				this.entry.selectedDate = selectedDates;
				if (!this.isClockEntry() || this.clkTimeDurationFilled) { //Note:Begin 2141131 clock time duration field
					var lvDuration;
					if (!this.clkTimeDurationFilled) {
						lvDuration = this.byId("decimalTimeEntryValue").getValue();
					} else {
						lvDuration = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
					} //Note:End 2141131 clock time duration field
					if (lvDuration.indexOf(",") > 0) {
						lvDuration = lvDuration.replace(",", ".");
					}
					this.entry.time = lvDuration;
				} else {

					var startTime = this.byId("startTime").getDateValue(),
						endTime = this.byId("endTime").getDateValue();

					this.entry.startTime = this
						.convertTime(startTime);
					this.entry.endTime = this.convertTime(endTime);

					var durationInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

					this.entry.hours = parseInt(
						(durationInMinutes / 60), 10);
					this.entry.minutes = durationInMinutes % 60;

					this.entry.time = "0.0";
				}

				this.entry.hasNotes = (this.entry.notes && this.entry.notes.length > 0) ? true : false;

				this.submitToOdata();

			},
			convertTime: function(date) {
				var timeFormat = sap.ui.core.format.DateFormat
					.getTimeInstance({
						pattern: "HHmmss"
					});
				return timeFormat.format(date);
			},

			formatAMPM: function(date) {
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var ampm = hours >= 12 ? 'PM' : 'AM';
				hours = hours % 12;
				hours = hours ? hours : 12; // the hour '0' should be '12'
				minutes = minutes < 10 ? '0' + minutes : minutes;
				var strTime = hours + ':' + minutes + ' ' + ampm;
				return strTime;
			},

			submitToOdata: function() {
				var self = this,
					calendarRef = this.byId('weeklyCalendar'),
					selectedDates = calendarRef.getSelectedDates(),
					oSettings, timeFormatterShort;
				this.errors = null;
				var confirmationDialog = null,
					i = 0,
					startTime, endTime, summaryHoursText, decimalTimeEntryValue, formattedDecimal, popupHeader, popupTitle;
				if (this.isClockEntry() && !this.clkTimeDurationFilled) { //Note: 2141131 clock time duration field
					startTime = this.byId("startTime").getDateValue();
					endTime = this.byId("endTime").getDateValue();
				} //Note:Begin 2141131 clock time duration field				  
				if (!this.isClockEntry() || this.clkTimeDurationFilled) {
					if (this.clkTimeDurationFilled) {
						decimalTimeEntryValue = this.getView().byId("ClkTimeDecimalTimeEntryValue").getValue();
					} else {
						decimalTimeEntryValue = this.getView().byId("decimalTimeEntryValue").getValue();
					} //Note:Begin 2141131 clock time duration 
					if (decimalTimeEntryValue.indexOf(",") > (-1)) {
						decimalTimeEntryValue = decimalTimeEntryValue.replace(",", ".");
					}
					decimalTimeEntryValue = parseFloat(decimalTimeEntryValue);
					decimalTimeEntryValue = decimalTimeEntryValue.toFixed(2);
					formattedDecimal = sap.ca.ui.model.format.NumberFormat.getInstance({
						style: 'standard'
					}).format(decimalTimeEntryValue);
					summaryHoursText = formattedDecimal;
				}
				if (!this.releaseAllowed) {
					popupHeader = this.oBundle
						.getText('DRAFT_CONFIRMATION_SUMMARY');
					popupTitle = this.oConfiguration
						.getText("DRAFT_CONFIRMATION");
				} else {
					popupHeader = this.oBundle.getText('SUBMISSION_CONFIRMATION_SUMMARY');
					popupTitle = this.oConfiguration.getText("SUBMISSION_CONFIRMATION");
				}

				timeFormatterShort = sap.ca.ui.model.format.DateFormat.getTimeInstance({
					style: "short"
				});
				if (this.isClockEntry() && !this.clkTimeDurationFilled) { //Note: 2141131 clock time duration field
					if (this.byId("startTime").getDisplayFormat() === "hh:mm a" || this.byId("startTime").getDisplayFormat() === "h:mm a") {
						startTime = this.formatAMPM(startTime);
						endTime = this.formatAMPM(endTime);
					} else {
						startTime = timeFormatterShort.format(startTime);
						endTime = timeFormatterShort.format(endTime);
					}

					oSettings = {
						question: popupHeader,
						additionalInformation: [
							{
								label: this.oBundle
									.getText('DELETE_CONFIRMATION_SUMMARY_ENTRIES'),
								text: selectedDates.length.toString()
       },
							{
								label: this.oBundle
									.getText('START_TIME'),
								text: startTime

       },
							{
								label: this.oBundle
									.getText('END_TIME'),
								text: endTime
       }],
						showNote: false,
						title: popupTitle,
						confirmButtonLabel: this.oBundle.getText("OK")
					};

				} else {

					oSettings = {
						question: popupHeader,
						additionalInformation: [
							{
								label: this.oBundle
									.getText('DELETE_CONFIRMATION_SUMMARY_ENTRIES'),
								text: selectedDates.length.toString()
       },
							{
								label: this.oBundle
									.getText('DURATION'),
								text: summaryHoursText
       }],
						showNote: false,
						title: popupTitle,
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				}

				this.openConfirmationPopup(
					oSettings,
					function(response) {

						var batchCreate = [],
							workdate = "";
						var operation = (self.oApplication.getModel("S31modelexch").getData().editentryview) ? "U" : "C";
						if (selectedDates.length !== 0) {

							for (i = 0; i < selectedDates.length; i++) {
								self.entry = self.replaceSpecialChar(self.entry);
								workdate = self.getDateTimeStr(new Date(selectedDates[i]));

								batchCreate
									.push(self
										.setPostObject(
											self.entry.counter,
											operation,
											workdate,
											self.entry.time,
											self.entry.mainName,
											self.entry.mainCode,
											self.entry.notes,
											self.entry.startTime,
											self.entry.endTime,
											self.entry.subItems,
											self.entry.childCodes,
											self.entry.childNames));

							}

						}
						if (batchCreate.length === 0) {
							//   sap.ui.getCore().lock();
							confirmationDialog.close();

						} else {

							self.oService
								.submitTimeEntry(
									self,
									batchCreate, [], [],
									function() {
										var toastMsg;
										if (!self.releaseAllowed) {
											toastMsg = self.oBundle
												.getText("DRAFT_SUCCESS");
										} else {
											toastMsg = self.oBundle.getText("SUBMIT_SUCCESS");
										}

										var calendar = self.byId("weeklyCalendar");
										var selectedDate = calendar.getCurrentDate();
										var dateStr = selectedDate;
										selectedDate = dateStr + "offset" + calendar.getFirstDayOffset();
										var oModel = new sap.ui.model.json.JSONModel();
										oModel.setProperty("/currentDate", new Date(dateStr));
										self.oApplication.setModel(oModel, "S3exchangeModel");
										delete self.entry;
										//navigate to S3
										self.cleanUpOnBack();
										self.oRouter.navTo("S3", {
											context: selectedDate
										}, true);
										sap.m.MessageToast.show(toastMsg);

									},
									function(hasError, errorDates) {
										var weeklyCal = self.byId("weeklyCalendar");
										weeklyCal.unselectAllDates();
										weeklyCal.toggleDatesSelection(errorDates, true);
									});
						}
					});

			},

			openConfirmationPopup: function(oSettings, successHandler) {
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
							successHandler();
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

			replaceAllOccurances: function(iString) {
				if (typeof iString === "undefined") {
					return;
				}
				var vSearch = '/';
				var vReplace = '-';
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

			getPostData: function(day, entry) {
				var post = {};
				post.day = day;
				post.entry = entry;
				return post;
			},

			setPostObject: function(Counter, TimeEntryOperation,
				WORKDATE, CATSAMOUNT, Name, Code, notes, startTime,
				endTime, subItems, childCodes, childNames) {
				var timeEntryUpdated = {
					Pernr: this.oApplication.pernr,
					Counter: Counter,
					TimeEntryOperation: TimeEntryOperation,
					TimeEntryDataFields: {
						WORKDATE: WORKDATE,
						CATSAMOUNT: "" + CATSAMOUNT
					}

				};
				if (this.isClockEntry()) {
					timeEntryUpdated.TimeEntryDataFields.BEGUZ = startTime;
					timeEntryUpdated.TimeEntryDataFields.ENDUZ = endTime;
				}

				// always send as blank
				timeEntryUpdated.TimeEntryRelease = " ";

				/*
				 * if(this.releaseAllowed){
				 * timeEntryUpdated.TimeEntryRelease = " "; }else{
				 * timeEntryUpdated.TimeEntryRelease = "X"; }
				 */
				if (Name) {
					if (Name.indexOf("-") >= 0) {
						Name = Name.split("-").join("/");
					}

					if (this.checkFieldName(Name) === true) {
						timeEntryUpdated.TimeEntryDataFields[Name] = Code;
					}
				}
				if (subItems && subItems !== "") {
					for (var i = 0; i < childNames.length; i++) {
						if (childNames[i].indexOf("-") >= 0) {
							childNames[i] = childNames[i].split("-").join("/");
						}
						if (this.checkFieldName(childNames[i]) === true) {
							timeEntryUpdated.TimeEntryDataFields[childNames[i]] = childCodes[i];
						}
					}
				}
				if (this.worklistItemSelected) {
					timeEntryUpdated.TimeEntryDataFields = this.addWorklistFields(timeEntryUpdated.TimeEntryDataFields);
				}
				if (notes && notes !== "") {
					timeEntryUpdated.TimeEntryDataFields.LONGTEXT_DATA = notes;
					timeEntryUpdated.TimeEntryDataFields.LONGTEXT = "X";

				}
				if(timeEntryUpdated.TimeEntryDataFields.hasOwnProperty("SPLIT")){
					timeEntryUpdated.TimeEntryDataFields.SPLIT = parseInt(timeEntryUpdated.TimeEntryDataFields.SPLIT,10);
				}
				/**
				 * @ControllerHook Modify the post object
				 * This hook method can be used to modify the object before the post call
				 * It is called when the decision options for the detail item are fetched successfully
				 * @callback hcm.mytimesheet.view.S31~extHookChangeObjectBeforePost
				 * @param {object} Post Object
				 * @return {object} Final Post Object
				 */

				if (this.extHookChangeObjectBeforePost) {
					timeEntryUpdated = this.extHookChangeObjectBeforePost(timeEntryUpdated);
				}

				return timeEntryUpdated;
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

			addWorklistFields: function(obj) {
				for (var worklistField in this.worklistSelectedObj) {
					if (obj.hasOwnProperty(worklistField) || obj[worklistField] === "LTXA1" ) {
						continue;
					} else {
						obj[worklistField] = this.worklistSelectedObj[worklistField];
					}
				}
				return obj;
			},

			parseDateYYYYMMdd: function(dateString) {
				var dateParse = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "YYYYMMdd"
				});
				return dateParse.parse(dateString);
			},

			onCancel: function() {
				var calendar = this.byId("weeklyCalendar");
				var selectedDate = calendar.getCurrentDate();
				var dateStr = selectedDate;
				selectedDate = dateStr + "offset" + calendar.getFirstDayOffset();
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setProperty("/currentDate", new Date(dateStr));
				this.oApplication.setModel(oModel, "S3exchangeModel");
				this.cleanUpOnBack();
				delete this.entry;
				//navigate to S3
				this.oRouter.navTo("S3", {
					context: selectedDate
				}, true);

			},

			onReset: function() {
				this.byId("timeAssignment").setValue("");
				this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
				this.byId("decimalTimeEntryValue").setValue("");
				this.byId("startTime").setValue("");
				this.byId("endTime").setValue("");
				this.byId("weeklyCalendar").setDisabledWeekDays([]);
				this.byId("weeklyCalendar").unselectAllDates();
				this.byId("S31TextArea").setValue("");
				this.byId("ClkTimeDecimalTimeEntryValue").setValue(""); //Note: Begin 2141131 clock time duration field
				this.byId("ClkTimeDecimalTimeEntryValue").setEnabled(true);
				this.setBtnEnabled("SUBMIT_BTN", false); //Note: End 2141131 clock time duration field
				delete this.worklistSelectedObj;
				this.worklistSelectedObj = {};
				this.worklistItemSelected = false;
				var types = this.oApplication.getModel("accountingInfoModel").getData().types;
				for (var i = 0; i < types.length; i++) {
					if (types[i].value !== "" || types[i].valueStateText !== "") {
						types[i].value = "";
						types[i].valueStateText = "";
					}
				}
				//Note: Begin 2141131 clock time duration field
				if (this.isClockEntry() && this.byId("ClkTimeDecimalTimeEntryValue").getVisible()) {
					this.entry.startTime = "000000";
					this.entry.endTime = "000000";
					this.entry.time = "";
				}
				//Note: End 2141131 clock time duration field
				// this.byId("accountingInfoPanel").setExpanded(false);
				this.getView().getModel().setProperty("/types", types);
				this.oApplication.getModel("accountingInfoModel").setProperty("/types", types);

			},

			openEditfavDialog: function() {
				if (!this.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
					this.getFavoritesCollection();
				}
				var itemTemplate = new sap.ui.core.Item({
					text: "{name}",
					key: "{id}"
				});
				this.editFavForm = new sap.ui.layout.form.Form({
					maxContainerCols: 2,
					layout: new sap.ui.layout.form.ResponsiveGridLayout({
						labelSpanL: 4,
						emptySpanL: 3,
						labelSpanM: 4,
						emptySpanM: 2,
						columnsL: 1,
						columnsM: 1
					}),
					formContainers: new sap.ui.layout.form.FormContainer({
						formElements: [
                       new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									text: this.oBundle.getText("EXISTING_FAV_NAME")
								}),
								fields: new sap.m.Select().bindAggregation("items", "/favorites", itemTemplate)
							}),
                   new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									text: this.oBundle.getText("NEW_FAVORITE_NAME")
								}),
								fields: new sap.m.Input({
									liveChange: [this.validateEditFavSaveBtn, this],
									maxLength: 30
								})
							})
               ]
					})
				}).setModel(this.oApplication.getModel("createScreenModel"));

				this.editFavDialog = new sap.m.Dialog({
					title: this.oBundle.getText("EDIT_FAVORITE"),
					content: [
                            this.editFavForm
               ],
					beginButton: new sap.m.Button({
						text: this.oBundle.getText("SAVE"),
						enabled: false,
						press: [this.updateFavorites, this]
					}),
					endButton: new sap.m.Button({
						text: this.oBundle.getText("CANCEL"),
						press: jQuery.proxy(function() {
							this.editFavDialog.close();
						}, this)
					}),
					afterClose: jQuery.proxy(function() {
						this.editFavDialog.destroy();
					}, this)
				});
				this.editFavDialog.addStyleClass("sapUiContentPadding");
				this.editFavDialog.open();

			},
			validateEditFavSaveBtn: function(event) {
				var newFavName = event.getParameters("value");
				var oldFavName = this.editFavForm.getFormContainers()[0].getFormElements()[0].getFields()[0].getSelectedKey();
				if (!newFavName.value || oldFavName === "") {
					this.editFavDialog.getBeginButton().setEnabled(false);
				} else {
					this.editFavDialog.getBeginButton().setEnabled(true);
				}

			},
			openFavDialog: function() {

				var form = new sap.ui.layout.form.Form({
					maxContainerCols: 2,
					layout: new sap.ui.layout.form.ResponsiveGridLayout({
						labelSpanL: 4,
						emptySpanL: 3,
						labelSpanM: 4,
						emptySpanM: 2,
						columnsL: 1,
						columnsM: 1
					}),
					formContainers: new sap.ui.layout.form.FormContainer({
						formElements: [
                       new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									text: this.oBundle.getText("FAVORITE_NAME")
								}),
								fields: new sap.m.Input({
									liveChange: [this.validateSaveFavSaveBtn, this],
									maxLength: 30
								})
							}),
                   new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									// 	text: this.oBundle.getText("NEW_FAVORITE_NAME")
								}),
								fields: new sap.m.CheckBox({
									text: this.oBundle.getText("SAVE_FAVORITE_WITH_TIME")
								})
							})
               ]
					})
				});
				this.favDialog = new sap.m.Dialog({
					title: this.oBundle.getText("ADD_FAVORITE"),
					type: "Message",
					content: [form],
					beginButton: new sap.m.Button({
						text: this.oBundle.getText("SAVE"),
						enabled: false,
						press: jQuery.proxy(this.addFavorite, this)
					}),
					endButton: new sap.m.Button({
						text: this.oBundle.getText("CANCEL"),
						press: jQuery.proxy(function() {
							this.favDialog.close();
						}, this)
					}),
					afterClose: jQuery.proxy(function() {
						this.favDialog.destroy();
					}, this)
				});
				this.favDialog.addStyleClass("sapUiContentPadding");
				this.favDialog.open();
			},

			validateSaveFavSaveBtn: function(oEvent) {
				var favName = oEvent.getParameter("value");
				if (favName.trim() !== "") {
					this.favDialog.getBeginButton().setEnabled(true);
				} else {
					this.favDialog.getBeginButton().setEnabled(false);
				}
			},

			addFavorite: function() {
				var favObj, self = this;

				//validate entries
				// var name = this.byId("favName").getValue();
				var name = this.favDialog.getContent()[0].getFormContainers()[0].getFormElements()[0].getFields()[0].getValue();
				var withTime = this.favDialog.getContent()[0].getFormContainers()[0].getFormElements()[1].getFields()[0].getSelected();

				favObj = this.setFavoritePostObject(name);
				var toastMsg;
				if (name === "") {
					toastMsg = this.oBundle.getText("FAV_NAME_ERROR");
					sap.m.MessageToast.show(toastMsg);
				} else if (favObj === null) {
					toastMsg = this.oBundle.getText("FAV_DATA_ERROR");
					sap.m.MessageToast.show(toastMsg);
				} else {
					if (withTime) {
						var time = this.byId("decimalTimeEntryValue").getValue();
						var begda = this.byId("startTime").getValue(),
							endda = this.byId("endTime").getValue(); //Note: Begin 2141131 clock time duration field
						if (!this.isClockEntry() || this.clkTimeDurationFilled) {
							if (this.clkTimeDurationFilled) {
								time = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
							} //Note: End 2141131 clock time duration field
							if (time === "" || !this._isValidDecimalNumber(time)) {
								toastMsg = this.oBundle.getText("FAV_TIME_ERROR");
								sap.m.MessageToast.show(toastMsg);
								return;
							} else {
								favObj.FavoriteDataFields.CATSHOURS = time;
							}
						} else {
							if (begda === "" || endda === "" || begda === endda) {
								toastMsg = this.oBundle.getText("FAV_CLOCK_TIME_ERROR");
								sap.m.MessageToast.show(toastMsg);
								return;
							} else {
								favObj.FavoriteDataFields.BEGUZ = begda;
								favObj.FavoriteDataFields.ENDUZ = endda;
							}
						}
					}
					if (!this.oService) {
						this.oService = new hcm.mytimesheet.Service();
					}
					this.oService.createFavorite(this, favObj, function(oData) {
						var newFav = {
							name: oData.Name,
							type: oData.ObjType,
							id: oData.ID,
							FavoriteDataFields: oData.FavoriteDataFields,
							childs: [],
							info: "",
							subText: oData.Field_Text,
							active: true
						};
						var FavDataFields = newFav.FavoriteDataFields;
						var favorites = self.oApplication.getModel("createScreenModel").getProperty("/favorites");
						for (var prop in favObj.FavoriteDataFields) {
							if (prop !== "CATSHOURS" && prop !== "BEGUZ" && prop !== "ENDUZ") {
								FavDataFields[prop] = favObj.FavoriteDataFields[prop];
								newFav.childs
									.push({
										name: prop,
										value: FavDataFields[prop]
									});
							} else {
								if (self.isClockEntry() && !self.clkTimeDurationFilled) { //Note: 2141131 clock time duration field
									var timeParser = sap.ca.ui.model.format.DateFormat.getTimeInstance({
										pattern: "HHmm"
									});
									var timeFormatter = sap.ca.ui.model.format.DateFormat.getTimeInstance({
										style: "short"
									});
									begda = timeParser.parse(begda);
									begda = timeFormatter.format(begda);
									endda = timeParser.parse(endda);
									endda = timeFormatter.format(endda);
								}
								FavDataFields[prop] = favObj.FavoriteDataFields[prop];
								switch (prop) {
									case "CATSHOURS":
										newFav.info = self.oBundle.getText("TOTAL_RECORDED_HOURS", [favObj.FavoriteDataFields.CATSHOURS]);
										break;
									case "BEGUZ":
									case "ENDUZ":
										newFav.info = self.oBundle.getText("WEEK_DATE_RANGE", [begda, endda]);
								}
							}
						}
						if (!oData.Field_Text) {
							var childs = newFav.childs,
								subText = "";
							for (var j = 0; j < childs.length; j++) {
								subText += childs[j].name + ":" + childs[j].value + ",";
							}
							subText = subText.substring(0, subText.length - 1);
							newFav.subText = subText;
						}
						favorites.push(newFav);
						self.byId("timeAssignmentLbl").setVisible(true);
						self.byId("timeAssignment").setVisible(true);
						self.favDialog.close();
						self.oApplication.getModel("createScreenModel").refresh();
					});

				}
			},

			updateFavorites: function() {
				var favObj = {};
				var i;
				// var types = this.getView().getModel().getData().types;
				favObj.Name = this.editFavDialog.getContent()[0].getFormContainers()[0].getFormElements()[1].getFields()[0].getValue();
				var oldFavName = this.editFavDialog.getContent()[0].getFormContainers()[0].getFormElements()[0].getFields()[0].getSelectedItem().getText();
				var favorites = this.oApplication.getModel("createScreenModel").getProperty("/favorites");
				favObj.Pernr = this.oApplication.pernr;
				for (i = 0; i < favorites.length; i++) {
					if (oldFavName === favorites[i].name) {
						favObj.ID = favorites[i].id;
						favorites[i].name = favObj.Name; //Update the favorite name
						if (oldFavName === this.byId("timeAssignment").getValue()) {
							//update the fav name in the main view , if the fav name being changed in the edit fav dialog is the same as the one selected in the main view
							this.byId("timeAssignment").setValue(favObj.Name);
						}
						break;
					}
				}

				if (!this.oService) {
					this.oService = new hcm.mytimesheet.Service();
				}
				this.oService.updateFavorite(this, favObj, jQuery.proxy(function() {
					this.oApplication.getModel("createScreenModel").setProperty("/favorites", favorites);
					this.oApplication.getModel("createScreenModel").refresh();
					this.editFavDialog.close();
				}, this));
			},

			setFavoritePostObject: function(name) {
				var favObj, favName, favoriteDataFields, value;

				favObj = {};
				favoriteDataFields = {};

				//set the FavoriteDataFields
				var types = this.oApplication.getModel("accountingInfoModel").getData().types;
				//set the name
				// favName = this.byId("favName").getValue();
				favName = name;
				var flag = false;
				for (var i = 0; i < types.length; i++) {
					value = "";
					if (types[i].value !== "" && types[i].valueStateText !== "") {
						if (types[i].value !== "") {
							value = types[i].valueStateText;
							flag = true;
						}
						favoriteDataFields[types[i].fieldName] = value;
					}
				}
				if (flag) {
					//set the object
					favObj = {
						Pernr: this.oApplication.pernr,
						Name: favName,
						FavoriteDataFields: favoriteDataFields
					};
				} else {
					favObj = null;
				}
				return favObj;

			},
			handleDelete: function(evt) {
				var self = this;
				var selectedItem = evt.getParameter("listItem");
				var selectedId = selectedItem.getCustomData()[2].getValue();
				if (!this.oService) {
					this.oService = new hcm.mytimesheet.Service();
				}
				var favObj = {
					Name: evt.getParameter("listItem").getTitle(),
					ID: selectedId,
					Pernr: this.oApplication.pernr
				};

				this.oService.deleteFavorite(this, favObj, function() {
					evt.getSource().removeItem(selectedItem);
					self.favoriteDeletedIds.push(selectedId);

				});

			},

			editFavorites: function(oEvent) {
				var self = this;
				var manageBtn = new sap.m.Button({
					text: self.oBundle.getText("DELETE_FAVORITES"),
					press: function(oEvent) {
						self.manageFavorites(oEvent);
						self.oApplication.getModel("createScreenModel").refresh();
						self.actionSheet.close();
					}
				});
				var EditFavBtn = new sap.m.Button({
					text: self.oBundle.getText("EDIT_FAVORITE"),
					press: function(oEvent) {
						self.openEditfavDialog(oEvent);
						self.actionSheet.close();
					}
				});
				var saveAsFavBtn = new sap.m.Button({
					text: self.oBundle.getText("SAVE_AS_FAV"),
					press: function(oEvent) {
						self.openFavDialog();
						self.actionSheet.close();
					}
				});

				var oActionSheet = new sap.m.ActionSheet({

					placement: sap.m.PlacementType.Top,

					showCancelButton: true,

					buttons: [EditFavBtn, manageBtn, saveAsFavBtn]

				});
				oActionSheet.openBy(oEvent.getSource());
				this.actionSheet = oActionSheet;
			},

			//delete favorites
			manageFavorites: function() {

				var self = this;
				var beginBtn = new sap.m.Button({
					text: this.oBundle.getText("OK")
				});
				if (!this.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
					this.getFavoritesCollection();
				}
				var itemTemplate = new sap.m.StandardListItem({
					title: "{name}",
					description: "{subText}",
					active: "true",
					info: "{info}",
					customData: [
           new sap.ui.core.CustomData({
							key: "items",
							value: "{childs}"
						}),
           new sap.ui.core.CustomData({
							key: "type",
							value: "{type}"
						}),
           new sap.ui.core.CustomData({
							key: "id",
							value: "{id}"
						})
           ]
				});
				this.favList = new sap.m.List({
					mode: "Delete"
				}).bindAggregation("items", "/favorites", itemTemplate);
				this.favList.attachDelete(function(evt) {
					self.handleDelete(evt);
				});

				var confirmDialog = new sap.m.Dialog({
					title: this.oBundle.getText("FAV_DIALOG_BOX"),
					content: [
                this.favList
                     ],
					beginButton: beginBtn,
					afterClose: jQuery.proxy(function() {
						confirmDialog.destroy();
					}, this)
				});
				confirmDialog.setModel(this.oApplication.getModel("createScreenModel"));
				beginBtn.attachPress(function() {
					if (self.favoriteDeletedIds.length) {
						var ids = [],
							idCounter = 0;
						var favorites = self.oApplication.getModel("createScreenModel").getProperty("/favorites");
						for (idCounter = 0; idCounter < self.favoriteDeletedIds.length; idCounter++) {
							for (var i = 0; i < favorites.length; i++) {
								if (self.favoriteDeletedIds[idCounter] === favorites[i].id) {
									ids.push(i);
									break;
								}
							}
						}
						ids.sort(function(a, b) {
							return b - a;
						});

						for (i = 0; i < ids.length; i++) {
							favorites.splice(ids[i], 1);
						}
						// self.oApplication.getModel("createScreenModel").setProperty("/favorites", favorites);
						self.favoriteDeletedIds = [];
					}
					confirmDialog.close();
				});
				confirmDialog.open();

			},

			isClockEntry: function() {
				return this.clockEntry;
			},

			resetMainAndChildItems: function() {
				if ("mainItem" in this.entry) {
					this.deleteMainItem();
				}
				if ("subItems" in this.entry) {
					this.deleteSubItems();
				}
			},

			deleteMainItem: function() {
				delete this.entry.mainItem;
				delete this.entry.mainName;
				delete this.entry.mainCode;
			},

			deleteSubItems: function() {
				delete this.entry.subItems;
				delete this.entry.childItems;
				delete this.entry.childNames;
				delete this.entry.childCodes;
			},

			initializeChildItems: function() {
				this.entry.childItems = [];
				this.entry.childNames = [];
				this.entry.childCodes = [];
			},
			getHderFooterOptions: function() {
				if (this.oApplication.pernr) {
					var cancelBtnText = this.oApplicationFacade.getResourceBundle().getText("CANCEL");
					var resetBtnText = this.oApplicationFacade.getResourceBundle().getText("RESET");
					var editFavoriteBtnTxt = this.oApplicationFacade.getResourceBundle().getText("FAVORITE");
					var s3Model = this.oApplication.getModel("S31modelexch");
					var submitButtonText;
					if (!this.oApplication.getModel("TSM_WEEKLY").getData().releaseAllowed) {
						submitButtonText = this.oApplicationFacade
							.getResourceBundle().getText("SAVE_DRAFT");
					} else {
						submitButtonText = this.oApplicationFacade
							.getResourceBundle().getText("SUBMIT");
					}
					var screenTitleText;
					if (!s3Model) {

						screenTitleText = this.oApplicationFacade
							.getResourceBundle().getText(
								"TIMESHEET_CREATE_ENTRY_TITLE");
					} else {
						if (s3Model.getProperty("/editentryview")) {
							screenTitleText = this.oApplicationFacade
								.getResourceBundle()
								.getText(
									"TIMESHEET_EDIT_ENTRY_TITLE_SCREEN");
						} else {
							screenTitleText = this.oApplicationFacade
								.getResourceBundle().getText(
									"TIMESHEET_CREATE_ENTRY_TITLE");
						}
					}
					var that = this;
					var valueforbutton = {
						sId: "SUBMIT_BTN",
						sI18nBtnTxt: submitButtonText,
						onBtnPressed: function(evt) {
							that.onDone(evt);
						}
					};

					var objHdrFtr = {
						sI18NFullscreenTitle: screenTitleText,

						oEditBtn: valueforbutton,

						buttonList: [

							{
								sId: "cancelBtn",
								sI18nBtnTxt: cancelBtnText,
								onBtnPressed: function(evt) {
									that.onCancel(evt);
								}
       },
							{
								sId: "resetBtn",
								sI18nBtnTxt: resetBtnText,
								onBtnPressed: function() {
									that.onReset();
								}
       }

       ],
						onBack: jQuery.proxy(function() {
							this.onNavButton();
						}, this)
					};
					if (this.oApplication.getModel("TSM_WEEKLY").getData().favoriteAvailable) {
						objHdrFtr.buttonList[2] = {
							sId: "EditFavoriteBtn",
							sI18nBtnTxt: editFavoriteBtnTxt,
							onBtnPressed: function(evt) {
								that.editFavorites(evt);
							}
						};
					}
					var m = new sap.ui.core.routing.HashChanger();
					var oUrl = m.getHash();
					if (oUrl.indexOf("Shell-runStandaloneApp") >= 0) {
						objHdrFtr.bSuppressBookmarkButton = true;
					}

					/**
					 * @ControllerHook Modify the footer buttons
					 * This hook method can be used to add and change buttons for the detail view footer
					 * It is called when the decision options for the detail item are fetched successfully
					 * @callback hcm.mytimesheet.view.S31~extHookChangeHeaderFooterOptions
					 * @param {object} Header Footer Object
					 * @return {object} Header Footer Object
					 */

					if (this.extHookChangeHeaderFooterOptions) {
						objHdrFtr = this.extHookChangeHeaderFooterOptions(objHdrFtr);
					}
					// 	return objHdrFtr;
					this.setHeaderFooterOptions(objHdrFtr);
				}
			}
		});