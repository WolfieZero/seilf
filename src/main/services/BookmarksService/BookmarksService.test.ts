import { BookmarksService } from '@main/services/BookmarksService';

const bookmarkService = new BookmarksService();

it('should covert a flat list into a menu list', () => {
  const data = [
    {
      label: 'Foo',
      url: 'https://foo.com',
    },
    {
      label: 'Bar',
      key: 'blah-blah-814a',
      url: 'https://bar.com',
    },
    {
      label: 'Baz',
      url: 'https://baz.com',
    },
  ];

  const expected = [
    expect.objectContaining({
      label: 'Foo',
      id: expect.any(String),
      click: expect.any(Function),
    }),
    expect.objectContaining({
      label: 'Bar',
      id: 'blah-blah-814a',
      click: expect.any(Function),
    }),
    expect.objectContaining({
      label: 'Baz',
      id: expect.any(String),
      click: expect.any(Function),
    }),
  ];

  const results = bookmarkService.convertBookmarksToMenu(data);

  expect(results).toEqual(expected);
});

it('should covert a tree list into a menu list', () => {
  const data = [
    {
      label: 'Foo',
      url: 'https://foo.com',
    },
    {
      label: 'Bar',
      sub: [
        {
          label: 'Baz',
          url: 'https://baz.com',
        },
      ],
    },
  ];

  const expected = [
    expect.objectContaining({
      label: 'Foo',
      id: expect.any(String),
      click: expect.any(Function),
    }),
    expect.objectContaining({
      label: 'Bar',
      id: expect.any(String),
      submenu: [
        expect.objectContaining({
          label: 'Baz',
          id: expect.any(String),
          click: expect.any(Function),
        }),
      ],
    }),
  ];

  const results = bookmarkService.convertBookmarksToMenu(data);

  expect(results).toEqual(expected);
});
