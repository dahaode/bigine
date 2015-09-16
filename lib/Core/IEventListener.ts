/**
 * 声明（运行时）事件监听函数接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/IEventListener.ts
 */

/// <reference path="Event.ts" />

namespace Core {
    'use strict';

    export interface IEventListener<T> {
        (event: Event<T>): void;
    }
}
