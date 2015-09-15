/**
 * 定义（运行时）（资源）预加载器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Resource/Prefetcher.ts
 */

/// <reference path="Resource.ts" />

module Runtime.Prefecher {
    /**
     * 预加载资源。
     */
    export function c(resources: Resource[][]): Promise<void> {
        if (!resources.length)
            return Promise.resolve();
        var total = resources.slice(0),
            first: Promise<string | HTMLImageElement>[] = [],
            q: Promise<(string | HTMLImageElement)[]>;
        Util.each(total[0], (resource) => {
            first.push(resource.o());
        });
        q = Promise.all(first);
        total.shift();
        if (total.length)
            q.then(() => {
                Util.Q.every(total, (group) => {
                    var step: Promise<string | HTMLImageElement>[] = [];
                    Util.each(group, (resource) => {
                        step.push(resource.o());
                    });
                    Promise.all(step);
                });
            });
        return q.then(() => { });
    }
}
