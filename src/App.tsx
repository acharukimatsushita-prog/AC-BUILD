import {
  CheckCircle2,
  FileSpreadsheet,
  ImageIcon,
  Info,
  ListChecks,
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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStandards = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) {
      return standards;
    }

    return standards.filter((standard) =>
      [standard.name, standard.category, standard.owner].some((value) =>
        value.toLowerCase().includes(keyword)
      )
    );
  }, [searchTerm]);

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

  const selectedGallery = selectedStep.gallery ?? [];
  const primaryImage = selectedStep.imageSrc ?? selectedGallery[0]?.src ?? selected.heroImageSrc;

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
          {selected.heroImageSrc ? (
            <div className="topbar-preview">
              <img src={selected.heroImageSrc} alt={`${selected.name} 図面`} />
            </div>
          ) : null}
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
                    <h4>{selectedStep.title}</h4>
                    {selectedStep.sourceRows ? (
                      <small className="source-rows">Excel行 {selectedStep.sourceRows}</small>
                    ) : null}
                  </div>
                </div>

                <p className="step-work">{selectedStep.work}</p>

                {selectedStep.note ? (
                  <div className="note-box">
                    <Info size={17} />
                    <span>{selectedStep.note}</span>
                  </div>
                ) : null}

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
