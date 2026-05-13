import {
  BookOpen,
  CheckCircle2,
  Clapperboard,
  FilePenLine,
  FileSpreadsheet,
  PackageCheck,
  Search,
  ShieldCheck,
  Wrench
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { standards } from "./data/standards";

export function App() {
  const [selectedId, setSelectedId] = useState("v-belt-entanglement");
  const [selectedStepId, setSelectedStepId] = useState<number>(0);
  const [editMode, setEditMode] = useState(false);
  const selected = useMemo(
    () => standards.find((standard) => standard.id === selectedId) ?? standards[0],
    [selectedId]
  );

  useEffect(() => {
    setSelectedStepId(selected.steps[0]?.id ?? 0);
  }, [selectedId, selected.steps]);

  const selectedStep = useMemo(
    () => selected.steps.find((step) => step.id === selectedStepId) ?? selected.steps[0],
    [selected.steps, selectedStepId]
  );

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
          <input placeholder="装置名で検索" />
        </label>

        <nav className="standard-list">
          {standards.map((standard) => (
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
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">{selected.category}</p>
            <h2>{selected.name}</h2>
          </div>
          <div className="toolbar">
            <button className="icon-button" aria-label="閲覧モード">
              <BookOpen size={20} />
            </button>
            <button
              className={editMode ? "mode-button enabled" : "mode-button"}
              onClick={() => setEditMode((value) => !value)}
            >
              <FilePenLine size={18} />
              編集モード
            </button>
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
            </div>
          </section>
        ) : null}

        <div className="content-grid">
          <section className="steps-panel" aria-label="作業工程">
            <div className="section-heading">
              <Wrench size={20} />
              <h3>作業工程</h3>
            </div>

            <article className="step-hero">
              <div className="step-hero-image">
                <div className="step-media-badge">
                  {selectedStep.media === "photo"
                    ? "写真で説明"
                    : selectedStep.media === "video"
                    ? "動画で説明"
                    : "資料なし"}
                </div>
              </div>
              <div className="step-hero-content">
                <div className="step-hero-meta">
                  <div className="step-number step-number-large">{selectedStep.id}</div>
                  <div>
                    <p className="eyebrow">選択中の工程</p>
                    <h4>{selectedStep.title}</h4>
                  </div>
                </div>
                <p>{selectedStep.work}</p>
                <div className="check-grid">
                  <div>
                    <ShieldCheck size={17} />
                    <span>{selectedStep.safety}</span>
                  </div>
                  <div>
                    <CheckCircle2 size={17} />
                    <span>{selectedStep.quality}</span>
                  </div>
                </div>
                {selectedStep.materials && selectedStep.materials.length > 0 ? (
                  <div className="materials-block">
                    <div className="materials-title">
                      <PackageCheck size={17} />
                      <span>使用部品・締結部品</span>
                    </div>
                    <ul>
                      {selectedStep.materials.map((material) => (
                        <li key={material}>{material}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {selectedStep.sourceRows ? (
                  <small className="source-rows">Excel行: {selectedStep.sourceRows}</small>
                ) : null}
              </div>
            </article>

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
                      {step.media === "video" ? "動画" : step.media === "photo" ? "写真" : "資料なし"}
                    </small>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <aside className="side-panel" aria-label="編集とメディア">
            <section className="operation-panel">
              <div className="section-heading">
                <Clapperboard size={20} />
                <h3>工程メディア</h3>
              </div>
              <div className="media-preview">
                <span>
                  {selectedStep.media === "photo"
                    ? "PHOTO"
                    : selectedStep.media === "video"
                    ? "VIDEO"
                    : "NO MEDIA"}
                </span>
              </div>
              <button className="primary-button">メディアを追加</button>
              <button className="secondary-button">Excelから取り込み</button>
            </section>

            <section className="operation-panel">
              <h3>編集状態</h3>
              <p>
                {editMode
                  ? "工程名、作業内容、注意事項、動画の編集を行う準備ができています。"
                  : "閲覧モードです。公開中の標準書を作業者向けに表示します。"}
              </p>
              <button className="secondary-button">改訂履歴を見る</button>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
