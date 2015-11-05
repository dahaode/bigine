/**
 * 定义（运行时）资源组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Resource/Resource.ts
 */

/// <reference path="../../Core/_Runtime/IResource.ts" />
/// <reference path="../../Util/ENV.ts" />
/// <reference path="../../Util/Q.ts" />

namespace Runtime {
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
         * 构造函数。
         */
        constructor(uri: string, type: Core.IResource.Type) {
            var env: typeof Util.ENV = Util.ENV,
                types: typeof Core.IResource.Type = Core.IResource.Type,
                ie9: boolean = env.MSIE && 'undefined' == typeof URL,
                ext: string;
            if (types.Raw == type) {
                this._l = uri.replace(/^.+:\/\//, '//');
                if ('//s.dahao.de/' != this._l.substr(0, 13))
                    throw new E(E.RES_INVALID_URI);
                ext = this._l.substr(-4);
                if (ie9 && ('.jpg' == ext || '.png' == ext))
                    this._l = '//dahao.de/a' + this._l.substr(12);
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
                this._l = '//a' + (1 + parseInt(uri[0], 16) % 8) + '.dahao.de/' + uri + '/' + filename;
                if (ie9 && '.mp3' != this._l.substr(-4))
                    this._l = '//dahao.de/a' + this._l.substr(13);
            }
            this._l = env.Protocol + this._l;
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
                    var url: string = this._l + '?bigine',
                        xhr: XMLHttpRequest,
                        img: HTMLImageElement;
                    if ('.mp3' == this._l.substr(-4)) {
                        this._l = url;
                        return resolve(<any> url);
                    }
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
