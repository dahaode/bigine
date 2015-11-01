/**
 * 声明块标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IBlock.ts
 */

namespace Core {
    export interface IBlock {
        /**
         * 获取关键动作编号列表。
         */
        gA(): string[];
    }
}
