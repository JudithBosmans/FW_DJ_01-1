import { useRouteError } from "react-router-dom";
import "./styles/Error.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="error-container">
      <h1 className="er_title">Oops!</h1>
      <p className="er_text">Sorry, an unexpected error has occurred.</p>
      <p className="er_message">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
