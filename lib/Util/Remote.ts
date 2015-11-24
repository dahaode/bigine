/**
 * 定义远端通信组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Util/Remote.ts
 */

/// <reference path="../E.ts" />
/// <reference path="ENV.ts" />
/// <reference path="ISuccessCallback.ts" />
/// <reference path="IFailureCallback.ts" />
/// <reference path="_iterator.ts" />

declare var XDomainRequest: typeof XMLHttpRequest;

namespace Util {
    var xdrs: any[] = [];

    export namespace Remote {
        /**
         * 格式化。
         */
        export function format(url: string): string {
            return ENV.Protocol + url.replace(/^.+\/\//, '//').replace(/\?.*$/, '');
        }

        /**
         * HTTP GET 远端数据。
         */
        export function get<T>(url: string, onSuccess: ISuccessCallback<T>, onFailure: IFailureCallback): void {
            http<T>(Method.GET, url, {}, onSuccess, onFailure);
        }

        /**
         * HTTP POST 远端数据。
         */
        export function post<T>(url: string, data: IHashTable<number | string>, onSuccess: ISuccessCallback<T>, onFailure: IFailureCallback): void {
            http<T>(Method.POST, url, data, onSuccess, onFailure);
        }

        /**
         * HTTP 请求方法。
         */
        export enum Method {
            GET,
            POST
        };

        /**
         * HTTP 请求远端数据。
         */
        export function http<T>(method: Method, url: string, data: IHashTable<number | string>, onSuccess: ISuccessCallback<T>, onFailure: IFailureCallback): void {
            var qs: string[] = [],
                xhr: XMLHttpRequest;
            if (ENV.Node.JS) {
                xhr = require('./xhr').create();
            } else if ('undefined' != typeof XDomainRequest) {
                xhr = new XDomainRequest();
                xdrs.push(xhr);
            } else
                xhr = new XMLHttpRequest();
            xhr.onload = () => {
                try {
                    var resp: Util.IHashTable<any> = <Util.IHashTable<any>> JSON.parse(xhr.responseText);
                    if ('reason' in resp)
                        throw new E(<string> resp['reason']);
                    if ('status' in xhr && 200 != xhr.status)
                        throw new E(xhr.statusText);
                    onSuccess(resp);
                } catch (error) {
                    onFailure(<Error> error, xhr.status);
                }
            };
            xhr.onprogress = () => {
                //
            };
            xhr.onerror = (event: ErrorEvent) => {
                onFailure(<Error> event.error);
            };
            xhr.ontimeout = () => {
                onFailure(new E(E.UTIL_REMOTE_TIMEOUT));
            };
            xhr.open(Method.GET == method ? 'GET' : 'POST', format(url), true);
            each(data, (value: string | number, key: string) => {
                qs.push(key + '=' + encodeURIComponent(<string> value));
            });
            if (qs.length && 'setRequestHeader' in xhr)
                xhr['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(qs.length ? qs.join('&') : null);
        }
    }
}
