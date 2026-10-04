import Link from "next/link";

export function Header({ back = false }: { back?: boolean }) {
  return <header className="app-header"><div className="header-inner">
    <div className="header-brand">
      {back && <Link href="/" className="back-button" aria-label="К выбору игр"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>}
      <Link href="/" className="brand-link" aria-label="AI Signal — главная"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>AI SIGNAL</span></Link>
    </div>
    <span className="demo-pill"><span />Демо</span>
  </div></header>;
}
