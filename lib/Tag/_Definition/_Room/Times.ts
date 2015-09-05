/**
 * 定义（房间）时刻标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Room/Times.ts
 */

/// <reference path="../ResTable.ts" />

module Tag {
    export class Times extends ResTable {

        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Times';
        }

        /**
         * 注册（自身实体）至（运行时）作品。
         */
        $r(ep: Runtime.IEpisode): void {
            Util.each(this._s, (tag, index) => {
                var id = tag.$p(0);
                this._o[id] = ep.r(tag.$c(), Runtime.IResource.Type.Room);
                if (!index)
                    this._o[''] = this._o[id];
            });
        }
    }
}
