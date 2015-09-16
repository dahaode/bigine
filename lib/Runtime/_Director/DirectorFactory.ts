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

namespace Runtime {
    'use strict';

    export namespace DirectorFactory {
        export function c(runtime: IRuntime): Director {
            var node: { JS: boolean; Webkit: boolean; } = Util.ENV.Node;
            if (node.JS && !node.Webkit)
                return new NodeDirector(runtime);
        }
    }
}
