/**
 * 声明实体定义标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 */

/// <reference path="../ITag.ts" />

module Tag {
    // ITag:b(), ITag:r()
    export interface IEntity extends ITag {
        /**
         * 获取唯一编号。
         */
        gId(): string;
    }
}
