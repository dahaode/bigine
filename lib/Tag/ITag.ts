/**
 * 声明标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 */

/// <reference path="../Core/ITag.ts" />
/// <reference path="../Runtime/IEpisode.ts" />

module Tag {
    export interface ITag extends Core.ITag {
        /**
         * 注册（自身实体）至作品。
         */
        r(ep: Runtime.IEpisode): boolean;

        /**
         * 绑定作品（实体）。
         */
        b(ep: Runtime.IEpisode): boolean;
    }
}
