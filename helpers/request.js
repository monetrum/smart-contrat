'use strict';
const qs = require('querystring');
const http = require('http');
const https = require('https');
const methods = [ 'GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS' ];
const protocols = [ 'http:', 'https:' ];

class Request {
    constructor(url, method, data = { }, headers = { }){
        this.parsedURL = new URL(url);
        this.data = qs.stringify(data);

        if(methods.indexOf(method.toUpperCase()) === -1){
            throw new Error(`method sadece ${methods.join(', ')} olabilir`);
        }

        if(protocols.indexOf(this.parsedURL.protocol) === -1){
            throw new Error(`sadece ${protocols.join(', ')} desteklenir`);
        }

        if(method.toUpperCase() !== 'GET'){
            this.headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': this.data.length
            };
        }

        this.headers = { ...this.headers, ...headers };
        this.request = this.parsedURL.protocol === 'https:' ? https : http;
        this.protocol = this.parsedURL.protocol === 'https:' ? 'https' : 'http';
        this.method = method;
        this.options = {
            hostname: this.parsedURL.hostname,
            port: this.parsedURL.port ? this.parsedURL.port : (this.protocol === 'https' ? 443 : 80),
            path: this.parsedURL.pathname + this.parsedURL.search,
            method: method.toUpperCase(),
            timeout: 30 * 1000,
            headers: this.headers
        };
    }

    async connect(){
        return new Promise(( resolve, reject ) => {
            let request = this.request.request(this.options, (response) => {
                response.setEncoding('utf8');
                if (response.statusCode < 200 || response.statusCode >= 300) {
                    request.abort();
                    request.end();
                    reject(new Error('Data çekme başarısız : ' + response.statusCode));
                    return;
                }

                let buff = '';
                response.on('data', (chunk) => {
                    buff += chunk;
                    if(buff.length > 256 * 1000) {
                        request.abort();
                        reject(new Error('response limiti aşıldı. response limiti maksimum 256kb olabilir'));
                    }
                });

                response.on('end', () => {
                    try {
                        let jsonBuff = JSON.parse(buff);
                        if (jsonBuff.status) {
                            if(jsonBuff.status.toLowerCase === 'success') {
                                if (!('result' in jsonBuff)) {
                                    reject(new Error('status "success" ise result düğümü olmalıdır'));
                                    return;
                                }
                            } else if (jsonBuff.status.toLowerCase === 'error') {
                                if (!jsonBuff.error) {
                                    reject(new Error('status "error" ise error düğümü olmalıdır'));
                                    return;
                                }
                            }

                            resolve(jsonBuff);
                            return;
                        }

                        reject(new Error('Endpointten gelen veri istenilen formatta değil.'));
                    } catch (error) {
                        reject(new Error('Endpointten gelen veri JSON formatında değil : ' + error));
                    }
                });
            });

            request.on('error', (error) => {
                request.abort();
                reject(new Error(error.message));
            });

            request.on('timeout', () => {
                reject(new Error('timeout! ' + this.options.timeout / 1000 + ' seconds expired'));
                request.abort();
            });

            if(this.method.toUpperCase() !== 'GET') {
                request.write(this.data);
            }

            request.end();
        });
    }
}

module.exports = Request;