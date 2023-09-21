import githubLogo from "../../assets/github-mark-white.svg";
import "./header.css";

export function Header() {
  const GITHUB_URL = "https://github.com/loveCamilleTW/rick-and-morty";

  return (
    <header id="header-bar">
      <nav id="header-top">
        <a id="github-logo" href={GITHUB_URL}>
          <img src={githubLogo} alt="github logo" />
        </a>
      </nav>
      <div id="search-wrapper">
        <input id="search" type="search" placeholder="Search..." required />
      </div>
    </header>
  );
}
