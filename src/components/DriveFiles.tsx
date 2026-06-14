import React, { useState, useEffect } from 'react';
import { getAccessToken, googleSignIn } from '../lib/auth';
import { listFiles, DriveFile } from '../lib/drive';
import { Folder, FileText, Image, File as FileIcon, ExternalLink, RefreshCw } from 'lucide-react';

export function DriveFiles() {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsAuth, setNeedsAuth] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    setError('');
    try {
      const token = await getAccessToken();
      if (!token) {
        setNeedsAuth(true);
        setLoading(false);
        return;
      }
      setNeedsAuth(false);
      const data = await listFiles();
      setFiles(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        setNeedsAuth(false);
        fetchFiles();
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('folder')) return <Folder className="w-5 h-5 text-blue-400" />;
    if (mimeType.includes('image')) return <Image className="w-5 h-5 text-green-400" />;
    if (mimeType.includes('document') || mimeType.includes('text')) return <FileText className="w-5 h-5 text-blue-300" />;
    return <FileIcon className="w-5 h-5 text-gray-400" />;
  };

  if (needsAuth) {
    return (
      <div className="bg-[#141417] p-8 rounded-lg border border-[#2A2A2E] text-center max-w-md mx-auto mt-12">
        <Folder className="w-12 h-12 text-[#8E8E93] mx-auto mb-4" />
        <h2 className="text-xl font-medium text-white mb-2">Connect Google Drive</h2>
        <p className="text-sm text-[#8E8E93] mb-6">Authenticate to browse your Drive files and manage your passive income assets directly from the dashboard.</p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#141417] rounded-lg border border-[#2A2A2E] overflow-hidden">
      <div className="p-5 border-b border-[#2A2A2E] flex justify-between items-center">
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93] mb-1">Drive Storage</h3>
          <p className="text-xs text-[#55555A]">Recent files linked to your portfolio</p>
        </div>
        <button 
          onClick={fetchFiles}
          disabled={loading}
          className="p-2 bg-[#1A1A1F] border border-[#2A2A2E] rounded text-[#8E8E93] hover:text-white transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="p-0">
        {error ? (
          <div className="p-6 text-red-400 text-sm text-center bg-red-900/10">{error}</div>
        ) : files.length === 0 && !loading ? (
          <div className="p-8 text-center text-[#8E8E93] text-sm">No files found.</div>
        ) : (
          <ul className="divide-y divide-[#2A2A2E]">
            {files.map(file => (
              <li key={file.id} className="p-4 hover:bg-[#1A1A1F] transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  {getFileIcon(file.mimeType)}
                  <div>
                    <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{file.name}</h4>
                    <span className="text-xs text-[#55555A]">{new Date(file.modifiedTime).toLocaleDateString()}</span>
                  </div>
                </div>
                <a 
                  href={file.webViewLink || `https://drive.google.com/open?id=${file.id}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-[#55555A] hover:text-white invisible group-hover:visible transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
