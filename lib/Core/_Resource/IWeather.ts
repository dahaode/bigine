/**
 * 声明特效参数配置对象。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Resource/Weather.ts
 */

namespace Core {
    import Util = __Bigine_Util;

    export namespace IWeather {
        export const WEATHER: Util.IHashTable<any> = {
            "小雨": {
                maxNum: 50,
                numLevel: 1,
                gravity: 0.4,
                type: "rain",
                speed: [0.2, 1.0],
                size_range: [0.5, 1.5],
                hasBounce: true,
                wind_direction: 90,
                hasGravity: true
            },
            "中雨": {
                maxNum: 150,
                numLevel: 3,
                gravity: 0.6,
                type: "rain",
                speed: [0.4, 2.0],
                size_range: [1.0, 3.0],
                hasBounce: true,
                wind_direction: 90,
                hasGravity: true
            },
            "大雨": {
                maxNum: 500,
                numLevel: 10,
                gravity: 0.8,
                type: "rain",
                speed: [0.8, 4.0],
                size_range: [2, 6],
                hasBounce: true,
                wind_direction: 90,
                hasGravity: true
            },
            "小雪": {
                maxNum: 80,
                numLevel: 1,
                gravity: 0.04,
                type: "snow",
                speed: [0.01, 0.05],
                size_range: [1, 3],
                hasBounce: false,
                wind_direction: 90,
                hasGravity: true
            },
            "中雪": {
                maxNum: 200,
                numLevel: 2,
                gravity: 0.04,
                type: "snow",
                speed: [0.02, 0.1],
                size_range: [1, 4],
                hasBounce: false,
                wind_direction: 90,
                hasGravity: true
            },
            "大雪": {
                maxNum: 300,
                numLevel: 3,
                gravity: 0.06,
                type: "snow",
                speed: [0.1, 0.2],
                size_range: [2, 4],
                hasBounce: false,
                wind_direction: 90,
                hasGravity: true
            }
        };
    }
}
