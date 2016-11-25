/**
 * 声明评分事件元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IVideoMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Runtime/IEpisode.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IVideoMetas extends Util.IEventMetas<Core.IEpisode> {
		/**
		 * 等级。
		 */
        type: string;
		/**
		 * 分数。
		 */
        uri: string;
		/**
		 * 分数。
		 */
        volume: number;
    }
}
