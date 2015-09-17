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
    'use strict';

    export class Root extends Unknown implements Core.IRootTag {
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
            var children: string[] = [];
            Util.each(this._s, (tag: Unknown) => {
                children.push(tag.toJsrn());
            });
            return '(function($){return $([' + children.join(',') + '])})(require("bigine"))';
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
         * 加载主题。
         */
        public t(callback: Util.ISuccessCallback<Util.IHashTable<any>>): void {
            (<Theme> this.$q('Theme')[0]).l(callback);
        }
    }
}
