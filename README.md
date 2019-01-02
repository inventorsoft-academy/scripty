# scripty
If you need to send requests to the server bypassing the interceptor, **change your constructor:**
```javascript
constructor(private httpClient: HttpClient) {  }
```

**to the following:**
```javascript
private myHttpClient: HttpClient;
    constructor(private handler: HttpBackend) {
        this.myHttpClient = new HttpClient(this.handler);
    }
```

and you must using `myHttpClient` instead <s>`httpClient`</s>
