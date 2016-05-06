/**
 * 定义评分事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Rank.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IRankMetas.ts" />

namespace Ev {
    export class Rank extends Event<Core.IEpisode> {
        /**
         * 等级。
         */
        private grade: string;
        /**
         * 分数。
         */
        private score: number;
        /**
         * 构造函数。
         */
        constructor(metas: IRankMetas) {
            super(metas);
            this.grade = metas.grade;
            this.score = metas.score;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'rank';
        }
    }
}
