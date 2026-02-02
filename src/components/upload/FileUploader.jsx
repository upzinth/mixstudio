import React, { useState } from 'react';
import { Upload, X, FileAudio, CheckCircle } from 'lucide-react';
import { apiRequest } from '../../lib/api';

const FileUploader = ({ onUploadComplete }) => {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        bpm: '',
        key: '',
        refLink: '',
        notes: ''
    });
    const [status, setStatus] = useState('idle'); // idle, uploading, success, error
    const [progress, setProgress] = useState(0);

    const handleFileDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) setFile(droppedFile);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setStatus('uploading');

        // Use standard XHR or MultiPart fetch
        // Note: Our apiRequest helper assumes JSON, so we use fetch directly here for FormData
        const data = new FormData();
        data.append('file', file);
        data.append('title', formData.title || file.name);
        data.append('bpm', formData.bpm);
        data.append('key', formData.key);
        data.append('refLink', formData.refLink);
        data.append('notes', formData.notes);

        try {
            const token = localStorage.getItem('access_token');
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    setProgress(percentComplete);
                }
            });

            xhr.open('POST', 'http://localhost:3000/api/projects/upload');
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);

            xhr.onload = () => {
                if (xhr.status === 200) {
                    setStatus('success');
                    onUploadComplete && onUploadComplete(JSON.parse(xhr.response));
                    // Reset form after delay
                    setTimeout(() => {
                        setFile(null);
                        setFormData({ title: '', bpm: '', key: '', refLink: '', notes: '' });
                        setStatus('idle');
                        setProgress(0);
                    }, 3000);
                } else {
                    setStatus('error');
                    console.error('Upload failed');
                }
            };

            xhr.send(data);

        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="bg-brand-gray rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">ส่งไฟล์งานใหม่ (New Project)</h2>

            {status === 'success' ? (
                <div className="text-center py-12">
                    <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-white">อัพโหลดสำเร็จ!</h3>
                    <p className="text-gray-400">เราได้รับไฟล์งานของคุณแล้ว จะรีบติดต่อกลับโดยเร็วที่สุด</p>
                </div>
            ) : (
                <form onSubmit={handleUpload} className="space-y-6">
                    {/* Drag & Drop Zone */}
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleFileDrop}
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${file ? 'border-brand-gold bg-brand-gold/5' : 'border-white/20 hover:border-brand-gold/50 hover:bg-white/5'
                            }`}
                    >
                        {file ? (
                            <div className="flex items-center justify-center gap-4">
                                <FileAudio size={48} className="text-brand-gold" />
                                <div className="text-left">
                                    <p className="font-bold text-white truncate max-w-xs">{file.name}</p>
                                    <p className="text-sm text-gray-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                                <button type="button" onClick={() => setFile(null)} className="p-2 hover:bg-white/10 rounded-full">
                                    <X className="text-red-400" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <Upload size={48} className="mx-auto text-gray-500 mb-4" />
                                <p className="text-gray-300 font-medium">ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
                                <p className="text-sm text-gray-500 mt-2">รองรับ WAV, AIFF, ZIP (Max 2GB)</p>
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="hidden"
                                    id="file-input"
                                />
                                <label htmlFor="file-input" className="mt-4 inline-block px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm cursor-pointer transition-colors">
                                    เลือกไฟล์
                                </label>
                            </>
                        )}
                    </div>

                    {/* Metadata Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">ชื่อเพลง / โปรเจกต์</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-brand-gold/50 focus:outline-none"
                                placeholder="เช่น My New Single"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">BPM</label>
                                <input
                                    type="text"
                                    value={formData.bpm}
                                    onChange={(e) => setFormData({ ...formData, bpm: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-brand-gold/50 focus:outline-none"
                                    placeholder="120"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Key</label>
                                <input
                                    type="text"
                                    value={formData.key}
                                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-brand-gold/50 focus:outline-none"
                                    placeholder="C Maj"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Reference Link (YouTube/Spotify)</label>
                        <input
                            type="text"
                            value={formData.refLink}
                            onChange={(e) => setFormData({ ...formData, refLink: e.target.value })}
                            className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-brand-gold/50 focus:outline-none"
                            placeholder="วางลิงก์เพลงอ้างอิง..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">ข้อความเพิ่มเติม (Notes)</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-brand-gold/50 focus:outline-none h-24"
                            placeholder="รายละเอียดเพิ่มเติมที่อยากแจ้ง..."
                        ></textarea>
                    </div>

                    {status === 'uploading' && (
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-brand-gold h-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!file || status === 'uploading'}
                        className="w-full bg-brand-gold text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'uploading' ? `กำลังอัพโหลด ${progress.toFixed(0)}%` : 'ยืนยันการส่งไฟล์'}
                    </button>

                    {status === 'error' && (
                        <p className="text-red-400 text-center text-sm">เกิดข้อผิดพลาดในการอัพโหลด กรุณาลองใหม่</p>
                    )}
                </form>
            )}
        </div>
    );
};

export default FileUploader;
