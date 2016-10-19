/**
 * 定义资源组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Resource/Resource.ts
 */

/// <reference path="../../include/tsd.d.ts" />
/// <reference path="../Core/_Resource/IResource.ts" />

namespace Resource {
    import Util = __Bigine_Util;

    /**
     * 资源池。
     */
    let $r: Util.IHashTable<Resource<any>> = {};

    export class Resource<T> implements Core.IResource<T> {
        /**
         * 真实 URL 。
         */
        private _l: string;

        /**
         * 加载 Promise 对象。
         */
        private _q: Promise<T>;

        /**
         * 加载完成时回调。
         */
        private _w: ((value: T) => void)[];

        /**
         * 是否已加载。
         */
        private _r: boolean;

        /**
         * 获取资源。
         */
        public static g<U>(uri: string, type: Core.IResource.Type): Resource<U> {
            uri = uri.replace(/^.+:\/\//, '//');
            var key: string = uri + type;
            if (!(key in $r))
                $r[key] = new Resource<U>(uri, type);
            return $r[key];
        }

        /**
         * 构造函数。
         */
        constructor(uri: string, type: Core.IResource.Type) {
            var env: typeof Util.ENV = Util.ENV,
                types: typeof Core.IResource.Type = Core.IResource.Type,
                ie9: boolean = env.MSIE && 'undefined' == typeof URL,
                ext: string;
            var offline: boolean = Bigine.offline;
            if (types.Raw == type) {
                var path: string = 'app://res/theme' + uri.substr(uri.indexOf('\/'));
                //var path: string = '/Users/atfacg-dev/temp/res/theme' + uri.substr(uri.indexOf('\/'));
                this._l = offline ? path : ('http://s.dahao.de/theme/' + uri);
                ext = this._l.substr(-4);
                if (ie9 && ('.jpg' == ext || '.png' == ext))
                    this._l = (offline ? 'app://res/.9/' : 'http://dahao.de/.9/') + uri;
            } else {
                if (!/^[\d0-f]{8}-[\d0-f]{4}-[\d0-f]{4}-[\d0-f]{4}-[\d0-f]{12}$/i.test(uri))
                    throw new E(E.RES_INVALID_URI);
                var height: number = 720 <= env.Screen.Height ? 720 : 360,
                    filename: string = height + '.';
                switch (type) {
                    case types.Room:
                    case types.CG:
                        filename += 'jpg';
                        break;
                    case types.Map:
                    case types.Pose:
                        filename += 'png';
                        break;
                    case types.Avatar:
                        filename = Math.round(height / 4) + '.png';
                        break;
                    case types.BGM:
                    case types.SE:
                        filename = (env.Mobile ? 64 : 128) + '.mp3';
                        break;
                }
                var local: string = 'app://res/' + uri.substr(0, 2) + '/' + uri.substr(2, 2) + '/' + uri + '/' + filename;
                //var local: string = '/Users/atfacg-dev/temp/res/' + uri.substr(0, 2) + '/' + uri.substr(2, 2) + '/' + uri + '/' + filename;
                this._l = offline ?
                    local :
                    ('http://a' + (1 + parseInt(uri[0], 16) % 8) + '.dahao.de/' + uri + '/' + filename);
                if (ie9 && '.mp3' != this._l.substr(-4))
                    this._l = (offline ? 'app://res/.9/' : 'http://dahao.de/.9/') + uri;
            }
            this._w = [];
            this._r = false;
        }

        /**
         * 获取真实 URL 。
         */
        public l(): string {
            return this._l;
        }

        /**
         * 获取 DOM 对象。
         */
        public o(): Promise<T> {
            if (!this._q) {
                this._q = new Promise<T>((resolve: (value?: T | Thenable<T>) => void, reject: (reason?: any) => void) => {
                    var url: string = this._l,
                        xhr: XMLHttpRequest,
                        img: HTMLImageElement;
                    if ('.mp3' == this._l.substr(-4)) {
                        this._l = url;
                        return resolve(<any> url);
                    }
                    if (!Bigine.offline) url = url + '?bigine-0.24.1' + Bigine.domain;
                    if (Util.ENV.MSIE && 'undefined' != typeof URL) {
                        xhr = new XMLHttpRequest();
                        xhr.open('GET', url);
                        xhr.onload = () => {
                            var blob: string = URL.createObjectURL(xhr.response);
                            img = new Image();
                            img.onload = () => {
                                URL.revokeObjectURL(blob);
                                resolve(<any> img);
                            };
                            img.src = blob;
                        };
                        xhr.responseType = 'blob';
                        xhr.send();
                        return;
                    }
                    img = new Image();
                    img.crossOrigin = '';
                    img.onload = () => {
                        resolve(<any> img);
                    };
                    img.src = url;
                });
                this._q.then(() => {
                    this._r = true;
                });
                if (this._w.length) {
                    Util.each(this._w.splice(0), (callback: (value: T) => void) => {
                        this._q.then(callback);
                    });
                }
            }
            return this._q;
        }

        /**
         * 加载完成时通知。
         */
        public w(callback: (value: T) => void): Resource<T> {
            if (this._q) {
                this._q.then(callback);
            } else
                this._w.push(callback);
            return this;
        }
    }
}
