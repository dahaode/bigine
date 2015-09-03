/**
 * 定义（人物）姿态标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Char/Poses.ts
 */

/// <reference path="../../Unknown.ts" />

module Tag {
    export class Poses extends Unknown {
        /**
         * 图片资源。
         */
        private _o: Util.IHashTable<Runtime.IResource>;

        /**
         * 获取标签名称。
         */
        gTagName(): string {
            return SCHEMA.T['Poses'];
        }

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            this._o = {};
            super(params, content, children, lineNo);
        }

        /**
         * 注册（自身实体）至（运行时）作品。
         */
        $r(ep: Runtime.IEpisode): void {
            Util.each(this._s, (tag, index) => {
                var id = tag.$p(0);
                this._o[id] = ep.r(tag.$c(), Runtime.IResource.Type.Pose);
                if (!index)
                    this._o[''] = this._o[id];
            });
        }

        /**
         * 获取资源。
         */
        o(id: string): Runtime.IResource {
            return this._o[id] || this._o[''];
        }
    }
}
