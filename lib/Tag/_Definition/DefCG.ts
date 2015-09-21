/**
 * 定义特写（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/DefCG.ts
 */

/// <reference path="../Entity.ts" />
/// <reference path="Image.ts" />

namespace Tag {
    'use strict';

    export class DefCG extends Entity {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'DefCG';
        }

        /**
         * 获取资源。
         */
        public o(): Core.IResource<HTMLImageElement> {
            return (<Image> this.$q('Image')[0]).o();
        }
    }
}
