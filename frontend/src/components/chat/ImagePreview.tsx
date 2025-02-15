import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';
import { ImagePreviewProps } from '../../types';

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src, onClose, filename }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename || 'image';
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative max-w-4xl max-h-screen p-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        <img src={src} alt="预览" className="max-w-full max-h-[90vh] object-contain" />
        <Button
          className="absolute bottom-6 right-6"
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" /> 下载
        </Button>
      </div>
    </div>
  );
};