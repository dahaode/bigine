/**
 * 声明（运行时）（loading文件加载完成）就绪事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/ILoadingMetas.ts
 */

/// <reference path="../../Core/_Runtime/IEpisode.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface ILoadingMetas extends Util.IEventMetas<Core.IEpisode> {
    }
}
