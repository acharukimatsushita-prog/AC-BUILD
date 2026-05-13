export type StepImage = {
  src: string;
  caption: string;
};

export type Step = {
  id: number;
  title: string;
  work: string;
  safety: string;
  quality: string;
  media: "video" | "photo" | "none";
  imageSrc?: string;
  gallery?: StepImage[];
  materials?: string[];
  sourceRows?: string;
  note?: string;
};

export type Standard = {
  id: string;
  name: string;
  category: string;
  revision: string;
  status: "公開中" | "下書き" | "承認待ち";
  updatedAt: string;
  owner: string;
  summary?: string;
  heroImageSrc?: string;
  sourceFile?: string;
  sourceSheet?: string;
  sourceMode?: string;
  steps: Step[];
};

const vBeltImage = (fileName: string) => `/images/v-belt/${fileName}`;

export const standards: Standard[] = [
  {
    id: "rotary-entanglement",
    name: "回転体巻込まれ安全体感装置",
    category: "安全体感装置",
    revision: "Rev. 1.0",
    status: "公開中",
    updatedAt: "2026-05-13",
    owner: "製造技術",
    summary: "回転体まわりの巻込まれ防止を、組立工程と確認ポイントで整理した標準書です。",
    steps: [
      {
        id: 1,
        title: "部品と工具を確認する",
        work: "構成部品、締結部品、指定工具を作業台で照合する。",
        safety: "回転部に手を入れない状態で作業を開始する。",
        quality: "部品表と現物の型式、数量、外観を確認する。",
        media: "none"
      },
      {
        id: 2,
        title: "回転体ユニットを仮組みする",
        work: "フレーム基準面に合わせて回転体ユニットを仮固定する。",
        safety: "重量物は無理に持ち上げず、治具を使用する。",
        quality: "基準面との隙間、ボルトの入り方、干渉の有無を見る。",
        media: "none"
      }
    ]
  },
  {
    id: "v-belt-entanglement",
    name: "Vベルト巻込まれ安全体感装置",
    category: "安全体感装置",
    revision: "Excel取込 Rev. 0.2",
    status: "公開中",
    updatedAt: "2026-05-13",
    owner: "製造技術",
    summary:
      "Excelの説明文と貼付写真を工程別に再構成し、組付け順、使用部品、確認ポイントを見比べやすくした標準書です。",
    heroImageSrc: vBeltImage("drawing-overview.png"),
    sourceFile: "【1020】Vベルト巻込まれ.xlsx",
    sourceSheet: "Vベルト巻込まれ",
    sourceMode: "Excelセル本文と貼付写真を抽出し、工程別に整理",
    steps: [
      {
        id: 1,
        title: "フレームにキャスター・アジャスターを組み付ける",
        work: "フレーム(-M101)に自在キャスター、固定キャスター、アジャストパッドを取り付ける。",
        safety: "フレームを安定させ、キャスター取り付け時の転倒や手挟みに注意する。",
        quality: "キャスターの向き、固定数、アジャストパッド4か所の取り付け状態を確認する。",
        media: "photo",
        imageSrc: vBeltImage("frame-overview-01.png"),
        sourceRows: "31-37",
        materials: [
          "自在キャスタ(CMGS75-N) x1",
          "自在キャスタ(CMGS-L75-N) x1",
          "固定キャスタ(CMGK75-N) x2",
          "CUPボルト(M8x20)、SW、平 x12",
          "アジャストパッド(FJFN16-100) x4"
        ],
        gallery: [
          {
            src: vBeltImage("frame-overview-01.png"),
            caption: "フレーム全体と取付位置"
          },
          {
            src: vBeltImage("frame-fasteners-01.png"),
            caption: "取付穴と締結部品"
          }
        ]
      },
      {
        id: 2,
        title: "軸受・シャフト・プレートを組み付ける",
        work: "平行キー、ベアリングホルダ、シャフト、深溝玉軸受、スペーサ、平ワッシャ、プレートを順に組み付ける。",
        safety: "シャフト挿入時は指を挟まない位置で保持し、部品落下に注意する。",
        quality: "軸受の入り方、スペーサ位置、プレート固定、ボルト締結数を確認する。",
        media: "photo",
        imageSrc: vBeltImage("shaft-installed-01.png"),
        sourceRows: "46-70, 87-100",
        materials: [
          "平行キー(KEDW10-50) x2",
          "CUPボルト(M4x12) x4",
          "ベアリングホルダ(-M103)",
          "シャフト(-M106)",
          "深溝玉軸受(B6206ZZ) x2",
          "ベアリングスペーサ(CLBPB30-40-68.2)",
          "平ワッシャ(-M105)",
          "プレート(-M104)",
          "CUPボルト(M4x10)、SW、平 x4"
        ],
        gallery: [
          {
            src: vBeltImage("shaft-parts-01.png"),
            caption: "シャフト周辺部品"
          },
          {
            src: vBeltImage("shaft-part-01.png"),
            caption: "シャフト単体"
          },
          {
            src: vBeltImage("bearing-holder-parts-01.png"),
            caption: "ベアリングホルダ部品"
          },
          {
            src: vBeltImage("shaft-installed-01.png"),
            caption: "シャフト挿入状態"
          },
          {
            src: vBeltImage("bearing-holder-01.png"),
            caption: "ベアリングホルダ確認 1"
          },
          {
            src: vBeltImage("bearing-holder-02.png"),
            caption: "ベアリングホルダ確認 2"
          },
          {
            src: vBeltImage("bearing-holder-03.png"),
            caption: "ベアリングホルダ確認 3"
          },
          {
            src: vBeltImage("bearing-holder-04.png"),
            caption: "ベアリングホルダ確認 4"
          },
          {
            src: vBeltImage("plate-mounted-01.png"),
            caption: "プレート組付け 1"
          },
          {
            src: vBeltImage("plate-mounted-02.png"),
            caption: "プレート組付け 2"
          }
        ]
      },
      {
        id: 3,
        title: "位置決め部品とギアモータ・Vプーリを組み付ける",
        work: "位置決めブロック、位置決めボルト、ギアモータ、JIS Vプーリを取り付け、左右の傾きを確認する。",
        safety: "回転部周辺に手や工具を残さず、固定前に不意な回転が起きない状態で調整する。",
        quality: "プーリ面がほぼ合うように調整し、ボルト固定とキーの組み付け状態を確認する。",
        media: "photo",
        imageSrc: vBeltImage("motor-belt-installed-01.png"),
        sourceRows: "112-162",
        note: "定規などで左右の傾きを比べ、ほぼ面が合うように調整する。",
        materials: [
          "CUPボルト(M8x25)、SW、金属ワッシャ(WSSB20-8-3) x4",
          "位置決めブロック(-M108)",
          "位置決めボルト(STBBM10-70)",
          "CUPボルト(M8x40) x2",
          "ギアモータ(G3L18N15-MM02TNNTN)",
          "JIS Vプーリ(150-B-1-φ18-BKW-FN)",
          "JIS Vプーリ(250-B-1-φ30-BKN-FN)",
          "CUPボルト(M4x12)、SW x2"
        ],
        gallery: [
          {
            src: vBeltImage("position-block-01.png"),
            caption: "位置決めブロック"
          },
          {
            src: vBeltImage("motor-mounted-01.png"),
            caption: "ギアモータ取付状態 1"
          },
          {
            src: vBeltImage("motor-mounted-02.png"),
            caption: "ギアモータ取付状態 2"
          },
          {
            src: vBeltImage("pulley-part-01.png"),
            caption: "JIS Vプーリ 1"
          },
          {
            src: vBeltImage("pulley-part-02.png"),
            caption: "JIS Vプーリ 2"
          },
          {
            src: vBeltImage("pulley-part-03.png"),
            caption: "JIS Vプーリ 3"
          },
          {
            src: vBeltImage("motor-pulley-installed-01.png"),
            caption: "プーリ取付状態"
          },
          {
            src: vBeltImage("pulley-alignment-01.png"),
            caption: "プーリ面の確認"
          },
          {
            src: vBeltImage("pulley-alignment-note.png"),
            caption: "調整メモ"
          },
          {
            src: vBeltImage("motor-belt-installed-01.png"),
            caption: "モータ・プーリ周辺"
          }
        ]
      },
      {
        id: 4,
        title: "Vベルトを取り付けて張りを確認する",
        work: "Vベルト(B-53)をプーリへ取り付け、張りとたわみを確認する。",
        safety: "指をベルトとプーリの間に入れない。手回し確認時も巻込まれ位置を避ける。",
        quality: "ベルトが溝に正しく収まり、だきや干渉がないことを確認する。",
        media: "photo",
        imageSrc: vBeltImage("belt-tension-01.png"),
        sourceRows: "174-190",
        materials: ["Vベルト(B-53)"],
        gallery: [
          {
            src: vBeltImage("v-belt-part-01.png"),
            caption: "Vベルト部品"
          },
          {
            src: vBeltImage("belt-tension-01.png"),
            caption: "ベルト張り確認 1"
          },
          {
            src: vBeltImage("belt-tension-02.png"),
            caption: "ベルト張り確認 2"
          },
          {
            src: vBeltImage("belt-tension-03.png"),
            caption: "ベルト張り確認 3"
          }
        ]
      },
      {
        id: 5,
        title: "センサー取付板を組み付ける",
        work: "センサー取付板(-M123)を指定位置に取り付け、配線と周辺部品の逃げを確認する。",
        safety: "配線やセンサー周辺に無理な力がかからないように作業する。",
        quality: "取付板の向き、固定ボルト、SW、平ワッシャの組み合わせを確認する。",
        media: "photo",
        imageSrc: vBeltImage("sensor-close-01.png"),
        sourceRows: "204-218",
        materials: [
          "センサー取付板(-M123)",
          "CUPボルト(M5x10) x2",
          "SW、平 x2"
        ],
        gallery: [
          {
            src: vBeltImage("sensor-close-01.png"),
            caption: "センサー周辺確認 1"
          },
          {
            src: vBeltImage("sensor-close-02.png"),
            caption: "センサー周辺確認 2"
          }
        ]
      },
      {
        id: 6,
        title: "プーリカバー・覗き窓・プレートを組み付ける",
        work: "プーリカバー、覗き窓、各プレート、カバーを取り付け、コードを出す穴位置を確認する。",
        safety: "カバー未装着の状態で通電しない。カバー端面で手を切らないよう注意する。",
        quality: "覗き窓と穴開きカバーの位置、ネジ種類、締結数、カバーの固定状態を確認する。",
        media: "photo",
        imageSrc: vBeltImage("cover-finished-01.png"),
        sourceRows: "230-235, 296-311",
        note: "コードを出す用の穴が開いたカバーの位置を確認する。原本メモ: 逆が正しいです（3/26）。",
        materials: [
          "プーリカバー(-M109A)",
          "覗き窓(-M110A)、覗き窓(-M111A)",
          "プレート(-M121)、プレート(-M122)",
          "カバー(-M117)、カバー(-M118)",
          "トラスネジ(M5x8) x5",
          "トラスネジ(M5x12) x10",
          "六角穴付き皿ネジ(M5x12) x4",
          "トラスネジ(M4x10) x8",
          "十字穴付きトラス小ねじ(M5x8)"
        ],
        gallery: [
          {
            src: vBeltImage("cover-parts-01.png"),
            caption: "カバー部品"
          },
          {
            src: vBeltImage("cover-front-01.png"),
            caption: "正面カバー 1"
          },
          {
            src: vBeltImage("cover-front-02.png"),
            caption: "正面カバー 2"
          },
          {
            src: vBeltImage("cover-side-01.png"),
            caption: "側面カバー"
          },
          {
            src: vBeltImage("cover-finished-01.png"),
            caption: "カバー取付後 1"
          },
          {
            src: vBeltImage("cover-finished-02.png"),
            caption: "カバー取付後 2"
          },
          {
            src: vBeltImage("finish-cover-01.png"),
            caption: "仕上げカバー"
          }
        ]
      },
      {
        id: 7,
        title: "引き出し（ダストBOX）を組み付ける",
        work: "ダストBOX、埋込み取手、板金、金属カラー、プラスチックノブを順に組み付ける。",
        safety: "引き出しの上下向きを間違えない。取手取り付け時の手挟みと板金端面に注意する。",
        quality: "上下方向、取手2個、板金2個、カラー4個、ノブ2個の取り付け状態を確認する。",
        media: "photo",
        imageSrc: vBeltImage("dustbox-01.png"),
        sourceRows: "263-295",
        note: "上下逆にしないよう注意する。",
        materials: [
          "ダストBOX(-M116)",
          "埋込み取手(UWUAN109.5-N) x2",
          "CUPボルト(M5x8)、平、厚平 x8",
          "板金 x2",
          "JTDAS-SUD-A55-B20-T3-X10-Y10-M5-L20-MA5",
          "金属カラー(KNCLSS6-15-15) x4",
          "CUPボルト(M5x25)、SW、平 x4",
          "プラスチックノブ(NHM5-10) x2"
        ],
        gallery: [
          {
            src: vBeltImage("dustbox-01.png"),
            caption: "ダストBOX部品"
          },
          {
            src: vBeltImage("dustbox-03.png"),
            caption: "ダストBOX外観"
          },
          {
            src: vBeltImage("dustbox-fasteners-01.png"),
            caption: "取付ボルト"
          },
          {
            src: vBeltImage("dustbox-handle-01.png"),
            caption: "埋込み取手"
          }
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
    summary: "チェーンラインの巻込まれ防止を確認するための標準書です。",
    steps: [
      {
        id: 1,
        title: "スプロケットを仮固定する",
        work: "チェーンラインを確認しながらスプロケットを仮固定する。",
        safety: "手袋の巻込まれに注意し、通電前に作業範囲を確認する。",
        quality: "チェーンライン、芯ずれ、固定ボルトを確認する。",
        media: "none"
      }
    ]
  }
];
