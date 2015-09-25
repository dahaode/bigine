/**
 * 定义（运行时）（资源）预加载器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Resource/Prefetcher.ts
 */

/// <reference path="Resource.ts" />
/// <reference path="../../Core/_Runtime/ILogger.ts" />

namespace Runtime {
    'use strict';

    export namespace Prefecher {
        /**
         * 预加载资源。
         */
        export function c(resources: Resource<string | HTMLImageElement>[][], logger?: Core.ILogger): Promise<void> {
            if (!resources.length)
                return Promise.resolve();
            var total: Resource<string | HTMLImageElement>[][] = resources.slice(0),
                first: Promise<string | HTMLImageElement>[] = [];
            Util.each(total[0], (resource: Resource<string | HTMLImageElement>) => {
                first.push(resource.o());
            });
            if (logger)
                logger.d('[cache]', total[0]);
            return Promise.all(first).then(() => {
                total.shift();
                if (!total.length) return;
                return Util.Q.every(total, (group: Resource<string | HTMLImageElement>[]) => {
                    var step: Promise<string | HTMLImageElement>[] = [];
                    Util.each(group, (resource: Resource<string | HTMLImageElement>) => {
                        step.push(resource.o());
                    });
                    if (logger)
                        logger.d('[cache]', group);
                    return Promise.all(step);
                }).then(() => {
                    return;
                });
            });
        }
    }
}
