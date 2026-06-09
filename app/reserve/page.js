import Link from "next/link";
import { buildConfiguration } from "@/lib/catalog";
import { FurnIcon } from "@/components/icons";

function formatRupiah(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function accessoryStateFromParams(searchParams) {
  const selected = new Set((searchParams.acc || "").split(",").filter(Boolean));
  return {
    monitor: selected.has("monitor"),
    lamp: selected.has("lamp"),
    plant: selected.has("plant")
  };
}

export default async function ReservePage({ searchParams }) {
  const params = await searchParams;
  const configuration = buildConfiguration({
    deskId: params.desk || null,
    chairId: params.chair || null,
    acc: accessoryStateFromParams(params)
  });

  return (
    <main className="min-h-screen bg-white text-[#121212]">
      <section className="block reserve-page">
        <div className="wrap">
          <div className="reserve-head">
            <div className="sec-head reserve-copy">
              <div className="sec-kicker"><span className="num">03</span> Reservation</div>
              <h1>Setup reserved.</h1>
              <p>
                Your configuration is ready. Review the selected pieces, keep the monthly total visible,
                and jump back into the builder if you want to swap anything.
              </p>
            </div>
            <Link
              href={`/?${new URLSearchParams({
                ...(params.desk ? { desk: params.desk } : {}),
                ...(params.chair ? { chair: params.chair } : {}),
                ...(params.acc ? { acc: params.acc } : {}),
                ...(params.tab ? { tab: params.tab } : {})
              }).toString()}#builder`}
              className="ghost reserve-back"
            >
              Back to builder
            </Link>
          </div>

          <div className="reserve-grid">
            <section className="receipt reserve-card">
              <div className="receipt-top reserve-card-head">
                <div>
                  <p className="reserve-label">Rental summary</p>
                  <h2>Your selected setup</h2>
                </div>
                <div className="reserve-total">
                  <p>Monthly total</p>
                  <strong>{formatRupiah(configuration.total)}</strong>
                </div>
              </div>

              <div className="reserve-lines">
                {configuration.lines.map((line) => (
                  <div key={line.id} className="reserve-line">
                    <div className="reserve-line-icon"><FurnIcon id={line.id} /></div>
                    <div className="reserve-line-copy">
                      <div className="reserve-line-name">{line.name}</div>
                      <div className="reserve-line-meta">{line.tag} · {line.blurb}</div>
                    </div>
                    <div className="reserve-line-price">
                      <strong>{formatRupiah(line.price)}</strong>
                      <span>/ mo</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="reserve-footer">
                <div>
                  <div className="reserve-label">Includes</div>
                  <p>Delivery, setup, maintenance, and flexible monthly swaps.</p>
                </div>
                <Link href="/" className="btn btn-dark reserve-mobile-back">
                  Back to builder
                </Link>
              </div>
            </section>

            <aside className="aside-note reserve-side">
              <h3>What happens next</h3>
              <ul className="reserve-meta-list">
                <li><span>Selected items</span><b>{configuration.count}</b></li>
                <li><span>Billing</span><b>Monthly, no lock-in</b></li>
                <li><span>Service area</span><b>Canggu, Ubud, Uluwatu</b></li>
              </ul>
              <p className="reserve-side-copy">
                This confirmation page stays intentionally simple. It mirrors the main page spacing and
                keeps the selected setup readable without relying on fragile client interactions.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
