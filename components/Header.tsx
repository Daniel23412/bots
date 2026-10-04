import Link from "next/link";

export function Header({ back = false }: { back?: boolean }) {
  return <header className="app-header"><div className="header-inner">
    <div className="header-brand">{back && <Link href="/" className="back-button" aria-label="К выбору игр"><svg viewBox="0 0 24 24" fill="none"><path d="m14 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>}<Link href="/" className="brand-link"><span className="brand-mark"><i /><i /><i /></span><span>AI <b>SIGNAL</b></span></Link></div>
    <Link href="/history" className="history-link"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 6M4 5v5h5m3-3v5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>История</Link>
  </div></header>;
}
