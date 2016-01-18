/**
 * 声明画面调度面板组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/IPanel.ts
 */

/// <reference path="ISprite.ts" />
/// <reference path="../_Runtime/IRuntime.ts" />

namespace Core {
    export interface IPanel extends ISprite {
        /**
         * 配置。
         */
        u(sheet: [string, string][], runtime: IRuntime): IPanel;
    }
}
