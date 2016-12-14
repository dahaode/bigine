/**
 * 定义（画面调度）回看关闭事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/ReviewClose.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IReviewCloseMetas.ts" />

namespace Ev {
    export class ReviewClose extends Event<Core.IReview> {
        /**
         * 构造函数。
         */
        constructor(metas: IReviewCloseMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'review.close';
        }
    }
}
