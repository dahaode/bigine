/**
 * 声明音频音量渐变动画元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Animation/IAudioFadeMetas.ts
 */

/// <reference path="../../Util/IHashTable.ts" />

namespace G {
    export interface IAudioFadeMetas extends Util.IHashTable<any> {
        /**
         * 音量。
         */
        volume: number;
    }
}
