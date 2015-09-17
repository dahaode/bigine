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

namespace Util {
    'use strict';

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
            var xhr: XMLHttpRequest = 'undefined' != typeof XMLHttpRequest ?
                    new XMLHttpRequest() :
                    require('./xhr').create(),
                qs: string[] = [],
                q: string;
            xhr.addEventListener('load', () => {
                try {
                    var resp: Util.IHashTable<any> = <Util.IHashTable<any>> JSON.parse(xhr.responseText);
                    if ('reason' in resp)
                        throw new E(<string> resp['reason']);
                    if (200 != xhr.status)
                        throw new E(xhr.statusText);
                    onSuccess(resp);
                } catch (error) {
                    onFailure(<Error> error, xhr.status);
                }
            });
            xhr.addEventListener('error', (event: ErrorEvent) => {
                onFailure(<Error> event.error);
            });
            xhr.open(Method.GET == method ? 'GET' : 'POST', format(url), true);
            each(data, (value: string | number, key: string) => {
                qs.push(key + '=' + encodeURIComponent(<string> value));
            });
            if (qs.length) {
                q = qs.join('&');
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Content-Length', q.length.toString());
                xhr.send(q);
            } else
                xhr.send();
        }
    }
}
