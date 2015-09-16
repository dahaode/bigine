/**
 * 声明（运行时场效）交互按钮接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/IButtonable.ts
 */

/// <reference path="IRuntime.ts" />

namespace Runtime {
    'use strict';

    export interface IButtonable {
        /**
         * 交互逻辑。
         */
        p(runtime: IRuntime): void;
    }
}
