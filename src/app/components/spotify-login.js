import Link from "next/link";

export default function SpotifyLogin() {
  return (
    <div className="App">
      <header className="App-header">
        <Link href="/api/spotify/login">
          <button
            type="button"
            className="btn btn--outline-primary btn--login-logout"
          >
            Spotify
          </button>
        </Link>
      </header>
    </div>
  );
}
