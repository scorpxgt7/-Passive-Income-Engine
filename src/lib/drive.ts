import { getAccessToken } from './auth';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  webViewLink: string;
}

export async function listFiles(): Promise<DriveFile[]> {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch('https://www.googleapis.com/drive/v3/files?pageSize=20&orderBy=modifiedTime desc&q=trashed=false', {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) throw new Error('Failed to fetch Drive files');
  const data = await res.json();
  return data.files || [];
}
