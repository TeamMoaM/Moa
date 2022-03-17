import Logo from "../icons/MoaLogo.svg";

export default function Header() {
  return (
    <div className="mobile-header">
      <div className="mobile-header-title">
        <img className="mobile-logo" src={Logo} />
      </div>
    </div>
  );
}
