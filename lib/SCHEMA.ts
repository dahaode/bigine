/**
 * 定义语法规约。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      SCHEMA.ts
 */

namespace SCHEMA {
    'use strict';

    /**
     * 类到标签映射。
     */
    export var T: { [name: string]: string } = {
        Unknown: 'UNKNOWN',
        Root: 'ROOT',

        DefBGM: '音乐',
        Audio: '音源',
        Image: '画面',
        DefCG: '特写',
        DefChar: '人物',
        Avatar: '头像',
        Poses: '姿态',
        DefMap: '地图',
        BGImage: '底图',
        Point: '交互点',
        HLImage: '高亮',
        Region: '区域',
        Target: '对应房间',
        DefRoom: '房间',
        Link: '使用地图',
        Times: '时刻',
        DefSE: '音效',
        DefWeather: '天气',

        Auto: '自动播放',
        Player: '主角',
        Resources: '素材包',
        Theme: '主题',

        Scene: '事件',
        Type: '类型',
        Conditions: '条件',
        Content: '内容',

        CharOn: '人物出场',
        CharOff: '人物离场',
        CharSet: '设置人物',
        CharPose: '改变神态',

        Monolog: '独白',
        Speak: '对白',
        Tip: '提示',
        VoiceOver: '旁白',

        Save: '自动存档',
        End: '游戏完结',
        Fail: '游戏失败',
        Stars: '评分',

        PlayBGM: '播放音乐',
        HideCG: '关闭特写',
        ShowCG: '展示特写',
        AsRoom: '设置房间',
        Freeze: '移动中止',
        AsTime: '设置时间',
        Enter: '进入房间',
        PlaySE: '播放音效',
        Weather: '设置天气',

        Assert: '当数据',
        Assign: '设置数据',
        Choose: '选择',
        Compare: '对比数据',
        Increase: '增加数据',
        LoopBreak: '循环中止',

        And: '且',
        Or: '或',
        Otherwise: '否则',
        Then: '那么',
        When: '如果',
        Loop: '循环'
    };

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
    export var S: { [index: number]: any[] } = { // 59
        '-1': ['Root', 0, -1, {
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

        54: ['Auto', 0, -1],
        55: ['Player', 0, 1], // 人物名
        56: ['Resources', 0, 1], // 素材包名
        57: ['Theme', 0, 1], // 主题名

        49: ['Scene', 0, 1, { // 名称
            50: 1,
            51: [0, 1],
            52: 1
        }],
        50: ['Type', 0, 1], // 类型
        51: ['Conditions', 0, -1, {
            '-1': [0]
        }],
        52: ['Content', 0, -1, {
            '-1': [1]
        }],

        33: ['DefBGM', 0, 1, { // 名称
            32: 1
        }],
        32: ['Audio', 0, 1], // 资源编号

        34: ['DefCG', 0, 1, { // 名称
            31: 1
        }],
        31: ['Image', 0, 1], // 资源编号

        35: ['DefChar', [0, 1], 1, { // [原型人物名?], 名称
            36: [0, 1],
            37: [0, 1]
        }],
        36: ['Avatar', 0, 1], // 素材编号
        37: ['Poses', 0, -1, {
            53: [1]
        }],

        38: ['DefMap', [0, 1], 1, { // [原型地图名?], 名称
            39: [0, 1],
            40: [1]
        }],
        39: ['BGImage', 0, 1], // 素材编号
        40: ['Point', [0, 1], 1, { // [原型交互点名?], 名称
            41: [0, 1],
            42: [0, 1],
            43: [0, 1]
        }],
        41: ['HLImage', 0, 1], // 素材编号
        42: ['Region', 0, 1], // 上边距, 右边距, 下边距, 左边距, 深高?
        43: ['Target', 0, 1], // 房间名

        44: ['DefRoom', 0, 1, { // 名称
            45: [0, 1],
            46: [0, 1]
        }],
        45: ['Link', 0, 1], // 地图名
        46: ['Times', 0, -1, {
            53: [1]
        }],

        47: ['DefSE', 0, 1, { // 名称
            32: 1
        }],

        48: ['DefWeather', 0, 1], // 名称

        21: ['And', 0, -1, {
            '-1': [1]
        }],
        26: ['Or', 0, -1, {
            '-1': [1]
        }],
        22: ['Assert', [2, 3], -1], // [变量名, 比较值, 操作符?]
        24: ['Compare', 1, -1], // [变量名]

        28: ['Then', 0, -1, {
            '-1': [1]
        }],
        27: ['Otherwise', 0, -1, {
            '-1': [1]
        }],

        53: ['Unknown', 1, 0], // [标签名称] 内容

        0: ['CharOn', [0, 1], 1], // [位置?] 人物名, 姿态?
        1: ['CharOff', 1, -1], // [人物名]
        2: ['CharSet', [0, 1], 1], // [位置?] 人物名, 姿态?
        3: ['CharPose', 1, 1], // [人物名] 姿态
        4: ['Monolog', 0, 1], // 文字
        5: ['Speak', [2, 3], 1], // [说话人物名, 对象人物名, 显示名称?] 文字
        6: ['Tip', 0, 1], // 文字
        7: ['VoiceOver', 0, 1], // 文字
        8: ['Save', [0, 1], -1], // [存档标题?]
        9: ['End', 0, -1],
        10: ['Fail', 0, -1],
        11: ['Stars', 1, -1], // [星级]
        12: ['PlayBGM', 1, -1], // [背景音乐名]
        13: ['HideCG', 0, -1],
        14: ['ShowCG', 1, -1], // [特写名]
        15: ['AsRoom', 1, -1], // [房间名]
        16: ['Freeze', 0, -1],
        17: ['AsTime', 1, -1], // [房间时刻名]
        18: ['Enter', 1, -1], // [房间名]
        19: ['PlaySE', 1, -1], // [音效名]
        20: ['Weather', 1, -1], // [天气名]
        23: ['Assign', 1, 1], // [变量名] 值
        25: ['Choose', 1, -1, { // [变量名]
            53: [1]
        }],
        29: ['When', 1, -1, { // [比较值]
            '-1': [1]
        }],
        30: ['Increase', 1, 1], // [变量名] 值
        58: ['Loop', 0, -1, {
            '-1': [1]
        }],
        59: ['LoopBreak', 0, -1]
    };
    var ii: any,
        jj: any;
    for (ii in S)
        if (S.hasOwnProperty(ii)) {
            if (!(S[ii][1] instanceof Array))
                S[ii][1] = [S[ii][1], S[ii][1]];
            if (S[ii][3])
                for (jj in S[ii][3])
                    if (!(S[ii][3][jj] instanceof Array))
                        S[ii][3][jj] = [S[ii][3][jj], S[ii][3][jj]];
        }

    /**
     * 标签到类映射。
     */
    export var C: { [tag: string]: string } = {
        游戏结束: 'End',
        当线索: 'Assert',
        设置线索: 'Assign',
        对比线索: 'Compare'
    };
    for (ii in T)
        if (T.hasOwnProperty(ii) && !(T[ii] in C))
            C[ii] = ii;

    /**
     * 标签索引。
     */
    export var I: { [name: string]: number } = {};
    for (ii in S)
        if (S.hasOwnProperty(ii))
            I[S[ii][0]] = ii;
}
