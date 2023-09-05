import { useEffect, useState, ChangeEvent } from 'react';
import { store } from '@renderer/utilities/store';
import { Field } from '@renderer/components/Field';
import { InputFile } from '@renderer/components/Input';
import { STORE_KEY_BOOKMARKS_FILE } from '@common/config/store-keys';

export const BookmarksFileInput = () => {
  const [filePath, setFilePath] = useState('');

  const updateBookmarksFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      store.setValue(STORE_KEY_BOOKMARKS_FILE, event.target.files[0].path);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await (store.getValue(STORE_KEY_BOOKMARKS_FILE) as Promise<string>);
      setFilePath(data);
    })();
  }, [filePath]);

  return (
    <Field
      label="Bookmarks File"
      help="Once selected, right click on the tray on and select `Refresh` to load in the updated bookmarks"
    >
      <InputFile name="bookmarksFile" defaultValue={filePath} onChange={updateBookmarksFile} />
    </Field>
  );
};
