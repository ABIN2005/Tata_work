import React, { useState } from 'react';

const MediaGallery = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [filter, setFilter] = useState({ area: '', type: '', date: '' });

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type.startsWith('image') ? 'image' : 'video',
      area: 'Unknown Area',
      date: new Date().toISOString().split('T')[0],
      autoCaption: `Uploaded: ${file.name}`,
    }));
    setMediaItems([...mediaItems, ...newMedia]);
  };

  const filteredMedia = mediaItems.filter((item) => {
    return (
      (!filter.area || item.area === filter.area) &&
      (!filter.type || item.type === filter.type) &&
      (!filter.date || item.date === filter.date)
    );
  });

  return (
    <div className="p-3 sm:p-4 md:p-6 w-full max-w-full overflow-x-hidden">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Media Gallery for Assets</h2>

      {/* Upload */}
      <div className="mb-3 sm:mb-4 w-full">
        <input 
          type="file" 
          accept="image/*,video/*" 
          multiple 
          onChange={handleUpload}
          className="w-full max-w-full text-sm sm:text-base"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6 w-full">
        <select 
          onChange={(e) => setFilter({ ...filter, area: e.target.value })}
          className="flex-1 p-2 border rounded text-sm sm:text-base"
        >
          <option value="">All Areas</option>
          <option value="Unknown Area">Unknown Area</option>
        </select>
        <select 
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          className="flex-1 p-2 border rounded text-sm sm:text-base"
        >
          <option value="">All Types</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>
        <input
          type="date"
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
          className="flex-1 p-2 border rounded text-sm sm:text-base"
        />
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        {filteredMedia.map((item, idx) => (
          <div key={idx} className="border rounded p-2 bg-white shadow w-full">
            {item.type === 'image' ? (
              <img src={item.url} alt={item.name} className="w-full h-32 sm:h-40 md:h-48 object-cover rounded" />
            ) : (
              <video controls src={item.url} className="w-full h-32 sm:h-40 md:h-48 object-cover rounded" />
            )}
            <div className="mt-2 text-xs sm:text-sm text-gray-700 break-words">{item.autoCaption}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;