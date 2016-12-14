/**
 * 定义（画面调度）常驻按钮回看事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/TrayReview.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="ITrayReviewMetas.ts" />

namespace Ev {
    export class TrayReview extends Event<Core.ITray> {
        /**
         * 构造函数。
         */
        constructor(metas: ITrayReviewMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'tray.review';
        }
    }
}
