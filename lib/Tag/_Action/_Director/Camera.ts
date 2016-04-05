/**
 * 定义镜头动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/Camera.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class Camera extends Action {
        /**
         * 镜头 X 轴系数。
         */
        protected _mx: number;

        /**
         * 镜头 Y 轴系数。
         */
        protected _my: number;

        /**
         * 移动的速度。
         */
        protected _ms: number;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            switch (params[0]) {
                case '快':
                    this._ms = 500;
                    break;
                case '中':
                    this._ms = 4000;
                    break;
                case '慢':
                    this._ms = 8000;
                    break;
                case undefined:
                    this._ms = 20;  // 虽说设置镜头不需要动画效果，为算法统一，将时间设为1帧，即20ms。
                    break;
                default:
                    throw new E(E.TAG_PARAMS_NOT_TRUE, lineNo);
            }
            switch (content) {
                case '左上':
                    this._mx = 0; this._my = 0;
                    break;
                case '上':
                    this._mx = 0.5; this._my = 0;
                    break;
                case '右上':
                    this._mx = 1; this._my = 0;
                    break;
                case '左':
                    this._mx = 0; this._my = 0.5;
                    break;
                case '中':
                    this._mx = 0.5; this._my = 0.5;
                    break;
                case '右':
                    this._mx = 1; this._my = 0.5;
                    break;
                case '左下':
                    this._mx = 0; this._my = 1;
                    break;
                case '下':
                    this._mx = 0.5; this._my = 1;
                    break;
                case '右下':
                    this._mx = 1; this._my = 1;
                    break;
                case '':
                    break;
                default:
                    throw new E(E.ACT_ILLEGAL_CAMERA_MOVE, lineNo);
            }
        }
    }
}
