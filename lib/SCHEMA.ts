/**
 * 定义语法规约。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      SCHEMA.ts
 */

module SCHEMA {
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
        '-1': [T['ROOT'], 0, -1, {
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

        54: [T['Auto'], 0, -1],
        55: [T['Player'], 0, 1],
        56: [T['Resources'], 0, 1],
        57: [T['Theme'], 0, 1],

        49: [T['Scene'], 0, 1, {
            50: 1,
            51: [0, 1],
            52: 1
        }],
        50: [T['Type'], 0, 1],
        51: [T['Conditions'], 0, -1, {
            '-1': [0]
        }],
        52: [T['Content'], 0, -1, {
            '-1': [1]
        }],

        33: [T['DefBGM'], 0, 1, {
            32: 1
        }],
        32: [T['Audio'], 0, 1],

        34: [T['DefCG'], 0, 1, {
            31: 1
        }],
        31: [T['Image'], 0, 1],

        35: [T['DefChar'], [0, 1], 1, {
            36: [0, 1],
            37: [0, 1]
        }],
        36: [T['Avatar'], 0, 1],
        37: [T['Poses'], 0, -1, {
            53: [1]
        }],

        38: [T['DefMap'], [0, 1], 1, {
            39: [0, 1],
            40: [1]
        }],
        39: [T['BGImage'], 0, 1],
        40: [T['Point'], [0, 1], 1, {
            41: [0, 1],
            42: [0, 1],
            43: [0, 1]
        }],
        41: [T['HLImage'], 0, 1],
        42: [T['Region'], 0, 1],
        43: [T['Target'], 0, 1],

        44: [T['DefRoom'], 0, 1, {
            45: [0, 1],
            46: [0, 1]
        }],
        45: [T['Link'], 0, 1],
        46: [T['Times'], 0, -1, {
            53: [1]
        }],

        47: [T['DefSE'], 0, 1, {
            32: 1
        }],

        48: [T['DefWeather'], 0, 1],

        21: [T['And'], 0, -1, {
            '-1': [1]
        }],
        26: [T['Or'], 0, -1, {
            '-1': [1]
        }],
        22: [T['Assert'], [2, 3], -1],
        24: [T['Compare'], 1, -1],

        28: [T['Then'], 0, -1, {
            '-1': [1]
        }],
        27: [T['Otherwise'], 0, -1, {
            '-1': [1]
        }],

        53: [T['UNKNOWN'], 1, 1],

        0: [T['CharOn'], [0, 1], 1],
        1: [T['CharOff'], 1, -1],
        2: [T['CharSet'], [0, 1], 1],
        3: [T['CharPose'], 1, 1],
        4: [T['Monolog'], 0, 1],
        5: [T['Speak'], [2, 3], 1],
        6: [T['Tip'], 0, 1],
        7: [T['VoiceOver'], 0, 1],
        8: [T['Save'], [0, 1], -1],
        9: [T['End'], 0, -1],
        10: [T['Fail'], 0, -1],
        11: [T['Rank'], 1, -1],
        12: [T['PlayBGM'], 1, -1],
        13: [T['HideCG'], 0, -1],
        14: [T['ShowCG'], 1, -1],
        15: [T['AsRoom'], 1, -1],
        16: [T['Freeze'], 0, -1],
        17: [T['AsTime'], 1, -1],
        18: [T['Enter'], 1, -1],
        19: [T['PlaySE'], 1, -1],
        20: [T['Weather'], 1, -1],
        23: [T['Assign'], 1, 1],
        25: [T['Choose'], 1, -1, {
            53: [1]
        }],
        29: [T['When'], 1, -1, {
            '-1': [1]
        }],
        30: [T['Increase'], 1, 1],
        58: [T['Loop'], 0, -1, {
            '-1': [1]
        }],
        59: [T['LoopBreak'], 0, -1]
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
            C[T[ii]] = ii;

    /**
     * 标签索引。
     */
    export var I: { [name: string]: number } = {};
    for (ii in S)
        if (S.hasOwnProperty(ii))
            I[S[ii][0]] = ii;
}
