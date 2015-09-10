/**
 * 定义（运行时）资源组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Resource/Resource.ts
 */

/// <reference path="../IResource.ts" />
/// <reference path="../../Util/Env.ts" />
/// <reference path="../../Util/Q.ts" />

module Runtime {
    export class Resource implements IResource {
        /**
         * 真实 URL 。
         */
        private _l: string;

        /**
         * 加载 Promise 对象。
         */
        private _q: Promise<string | HTMLImageElement>;

        /**
         * 构造函数。
         */
        constructor(uri: string, type: IResource.Type) {
            var ie9 = Util.Env.MSIE && 'undefined' == typeof URL,
                ext: string;
            if (IResource.Type.Raw == type) {
                this._l = uri.replace(/^.+:\/\//, '//');
                if ('//s.dahao.de/' != this._l.substr(0, 13))
                    throw new E(E.RES_INVALID_URI);
                ext = this._l.substr(-4);
                if (ie9 && ('.jpg' == ext || '.png' == ext))
                    this._l = '//dahao.de/a' + this._l.substr(12);
            } else {
                if (!/^[\d0-f]{8}-[\d0-f]{4}-[\d0-f]{4}-[\d0-f]{4}-[\d0-f]{12}$/i.test(uri))
                    throw new E(E.RES_INVALID_URI);
                var height = Util.Env.Screen.Height,
                    filename = height + '.';
                switch (type) {
                    case IResource.Type.Room:
                    case IResource.Type.CG:
                        filename += 'jpg';
                        break;
                    case IResource.Type.Map:
                    case IResource.Type.Pose:
                        filename += 'png';
                        break;
                    case IResource.Type.Avatar:
                        filename = Math.round(height / 4) + '.png';
                        break;
                    case IResource.Type.BGM:
                    case IResource.Type.SE:
                        filename = (Util.Env.Mobile ? 64 : 128) + '.mp3';
                        break;
                }
                this._l = '//a' + (1 + parseInt(uri[0], 16) % 8) + '.dahao.de/' + uri + '/' + filename;
                if (ie9 && '.mp3' != this._l.substr(-4))
                    this._l = '//dahao.de/a' + this._l.substr(13);
            }
            this._l = Util.Env.Protocol + this._l;
        }

        /**
         * 获取 DOM 对象。
         */
        o(): Promise<string | HTMLImageElement> {
            if (!this._q)
                this._q = new Promise((resolve, reject) => {
                    var $mp3 = '.mp3' == this._l.substr(-4),
                        xhr: XMLHttpRequest,
                        img: HTMLImageElement;
                    if ($mp3 || Util.Env.MSIE && 'undefined' != typeof URL) {
                        xhr = new XMLHttpRequest();
                        xhr.open('GET', this._l);
                        xhr.onload = () => {
                            if ($mp3)
                                return resolve(this._l);
                            var blob = URL.createObjectURL(xhr.response);
                            img = new Image();
                            img.onload = () => {
                                URL.revokeObjectURL(blob);
                                resolve(img);
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
                        resolve(img);
                    }
                    img.src = this._l;
                });
            return this._q;
        }
    }
}
