/**
 * 定义主题标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Theme.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../Unknown.ts" />
/// <reference path="../../Core/_Resource/ITheme.ts" />

namespace Tag {
    import Util = __Bigine_Util;
    const _base: string = '_';

    export class Theme extends Unknown {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Theme';
        }

        /**
         * 加载远端数据。
         */
        public l(callback: Util.ISuccessCallback<Util.IHashTable<any>>): void {
            let version: string = Bigine.version,
                domain: string = Bigine.domain,
                src: Util.IHashTable<any> = this.path(Core.ITheme.THEME, _base);
            if (Bigine.offline) {
                let xhr: XMLHttpRequest = new XMLHttpRequest();
                xhr.onload = () => {
                    callback(this.extend(this.path(JSON.parse(xhr.responseText), this._c), src));
                };
                try {
                    xhr.open('get', 'res/theme/theme.json', true);
                    xhr.send();
                } catch (ex) {
                    throw ex.message;
                }
            } else {
                if (Core.IResource.REGGUID.test(this._c)) {
                    Util.Remote.post<Util.IHashTable<any>>('//api.dahao.de/resource/theme/' + this._c + '/', {}, (des: Util.IHashTable<any>) => {
                        callback(this.extend(des['resource'], src));
                    }, (error: Error, status?: any) => {
                        throw error;
                    });
                } else {
                    Util.Remote.get('http://s.dahao.de/theme/' + this._c + '/theme.json?' + version + domain, (des) => {
                            des = this.path(des, this._c);
                            callback(this.extend(des, src));
                        }, (error: Error, status?: any) => {
                        throw error;
                    });
                }
            }
        }

        /**
         * 主题中有缺省元素，使用默认主题替换。
         */
        private extend(des: Util.IHashTable<any>, src: Util.IHashTable<any>): Util.IHashTable<any> {
            Util.each(src, (data: any, index: number | string) => {
                if (!(index in des)) {
                    des[index] = data;
                } else {
                    if (typeof data == 'object')
                        this.extend(des[index], data);
                }
            });
            return des;
        }

        private path(src: Util.IHashTable<any>, theme: string): Util.IHashTable<any> {
            Util.each(src, (data: any, index: number | string) => {
                if (typeof data == 'object') {
                    this.path(data, theme);
                } else if (typeof data == 'string') {
                    if (/.png$/.test(data) || /.jpg$/.test(data)) {
                        src[index] = theme + '/' + data;
                    }
                }
            });
            return src;
        }
    }
}
