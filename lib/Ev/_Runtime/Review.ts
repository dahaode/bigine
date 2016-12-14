/**
 * 定义（运行时）存档事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Review.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IReviewMetas.ts" />

namespace Ev {
    export class Review extends Event<Core.IStates> {
        /**
         * 类型。
         */
        public type: string;
        /**
         * 数据。
         */
        public data: Array<string>;
        /**
         * 附加。
         */
        public more: string;

        /**
         * 构造函数。
         */
        constructor(metas: IReviewMetas) {
            super(metas);
            this.type = metas.type;
            this.data = metas.data;
            this.more = metas.more;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'review';
        }
    }
}
