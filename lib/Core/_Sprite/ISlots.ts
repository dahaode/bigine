/**
 * 声明画面调度档位菜单组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/ISlots.ts
 */

/// <reference path="ISprite.ts" />
/// <reference path="../_Runtime/IStates.ts" />

namespace Core {
    export interface ISlots extends ISprite {
        /**
         * 显示存档档位。
         */
        vs(runtime: Core.IRuntime): Promise<ISlots>;

        /**
         * 显示读档档位。
         */
        vl(runtime: Core.IRuntime): Promise<ISlots>;
    }
}
