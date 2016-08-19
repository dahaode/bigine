/**
 * 定义（资源）预加载器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Resource/Prefetcher.ts
 */

/// <reference path="Resource.ts" />

namespace Resource {
    import Util = __Bigine_Util;

    /**
     * 唯一实例。
     */
    var instance: Prefecher;

    export class Prefecher {
        /**
         * 处理句柄。
         */
        private _p: Promise<void>;

        /**
         * 预加载资源。
         */
        public static c(resources: Resource<string | HTMLImageElement>[][], logger?: Util.ILogger): Promise<void> {
            if (!resources.length)
                return Promise.resolve<void>();
            if (!instance)
                instance = new Prefecher;
            var ret: Promise<void>;
            Util.each(resources, (group: Resource<string | HTMLImageElement>[]) => {
                var p: Promise<void> = instance.q(group, logger);
                if (!ret)
                    ret = p;
            });
            return ret;
        }

        /**
         * 构造函数。
         */
        constructor() {
            this._p = Promise.resolve<void>();
        }

        /**
         * 排队。
         */
        private q(resources: Resource<string | HTMLImageElement>[], logger?: Util.ILogger): Promise<void> {
            return new Promise<void>((resolve: () => void) => {
                this._p = this._p.then(() => {
                    if (logger)
                        logger.d('[cache]', resources);
                    var tasks: Promise<string | HTMLImageElement>[] = [];
                    Util.each(resources, (resource: Resource<string | HTMLImageElement>) => {
                        tasks.push(resource.o());
                    });
                    return Promise.all(tasks).then(() => {
                        resolve();
                    });
                });
            });
        }
    }
}
