/**
 * 声明透明度渐变动画元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Animation/IFadeMetas.ts
 */

/// <reference path="../../Util/IHashTable.ts" />

namespace G {
    export interface IFadeMetas extends Util.IHashTable<any> {
        /**
         * 透明度。
         */
        opacity: number;
    }
}
