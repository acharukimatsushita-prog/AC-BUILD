import {
  CheckCircle2,
  Eye,
  FilePenLine,
  FileSpreadsheet,
  ImageIcon,
  Info,
  ListChecks,
  PackageCheck,
  Search,
  ShieldCheck,
  Wrench
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { standards as initialStandards, type Standard, type Step } from "./data/standards";

const STORAGE_KEY = "ac-build-standards";

function loadStandards(): Standard[] {
  try {
    const savedStandards = window.localStorage.getItem(STORAGE_KEY);

    if (!savedStandards) {
      return initialStandards;
    }

    const parsedStandards = JSON.parse(savedStandards) as Standard[];

    return initialStandards.map((initialStandard) => {
      const savedStandard = parsedStandards.find((standard) => standard.id === initialStandard.id);

      if (!savedStandard) {
        return initialStandard;
      }

      return {
        ...initialStandard,
        revision: savedStandard.revision,
        updatedAt: savedStandard.updatedAt,
        steps: initialStandard.steps.map((initialStep) => {
          const savedStep = savedStandard.steps.find((step) => step.id === initialStep.id);

          return savedStep ? { ...initialStep, ...savedStep } : initialStep;
        })
      };
    });
  } catch {
    return initialStandards;
  }
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function bumpRevision(revision: string) {
  const match = revision.match(/Rev\.\s*(\d+)(?:\.(\d+))?/);

  if (!match) {
    return `${revision} / Rev. 1.0`;
  }

  const major = Number(match[1]);
  const minor = Number(match[2] ?? 0) + 1;

  return revision.replace(match[0], `Rev. ${major}.${minor}`);
}

function getQuantity(material: string) {
  const match = material.match(/[x×]\s*(\d+)/i);

  return match ? Number(match[1]) : 1;
}

function getFastenerType(material: string) {
  if (material.includes("CUPボルト")) {
    return "CUPボルト";
  }

  if (material.includes("トラスネジ") || material.includes("トラス小ねじ")) {
    return "トラスネジ";
  }

  if (material.includes("皿ネジ")) {
    return "皿ネジ";
  }

  if (material.includes("小ねじ")) {
    return "小ねじ";
  }

  if (material.includes("ボルト")) {
    return "ボルト";
  }

  if (material.includes("SW") || material.includes("平") || material.includes("ワッシャ")) {
    return "ワッシャ類";
  }

  return "締結部品";
}

function getFastenerSize(material: string) {
  const metricMatch = material.match(/M\d+(?:[x×]\d+)?/i);

  if (metricMatch) {
    return metricMatch[0].replace("×", "x").toUpperCase();
  }

  const washerParts = ["SW", "厚平", "平", "金属ワッシャ"].filter((part) => material.includes(part));

  return washerParts.length > 0 ? washerParts.join("・") : "-";
}

function isFastener(material: string) {
  return /ボルト|ネジ|ねじ|小ねじ|皿ネジ|SW|ワッシャ|平/.test(material);
}

export function App() {
  const [standardList, setStandardList] = useState<Standard[]>(loadStandards);
  const [selectedId, setSelectedId] = useState("v-belt-entanglement");
  const [selectedStepId, setSelectedStepId] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(false);
  const revisedStandardIds = useRef(new Set<string>());
  const revisionPromptedStandardIds = useRef(new Set<string>());

  const filteredStandards = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) {
      return standardList;
    }

    return standardList.filter((standard) =>
      [standard.name, standard.category, standard.owner].some((value) =>
        value.toLowerCase().includes(keyword)
      )
    );
  }, [searchTerm, standardList]);

  const selected = useMemo(
    () => standardList.find((standard) => standard.id === selectedId) ?? standardList[0],
    [selectedId, standardList]
  );

  useEffect(() => {
    setSelectedStepId(selected.steps[0]?.id ?? 0);
  }, [selectedId, selected.steps]);

  const selectedStep = useMemo(
    () => selected.steps.find((step) => step.id === selectedStepId) ?? selected.steps[0],
    [selected.steps, selectedStepId]
  );

  const preparationSteps = useMemo(
    () =>
      selected.steps
        .map((step) => ({
          id: step.id,
          title: step.title,
          materials: step.materials ?? []
        }))
        .filter((step) => step.materials.length > 0),
    [selected.steps]
  );
  const preparation = useMemo(() => {
    const fastenerMap = new Map<
      string,
      {
        type: string;
        size: string;
        quantity: number;
        steps: Set<number>;
        originals: Set<string>;
      }
    >();
    const componentSteps = preparationSteps
      .map((step) => ({
        ...step,
        materials: step.materials.filter((material) => !isFastener(material))
      }))
      .filter((step) => step.materials.length > 0);

    preparationSteps.forEach((step) => {
      step.materials.filter(isFastener).forEach((material) => {
        const type = getFastenerType(material);
        const size = getFastenerSize(material);
        const key = `${type}-${size}`;
        const existing = fastenerMap.get(key);

        if (existing) {
          existing.quantity += getQuantity(material);
          existing.steps.add(step.id);
          existing.originals.add(material);
          return;
        }

        fastenerMap.set(key, {
          type,
          size,
          quantity: getQuantity(material),
          steps: new Set([step.id]),
          originals: new Set([material])
        });
      });
    });

    return {
      fasteners: Array.from(fastenerMap.values()).sort(
        (a, b) => a.type.localeCompare(b.type, "ja") || a.size.localeCompare(b.size, "ja")
      ),
      componentSteps
    };
  }, [preparationSteps]);
  const fastenerItemCount = preparation.fasteners.reduce((total, item) => total + item.quantity, 0);
  const componentItemCount = preparation.componentSteps.reduce((total, step) => total + step.materials.length, 0);
  const machinePartRows = [
    ...(selected.fabricatedParts ?? []).map((part) => ({ ...part, category: "加工品" })),
    ...(selected.purchasedParts ?? []).map((part) => ({ ...part, category: "購入品" }))
  ];
  const machinePartCount = machinePartRows.reduce((total, part) => total + part.quantity, 0);
  const selectedGallery = selectedStep.gallery ?? [];
  const primaryImage = selectedStep.imageSrc ?? selectedGallery[0]?.src ?? selected.heroImageSrc;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(standardList));
  }, [standardList]);

  const handleModeToggle = () => {
    setEditMode((value) => {
      if (!value) {
        revisedStandardIds.current.clear();
        revisionPromptedStandardIds.current.clear();
      }

      return !value;
    });
  };

  const updateSelectedStep = (
    field: keyof Pick<Step, "title" | "work" | "safety" | "quality" | "note" | "materials">,
    value: string | string[]
  ) => {
    setStandardList((currentStandards) =>
      currentStandards.map((standard) => {
        if (standard.id !== selected.id) {
          return standard;
        }

        const currentStep = standard.steps.find((step) => step.id === selectedStep.id);

        if (!currentStep || currentStep[field] === value) {
          return standard;
        }

        let shouldBumpRevision = false;

        if (
          !revisedStandardIds.current.has(standard.id) &&
          !revisionPromptedStandardIds.current.has(standard.id)
        ) {
          revisionPromptedStandardIds.current.add(standard.id);
          shouldBumpRevision = window.confirm(
            "編集内容に合わせてRevと更新日を変更しますか？\n\nOK: Revを更新する\nキャンセル: 内容だけ編集する"
          );
        }

        if (shouldBumpRevision) {
          revisedStandardIds.current.add(standard.id);
        }

        return {
          ...standard,
          revision: shouldBumpRevision ? bumpRevision(standard.revision) : standard.revision,
          updatedAt: shouldBumpRevision ? getToday() : standard.updatedAt,
          steps: standard.steps.map((step) =>
            step.id === selectedStep.id ? { ...step, [field]: value } : step
          )
        };
      })
    );
  };

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="標準書一覧">
        <div className="brand-block">
          <div className="brand-mark">AC</div>
          <div>
            <p className="eyebrow">Assembly Standard</p>
            <h1>AC-BUILD</h1>
          </div>
        </div>

        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <input
            placeholder="標準書名で検索"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <nav className="standard-list">
          {filteredStandards.map((standard) => (
            <button
              className={standard.id === selected.id ? "standard-item active" : "standard-item"}
              key={standard.id}
              onClick={() => setSelectedId(standard.id)}
            >
              <span>{standard.name}</span>
              <small>
                {standard.revision} / {standard.status}
              </small>
            </button>
          ))}
          {filteredStandards.length === 0 ? <p className="empty-text">該当する標準書がありません。</p> : null}
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">{selected.category}</p>
            <h2>{selected.name}</h2>
            {selected.summary ? <p className="lead-text">{selected.summary}</p> : null}
          </div>
          <div className="topbar-side">
            <div className={editMode ? "mode-status edit" : "mode-status"} aria-live="polite">
              {editMode ? <FilePenLine size={17} /> : <Eye size={17} />}
              <span>{editMode ? "現在: 編集モード" : "現在: 閲覧モード"}</span>
            </div>
            <button
              className={editMode ? "mode-action return" : "mode-action"}
              type="button"
              onClick={handleModeToggle}
              aria-pressed={editMode}
            >
              {editMode ? <Eye size={17} /> : <FilePenLine size={17} />}
              <span>{editMode ? "閲覧モードに戻る" : "編集モード"}</span>
            </button>
            {selected.heroImageSrc ? (
              <div className="topbar-preview">
                <img src={selected.heroImageSrc} alt={`${selected.name} 図面`} />
              </div>
            ) : null}
          </div>
        </header>

        <section className="summary-band">
          <div>
            <span>版数</span>
            <strong>{selected.revision}</strong>
          </div>
          <div>
            <span>状態</span>
            <strong>{selected.status}</strong>
          </div>
          <div>
            <span>更新日</span>
            <strong>{selected.updatedAt}</strong>
          </div>
          <div>
            <span>管理部門</span>
            <strong>{selected.owner}</strong>
          </div>
        </section>

        {selected.sourceFile ? (
          <section className="source-band" aria-label="Excel原本情報">
            <FileSpreadsheet size={20} />
            <div>
              <strong>{selected.sourceFile}</strong>
              <span>
                シート: {selected.sourceSheet} / {selected.sourceMode}
              </span>
              {selected.partsSourceFile ? <span>部品リスト: {selected.partsSourceFile}</span> : null}
              {selected.drawingPdfSrc ? (
                <a href={selected.drawingPdfSrc} target="_blank" rel="noreferrer">
                  組立図面PDFを開く
                </a>
              ) : null}
            </div>
          </section>
        ) : null}

        {machinePartRows.length > 0 ? (
          <section className="machine-list-panel" aria-label="正規部品リスト">
            <div className="section-heading compact">
              <FileSpreadsheet size={20} />
              <h3>正規部品リスト</h3>
              <span>機械リスト {machinePartRows.length}行 / 数量合計 {machinePartCount}</span>
            </div>
            <div className="machine-list-table-wrap">
              <table className="machine-list-table">
                <thead>
                  <tr>
                    <th>区分</th>
                    <th>No.</th>
                    <th>名称</th>
                    <th>図番・型式</th>
                    <th>材質 / メーカー</th>
                    <th>数量</th>
                    <th>備考</th>
                  </tr>
                </thead>
                <tbody>
                  {machinePartRows.map((part) => (
                    <tr key={`${part.category}-${part.no}-${part.name}-${part.model ?? part.drawingNo ?? ""}`}>
                      <td>{part.category}</td>
                      <td>{part.no}</td>
                      <td>{part.name}</td>
                      <td>{part.model ?? part.drawingNo ?? "-"}</td>
                      <td>{part.maker ?? part.material ?? "-"}</td>
                      <td>{part.quantity}</td>
                      <td>{part.remarks ?? part.surface ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {preparationSteps.length > 0 ? (
          <section className="preparation-panel" aria-label="組立前準備">
            <div className="section-heading compact">
              <PackageCheck size={20} />
              <h3>組立前準備</h3>
              <span>ボルト優先準備リスト</span>
            </div>
            {preparation.fasteners.length > 0 ? (
              <section className="fastener-section" aria-label="ボルト・締結部品">
                <div className="preparation-subheading">
                  <h4>ボルト・締結部品</h4>
                  <span>合計 {fastenerItemCount}点</span>
                </div>
                <div className="fastener-table-wrap">
                  <table className="fastener-table">
                    <thead>
                      <tr>
                        <th>種類</th>
                        <th>サイズ</th>
                        <th>数量</th>
                        <th>使用工程</th>
                        <th>原文</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preparation.fasteners.map((fastener) => (
                        <tr key={`${fastener.type}-${fastener.size}`}>
                          <td>{fastener.type}</td>
                          <td>{fastener.size}</td>
                          <td>{fastener.quantity}</td>
                          <td>
                            {Array.from(fastener.steps)
                              .sort((a, b) => a - b)
                              .map((step) => `工程${step}`)
                              .join("、")}
                          </td>
                          <td>{Array.from(fastener.originals).join(" / ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {preparation.componentSteps.length > 0 ? (
              <section className="component-section" aria-label="部材・購入品">
                <div className="preparation-subheading">
                  <h4>部材・購入品</h4>
                  <span>{componentItemCount}項目</span>
                </div>
                <div className="preparation-grid">
                  {preparation.componentSteps.map((step) => (
                    <article className="preparation-step" key={step.id}>
                      <div className="preparation-step-title">
                        <span>{step.id}</span>
                        <strong>{step.title}</strong>
                      </div>
                      <ul>
                        {step.materials.map((material) => (
                          <li key={`${step.id}-${material}`}>{material}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </section>
        ) : null}

        <div className="content-grid">
          <section className="steps-panel" aria-label="工程詳細">
            <div className="section-heading">
              <Wrench size={20} />
              <h3>工程詳細</h3>
            </div>

            <article className="step-hero">
              <div className={primaryImage ? "step-hero-image has-photo" : "step-hero-image"}>
                {primaryImage ? (
                  <img className="step-photo" src={primaryImage} alt={selectedStep.title} />
                ) : (
                  <ImageIcon size={46} aria-hidden="true" />
                )}
                <div className="step-media-badge">
                  {selectedStep.media === "photo"
                    ? "Excel写真"
                    : selectedStep.media === "video"
                    ? "動画"
                    : "資料なし"}
                </div>
              </div>

              <div className="step-hero-content">
                <div className="step-hero-meta">
                  <div className="step-number step-number-large">{selectedStep.id}</div>
                  <div>
                    <p className="eyebrow">選択中の工程</p>
                    {editMode ? (
                      <input
                        className="edit-input step-title-input"
                        value={selectedStep.title}
                        onChange={(event) => updateSelectedStep("title", event.target.value)}
                        aria-label="工程名"
                      />
                    ) : (
                      <h4>{selectedStep.title}</h4>
                    )}
                    {selectedStep.sourceRows ? (
                      <small className="source-rows">Excel行 {selectedStep.sourceRows}</small>
                    ) : null}
                  </div>
                </div>

                {editMode ? (
                  <label className="edit-field">
                    <span>作業内容</span>
                    <textarea
                      value={selectedStep.work}
                      onChange={(event) => updateSelectedStep("work", event.target.value)}
                    />
                  </label>
                ) : (
                  <p className="step-work">{selectedStep.work}</p>
                )}

                {editMode ? (
                  <label className="edit-field">
                    <span>メモ</span>
                    <textarea
                      value={selectedStep.note ?? ""}
                      onChange={(event) => updateSelectedStep("note", event.target.value)}
                      placeholder="注意メモを入力"
                    />
                  </label>
                ) : selectedStep.note ? (
                  <div className="note-box">
                    <Info size={17} />
                    <span>{selectedStep.note}</span>
                  </div>
                ) : null}

                <div className="check-grid">
                  <div>
                    <ShieldCheck size={17} />
                    {editMode ? (
                      <label className="edit-field inline">
                        <span>安全</span>
                        <textarea
                          value={selectedStep.safety}
                          onChange={(event) => updateSelectedStep("safety", event.target.value)}
                        />
                      </label>
                    ) : (
                      <span>{selectedStep.safety}</span>
                    )}
                  </div>
                  <div>
                    <CheckCircle2 size={17} />
                    {editMode ? (
                      <label className="edit-field inline">
                        <span>品質</span>
                        <textarea
                          value={selectedStep.quality}
                          onChange={(event) => updateSelectedStep("quality", event.target.value)}
                        />
                      </label>
                    ) : (
                      <span>{selectedStep.quality}</span>
                    )}
                  </div>
                </div>

                {selectedStep.materials && selectedStep.materials.length > 0 ? (
                  <div className="materials-block">
                    <div className="materials-title">
                      <PackageCheck size={17} />
                      <span>使用部品・締結部品</span>
                    </div>
                    {editMode ? (
                      <label className="edit-field materials-edit">
                        <span>1行につき1部品で入力</span>
                        <textarea
                          value={selectedStep.materials.join("\n")}
                          onChange={(event) =>
                            updateSelectedStep(
                              "materials",
                              event.target.value
                                .split("\n")
                                .map((material) => material.trim())
                                .filter(Boolean)
                            )
                          }
                        />
                      </label>
                    ) : (
                      <ul>
                        {selectedStep.materials.map((material) => (
                          <li key={material}>{material}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : null}
              </div>
            </article>

            {selectedGallery.length > 0 ? (
              <section className="gallery-section" aria-label="Excelから抽出した写真">
                <div className="section-heading compact">
                  <ImageIcon size={18} />
                  <h3>Excel写真</h3>
                  <span>{selectedGallery.length}枚</span>
                </div>
                <div className="photo-gallery">
                  {selectedGallery.map((image) => (
                    <figure key={image.src} className="photo-card">
                      <img src={image.src} alt={image.caption} />
                      <figcaption>{image.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}
          </section>

          <aside className="side-panel">
            <section className="operation-panel" aria-label="工程一覧">
              <div className="section-heading">
                <ListChecks size={20} />
                <h3>工程一覧</h3>
              </div>
              <div className="step-tabs" role="tablist" aria-label="工程一覧">
                {selected.steps.map((step) => (
                  <button
                    key={step.id}
                    type="button"
                    className={step.id === selectedStep.id ? "step-tab active" : "step-tab"}
                    onClick={() => setSelectedStepId(step.id)}
                  >
                    <span className="step-tab-number">{step.id}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <small>
                        {step.sourceRows ? `Excel行 ${step.sourceRows}` : `${step.gallery?.length ?? 0}枚`}
                      </small>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="operation-panel source-panel" aria-label="抽出元">
              <div className="section-heading">
                <FileSpreadsheet size={20} />
                <h3>抽出元</h3>
              </div>
              <dl className="source-list">
                <div>
                  <dt>ファイル</dt>
                  <dd>{selected.sourceFile ?? "未設定"}</dd>
                </div>
                <div>
                  <dt>シート</dt>
                  <dd>{selected.sourceSheet ?? "未設定"}</dd>
                </div>
                <div>
                  <dt>選択工程</dt>
                  <dd>{selectedStep.sourceRows ? `Excel行 ${selectedStep.sourceRows}` : "行情報なし"}</dd>
                </div>
                <div>
                  <dt>写真</dt>
                  <dd>{selectedGallery.length}枚</dd>
                </div>
              </dl>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
