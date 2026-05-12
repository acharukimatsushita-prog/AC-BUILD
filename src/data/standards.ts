export type Step = {
  id: number;
  title: string;
  work: string;
  safety: string;
  quality: string;
  media: "video" | "photo" | "none";
};

export type Standard = {
  id: string;
  name: string;
  category: string;
  revision: string;
  status: "公開中" | "下書き" | "承認待ち";
  updatedAt: string;
  owner: string;
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
    revision: "Rev. 0.8",
    status: "下書き",
    updatedAt: "2026-05-10",
    owner: "教育担当",
    steps: [
      {
        id: 1,
        title: "プーリー軸の芯出し",
        work: "駆動側と従動側のプーリー位置を仮決めする。",
        safety: "ベルト未装着で手回し確認を行う。",
        quality: "軸間距離、平行度、ガタつきを確認する。",
        media: "photo"
      },
      {
        id: 2,
        title: "Vベルト取り付け",
        work: "指定型式のVベルトをプーリー溝に沿わせて取り付ける。",
        safety: "指を挟まないよう、回転方向に手を置かない。",
        quality: "ベルト張力と溝への収まりを確認する。",
        media: "video"
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
