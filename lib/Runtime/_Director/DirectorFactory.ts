/**
 * 定义（运行时）场效调度器工厂组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/DirectorFactory.ts
 */

/// <reference path="NodeDirector.ts" />
/// <reference path="../../Util/ENV.ts" />
/// <reference path="CanvasDirector.ts" />

namespace Runtime {
    'use strict';

    export namespace DirectorFactory {
        export function c(runtime: Core.IRuntime): Director {
            if (!Util.ENV.Window)
                return new NodeDirector(runtime);
            return new CanvasDirector(runtime);
        }
    }
}
