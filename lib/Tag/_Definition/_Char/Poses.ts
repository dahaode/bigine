/**
 * 定义（人物）姿态标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Char/Poses.ts
 */

/// <reference path="../ResTable.ts" />

namespace Tag {
    'use strict';

    export class Poses extends ResTable {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Poses';
        }

        /**
         * 注册（自身实体）至（运行时）作品。
         */
        public $r(ep: Core.IEpisode): void {
            Util.each(this._s, (tag: Unknown, index: number) => {
                var id: string = tag.$p(0);
                this._o[id] = ep.r(tag.$c(), Core.IResource.Type.Pose);
                if (!index)
                    this._o['默认'] = this._o[id];
            });
        }

        /**
         * 获取所有关联资源。
         */
        public d(): Core.IResource[] {
            var ret: Core.IResource[] = [];
            Util.each(this._o, (resource: Core.IResource, index: string) => {
                if ('默认' != index)
                    ret.push(resource);
            });
            return ret;
        }
    }
}
