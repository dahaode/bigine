/**
 * 定义（作品）根标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Root.ts
 */

/// <reference path="../Unknown.ts" />
/// <reference path="../../Core/_Tag/IRootTag.ts" />
/// <reference path="Resources.ts" />
/// <reference path="Theme.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class Root extends Unknown implements Core.IRootTag {
        /**
         * 压缩键名序列。
         */
        public static SERIALS: string = 'qwertyuiopasdfghjklzxcvbnm$_QWERTYUIOPASDFGHJKLZXCVBNM';

        /**
         * 构造函数。
         */
        constructor(children: Unknown[]) {
            super([], '', children);
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Root';
        }

        /**
         * 绑定（运行时）作品（实体到子标签及自身）。
         */
        public b(ep: Core.IEpisode): void {
            var player: Unknown = this.$q('Player')[0];
            if (player)
                player.b(ep);
            super.b(ep);
        }

        /**
         * 转化为（中文）剧本（代码）。
         */
        public toString(): string {
            var clob: string = '';
            Util.each(this._s, (tag: Unknown) => {
                clob += tag.toString();
            });
            return clob;
        }

        /**
         * 转化为运行时（Javascript）代码。
         */
        public toJsrn(): string {
            var children: string[] = [],
                profiler: (src: string) => Util.IHashTable<number> = (src: string) => {
                    // 分析代码中各字符串的重复频度。
                    var profile: Util.IHashTable<number> = {},
                        buffer: string = '',
                        found: boolean = false,
                        escaped: boolean = false,
                        index: number = 0,
                        chr: string;
                    for (; index < src.length; index++) {
                        chr = src[index];
                        if (!found) {
                            if ('"' == chr) {
                                found = true;
                                buffer = chr;
                                continue;
                            }
                        }
                        buffer += chr;
                        if ('\\' == chr) {
                            escaped = !escaped;
                        } else if ('"' == chr && !escaped) {
                            profile[buffer] = 1 + (profile[buffer] || 0);
                            buffer = '';
                            found = false;
                        } else {
                            escaped = false;
                        }
                    }
                    return profile;
                },
                dictor: (profile: Util.IHashTable<number>) => Util.IHashTable<string> = (profile: Util.IHashTable<number>) => {
                    // 将可压缩率（重复次数 * 单次节省字符数）最高的字符串制作字典。
                    var result: Util.IHashTable<string> = {},
                        deltas: number[] = [0],
                        terms: string[] = [''];
                    Util.each(profile, (times: number, term: string) => {
                        var tlen: number = term.length,
                            delta: number = (times - 1) * (tlen - 3) - 2;
                        if (1 > delta) return;
                        Util.some(deltas, (value: number, index: number) => {
                            if (delta < value)
                                return false;
                            deltas.splice(index, 0, delta);
                            terms.splice(index, 0, term);
                            return true;
                        });
                    });
                    terms.pop();
                    Util.every(terms, (term: string, index: number) => {
                        if (1 + index > Root.SERIALS.length)
                            return false;
                        result[Root.SERIALS[index]] = term;
                        return true;
                    });
                    return result;
                },
                dict: Util.IHashTable<string> = {},
                dlobs: string[] = [],
                echars: RegExp = /[-\/\\^$*+?.()|[\]{}]/g,
                clob: string;
            Util.each(this._s, (tag: Unknown) => {
                children.push(tag.toJsrn());
            });
            clob = children.join(',');
            dict = dictor(profiler(clob));
            Util.each(dict, (term: string, code: string) => {
                clob = clob.replace(new RegExp(term.replace(echars, '\\$&'), 'g'), '_.' + code);
                dlobs.push(code + ':' + term);
            });
            return '(function($,_){return $([' + clob + '])})(require("bigine"),{' + dlobs.join(',') + '})';
        }

        /**
         * 获取父标签。
         */
        public gU(): Unknown {
            throw new E(E.ROOT_NOT_PARENT);
        }

        /**
         * 是否自动播放。
         */
        public a(): boolean {
            return 0 < this.$q('Auto').length;
        }

        /**
         * 加载资源包。
         */
        public l(callback: Util.ISuccessCallback<Util.IHashTable<Core.IEntityTag>>): boolean {
            var resources: Resources = <Resources> this.$q('Resources')[0];
            if (!resources)
                return false;
            resources.l(callback);
            return true;
        }

        /**
         * 获取资源包名称。
         */
        public gS(): string {
            return this.$q('Resources')[0].$c();
        }

        /**
         * 加载主题。
         */
        public t(callback: Util.ISuccessCallback<Util.IHashTable<any>>): void {
            (<Theme> this.$q('Theme')[0]).l(callback);
        }

        /**
         * 获取主题名称。
         */
        public gT(): string {
            return this.$q('Theme')[0].$c();
        }
    }
}
