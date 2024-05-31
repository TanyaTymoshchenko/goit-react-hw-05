import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <p>
        Sorry, unfortunately, requested page is not found! Please, go to <Link to="/">home page</Link>!
      </p>
    </div>
  );
}