/**
 * 定义（运行时）场效调度器工厂组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/DirectorFactory.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="NodeDirector.ts" />
/// <reference path="CanvasDirector.ts" />

namespace Runtime {
    import Util = __Bigine_Util;

    export namespace DirectorFactory {
        export function c(runtime: Core.IRuntime): Director {
            var env: Util.IEnvType = Util.ENV;
            if (!env.Window)
                return new NodeDirector(runtime);
            if (!env.Canvas)
                throw new E(E.SUPPORT_NO_CANVAS);
            return new CanvasDirector(runtime);
        }
    }
}
