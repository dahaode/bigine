/**
 * 定义作品完结事件动作组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Fin.ts
 */

/// <reference path="End.ts" />

namespace Tag {
    export class Fin extends End {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Fin';
        }
    }
}
