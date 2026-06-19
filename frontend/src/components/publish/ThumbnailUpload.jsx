import React, { useState } from 'react';

export default function ThumbnailUpload({ value, onChange }) {
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setError('Please upload PNG, JPG, or WebP format.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('File size exceeds 5MB limit.');
            return;
        }

        setError('');
        onChange(file);
    };

    const previewSrc = value instanceof File ? URL.createObjectURL(value) : value;

    return (
        <div className="space-y-2 text-left">
            <div className="border-2 border-dashed border-primary-200/50 hover:border-primary-500 rounded-2xl p-8 text-center transition-all duration-200 bg-white group relative overflow-hidden shadow-sm">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />

                {previewSrc ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-150">
                        <img src={previewSrc} alt="Thumbnail preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span className="text-xs font-bold text-white bg-slate-900/80 px-4 py-2 rounded-lg">Replace Banner</span>
                        </div>
                    </div>
                ) : (
                    <div className="py-6 flex flex-col items-center justify-center">
                        <div className="h-10 w-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-lg mb-3.5 group-hover:scale-105 transition-transform duration-200">
                            ⇪
                        </div>
                        <p className="text-xs font-bold text-slate-700">Drag and drop your project preview image</p>
                        <p className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG, or WebP (Max 5MB)</p>
                    </div>
                )}
            </div>
            {error && <p className="text-xs text-red-500 font-mono">⚠️ {error}</p>}
        </div>
    );
}