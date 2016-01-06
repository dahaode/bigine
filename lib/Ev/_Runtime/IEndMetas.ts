/**
 * 声明（运行时）完结事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IEndMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Runtime/IEpisode.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IEndMetas extends Util.IEventMetas<Core.IEpisode> {
    }
}
