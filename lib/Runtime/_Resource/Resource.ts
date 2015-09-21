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
    'use strict';

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
                var height: number = env.Screen.Height,
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
        }

        /**
         * 获取 DOM 对象。
         */
        public o(): Promise<T> {
            if (!this._q)
                this._q = new Promise<T>((resolve: (value?: T | Thenable<T>) => void, reject: (reason?: any) => void) => {
                    var $mp3: boolean = '.mp3' == this._l.substr(-4),
                        xhr: XMLHttpRequest,
                        img: HTMLImageElement;
                    if ($mp3 || Util.ENV.MSIE && 'undefined' != typeof URL) {
                        xhr = new XMLHttpRequest();
                        xhr.open('GET', this._l);
                        xhr.onload = () => {
                            if ($mp3)
                                return resolve(<any> this._l);
                            var blob: string = URL.createObjectURL(xhr.response);
                            img = new Image();
                            img.onload = () => {
                                URL.revokeObjectURL(blob);
                                resolve(<any> img);
                            };
                            img.src = blob;
                        };
                        if (!$mp3)
                            xhr.responseType = 'blob';
                        xhr.send();
                        return;
                    }
                    img = new Image();
                    img.crossOrigin = '';
                    img.onload = () => {
                        resolve(<any> img);
                    };
                    img.src = this._l;
                });
            return this._q;
        }
    }
}
