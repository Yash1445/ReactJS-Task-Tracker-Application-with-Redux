import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="mx-auto mt-20 max-w-md text-center">
    <h1 className="text-3xl font-bold">404</h1>
    <p className="mt-2 text-slate-600">Page not found.</p>
    <Link className="mt-4 inline-block text-blue-600" to="/">
      Go home
    </Link>
  </div>
);

export default NotFoundPage;