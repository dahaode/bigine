/**
 * 定义语法规约。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 */

module SCHEMA {
    /**
     * 语法规则。
     *
     * {
     *     [index: number]: {
     *         name: string,
     *         params: number[], // [最小量, 最大量]
     *         content: number // -1 禁止，0 可选，1 必须,
     *         children: {
     *             [index: number]: number[] // [最小量, 最大量]
     *         }
     *     }
     * }
     */
    export var S: {[index: number]: any[]} = { // 59
        '-1': ['ROOT', 0, -1, {
            54: [0, 1],
            55: [0, 1],
            56: [0, 1],
            57: 1,
            49: [1],
            33: [0],
            34: [0],
            35: [0],
            38: [0],
            44: [0],
            47: [0],
            48: [0]
        }],

        54: ['自动播放', 0, -1],
        55: ['主角', 0, 1],
        56: ['素材包', 0, 1],
        57: ['主题', 0, 1],

        49: ['事件', 0, 1, {
            50: 1,
            51: [0, 1],
            52: 1
        }],
        50: ['类型', 0, 1],
        51: ['条件', 0, -1, {
            '-1': [0]
        }],
        52: ['内容', 0, -1, {
            '-1': [1]
        }],

        33: ['音乐', 0, 1, {
            32: 1
        }],
        32: ['音源', 0, 1],

        34: ['特写', 0, 1, {
            31: 1
        }],
        31: ['画面', 0, 1],

        35: ['人物', [0, 1], 1, {
            36: [0, 1],
            37: [0, 1]
        }],
        36: ['头像', 0, 1],
        37: ['姿态', 0, -1, {
            53: [1]
        }],

        38: ['地图', [0, 1], 1, {
            39: 1,
            40: [1]
        }],
        39: ['底图', 0, 1],
        40: ['交互点', [0, 1], 1, {
            41: [0, 1],
            42: [0, 1],
            43: 1
        }],
        41: ['高亮', 0, 1],
        42: ['区域', 0, 1],
        43: ['对应房间', 0, 1],

        44: ['房间', 0, 1, {
            45: [0, 1],
            46: [0, 1]
        }],
        45: ['使用地图', 0, 1],
        46: ['时刻', 0, -1, {
            53: [1]
        }],

        47: ['音效', 0, 1, {
            32: 1
        }],

        48: ['天气', 0, 1],

        21: ['且', 0, -1, {
            '-1': [1]
        }],
        26: ['或', 0, -1, {
            '-1': [1]
        }],
        22: ['当数据', [2, 3], -1],
        24: ['对比数据', 1, -1],

        28: ['那么', 0, -1, {
            '-1': [1]
        }],
        27: ['否则', 0, -1, {
            '-1': [1]
        }],

        53: ['UNKNOWN', 1, 1],

         0: ['人物出场', [0, 1], 1],
         1: ['人物离场', 1, -1],
         2: ['设置人物', [0, 1], 1],
         3: ['改变神态', 1, 1],
         4: ['独白', 0, 1],
         5: ['对白', [2, 3], 1],
         6: ['提示', 0, 1],
         7: ['旁白', 0, 1],
         8: ['自动存档', [0, 1], -1],
         9: ['游戏完结', 0, -1],
        10: ['游戏失败', 0, -1],
        11: ['评分', 1, -1],
        12: ['播放音乐', 1, -1],
        13: ['关闭特写', 0, -1],
        14: ['展示特写', 1, -1],
        15: ['设置房间', 1, -1],
        16: ['移动中止', 0, -1],
        17: ['设置时间', 1, -1],
        18: ['进入房间', 1, -1],
        19: ['播放音效', 1, -1],
        20: ['设置天气', 1, -1],
        23: ['设置数据', 1, 1],
        25: ['选择', 1, -1, {
            53: [1]
        }],
        29: ['如果', 1, -1, {
            '-1': [1]
        }],
        30: ['增加数据', 1, 1],
        58: ['循环', 0, -1, {
            '-1': [1]
        }],
        59: ['循环中止', 0, -1]
    };
    var ii: any,
        jj: any;
    for (ii in S) {
        if (!(S[ii][1] instanceof Array))
            S[ii][1] = [S[ii][1], S[ii][1]];
        if (S[ii][3])
            for (jj in S[ii][3])
                if (!(S[ii][3][jj] instanceof Array))
                    S[ii][3][jj] = [S[ii][3][jj], S[ii][3][jj]];
    }

    /**
     * 标签索引。
     */
    export var I: {[name: string]: number} = {};
    for (ii in S)
        if (S.hasOwnProperty(ii))
            I[S[ii][0]] = ii;

    /**
     * 标签到类映射。
     */
    export var T: {[name: string]: string} = {
        音乐: 'DefBGM',
        音源: 'Audio',
        画面: 'Image',
        特写: 'DefCG',
        人物: 'DefChar',
        头像: 'Avatar',
        姿态: 'Poses',
        地图: 'DefMap',
        底图: 'BgImage',
        交互点: 'Point',
        高亮: 'HlImage',
        区域: 'Region',
        对应房间: 'Target',
        房间: 'DefRoom',
        使用地图: 'Link',
        时刻: 'Times',
        音效: 'DefSE',
        天气: 'DefWeather',

        自动播放: 'Auto',
        主角: 'Player',
        素材包: 'Resources',
        主题: 'Theme',

        事件: 'Scene',
        类型: 'Type',
        条件: 'Condition',
        内容: 'Content',

        人物出场: 'CharOn',
        人物离场: 'CharOff',
        设置人物: 'CharSet',
        改变神态: 'CharPose',

        独白: 'Monolog',
        对白: 'Speak',
        提示: 'Tip',
        旁白: 'VoiceOver',

        自动存档: 'Save',
        游戏结束: 'End',
        游戏完结: 'End',
        游戏失败: 'Fail',
        评分: 'Stars',

        播放音乐: 'PlayBGM',
        关闭特写: 'HideCG',
        展示特写: 'ShowCG',
        设置房间: 'AsRoom',
        移动中止: 'Freeze',
        设置时间: 'AsTime',
        进入房间: 'Enter',
        播放音效: 'PlaySE',
        设置天气: 'Weather',

        当数据: 'Assert',
        当线索: 'Assert',
        设置数据: 'Assign',
        设置线索: 'Assign',
        选择: 'Choose',
        对比数据: 'Compare',
        对比线索: 'Compare',
        增加数据: 'Increase',
        循环中止: 'LpBreak',

        且: 'And',
        或: 'Or',
        否则: 'Otherwise',
        那么: 'Then',
        如果: 'When',
        循环: 'Loop'
    };
}
