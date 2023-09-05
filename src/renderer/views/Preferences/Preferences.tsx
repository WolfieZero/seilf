import { BookmarksFileInput } from './components/BookmarksFileInput';
import icon from '@assets/app.png';

export const Preferences = () => (
  <main>
    <header className="mb-5 flex flex-row">
      <div>
        <img alt="Icon of a bookmark" title={window.App.productName} src={icon} className="mx-auto w-12" />
      </div>
      <h1 className="ml-3 self-center text-3xl font-light text-slate-600">{window.App.productName}</h1>
    </header>
    <BookmarksFileInput />
  </main>
);
