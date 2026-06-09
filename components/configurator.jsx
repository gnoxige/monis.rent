import { ACCESSORIES, buildConfiguration, CHAIRS, DESKS } from "@/lib/catalog";
import { FurnIcon, Glyph } from "@/components/icons";
import { SceneSVG } from "@/components/scene";

function formatRupiah(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function formatShort(value) {
  if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`;
  }
  return `Rp ${Math.round(value / 1000)}K`;
}

function toParams(searchParams = {}) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        if (entry) params.append(key, entry);
      });
    } else if (value) {
      params.set(key, value);
    }
  });
  return params;
}

function accFromParams(params) {
  const selected = new Set((params.get("acc") || "").split(",").filter(Boolean));
  return ACCESSORIES.reduce((accumulator, item) => {
    accumulator[item.id] = selected.has(item.id);
    return accumulator;
  }, {});
}

function accValue(acc) {
  return ACCESSORIES.filter((item) => acc[item.id]).map((item) => item.id).join(",");
}

function nextQuery(params, updates = {}) {
  const next = new URLSearchParams(params.toString());
  Object.entries(updates).forEach(([key, value]) => {
    if (!value) next.delete(key);
    else next.set(key, value);
  });
  return next;
}

function HiddenParams({ params }) {
  return Array.from(params.entries()).map(([key, value]) => (
    <input key={`${key}-${value}`} type="hidden" name={key} value={value} />
  ));
}

function BuilderFormButton({ className, params, updates, children, pressed, role, selected }) {
  const query = nextQuery(params, updates);
  return (
    <form action="/" method="get" data-builder-form="true">
      <HiddenParams params={query} />
      <button
        type="submit"
        className={className}
        aria-pressed={pressed}
        role={role}
        aria-selected={selected}
      >
        {children}
      </button>
    </form>
  );
}

function Header({ count, total }) {
  return (
    <header className="bar on-dark">
      <div className="wrap">
        <a className="logo" href="#top">
          <span className="mark"><i /></span>
          <span><b>monis</b><span className="dot">.rent</span></span>
        </a>
        <a className="ghost" href="#summary">
          <Glyph.cube />
          <span className="mono">{formatShort(total)}</span>
          <span className="count">{count}</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <svg className="hero-faint" viewBox="0 0 400 344" aria-hidden="true">
        <SceneSVG deskId="standing" chairId="mesh" acc={{ monitor: true, lamp: true, plant: true }} />
      </svg>
      <div className="wrap hero-grid">
        <span className="eyebrow"><span className="ln" />Furniture rental · Bali</span>
        <h1>Build Your<br />Bali <span className="soft">Office.</span></h1>
        <p className="sub">Pick a desk, a chair, the extras. Delivered, set up, and swapped whenever you like — one flat monthly price.</p>
        <div className="cta-row">
          <a href="/?tab=desk#builder" data-scroll-target="builder" className="btn btn-light">
            Start Building <span className="arr"><Glyph.arrow style={{ width: 20, height: 20 }} /></span>
          </a>
          <span className="mono text-[13px]" style={{ color: "var(--on-dark-dim)" }}>from Rp 410K / mo</span>
        </div>
      </div>
      <div className="hero-meta">
        <div className="wrap">
          <div className="cell"><div className="k">Setup</div><div className="v"><Glyph.truck style={{ width: 16, height: 16 }} /> Free delivery</div></div>
          <div className="cell"><div className="k">Terms</div><div className="v"><Glyph.cal style={{ width: 16, height: 16 }} /> Monthly, no lock-in</div></div>
          <div className="cell"><div className="k">Swaps</div><div className="v"><Glyph.swap style={{ width: 16, height: 16 }} /> Anytime</div></div>
          <div className="cell"><div className="k">Care</div><div className="v"><Glyph.shield style={{ width: 16, height: 16 }} /> Fully covered</div></div>
        </div>
      </div>
    </section>
  );
}

function Item({ data, selected, accessory, params, activeTab, deskId, chairId, acc }) {
  let updates = {};
  if (activeTab === "desk") updates = { desk: deskId === data.id ? null : data.id, tab: "desk" };
  else if (activeTab === "chair") updates = { chair: chairId === data.id ? null : data.id, tab: "chair" };
  else {
    const nextAcc = { ...acc, [data.id]: !acc[data.id] };
    updates = { acc: accValue(nextAcc) || null, tab: "acc" };
  }

  return (
    <BuilderFormButton className={`item${selected ? " sel" : ""}`} params={params} updates={updates} pressed={selected}>
      <span className="thumb"><FurnIcon id={data.id} /></span>
      <span className="meta">
        <span className="nm">{data.name} <span className="tag">{data.tag}</span></span>
        <span className="pr"><b>{formatRupiah(data.price)}</b> / mo · {data.blurb}</span>
      </span>
      <span className={`pick${accessory ? " plus" : ""}`} aria-hidden="true">
        {accessory ? <Glyph.plus /> : <Glyph.check />}
      </span>
    </BuilderFormButton>
  );
}

function Builder({ params, deskId, chairId, acc, total }) {
  const activeTab = params.get("tab") || "desk";
  const accCount = ACCESSORIES.filter((item) => acc[item.id]).length;
  const tabs = [
    { id: "desk", label: "Desk", icon: <Glyph.desk />, count: deskId ? 1 : 0 },
    { id: "chair", label: "Chair", icon: <Glyph.chair />, count: chairId ? 1 : 0 },
    { id: "acc", label: "Add-ons", icon: <Glyph.spark />, count: accCount }
  ];
  const list = activeTab === "desk" ? DESKS : activeTab === "chair" ? CHAIRS : ACCESSORIES;
  const itemCount = (deskId ? 1 : 0) + (chairId ? 1 : 0) + accCount;
  const isEmpty = itemCount === 0;

  return (
    <section className="block" id="builder">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-kicker"><span className="num">01</span> Workspace builder</div>
          <h2>Compose your setup.</h2>
          <p>Swap the desk and chair, flick the extras on and off. The scene updates as you go.</p>
        </div>
        <div className="builder-grid">
          <div className="preview">
            <div className="preview-head">
              <div className="t"><span className="live-dot" /> Live preview</div>
              <div className="px"><Glyph.cube style={{ width: 14, height: 14, display: "inline", verticalAlign: "-2px", marginRight: 5 }} />ISO · 1:20</div>
            </div>
            <div className="stage">
              <SceneSVG deskId={deskId} chairId={chairId} acc={acc} />
            </div>
            <div className="preview-foot">
              <span className="lbl">{isEmpty ? "No items selected yet" : `${itemCount} item${itemCount === 1 ? "" : "s"} in scene`}</span>
              <span className="amt">{formatRupiah(total)}<small> /mo</small></span>
            </div>
          </div>
          <div className="controls">
            <div className="tabs" role="tablist">
              {tabs.map((item) => (
                <BuilderFormButton
                  key={item.id}
                  className={`tab${activeTab === item.id ? " active" : ""}`}
                  params={params}
                  updates={{ tab: item.id }}
                  role="tab"
                  selected={activeTab === item.id}
                >
                  {item.icon}
                  <span className="tlabel">{item.label}</span>
                  {item.count > 0 && <span className="tcount">{item.count}</span>}
                </BuilderFormButton>
              ))}
            </div>
            <div className="hint">
              <Glyph.info />
              {activeTab === "acc" ? "Toggle as many extras as you like." : `Pick one ${activeTab} to start building your setup.`}
            </div>
            {isEmpty && (
              <div className="empty-card">
                <div className="empty-icon"><Glyph.info /></div>
                <div>
                  <h3>Nothing selected yet</h3>
                  <p>Choose a desk, chair, or add-on to populate the live preview and rental summary.</p>
                </div>
              </div>
            )}
            <div className="items">
              {list.map((item) => (
                <Item
                  key={item.id}
                  data={item}
                  accessory={activeTab === "acc"}
                  selected={activeTab === "desk" ? deskId === item.id : activeTab === "chair" ? chairId === item.id : acc[item.id]}
                  params={params}
                  activeTab={activeTab}
                  deskId={deskId}
                  chairId={chairId}
                  acc={acc}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Summary({ params, total, lines, isEmpty }) {
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const reserveHref = `/reserve?${params.toString()}#summary`;

  return (
    <section className="block" id="summary" style={{ background: "var(--bone)", borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-kicker"><span className="num">02</span> Your setup</div>
          <h2>Review &amp; rent.</h2>
          <p>One monthly invoice. Cancel, pause, or swap pieces whenever you need to.</p>
        </div>
        <div className="summary-wrap">
          <div className="receipt">
            <div className="receipt-top">
              <div className="lhs"><span className="logo" style={{ fontSize: 15 }}><span className="mark" style={{ width: 20, height: 20 }}><i /></span></span> Rental summary</div>
              <div className="rhs">No. MR-{(total % 9000) + 1000}<br />{today}</div>
            </div>
            <div className="r-rows">
              {isEmpty ? (
                <div className="receipt-empty">
                  <div className="empty-icon"><Glyph.cube /></div>
                  <div>
                    <h3>Your setup is empty</h3>
                    <p>Select items in the builder to generate your rental summary.</p>
                  </div>
                </div>
              ) : (
                lines.map((line) => (
                  <div className="r-row" key={line.id}>
                    <div className="ic"><FurnIcon id={line.id} /></div>
                    <div className="nm"><div className="t">{line.name}</div><div className="s">{line.tag} · {line.blurb}</div></div>
                    <div className="qty">×1</div>
                    <div className="amt">{formatRupiah(line.price)}</div>
                  </div>
                ))
              )}
            </div>
            <div className="r-foot">
              <div className="r-line"><span>Subtotal</span><span className="mono">{formatRupiah(total)}</span></div>
              <div className="r-line incl"><span>Delivery &amp; setup</span><b>Included</b></div>
              <div className="r-line incl"><span>Maintenance &amp; care</span><b>Included</b></div>
              <div className="r-total">
                <div className="lab">Monthly total<small>Billed monthly · no lock-in</small></div>
                <div className="val">{formatRupiah(total)}<small> /mo</small></div>
              </div>
              <div className="checkout-actions">
                {isEmpty ? (
                  <span className="btn btn-dark block is-disabled">Rent This Setup <span className="arr"><Glyph.arrow style={{ width: 20, height: 20 }} /></span></span>
                ) : (
                  <a className="btn btn-dark block" href={reserveHref}>Rent This Setup <span className="arr"><Glyph.arrow style={{ width: 20, height: 20 }} /></span></a>
                )}
                <a className={`btn btn-out block${isEmpty ? " is-disabled" : ""}`} href="/?tab=desk#builder"> <Glyph.refresh style={{ width: 18, height: 18 }} /> Start Over</a>
              </div>
            </div>
          </div>

          <aside className="aside-note">
            <h3>What’s in every rental</h3>
            <ul>
              <li><Glyph.truck /><span><b>Delivered &amp; assembled</b> across Canggu, Ubud &amp; Uluwatu within 48 hours.</span></li>
              <li><Glyph.swap /><span><b>Swap any piece</b> for free — outgrow a desk, change a chair, no charge.</span></li>
              <li><Glyph.shield /><span><b>Wear &amp; tear covered.</b> We repair or replace, you keep working.</span></li>
              <li><Glyph.cal /><span><b>Month to month.</b> Pause when you travel, cancel anytime.</span></li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default function Configurator({ searchParams = {} }) {
  const params = toParams(searchParams);
  const deskId = params.get("desk");
  const chairId = params.get("chair");
  const acc = accFromParams(params);
  const configuration = buildConfiguration({ deskId, chairId, acc });
  const { lines, total, count, isEmpty } = configuration;

  return (
    <main className="min-h-screen bg-white text-[#121212]">
      <Header count={count} total={total} />
      <Hero />
      <Builder params={params} deskId={deskId} chairId={chairId} acc={acc} total={total} />
      <Summary params={params} total={total} lines={lines} isEmpty={isEmpty} />
      <footer className="foot">
        <div className="wrap">
          <span className="logo" style={{ fontSize: 15 }}><span className="mark" style={{ width: 20, height: 20 }}><i /></span><span><b>monis</b><span className="dot">.rent</span></span></span>
          <span className="muted">Office furniture rental · Bali, Indonesia</span>
        </div>
      </footer>
    </main>
  );
}
