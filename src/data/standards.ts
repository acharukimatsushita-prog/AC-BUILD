export type StepImage = {
  src: string;
  caption: string;
  role?: "main" | "detail";
};

export type SubStep = {
  id: string;
  title: string;
  instruction: string;
  imageSrc?: string;
  imageCaption?: string;
  images?: StepImage[];
  parts?: string[];
  fasteners?: string[];
  note?: string;
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
  subSteps?: SubStep[];
  materials?: string[];
  sourceRows?: string;
  note?: string;
};

export type MachinePart = {
  no: number;
  name: string;
  quantity: number;
  drawingNo?: string;
  referenceNo?: string;
  maker?: string;
  model?: string;
  alternateModel?: string;
  material?: string;
  surface?: string;
  remarks?: string;
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
  drawingPdfSrc?: string;
  fabricatedParts?: MachinePart[];
  purchasedParts?: MachinePart[];
  sourceFile?: string;
  sourceSheet?: string;
  sourceMode?: string;
  partsSourceFile?: string;
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
    drawingPdfSrc: "/drawings/v-belt-assembly-drawing.pdf",
    fabricatedParts: [
      {
        no: 1,
        drawingNo: "ASE1020-M101A,M102A",
        referenceNo: "ASE02-M101C",
        name: "フレーム(1/2),(2/2)",
        material: "SS400",
        surface: "焼付塗装",
        quantity: 1
      },
      {
        no: 2,
        drawingNo: "ASE1020-M103",
        referenceNo: "ASE02-M103",
        name: "ベアリングホルダ",
        material: "A2017",
        quantity: 1
      },
      {
        no: 3,
        drawingNo: "ASE1020-M104",
        referenceNo: "ASE02-M104",
        name: "プレート",
        material: "SPHC",
        surface: "ユニクロメッキ",
        quantity: 1
      },
      {
        no: 4,
        drawingNo: "ASE1020-M105A",
        referenceNo: "ASE02-M105",
        name: "平ワッシャ",
        material: "S45C",
        surface: "無電解ニッケルメッキ",
        quantity: 2
      },
      {
        no: 5,
        drawingNo: "ASE1020-M106",
        referenceNo: "ASE02-M106A",
        name: "シャフト",
        material: "S45C",
        surface: "黒染め",
        quantity: 1
      },
      {
        no: 6,
        drawingNo: "ASE1020-M108A",
        referenceNo: "ASE02-M108",
        name: "位置決めブロック",
        material: "SS400",
        surface: "無電解ニッケルメッキ",
        quantity: 1
      },
      {
        no: 7,
        drawingNo: "ASE1020-M109A",
        referenceNo: "ASE02-M109A",
        name: "プーリカバー",
        material: "SPHC",
        surface: "焼付塗装",
        quantity: 1
      },
      {
        no: 8,
        drawingNo: "ASE1020-M110B",
        referenceNo: "ASE02-M110",
        name: "のぞき窓",
        material: "ポリカーボネート",
        quantity: 1
      },
      {
        no: 9,
        drawingNo: "ASE1020-M111A",
        referenceNo: "ASE02-M111",
        name: "のぞき窓",
        material: "ポリカーボネート",
        quantity: 1
      },
      {
        no: 10,
        drawingNo: "ASE1020-M113",
        referenceNo: "ASE02-M113",
        name: "背面カバー",
        material: "SPHC",
        surface: "焼付塗装",
        quantity: 1
      },
      {
        no: 11,
        drawingNo: "ASE1020-M114B",
        referenceNo: "ASE02-M114A",
        name: "右側面カバー",
        material: "SPHC",
        surface: "焼付塗装",
        quantity: 1
      },
      {
        no: 12,
        drawingNo: "ASE1020-M115",
        referenceNo: "ASE02-M115",
        name: "左側面カバー",
        material: "SPHC",
        surface: "焼付塗装",
        quantity: 1
      },
      {
        no: 13,
        drawingNo: "ASE1020-M116",
        referenceNo: "ASE02-M116C",
        name: "ダストBOX",
        material: "SPHC",
        surface: "焼付塗装",
        quantity: 1
      },
      {
        no: 14,
        drawingNo: "ASE1020-M117A",
        name: "カバー",
        material: "SPHC",
        surface: "焼付塗装",
        quantity: 1
      },
      {
        no: 15,
        drawingNo: "ASE1020-M118B",
        name: "カバー",
        material: "SPHC",
        surface: "焼付塗装",
        quantity: 1
      },
      {
        no: 16,
        drawingNo: "ASE1020-M121",
        referenceNo: "ASE02-M121",
        name: "プレート",
        material: "SUS304",
        quantity: 1
      },
      {
        no: 17,
        drawingNo: "ASE1020-M122",
        referenceNo: "ASE02-M122",
        name: "プレート",
        material: "SUS304",
        quantity: 1
      },
      {
        no: 18,
        drawingNo: "ASE1020-M123",
        referenceNo: "ASE02-M123",
        name: "センサー取付板",
        material: "SPHC",
        surface: "ユニクロメッキ",
        quantity: 1
      },
      {
        no: 20,
        drawingNo: "ASE1020-M125",
        name: "プレート",
        material: "SUS304",
        quantity: 1
      },
      {
        no: 21,
        drawingNo: "ASE1020-M126",
        name: "プレート",
        material: "SUS304",
        quantity: 1
      }
    ],
    purchasedParts: [
      {
        no: 1,
        maker: "ミスミ",
        name: "ベアリングスペーサ",
        model: "CLBPB30-40-68.2",
        alternateModel: "CLBPB30-40-68.2",
        quantity: 1
      },
      {
        no: 2,
        maker: "ミスミ",
        name: "平行キー",
        model: "KED8-32",
        alternateModel: "KED8-35",
        quantity: 1
      },
      {
        no: 3,
        maker: "ミスミ",
        name: "平行キー",
        model: "KEDW10-50",
        alternateModel: "KEDW10-50",
        quantity: 2
      },
      {
        no: 4,
        maker: "ミスミ",
        name: "プラスチックノブ",
        model: "NHM5-10",
        alternateModel: "NHM5-10",
        quantity: 2
      },
      {
        no: 5,
        maker: "ミスミ",
        name: "アジャストパッド",
        model: "FJFN16-100",
        alternateModel: "NFJN16-100",
        quantity: 4
      },
      {
        no: 6,
        maker: "ミスミ",
        name: "自在キャスタ",
        model: "CMGS75-N",
        alternateModel: "CJMM75",
        quantity: 1
      },
      {
        no: 7,
        maker: "ミスミ",
        name: "自在キャスタ",
        model: "CMGS-L75-N",
        quantity: 1
      },
      {
        no: 8,
        maker: "ミスミ",
        name: "固定キャスタ",
        model: "CMGK75-N",
        alternateModel: "CKMM75",
        quantity: 2
      },
      {
        no: 9,
        maker: "ミスミ",
        name: "金属ワッシャ",
        model: "WSSB20-8-3",
        alternateModel: "WSSB20-8-3",
        quantity: 4
      },
      {
        no: 10,
        maker: "ミスミ",
        name: "金属ワッシャ",
        model: "WSSM8-4-3",
        alternateModel: "WSSB20-8-3",
        quantity: 2,
        remarks: "使用せず"
      },
      {
        no: 11,
        maker: "ミスミ",
        name: "位置決めボルト",
        model: "STBBM10-70",
        alternateModel: "STBBM10-70",
        quantity: 1
      },
      {
        no: 12,
        maker: "ミスミ",
        name: "板金",
        model: "JTDAS-SUD-A55-B20-T3-X10-Y10-M5-L20-MA5",
        alternateModel: "JTDAS-SUD-A55-B20-T3-X10-Y10-M5-L20-MA5",
        quantity: 2,
        remarks: "引出ストッパー部品"
      },
      {
        no: 13,
        maker: "ミスミ",
        name: "金属カラー",
        model: "KNCLSS6-15-15",
        alternateModel: "KNCLSS6-15-15",
        quantity: 4,
        remarks: "引出ストッパー部品"
      },
      {
        no: 14,
        maker: "ミスミ",
        name: "埋込み取手",
        model: "UWUAN109.5-N",
        alternateModel: "UWUAN109.5-N",
        quantity: 2
      },
      {
        no: 15,
        maker: "ミスミ",
        name: "深溝玉軸受",
        model: "B6206ZZ",
        alternateModel: "B6206ZZ",
        quantity: 2
      },
      {
        no: 16,
        maker: "ミスミ",
        name: "矢印ステッカー",
        model: "AWRR-20",
        alternateModel: "AWRR-20",
        quantity: 1
      },
      {
        no: 17,
        maker: "ミスミ",
        name: "ラバーマグネット",
        model: "HXP1.0-20",
        alternateModel: "HXRSL0.5-20",
        quantity: 1,
        remarks: "23.03.13型式変更"
      },
      {
        no: 18,
        maker: "ミスミ",
        name: "金属ワッシャー",
        model: "FWSSM-D17.5-V6.0-T1.5",
        quantity: 1,
        remarks: "24.03.11追加"
      },
      {
        no: 19,
        maker: "NBK",
        name: "JIS Vプーリ",
        model: "250-B-1-φ30-BKN-FN",
        quantity: 1
      },
      {
        no: 20,
        maker: "NBK",
        name: "JIS Vプーリ",
        model: "150-B-1-φ18-BKW-FN",
        quantity: 1
      },
      {
        no: 21,
        maker: "ニッセイ",
        name: "ギアモータ",
        model: "G3L18N15-MM02TNNTN",
        quantity: 1
      },
      {
        no: 22,
        maker: "バンドー",
        name: "Ｖベルト",
        model: "B-53",
        quantity: 1,
        remarks: "有効長：1346ｍｍ"
      },
      {
        no: 23,
        maker: "キーエンス",
        name: "近接センサ",
        model: "EV-108U",
        alternateModel: "EV-108U",
        quantity: 1
      }
    ],
    sourceFile: "【1020】Vベルト巻込まれ.xlsx",
    sourceSheet: "Vベルト巻込まれ",
    sourceMode: "Excelセル本文と貼付写真を抽出し、工程別に整理",
    partsSourceFile: "Vベルト巻込まれ安全体感装置_機械リスト.xls",
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
        subSteps: [
          {
            id: "1-1",
            title: "フレームを作業台に置き、取付穴を確認する",
            instruction: "フレームの向きとキャスター取付位置を確認し、締結穴に異物や塗装だまりがないかを見る。",
            imageSrc: vBeltImage("frame-overview-01.png"),
            imageCaption: "フレーム全体とキャスター取付位置",
            images: [
              {
                src: vBeltImage("frame-overview-01.png"),
                role: "main",
                caption: "フレーム全体とキャスター取付位置"
              }
            ],
            parts: ["フレーム(1/2),(2/2)"],
            note: "向きを間違えると後工程のカバー、ダストBOX位置がずれる。"
          },
          {
            id: "1-2",
            title: "キャスターとアジャストパッドを取り付ける",
            instruction: "自在キャスター、固定キャスター、アジャストパッドを指定位置へ仮置きし、ボルトを均等に締める。",
            imageSrc: vBeltImage("frame-fasteners-01.png"),
            imageCaption: "取付穴と締結部品",
            images: [
              {
                src: vBeltImage("frame-fasteners-01.png"),
                role: "main",
                caption: "取付穴と締結部品"
              }
            ],
            parts: [
              "自在キャスタ(CMGS75-N) x1",
              "自在キャスタ(CMGS-L75-N) x1",
              "固定キャスタ(CMGK75-N) x2",
              "アジャストパッド(FJFN16-100) x4"
            ],
            fasteners: ["CUPボルト(M8x20) x12", "SW x12", "平 x12"]
          }
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
        subSteps: [
          {
            id: "2-1",
            title: "平行キーをフレーム側に取り付ける",
            instruction: "平行キーを長穴位置に合わせ、CUPボルトで固定する。向きと浮きがないことを確認する。",
            imageSrc: vBeltImage("frame-fasteners-01.png"),
            imageCaption: "平行キー取付位置",
            images: [
              {
                src: vBeltImage("frame-fasteners-01.png"),
                role: "main",
                caption: "平行キー取付位置"
              }
            ],
            parts: ["平行キー(KEDW10-50) x2"],
            fasteners: ["CUPボルト(M4x12) x4"]
          },
          {
            id: "2-2",
            title: "シャフト周辺部品を順番に準備する",
            instruction: "シャフト、軸受、スペーサ、平ワッシャ、ベアリングホルダを並べ、組付け順を確認する。",
            imageSrc: vBeltImage("shaft-parts-01.png"),
            imageCaption: "シャフト、軸受、スペーサ、平ワッシャ",
            images: [
              {
                src: vBeltImage("shaft-parts-01.png"),
                role: "main",
                caption: "シャフト、軸受、スペーサ、平ワッシャ"
              },
              {
                src: vBeltImage("shaft-part-01.png"),
                role: "detail",
                caption: "シャフト単体"
              },
              {
                src: vBeltImage("bearing-holder-parts-01.png"),
                role: "detail",
                caption: "ベアリングホルダと周辺部品"
              }
            ],
            parts: [
              "シャフト(-M106)",
              "深溝玉軸受(B6206ZZ) x2",
              "ベアリングスペーサ(CLBPB30-40-68.2)",
              "平ワッシャ(-M105)",
              "ベアリングホルダ(-M103)"
            ],
            note: "軸受の向きとスペーサ位置を先に確認しておく。"
          },
          {
            id: "2-3",
            title: "ベアリングホルダへシャフトを挿入する",
            instruction: "穴内側へ少量の潤滑剤を塗布し、シャフトをまっすぐ挿入する。無理に叩き込まない。",
            imageSrc: vBeltImage("bearing-holder-01.png"),
            imageCaption: "ベアリングホルダへの挿入方向",
            images: [
              {
                src: vBeltImage("bearing-holder-01.png"),
                role: "main",
                caption: "ベアリングホルダへの挿入方向"
              },
              {
                src: vBeltImage("bearing-holder-02.png"),
                role: "detail",
                caption: "挿入前の穴位置確認"
              },
              {
                src: vBeltImage("bearing-holder-03.png"),
                role: "detail",
                caption: "シャフト挿入途中"
              },
              {
                src: vBeltImage("bearing-holder-04.png"),
                role: "detail",
                caption: "挿入後の状態"
              },
              {
                src: vBeltImage("shaft-installed-01.png"),
                role: "detail",
                caption: "シャフト挿入後の外観"
              }
            ],
            parts: ["ベアリングホルダ(-M103)", "シャフト(-M106)"],
            note: "潤滑剤は少量。塗りすぎると周辺に付着する。"
          },
          {
            id: "2-4",
            title: "プレートを固定する",
            instruction: "プレートを取付面に合わせ、ボルトを対角に締めて固定する。",
            imageSrc: vBeltImage("plate-mounted-01.png"),
            imageCaption: "プレート固定状態",
            images: [
              {
                src: vBeltImage("plate-mounted-01.png"),
                role: "main",
                caption: "プレート固定状態 1"
              },
              {
                src: vBeltImage("plate-mounted-02.png"),
                role: "detail",
                caption: "プレート固定状態 2"
              }
            ],
            parts: ["プレート(-M104)"],
            fasteners: ["CUPボルト(M4x10) x4", "SW x4", "平 x4"]
          }
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
        subSteps: [
          {
            id: "3-1",
            title: "位置決めブロックと位置決めボルトを取り付ける",
            instruction: "位置決めブロックを指定位置に置き、位置決めボルトで調整できる状態にしておく。",
            imageSrc: vBeltImage("position-block-01.png"),
            imageCaption: "位置決めブロック周辺",
            images: [
              {
                src: vBeltImage("position-block-01.png"),
                role: "main",
                caption: "位置決めブロック周辺"
              }
            ],
            parts: ["位置決めブロック(-M108)", "位置決めボルト(STBBM10-70)"],
            fasteners: ["CUPボルト(M8x40) x2"]
          },
          {
            id: "3-2",
            title: "ギアモータを仮固定する",
            instruction: "ギアモータを取付面に合わせ、回転部に手や工具を残さない状態で仮固定する。",
            imageSrc: vBeltImage("motor-mounted-01.png"),
            imageCaption: "ギアモータ取付状態",
            images: [
              {
                src: vBeltImage("motor-mounted-01.png"),
                role: "main",
                caption: "ギアモータ取付状態 1"
              },
              {
                src: vBeltImage("motor-mounted-02.png"),
                role: "detail",
                caption: "ギアモータ取付状態 2"
              }
            ],
            parts: ["ギアモータ(G3L18N15-MM02TNNTN)"],
            fasteners: ["CUPボルト(M8x25) x4", "SW x4", "金属ワッシャ(WSSB20-8-3) x4"]
          },
          {
            id: "3-3",
            title: "JIS Vプーリを取り付ける",
            instruction: "モータ側とシャフト側のプーリを取り付け、キーの入り方と固定状態を確認する。",
            imageSrc: vBeltImage("motor-pulley-installed-01.png"),
            imageCaption: "プーリ取付状態",
            images: [
              {
                src: vBeltImage("pulley-part-01.png"),
                role: "detail",
                caption: "JIS Vプーリ 1"
              },
              {
                src: vBeltImage("pulley-part-02.png"),
                role: "detail",
                caption: "JIS Vプーリ 2"
              },
              {
                src: vBeltImage("pulley-part-03.png"),
                role: "detail",
                caption: "JIS Vプーリ 3"
              },
              {
                src: vBeltImage("motor-pulley-installed-01.png"),
                role: "main",
                caption: "プーリ取付状態"
              }
            ],
            parts: ["JIS Vプーリ(150-B-1-φ18-BKW-FN)", "JIS Vプーリ(250-B-1-φ30-BKN-FN)"],
            fasteners: ["CUPボルト(M4x12) x2", "SW x2"]
          },
          {
            id: "3-4",
            title: "プーリ面を合わせる",
            instruction: "定規などを当て、左右の傾きと面のずれを確認する。ほぼ面が合うように調整する。",
            imageSrc: vBeltImage("pulley-alignment-01.png"),
            imageCaption: "プーリ面合わせ確認",
            images: [
              {
                src: vBeltImage("pulley-alignment-01.png"),
                role: "main",
                caption: "プーリ面合わせ確認"
              },
              {
                src: vBeltImage("pulley-alignment-note.png"),
                role: "detail",
                caption: "調整メモ"
              },
              {
                src: vBeltImage("motor-belt-installed-01.png"),
                role: "detail",
                caption: "モータ・プーリ周辺"
              }
            ],
            note: "大きくずれている場合は固定前に位置を調整する。"
          }
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
        subSteps: [
          {
            id: "4-1",
            title: "Vベルトをプーリに掛ける",
            instruction: "Vベルトをプーリ溝に沿わせて掛ける。指をベルトとプーリの間へ入れない。",
            imageSrc: vBeltImage("v-belt-part-01.png"),
            imageCaption: "Vベルト部品",
            images: [
              {
                src: vBeltImage("v-belt-part-01.png"),
                role: "main",
                caption: "Vベルト部品"
              }
            ],
            parts: ["Vベルト(B-53)"]
          },
          {
            id: "4-2",
            title: "張りとたわみを確認する",
            instruction: "ベルト中央付近を確認し、過度なたるみ、だき、干渉がないことを見る。",
            imageSrc: vBeltImage("belt-tension-01.png"),
            imageCaption: "ベルト張り確認",
            images: [
              {
                src: vBeltImage("belt-tension-01.png"),
                role: "main",
                caption: "ベルト張り確認 1"
              },
              {
                src: vBeltImage("belt-tension-02.png"),
                role: "detail",
                caption: "ベルト張り確認 2"
              },
              {
                src: vBeltImage("belt-tension-03.png"),
                role: "detail",
                caption: "ベルト張り確認 3"
              }
            ],
            note: "手回し確認時も巻込まれ位置を避ける。"
          }
        ],
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
        subSteps: [
          {
            id: "5-1",
            title: "センサー取付板を指定位置へ合わせる",
            instruction: "取付板の向きと穴位置を確認し、配線やセンサー周辺に無理な力がかからないようにする。",
            imageSrc: vBeltImage("sensor-close-01.png"),
            imageCaption: "センサー取付板周辺 1",
            images: [
              {
                src: vBeltImage("sensor-close-01.png"),
                role: "main",
                caption: "センサー取付板周辺 1"
              }
            ],
            parts: ["センサー取付板(-M123)"],
            fasteners: ["CUPボルト(M5x10) x2", "SW x2", "平 x2"]
          },
          {
            id: "5-2",
            title: "周辺逃げを確認する",
            instruction: "取付後に周辺部品との干渉、センサー向き、配線の逃げを確認する。",
            imageSrc: vBeltImage("sensor-close-02.png"),
            imageCaption: "センサー取付板周辺 2",
            images: [
              {
                src: vBeltImage("sensor-close-02.png"),
                role: "main",
                caption: "センサー取付板周辺 2"
              }
            ]
          }
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
        subSteps: [
          {
            id: "6-1",
            title: "プーリカバーと覗き窓を準備する",
            instruction: "カバー、覗き窓、プレートの向きと穴位置を確認してから組み付ける。",
            imageSrc: vBeltImage("cover-parts-01.png"),
            imageCaption: "カバー、覗き窓、プレート部品",
            images: [
              {
                src: vBeltImage("cover-parts-01.png"),
                role: "main",
                caption: "カバー、覗き窓、プレート部品"
              },
              {
                src: vBeltImage("cover-front-02.png"),
                role: "detail",
                caption: "正面カバー部品確認"
              }
            ],
            parts: ["プーリカバー(-M109A)", "覗き窓(-M110A)", "覗き窓(-M111A)", "プレート(-M121)", "プレート(-M122)"]
          },
          {
            id: "6-2",
            title: "正面カバーを取り付ける",
            instruction: "正面側のカバーを位置決めし、ネジ種類と数量を確認しながら固定する。",
            imageSrc: vBeltImage("cover-front-01.png"),
            imageCaption: "正面カバー取付",
            images: [
              {
                src: vBeltImage("cover-front-01.png"),
                role: "main",
                caption: "正面カバー取付"
              },
              {
                src: vBeltImage("cover-finished-01.png"),
                role: "detail",
                caption: "カバー取付後 1"
              },
              {
                src: vBeltImage("cover-finished-02.png"),
                role: "detail",
                caption: "カバー取付後 2"
              }
            ],
            fasteners: ["トラスネジ(M5x8) x5", "トラスネジ(M5x12) x10", "六角穴付き皿ネジ(M5x12) x4"]
          },
          {
            id: "6-3",
            title: "側面カバーと仕上げカバーを取り付ける",
            instruction: "コード取り出し穴の位置を確認し、カバー端面に注意して固定する。",
            imageSrc: vBeltImage("finish-cover-01.png"),
            imageCaption: "仕上げカバー",
            images: [
              {
                src: vBeltImage("cover-side-01.png"),
                role: "detail",
                caption: "側面カバー"
              },
              {
                src: vBeltImage("finish-cover-01.png"),
                role: "main",
                caption: "仕上げカバー"
              }
            ],
            parts: ["カバー(-M117)", "カバー(-M118)"],
            fasteners: ["トラスネジ(M4x10) x8", "十字穴付きトラス小ねじ(M5x8)"],
            note: "コード取り出し用の穴位置を必ず確認する。"
          }
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
        subSteps: [
          {
            id: "7-1",
            title: "ダストBOXと取手を準備する",
            instruction: "ダストBOXの上下向きと取手の取付方向を確認する。",
            imageSrc: vBeltImage("dustbox-01.png"),
            imageCaption: "ダストBOXと取手部品",
            images: [
              {
                src: vBeltImage("dustbox-01.png"),
                role: "main",
                caption: "ダストBOXと取手部品"
              },
              {
                src: vBeltImage("dustbox-03.png"),
                role: "detail",
                caption: "ダストBOX外観"
              },
              {
                src: vBeltImage("dustbox-handle-01.png"),
                role: "detail",
                caption: "埋込み取手"
              }
            ],
            parts: ["ダストBOX(-M116)", "埋込み取手(UWUAN109.5-N) x2"],
            fasteners: ["CUPボルト(M5x8) x8", "平 x8", "厚平 x8"],
            note: "上下逆にしない。"
          },
          {
            id: "7-2",
            title: "板金とカラーを取り付ける",
            instruction: "板金、金属カラー、プラスチックノブを指定位置へ組み付け、引出しの動きを確認する。",
            imageSrc: vBeltImage("dustbox-fasteners-01.png"),
            imageCaption: "ダストBOX締結部",
            images: [
              {
                src: vBeltImage("dustbox-fasteners-01.png"),
                role: "main",
                caption: "ダストBOX締結部"
              }
            ],
            parts: [
              "板金 x2",
              "金属カラー(KNCLSS6-15-15) x4",
              "プラスチックノブ(NHM5-10) x2"
            ],
            fasteners: ["CUPボルト(M5x25) x4", "SW x4", "平 x4"]
          }
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
