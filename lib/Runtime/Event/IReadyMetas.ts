/**
 * 声明（运行时）（播放准备）就绪事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/IReadyMetas.ts
 */

/// <reference path="../../Core/_Runtime/IEventMetas.ts" />
/// <reference path="../../Core/_Runtime/IEpisode.ts" />

namespace Runtime {
    'use strict';

    export namespace Event {
        export interface IReadyMetas extends Core.IEventMetas<Core.IEpisode> {
        }
    }
}
