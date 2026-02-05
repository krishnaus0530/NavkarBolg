// resources/js/Components/QuillRichTextEditor.jsx
import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    Image, Upload, X, Loader2, Bold, Italic,
    Underline, Strikethrough, Heading, List, ListOrdered,
    AlignLeft, AlignCenter, AlignRight, Link, Unlink,
    Code, Quote, Palette, Type, Eye, EyeOff, Save,
    Undo, Redo, Minus, Maximize, Minimize
} from 'lucide-react';
import { motion } from 'framer-motion';

// Custom toolbar modules
const modules = {
    toolbar: {
        container: [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['clean']
        ],
        handlers: {
            // Custom image handler will be set dynamically
        }
    }
};

// Custom formats
const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'video',
    'clean'
];

export default function QuillRichTextEditor({
    value,
    onChange,
    onImagesChange,
    existingImages = [],
    error,
    placeholder = "Write your blog content here..."
}) {
    const [localImages, setLocalImages] = useState(existingImages);
    const [uploading, setUploading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [lastSaved, setLastSaved] = useState(null);

    const quillRef = useRef(null);
    const fileInputRef = useRef(null);
    const editorContainerRef = useRef(null);

    // Initialize Quill with custom image handler
    useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();

            // Custom image handler
            quill.getModule('toolbar').addHandler('image', () => {
                fileInputRef.current?.click();
            });

            // Update word count
            quill.on('text-change', () => {
                const text = quill.getText().trim();
                const words = text.split(/\s+/).filter(word => word.length > 0);
                setWordCount(words.length);
                setCharCount(text.length);
            });
        }
    }, []);

    // Handle image upload
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setUploading(true);

        const newImages = [];
        const quill = quillRef.current.getEditor();

        for (const file of files) {
            try {
                // Create preview URL
                const previewUrl = URL.createObjectURL(file);

                // Insert image at cursor position
                const range = quill.getSelection();
                const position = range ? range.index : quill.getLength();

                // Create a unique ID for the image
                const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

                // Create image object
                const newImage = {
                    id: imageId,
                    file: file,
                    previewUrl: previewUrl,
                    caption: '',
                    position: position,
                    placeholder: `[IMAGE:${imageId}]`,
                    type: 'content'
                };

                newImages.push(newImage);

                // Insert placeholder in editor
                quill.insertText(position, newImage.placeholder);

            } catch (error) {
                console.error('Error handling image:', error);
            }
        }

        // Update images state
        const updatedImages = [...localImages, ...newImages];
        setLocalImages(updatedImages);

        // Notify parent component with all images
        notifyParent(updatedImages);

        setUploading(false);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Helper function to notify parent about images
    const notifyParent = (images) => {
        if (onImagesChange) {
            const imagesForParent = images.map(img => ({
                id: img.id,
                file: img.file,
                caption: img.caption,
                placeholder: img.placeholder,
                previewUrl: img.previewUrl,
                type: img.type || 'content'
            }));
            onImagesChange(imagesForParent);
        }
    };

    // Remove image
    const handleRemoveImage = (index) => {
        const imageToRemove = localImages[index];

        // Revoke object URL
        if (imageToRemove.previewUrl && imageToRemove.previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(imageToRemove.previewUrl);
        }

        // Remove placeholder from content
        const quill = quillRef.current.getEditor();
        const content = quill.getText();

        // Replace placeholder with empty string
        const newContent = content.replace(imageToRemove.placeholder, '');
        quill.setText(newContent);

        // Also trigger onChange to update parent content
        if (onChange) {
            onChange(newContent);
        }

        // Update images state
        const updatedImages = localImages.filter((_, i) => i !== index);
        setLocalImages(updatedImages);

        // Notify parent component
        notifyParent(updatedImages);
    };

    // Handle caption change
    const handleCaptionChange = (index, caption) => {
        const updatedImages = [...localImages];
        updatedImages[index].caption = caption;
        setLocalImages(updatedImages);
        notifyParent(updatedImages);
    };

    // Handle custom formatting buttons
    const handleFormat = (format, value = null) => {
        const quill = quillRef.current.getEditor();
        quill.format(format, value);
    };

    // Toggle fullscreen
    const toggleFullscreen = () => {
        if (!isFullscreen) {
            editorContainerRef.current?.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
        setIsFullscreen(!isFullscreen);
    };

    // Save draft
    const handleSaveDraft = () => {
        const quill = quillRef.current.getEditor();
        const content = quill.root.innerHTML;
        localStorage.setItem('blog_draft', content);
        setLastSaved(new Date().toLocaleTimeString());
    };

    // Load draft
    const handleLoadDraft = () => {
        const draft = localStorage.getItem('blog_draft');
        if (draft && window.confirm('Load saved draft?')) {
            const quill = quillRef.current.getEditor();
            quill.clipboard.dangerouslyPasteHTML(draft);
        }
    };

    // Clear editor
    const handleClear = () => {
        if (window.confirm('Clear all content?')) {
            const quill = quillRef.current.getEditor();
            quill.setText('');
        }
    };

    // Render preview
    const renderPreview = () => {
        const quill = quillRef.current?.getEditor();
        if (!quill) return null;

        const html = quill.root.innerHTML;

        return (
            <div className="mt-6 border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-medium">Preview</h3>
                    <button
                        onClick={() => setShowPreview(false)}
                        className="p-1 hover:bg-white/10 rounded"
                    >
                        <EyeOff className="w-5 h-5" />
                    </button>
                </div>
                <div
                    className="p-6 blog-content-preview min-h-[200px]"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        );
    };

    return (
        <div className="space-y-6" ref={editorContainerRef}>
            {/* Custom Toolbar */}
            <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                {/* Toolbar Header */}
                <div className="p-3 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Type className="w-4 h-4" />
                        <span>Rich Text Editor</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleSaveDraft}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg hover:bg-white/10"
                                title="Save Draft"
                            >
                                <Save className="w-4 h-4" />
                                <span>Save</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowPreview(!showPreview)}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg hover:bg-white/10"
                                title={showPreview ? "Hide Preview" : "Show Preview"}
                            >
                                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                <span>Preview</span>
                            </button>
                            <button
                                type="button"
                                onClick={toggleFullscreen}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg hover:bg-white/10"
                                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                            >
                                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                                <span>{isFullscreen ? "Exit" : "Fullscreen"}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Formatting Toolbar */}
                <div className="p-3 border-b border-white/10 flex flex-wrap gap-2">
                    {/* Font Size */}
                    <select
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm"
                        onChange={(e) => handleFormat('size', e.target.value)}
                    >
                        <option value="">Size</option>
                        <option value="small">Small</option>
                        <option value="">Normal</option>
                        <option value="large">Large</option>
                        <option value="huge">Huge</option>
                    </select>

                    {/* Headers */}
                    <select
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm"
                        onChange={(e) => handleFormat('header', parseInt(e.target.value) || false)}
                    >
                        <option value="">Headers</option>
                        <option value="1">H1</option>
                        <option value="2">H2</option>
                        <option value="3">H3</option>
                        <option value="4">H4</option>
                        <option value="5">H5</option>
                        <option value="6">H6</option>
                    </select>

                    <div className="w-px h-6 bg-white/10" />

                    {/* Basic Formatting */}
                    <button
                        type="button"
                        onClick={() => handleFormat('bold')}
                        className="p-2 hover:bg-white/10 rounded-lg"
                        title="Bold"
                    >
                        <Bold className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleFormat('italic')}
                        className="p-2 hover:bg-white/10 rounded-lg"
                        title="Italic"
                    >
                        <Italic className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleFormat('underline')}
                        className="p-2 hover:bg-white/10 rounded-lg"
                        title="Underline"
                    >
                        <Underline className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-white/10" />

                    {/* Colors */}
                    <div className="relative group">
                        <input
                            type="color"
                            onChange={(e) => handleFormat('color', e.target.value)}
                            className="w-8 h-8 cursor-pointer bg-transparent opacity-0 absolute inset-0"
                            title="Text Color"
                            id="text-color"
                        />
                        <label htmlFor="text-color" className="p-2 hover:bg-white/10 rounded-lg cursor-pointer block">
                            <Palette className="w-4 h-4" />
                        </label>
                    </div>

                    <div className="w-px h-6 bg-white/10" />

                    {/* Lists */}
                    <button
                        type="button"
                        onClick={() => handleFormat('list', 'bullet')}
                        className="p-2 hover:bg-white/10 rounded-lg"
                        title="Bullet List"
                    >
                        <List className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleFormat('list', 'ordered')}
                        className="p-2 hover:bg-white/10 rounded-lg"
                        title="Numbered List"
                    >
                        <ListOrdered className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-white/10" />

                    {/* Alignment */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFormat('align', '');
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg"
                        title="Align Left"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFormat('align', 'center');
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg"
                        title="Align Center"
                    >
                        <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFormat('align', 'right');
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg"
                        title="Align Right"
                    >
                        <AlignRight className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-white/10" />

                    {/* Image Upload Button */}
                    <label className="p-2 hover:bg-white/10 rounded-lg cursor-pointer" title="Upload Image">
                        {uploading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Upload className="w-4 h-4" />
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>

                    {/* Additional Formatting */}
                    <button
                        type="button"
                        onClick={() => handleFormat('blockquote')}
                        className="p-2 hover:bg-white/10 rounded-lg"
                        title="Blockquote"
                    >
                        <Quote className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleFormat('code-block')}
                        className="p-2 hover:bg-white/10 rounded-lg"
                        title="Code Block"
                    >
                        <Code className="w-4 h-4" />
                    </button>
                </div>

                {/* Editor */}
                <div className="p-1">
                    <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={value}
                        onChange={onChange}
                        modules={modules}
                        formats={formats}
                        placeholder={placeholder}
                        className="quill-editor-custom"
                        style={{
                            minHeight: '400px',
                            backgroundColor: 'transparent'
                        }}
                    />
                </div>

                {/* Status Bar */}
                <div className="p-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                        <span>{wordCount} words</span>
                        <span>{charCount} characters</span>
                        {lastSaved && (
                            <span>Last saved: {lastSaved}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleLoadDraft}
                            className="px-2 py-1 hover:bg-white/10 rounded"
                        >
                            Load Draft
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="px-2 py-1 hover:bg-white/10 rounded"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            {/* Uploaded Images Preview */}
            {localImages.length > 0 && (
                <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Image className="w-5 h-5 text-primary" />
                            <h3 className="font-medium">Uploaded Images ({localImages.length})</h3>
                        </div>
                        <span className="text-sm text-muted-foreground">
                            Click on images to edit captions, click X to remove
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {localImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative group bg-white/5 border border-white/10 rounded-lg overflow-hidden"
                            >
                                <div className="relative aspect-square">
                                    <img
                                        src={image.previewUrl || image.url || `/storage/${image.path}`}
                                        alt={`Content image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <motion.button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="absolute top-2 right-2 p-1 bg-red-500/80 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4" />
                                    </motion.button>
                                </div>

                                <div className="p-3">
                                    <input
                                        type="text"
                                        value={image.caption || ''}
                                        onChange={(e) => handleCaptionChange(index, e.target.value)}
                                        placeholder="Add caption..."
                                        className="w-full px-2 py-1 text-sm bg-transparent border-b border-white/10 focus:border-primary focus:outline-none"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">
                                        ID: {image.id}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Preview Section */}
            {showPreview && renderPreview()}

            {/* Instructions */}
            <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                <h4 className="font-medium mb-3">Formatting Guide:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-400">
                    <div className="space-y-1">
                        <p className="font-medium text-gray-300">Headings:</p>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-1 bg-primary/20 rounded">H1</span>
                                <span>Main Title</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-1 bg-primary/20 rounded">H2</span>
                                <span>Section Headers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-1 bg-primary/20 rounded">H3</span>
                                <span>Sub-headers</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="font-medium text-gray-300">Formatting:</p>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Bold className="w-4 h-4" />
                                <span>Bold (Ctrl+B)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Italic className="w-4 h-4" />
                                <span>Italic (Ctrl+I)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <List className="w-4 h-4" />
                                <span>Bullet List</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="font-medium text-gray-300">Tips:</p>
                        <ul className="space-y-1">
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Use headers for structure</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Add images at cursor position</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Save draft regularly</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Custom CSS */}
            <style>{`
            .ql-toolbar.ql-snow {
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    background: rgba(69, 70, 69) !important;
    border-radius: 0.5rem 0.5rem 0 0 !important;
}

.ql-container.ql-snow {
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    background: rgba(255, 255, 255, 0.02) !important;
    border-radius: 0 0 0.5rem 0.5rem !important;
    border-top: none !important;
}

.ql-editor {
    min-height: 400px !important;
    color: rgba(0, 0, 0) !important;
    font-size: 16px !important;
    line-height: 1.6 !important;
}

.ql-snow .ql-picker {
    color: rgba(255, 255, 255, 0.8) !important;
}

.ql-snow .ql-stroke {
    stroke: rgba(255, 255, 255, 0.8) !important;
}

.ql-snow .ql-fill {
    fill: rgba(255, 255, 255, 0.8) !important;
}

.ql-snow .ql-picker-options {
    background: rgba(0, 0, 0, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.ql-snow .ql-picker-item {
    color: rgba(255, 255, 255, 0.8) !important;
}

.ql-snow .ql-picker-item:hover {
    color: #fbbf24 !important;
}

.ql-snow.ql-toolbar button:hover,
.ql-snow .ql-toolbar button:hover,
.ql-snow.ql-toolbar button:focus,
.ql-snow .ql-toolbar button:focus,
.ql-snow.ql-toolbar button.ql-active,
.ql-snow .ql-toolbar button.ql-active {
    color: #fbbf24 !important;
}

.ql-snow.ql-toolbar button:hover .ql-stroke,
.ql-snow .ql-toolbar button:hover .ql-stroke,
.ql-snow.ql-toolbar button:focus .ql-stroke,
.ql-snow .ql-toolbar button:focus .ql-stroke,
.ql-snow.ql-toolbar button.ql-active .ql-stroke,
.ql-snow .ql-toolbar button.ql-active .ql-stroke {
    stroke: #fbbf24 !important;
}

.ql-snow.ql-toolbar button:hover .ql-fill,
.ql-snow .ql-toolbar button:hover .ql-fill,
.ql-snow.ql-toolbar button:focus .ql-fill,
.ql-snow .ql-toolbar button:focus .ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-fill {
    fill: #fbbf24 !important;
}
            
            `}</style>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-400"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}