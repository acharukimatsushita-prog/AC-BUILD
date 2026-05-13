export type Step = {
  id: number;
  title: string;
  work: string;
  safety: string;
  quality: string;
  media: "video" | "photo" | "none";
  materials?: string[];
  sourceRows?: string;
};

export type Standard = {
  id: string;
  name: string;
  category: string;
  revision: string;
  status: "公開中" | "下書き" | "承認待ち";
  updatedAt: string;
  owner: string;
  sourceFile?: string;
  sourceSheet?: string;
  sourceMode?: string;
  steps: Step[];
};

export const standards: Standard[] = [
  {
    id: "rotary-entanglement",
    name: "回転体巻込まれ安全体感装置",
    category: "安全体感装置",
    revision: "Rev. 1.0",
    status: "公開中",
    updatedAt: "2026-05-13",
    owner: "製造技術",
    steps: [
      {
        id: 1,
        title: "部品と工具の確認",
        work: "構成部品、締結部品、指定工具を作業台で照合する。",
        safety: "回転部に手を入れない状態で作業を開始する。",
        quality: "部品表と現物の型式、数量、外観を確認する。",
        media: "photo"
      },
      {
        id: 2,
        title: "フレームへの回転体ユニット仮組み",
        work: "フレーム基準面に合わせて回転体ユニットを仮固定する。",
        safety: "重量物は無理に持ち上げず、補助者または治具を使用する。",
        quality: "基準面との隙間、ボルトの入り方、干渉の有無を見る。",
        media: "video"
      },
      {
        id: 3,
        title: "カバーと安全表示の取り付け",
        work: "巻込まれ防止カバーと注意銘板を指定位置に取り付ける。",
        safety: "カバー未装着の状態で通電しない。",
        quality: "銘板の向き、カバーの開閉、固定状態を確認する。",
        media: "video"
      }
    ]
  },
  {
    id: "v-belt-entanglement",
    name: "Vベルト巻込まれ安全体感装置",
    category: "安全体感装置",
    revision: "Excel取込 Rev. 0.1",
    status: "下書き",
    updatedAt: "2026-05-13",
    owner: "製造技術",
    sourceFile: "Vベルト巻込れ安全体感装置.xls",
    sourceSheet: "Vベルト巻込まれ",
    sourceMode: "Excel原本は変更せず、文字セルをAC-BUILD用データへ再構成",
    steps: [
      {
        id: 1,
        title: "フレームにキャスター、アジャスターを組み付ける",
        work: "フレーム(-M101)へ自在キャスター、固定キャスター、アジャストパッドを取り付ける。",
        safety: "フレームを安定させ、キャスター取り付け時の転倒や手挟みに注意する。",
        quality: "キャスターの向き、固定数、アジャストパッド4か所の取り付け状態を確認する。",
        media: "photo",
        sourceRows: "31-37",
        materials: [
          "自在キャスタ(CMGS75-N) x1",
          "自在キャスタ(CMGS-L75-N) x1",
          "固定キャスタ(CMGK75-N) x2",
          "CUPボルト(M8x20)、SW、平 x12",
          "アジャストパッド(FJFN16-100) x4"
        ]
      },
      {
        id: 2,
        title: "軸受け、シャフト、プレートを組み付ける",
        work: "ベアリングホルダ、シャフト、深溝玉軸受、スペーサ、平ワッシャ、プレートを順に組み付ける。",
        safety: "シャフト挿入時は指を挟まない位置で保持し、部品落下に注意する。",
        quality: "軸受の入り方、スペーサ位置、プレート固定、ボルト締結数を確認する。",
        media: "photo",
        sourceRows: "46-70",
        materials: [
          "平行キー(KEDW10-50) x2",
          "ベアリングホルダ(-M103)",
          "シャフト(-M106)",
          "深溝玉軸受(B6206ZZ) x2",
          "ベアリングスペーサ(CLBPB30-40-68.2)",
          "平ワッシャ(-M105)",
          "プレート(-M104)"
        ]
      },
      {
        id: 3,
        title: "ギアモータとVプーリを取り付ける",
        work: "ギアモータ、JIS Vプーリを取り付け、左右の傾きを定規などで比較して面を合わせる。",
        safety: "回転部周辺に手や工具を残さず、固定前に不意な回転が起きない状態で調整する。",
        quality: "プーリ面がほぼ合うように調整し、ボルト固定とキーの組み付け状態を確認する。",
        media: "photo",
        sourceRows: "112-162",
        materials: [
          "ギアモータ(G3L18N15-MM02TNNTN)",
          "JIS Vプーリ(150-B-1-φ18-BKW-FN)",
          "JIS Vプーリ(250-B-1-φ30-BKN-FN)",
          "CUPボルト(M8x25)、SW、金属ワッシャ x4"
        ]
      },
      {
        id: 4,
        title: "Vベルトを取り付ける",
        work: "Vベルト(B-53)をプーリへ取り付け、張りと収まりを確認する。",
        safety: "指をベルトとプーリの間に入れない。手回し確認時も巻込まれ位置を避ける。",
        quality: "ベルトが溝に正しく収まり、傾きや干渉がないことを確認する。",
        media: "video",
        sourceRows: "174",
        materials: ["Vベルト(B-53)"]
      },
      {
        id: 5,
        title: "センサー取付板を取り付ける",
        work: "センサー取付板(-M123)を指定位置に取り付ける。",
        safety: "配線やセンサー周辺に無理な力がかからないように作業する。",
        quality: "取付板の向き、固定ボルト、SW、平ワッシャの組み合わせを確認する。",
        media: "photo",
        sourceRows: "207-209",
        materials: [
          "センサー取付板(-M123)",
          "CUPボルト(M5x10) x2",
          "SW、平 x2"
        ]
      },
      {
        id: 6,
        title: "プーリカバー、覗き窓、プレートを取り付ける",
        work: "プーリカバー、覗き窓、各プレート、カバーを取り付ける。",
        safety: "カバー未装着の状態で通電しない。カバー端面で手を切らないよう注意する。",
        quality: "覗き窓と穴開きカバーの位置、ネジ種類、締結数、カバーの固定状態を確認する。",
        media: "photo",
        sourceRows: "230-235, 296-305",
        materials: [
          "プーリカバー(-M109A)",
          "覗き窓(-M110A)、覗き窓(-M111A)",
          "プレート(-M121)、プレート(-M122)",
          "カバー(-M117)、カバー(-M118)",
          "十字穴付きトラス小ねじ(M5x8)"
        ]
      },
      {
        id: 7,
        title: "引き出し、ダストBOXを組み付ける",
        work: "ダストBOX、埋込み取手、板金、金属カラー、プラスチックノブを組み付ける。",
        safety: "引き出しの上下向きを間違えない。取手取り付け時の手挟みと板金端面に注意する。",
        quality: "上下方向、取手2個、板金2個、カラー4個、ノブ2個の取り付け状態を確認する。",
        media: "photo",
        sourceRows: "263-295",
        materials: [
          "ダストBOX(-M116)",
          "埋込み取手(UWUAN109.5-N) x2",
          "板金 x2",
          "金属カラー(KNCLSS6-15-15) x4",
          "プラスチックノブ(NHM5-10) x2"
        ]
      }
    ]
  },
  {
    id: "chain-entanglement",
    name: "チェーン巻込まれ安全体感装置",
    category: "安全体感装置",
    revision: "Rev. 0.5",
    status: "承認待ち",
    updatedAt: "2026-05-08",
    owner: "製造技術",
    steps: [
      {
        id: 1,
        title: "スプロケット仮固定",
        work: "チェーンラインを確認しながらスプロケットを仮固定する。",
        safety: "手袋の巻込まれに注意し、通電前に作業範囲を確認する。",
        quality: "チェーンライン、芯ずれ、固定ボルトを確認する。",
        media: "none"
      }
    ]
  }
];
