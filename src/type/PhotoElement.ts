export interface PhotoElement {
  id: string | null;
  author: string | null;
  width: number | null;
  height: number | null;
  url: string | null;
  download_url: string | null;

  status: 'idle' | 'loading' | 'failed';
  requestId: string | null;
}
