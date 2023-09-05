export interface Bookmark {
  key?: string;
  label: string;
  url: string;
}

export interface Folder {
  key?: string;
  label: string;
  sub: Bookmark[] | Folder[];
}
