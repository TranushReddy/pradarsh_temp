import React, { useState } from 'react';
import { CATEGORIES } from '../../utils/constants';

export default function ProjectForm({ initialData = {}, onSubmit, buttonText = "Publish Project" }) {
  // Check if initialData.category is predefined or custom
  const isInitialPredefined = initialData.category 
    ? CATEGORIES.includes(initialData.category) 
    : true;

  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category 
      ? (isInitialPredefined ? initialData.category : 'Others') 
      : 'Web Development',
    techStack: initialData.techStack || '',
    demoUrl: initialData.demoUrl || ''
  });

  const [customCategory, setCustomCategory] = useState(
    initialData.category && !isInitialPredefined ? initialData.category : ''
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory = formData.category === 'Others' ? customCategory.trim() : formData.category;
    onSubmit({
      ...formData,
      category: finalCategory
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left font-sans">
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Project Title <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Nebula Analytics"
          className="input-base"
          required
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Description <span className="text-red-500">*</span></label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Describe what your project does, its goals, and stack details..."
          className="input-base resize-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Category <span className="text-red-500">*</span></label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-base cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Tech Stack Tags <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="e.g., React, TypeScript, Node.js"
            className="input-base"
            required
          />
        </div>

        {formData.category === 'Others' && (
          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Custom Category <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="customCategory"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="e.g., Game Development"
              className="input-base"
              required
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Live Demo / Showcase URL <span className="text-red-500">*</span></label>
        <input
          type="url"
          name="demoUrl"
          value={formData.demoUrl}
          onChange={handleChange}
          placeholder="https://pradarsh.app/project/your-app"
          className="input-base"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full btn-primary py-4 mt-3"
      >
        {buttonText}
      </button>
    </form>
  );
}