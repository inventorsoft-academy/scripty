(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layouts-user-activation-user-activation-module"],{

/***/ "./src/app/layouts/user-activation/reg-confirm/reg-confirm.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/layouts/user-activation/reg-confirm/reg-confirm.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layouts/user-activation/reg-confirm/reg-confirm.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/layouts/user-activation/reg-confirm/reg-confirm.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dHMvdXNlci1hY3RpdmF0aW9uL3JlZy1jb25maXJtL3JlZy1jb25maXJtLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/layouts/user-activation/reg-confirm/reg-confirm.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/layouts/user-activation/reg-confirm/reg-confirm.component.ts ***!
  \******************************************************************************/
/*! exports provided: RegConfirmComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegConfirmComponent", function() { return RegConfirmComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_activation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user-activation.service */ "./src/app/layouts/user-activation/user-activation.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegConfirmComponent = /** @class */ (function () {
    function RegConfirmComponent(route, router, userActivationService) {
        this.route = route;
        this.router = router;
        this.userActivationService = userActivationService;
    }
    RegConfirmComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParamMap
            .subscribe(function (queryParams) {
            _this.token = queryParams.get('token');
            _this.activateUser(_this.token);
        });
    };
    RegConfirmComponent.prototype.activateUser = function (token) {
        var _this = this;
        this.userActivationService.activateUser(token)
            .subscribe(function () {
            _this.router.navigate(['login']);
        }, function (error) {
            if (error.status === 400 && error.error.response === 'Wrong link') {
                _this.router.navigate(['/']);
            }
            if (error.status === 400 && error.error.response === 'Time of user verification link has expired') {
                _this.router.navigate(['userActivation/resend']);
            }
        });
    };
    RegConfirmComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reg-confirm',
            template: __webpack_require__(/*! ./reg-confirm.component.html */ "./src/app/layouts/user-activation/reg-confirm/reg-confirm.component.html"),
            styles: [__webpack_require__(/*! ./reg-confirm.component.scss */ "./src/app/layouts/user-activation/reg-confirm/reg-confirm.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _user_activation_service__WEBPACK_IMPORTED_MODULE_2__["UserActivationService"]])
    ], RegConfirmComponent);
    return RegConfirmComponent;
}());



/***/ }),

/***/ "./src/app/layouts/user-activation/resend-email/resend-email.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/layouts/user-activation/resend-email/resend-email.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form class=\"form\" [formGroup]=\"form\">\r\n  <label for=\"emailInput\">Time of your verification link has expired.\r\n    Please enter email to resend:</label>\r\n  <div class=\"form-row\">\r\n    <input class=\"form-row__input\" id=\"emailInput\" type=\"email\" formControlName=\"email\">\r\n  </div>\r\n  <mat-error *ngIf=\"form.get('email').touched && form.get('email').invalid\">\r\n    Enter correct email\r\n  </mat-error>\r\n  <button mat-raised-button\r\n          type=\"button\"\r\n          (click)=\"onSubmit()\"\r\n          [disabled]=\"form.invalid || form.pristine\">Send\r\n  </button>\r\n</form>"

/***/ }),

/***/ "./src/app/layouts/user-activation/resend-email/resend-email.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/layouts/user-activation/resend-email/resend-email.component.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".title {\n  line-height: 25px; }\n\nbutton {\n  margin-top: 10px;\n  display: block; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0cy91c2VyLWFjdGl2YXRpb24vcmVzZW5kLWVtYWlsL0Q6XFxQcm9ncmFtbWluZ1xcSmF2YVxcc2NyaXB0eVxcZnJvbnRlbmQvc3JjXFxhcHBcXGxheW91dHNcXHVzZXItYWN0aXZhdGlvblxccmVzZW5kLWVtYWlsXFxyZXNlbmQtZW1haWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBaUIsRUFDbEI7O0FBQ0Q7RUFDRSxpQkFBZ0I7RUFDaEIsZUFBYyxFQUNmIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0cy91c2VyLWFjdGl2YXRpb24vcmVzZW5kLWVtYWlsL3Jlc2VuZC1lbWFpbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aXRsZSB7XHJcbiAgbGluZS1oZWlnaHQ6IDI1cHg7XHJcbn1cclxuYnV0dG9uIHtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/layouts/user-activation/resend-email/resend-email.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/layouts/user-activation/resend-email/resend-email.component.ts ***!
  \********************************************************************************/
/*! exports provided: ResendEmailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResendEmailComponent", function() { return ResendEmailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _user_activation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user-activation.service */ "./src/app/layouts/user-activation/user-activation.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ResendEmailComponent = /** @class */ (function () {
    function ResendEmailComponent(userActivationService, router) {
        this.userActivationService = userActivationService;
        this.router = router;
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email])
        });
    }
    ResendEmailComponent.prototype.onSubmit = function () {
        var _this = this;
        this.userActivationService.resendEmail(this.form.get('email').value)
            .subscribe(function (response) {
            if (response && response.response === 'Please complete the registration first!') {
                _this.router.navigate(['signup']);
            }
            else {
                _this.router.navigate(['login']);
            }
        }, function (error) {
            console.log(error);
        });
    };
    ResendEmailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-resend-email',
            template: __webpack_require__(/*! ./resend-email.component.html */ "./src/app/layouts/user-activation/resend-email/resend-email.component.html"),
            styles: [__webpack_require__(/*! ./resend-email.component.scss */ "./src/app/layouts/user-activation/resend-email/resend-email.component.scss")]
        }),
        __metadata("design:paramtypes", [_user_activation_service__WEBPACK_IMPORTED_MODULE_2__["UserActivationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], ResendEmailComponent);
    return ResendEmailComponent;
}());



/***/ }),

/***/ "./src/app/layouts/user-activation/user-activation.component.html":
/*!************************************************************************!*\
  !*** ./src/app/layouts/user-activation/user-activation.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"user-activation\">\r\n  <div class=\"main-part\">\r\n    <router-outlet></router-outlet>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/layouts/user-activation/user-activation.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/layouts/user-activation/user-activation.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".user-activation {\n  width: 100%;\n  height: 100%;\n  padding-top: 15px;\n  background-color: #1f252d; }\n\n.main-part {\n  margin: 0 auto;\n  width: 100%;\n  max-width: 300px;\n  color: #fff; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0cy91c2VyLWFjdGl2YXRpb24vRDpcXFByb2dyYW1taW5nXFxKYXZhXFxzY3JpcHR5XFxmcm9udGVuZC9zcmNcXGFwcFxcbGF5b3V0c1xcdXNlci1hY3RpdmF0aW9uXFx1c2VyLWFjdGl2YXRpb24uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2xheW91dHMvdXNlci1hY3RpdmF0aW9uL0Q6XFxQcm9ncmFtbWluZ1xcSmF2YVxcc2NyaXB0eVxcZnJvbnRlbmQvc3JjXFxhc3NldHNcXHNjc3NcXF92YXJpYWJsZXMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLFlBQVc7RUFDWCxhQUFZO0VBQ1osa0JBQWlCO0VBQ2pCLDBCQ0xxQixFRE10Qjs7QUFDRDtFQUNFLGVBQWM7RUFDZCxZQUFXO0VBQ1gsaUJBQWdCO0VBQ2hCLFlBQVcsRUFDWiIsImZpbGUiOiJzcmMvYXBwL2xheW91dHMvdXNlci1hY3RpdmF0aW9uL3VzZXItYWN0aXZhdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCJ2YXJpYWJsZXNcIjtcclxuLnVzZXItYWN0aXZhdGlvbiB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHBhZGRpbmctdG9wOiAxNXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xyXG59XHJcbi5tYWluLXBhcnQge1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogMzAwcHg7XHJcbiAgY29sb3I6ICNmZmY7XHJcbn0iLCIkcHJpbWFyeS1jb2xvcjogIzFmMjUyZDtcclxuJHNlY29uZGFyeS1jb2xvcjogIzFiMjAyNztcclxuJGJvcmRlci1jb2xvcjogIzJjMzIzYTtcclxuJGhvdmVyLWNvbG9yOiAjMGY4NGZkOyJdfQ== */"

/***/ }),

/***/ "./src/app/layouts/user-activation/user-activation.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/layouts/user-activation/user-activation.component.ts ***!
  \**********************************************************************/
/*! exports provided: UserActivationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserActivationComponent", function() { return UserActivationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserActivationComponent = /** @class */ (function () {
    function UserActivationComponent() {
    }
    UserActivationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reg-confirmation',
            template: __webpack_require__(/*! ./user-activation.component.html */ "./src/app/layouts/user-activation/user-activation.component.html"),
            styles: [__webpack_require__(/*! ./user-activation.component.scss */ "./src/app/layouts/user-activation/user-activation.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], UserActivationComponent);
    return UserActivationComponent;
}());



/***/ }),

/***/ "./src/app/layouts/user-activation/user-activation.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/layouts/user-activation/user-activation.module.ts ***!
  \*******************************************************************/
/*! exports provided: UserActivationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserActivationModule", function() { return UserActivationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _user_activation_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-activation.component */ "./src/app/layouts/user-activation/user-activation.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _reg_confirm_reg_confirm_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reg-confirm/reg-confirm.component */ "./src/app/layouts/user-activation/reg-confirm/reg-confirm.component.ts");
/* harmony import */ var _resend_email_resend_email_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resend-email/resend-email.component */ "./src/app/layouts/user-activation/resend-email/resend-email.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../material-module */ "./src/app/material-module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    {
        path: '', component: _user_activation_component__WEBPACK_IMPORTED_MODULE_2__["UserActivationComponent"], children: [
            { path: '', redirectTo: '/projects', pathMatch: 'full' },
            { path: 'confirm', component: _reg_confirm_reg_confirm_component__WEBPACK_IMPORTED_MODULE_4__["RegConfirmComponent"], data: { title: 'Registration confirmation' } },
            { path: 'resend', component: _resend_email_resend_email_component__WEBPACK_IMPORTED_MODULE_5__["ResendEmailComponent"], data: { title: 'Resend activation link' } }
        ]
    }
];
var UserActivationModule = /** @class */ (function () {
    function UserActivationModule() {
    }
    UserActivationModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _user_activation_component__WEBPACK_IMPORTED_MODULE_2__["UserActivationComponent"],
                _reg_confirm_reg_confirm_component__WEBPACK_IMPORTED_MODULE_4__["RegConfirmComponent"],
                _resend_email_resend_email_component__WEBPACK_IMPORTED_MODULE_5__["ResendEmailComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _material_module__WEBPACK_IMPORTED_MODULE_7__["MaterialModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]
            ]
        })
    ], UserActivationModule);
    return UserActivationModule;
}());



/***/ }),

/***/ "./src/app/layouts/user-activation/user-activation.service.ts":
/*!********************************************************************!*\
  !*** ./src/app/layouts/user-activation/user-activation.service.ts ***!
  \********************************************************************/
/*! exports provided: UserActivationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserActivationService", function() { return UserActivationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserActivationService = /** @class */ (function () {
    function UserActivationService(httpClient) {
        this.httpClient = httpClient;
    }
    UserActivationService.prototype.activateUser = function (token) {
        return this.httpClient.get('/api/registrationConfirm?token=' + token);
    };
    UserActivationService.prototype.resendEmail = function (email) {
        return this.httpClient.post('/api/user/resendRegistrationToken', {
            'email': email
        });
    };
    UserActivationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UserActivationService);
    return UserActivationService;
}());



/***/ })

}]);
//# sourceMappingURL=layouts-user-activation-user-activation-module.js.map