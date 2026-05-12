import { BookOpen, CheckCircle2, Clapperboard, FilePenLine, Search, ShieldCheck, Wrench } from "lucide-react";
import { useMemo, useState } from "react";
import { standards } from "./data/standards";

export function App() {
  const [selectedId, setSelectedId] = useState(standards[0].id);
  const [editMode, setEditMode] = useState(false);
  const selected = useMemo(
    () => standards.find((standard) => standard.id === selectedId) ?? standards[0],
    [selectedId]
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
              <small>{standard.revision} / {standard.status}</small>
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

        <div className="content-grid">
          <section className="steps-panel" aria-label="作業工程">
            <div className="section-heading">
              <Wrench size={20} />
              <h3>作業工程</h3>
            </div>

            {selected.steps.map((step) => (
              <article className="step-card" key={step.id}>
                <div className="step-number">{step.id}</div>
                <div className="step-body">
                  <div className="step-title-row">
                    <h4>{step.title}</h4>
                    <span className="media-chip">{step.media === "video" ? "動画" : step.media === "photo" ? "写真" : "資料なし"}</span>
                  </div>
                  <p>{step.work}</p>
                  <div className="check-grid">
                    <div>
                      <ShieldCheck size={17} />
                      <span>{step.safety}</span>
                    </div>
                    <div>
                      <CheckCircle2 size={17} />
                      <span>{step.quality}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="side-panel" aria-label="編集と動画">
            <section className="operation-panel">
              <div className="section-heading">
                <Clapperboard size={20} />
                <h3>工程メディア</h3>
              </div>
              <div className="media-preview">
                <span>VIDEO</span>
              </div>
              <button className="primary-button">動画を追加</button>
              <button className="secondary-button">Excelから取り込み</button>
            </section>

            <section className="operation-panel">
              <h3>編集状態</h3>
              <p>{editMode ? "工程名、作業内容、注意事項、動画の編集を行う準備ができています。" : "閲覧モードです。公開中の標準書を作業者向けに表示します。"}</p>
              <button className="secondary-button">改訂履歴を見る</button>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
