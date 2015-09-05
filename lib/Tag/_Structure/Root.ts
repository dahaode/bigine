/**
 * 定义（作品）根标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Root.ts
 */

/// <reference path="../Unknown.ts" />
/// <reference path="IRoot.ts" />
/// <reference path="Resources.ts" />
/// <reference path="Theme.ts" />

module Tag {
    export class Root extends Unknown implements IRoot {
        /**
         * 构造函数。
         */
        constructor(children: Unknown[]) {
            super([], '', children);
        }

        /**
         * 获取标签名称。
         */
        gN(): string {
            return SCHEMA.T['Root'];
        }

        /**
         * 绑定（运行时）作品（实体到子标签及自身）。
         */
        b(ep: Runtime.IEpisode): void {
            var player = this.$q('Player')[0];
            if (player)
                player.b(ep);
            super.b(ep);
        }

        /**
         * 转化为（中文）剧本（代码）。
         */
        toString(): string {
            var clob = '';
            Util.each(this._s, (tag) => {
                clob += tag.toString();
            });
            return clob;
        }

        /**
         * 转化为运行时（Javascript）代码。
         */
        toJsrn(): string {
            var children: string[] = [];
            Util.each(this._s, (tag) => {
                children.push(tag.toJsrn());
            })
            return '[' + children.join(',') + ']';
        }

        /**
         * 获取父标签。
         */
        gU(): Unknown {
            throw new E(E.ROOT_NOT_PARENT);
        }

        /**
         * 是否自动播放。
         */
        a(): boolean {
            return 0 < this.$q('Auto').length;
        }

        /**
         * 加载资源包。
         */
        l(callback: Util.ISuccessCallback<IEntity>): boolean {
            var resources = <Resources> this.$q('Resources')[0];
            if (!resources)
                return false;
            resources.l(callback);
            return true;
        }

        /**
         * 加载主题。
         */
        t(callback: Util.ISuccessCallback<any>): void {
            (<Theme> this.$q('Theme')[0]).l(callback);
        }
    }
}
