/**
 * 声明动作标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 */

/// <reference path="../IPerformable.ts" />
/// <reference path="../../Runtime/IStates.ts" />

module Tag {
    // ITag:b(), ITag:r(), IPerformable:p()
    export interface IAction extends IPerformable {
        /**
         * （执行）检查。
         */
        t(states: Runtime.IStates): boolean;
    }
}
