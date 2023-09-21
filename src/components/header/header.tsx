import { ChangeEvent } from "react";
import githubLogo from "../../assets/github-mark-white.svg";
import "./header.css";

interface HeaderProps {
  query: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Header(props: HeaderProps) {
  const { query, onChange } = props;

  const GITHUB_URL = "https://github.com/loveCamilleTW/rick-and-morty";

  return (
    <header id="header-bar">
      <nav id="header-top">
        <a id="github-logo" href={GITHUB_URL}>
          <img src={githubLogo} alt="github logo" />
        </a>
      </nav>
      <div id="search-wrapper">
        <input
          id="search"
          type="search"
          placeholder="Search..."
          value={query}
          onChange={onChange}
        />
      </div>
    </header>
  );
}
