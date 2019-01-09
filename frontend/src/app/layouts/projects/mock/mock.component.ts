import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {MockService} from './mock.service';
import {Mock} from './mock';
import {ToastService} from '../../../toast.service';


@Component({
    selector: 'app-mock',
    templateUrl: './mock.component.html',
    styleUrls: ['./mock.component.scss']
})
export class MockComponent implements OnInit {
    mockForm: FormGroup;
    statusCodes: { code: number, name: string }[];
    contentTypes: string[];
    charset: string[];
    methods: string[];
    url: string;

    constructor(private formBuilder: FormBuilder, private mockService: MockService, private toast: ToastService) {
        this.url = '';
        this.methods = [
            'GET',
            'POST',
            'PUT'
        ];
        this.charset = [
            'UTF-8',
            'ISO-8859-1',
            'UTF-16'
        ];
        this.contentTypes = [
            'application/json',
            'application/xml',
            'text/html',
            'text/plain'
        ];
        this.statusCodes = [
            {'code': 100, 'name': '100 Continue'},
            {'code': 101, 'name': '101 Switching Protocols'},
            {
                'code': 102,
                'name': '102 Processing'
            }, {'code': 200, 'name': '200 OK'}, {'code': 201, 'name': '201 Created'}, {'code': 202, 'name': '202 Accepted'}, {
                'code': 203,
                'name': '203 Non-Authoritative Information'
            }, {'code': 204, 'name': '204 No Content'}, {'code': 205, 'name': '205 Reset Content'}, {
                'code': 206,
                'name': '206 Partial Content'
            }, {'code': 207, 'name': '207 Multi-Status'}, {'code': 208, 'name': '208 Already Reported'}, {
                'code': 226,
                'name': '226 IM Used'
            }, {'code': 300, 'name': '300 Multiple Choices'}, {'code': 301, 'name': '301 Moved Permanently'}, {
                'code': 302,
                'name': '302 Found'
            }, {'code': 303, 'name': '303 See Other'}, {'code': 304, 'name': '304 Not Modified'}, {
                'code': 305,
                'name': '305 Use Proxy'
            }, {'code': 306, 'name': '306 Switch Proxy'}, {'code': 307, 'name': '307 Temporary Redirect'}, {
                'code': 308,
                'name': '308 Permanent Redirect'
            }, {'code': 400, 'name': '400 Bad Request'}, {'code': 401, 'name': '401 Unauthorized'}, {
                'code': 402,
                'name': '402 Payment Required'
            }, {'code': 403, 'name': '403 Forbidden'}, {'code': 404, 'name': '404 Not Found'}, {
                'code': 405,
                'name': '405 Method Not Allowed'
            }, {'code': 406, 'name': '406 Not Acceptable'}, {'code': 407, 'name': '407 Proxy Authentication Required'}, {
                'code': 408,
                'name': '408 Request Timeout'
            }, {'code': 409, 'name': '409 Conflict'}, {'code': 410, 'name': '410 Gone'}, {
                'code': 411,
                'name': '411 Length Required'
            }, {'code': 412, 'name': '412 Precondition Failed'}, {'code': 413, 'name': '413 Request Entity Too Large'}, {
                'code': 414,
                'name': '414 Request-URI Too Long'
            }, {'code': 415, 'name': '415 Unsupported Media Type'}, {'code': 416, 'name': '416 Requested Range Not Satisfiable'}, {
                'code': 417,
                'name': '417 Expectation Failed'
            }, {'code': 418, 'name': '418 I\'m a teapot'}, {'code': 420, 'name': '420 Enhance Your Calm'}, {
                'code': 422,
                'name': '422 Unprocessable Entity'
            }, {'code': 423, 'name': '423 Locked'}, {'code': 424, 'name': '424 Failed Dependency'}, {
                'code': 425,
                'name': '425 Unordered Collection'
            }, {'code': 426, 'name': '426 Upgrade Required'}, {'code': 428, 'name': '428 Precondition Required'}, {
                'code': 429,
                'name': '429 Too Many Requests'
            }, {'code': 431, 'name': '431 Request Header Fields Too Large'}, {'code': 444, 'name': '444 No Response'}, {
                'code': 449,
                'name': '449 Retry With'
            }, {'code': 450, 'name': '450 Blocked by Windows Parental Controls'}, {
                'code': 499,
                'name': '499 Client Closed Request'
            }, {'code': 500, 'name': '500 Internal Server Error'}, {'code': 501, 'name': '501 Not Implemented'}, {
                'code': 502,
                'name': '502 Bad Gateway'
            }, {'code': 503, 'name': '503 Service Unavailable'}, {'code': 504, 'name': '504 Gateway Timeout'}, {
                'code': 505,
                'name': '505 HTTP Version Not Supported'
            }, {'code': 506, 'name': '506 Variant Also Negotiates'}, {'code': 507, 'name': '507 Insufficient Storage'}, {
                'code': 509,
                'name': '509 Bandwidth Limit Exceeded'
            }, {'code': 510, 'name': '510 Not Extended'}];
    }

    ngOnInit() {
        this.mockForm = this.formBuilder.group({
            status: [200, Validators.required],
            'content-type': ['application/json', Validators.required],
            method: ['GET', Validators.required],
            charset: ['UTF-8', Validators.required],
            body: ['', Validators.required],
            headers: this.formBuilder.array([])
        });
    }

    createHeader(): FormGroup {
        return this.formBuilder.group({
            key: [],
            value: []
        });
    }

    addHeader() {
        (<FormArray>this.mockForm.get('headers')).push(
            this.createHeader()
        );
    }

    createMock() {
        const headers = {};
        this.mockForm.value.headers.forEach(e => {
            headers[e.key] = e.value;
        });
        this.mockService.setMock(<Mock>{...this.mockForm.value, headers}).subscribe(
            data => {
                this.url = data['response'];
            },
            error => {
                this.toast.error(error.error);
            }
        )
        ;
    }

}
