"use client";

import { useState } from "react";
import { ChevronDown, Trash2, Save, Plus, X } from "lucide-react";

export default function AddTravelPackagePage() {
  const [formData, setFormData] = useState({
    title: "Bali Paradise",
    location: "Indonesia",
    category: "Beach",
    price: "1299",
    duration: "7 Days / 6 Nights",
    date: "12/12/2026", 
    heroImage:
      "",
    overview:
      "vg",
    highlightsDescription:
      "vg",
    highlightsList: [
      "Luxury beachfront accommodation",
      "Traditional Balinese spa treatment",
      "Sunrise trek to Mount Batur",
      "Visit Uluwatu Temple at sunset",
      "Private beach dinner experience",
    ],
    perks: [
      "Free cancellation up to 7 days",
      "Travel insurance included",
      "24/7 customer support",
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handlers for dynamic Highlights List
  const handleHighlightChange = (index: number, value: string) => {
    const updated = [...formData.highlightsList];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, highlightsList: updated }));
  };

  const addHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      highlightsList: [...prev.highlightsList, ""],
    }));
  };

  const removeHighlight = (index: number) => {
    const updated = formData.highlightsList.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, highlightsList: updated }));
  };

  // Handlers for dynamic Perks List
  const handlePerkChange = (index: number, value: string) => {
    const updated = [...formData.perks];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, perks: updated }));
  };

  const addPerk = () => {
    setFormData((prev) => ({
      ...prev,
      perks: [...prev.perks, ""],
    }));
  };

  const removePerk = (index: number) => {
    const updated = formData.perks.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, perks: updated }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-package`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          ...formData,
          price:Number(formData.price),
        }),
      })

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to save package");
    }
    
    console.log("Saved package:", data);

    }catch(error){
      console.log(error);

    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
            Add New Travel Package
          </h1>
          <p className="text-gray-500 mt-2 text-base">
            Configure detailed itinerary parameters, highlights, and perks.
          </p>
        </div>

        {/* Form Card Container */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-900 border-b border-gray-100 pb-3">
                1. Basic Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Title (Destination Name)
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-cyan-600 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Location / Country
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-cyan-600 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm text-gray-800 appearance-none focus:outline-none focus:border-cyan-600 transition-colors cursor-pointer"
                    >
                      <option value="Beach">Beach</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Mountain">Mountain</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-cyan-600 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 7 Days / 6 Nights"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-cyan-600 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Departure Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="mm/dd/yyyy"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-cyan-600 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Hero Image URL
                  </label>
                  <input
                    type="url"
                    name="heroImage"
                    value={formData.heroImage}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-cyan-600 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Descriptions */}
            <div className="space-y-6 pt-4">
              <h2 className="text-xl font-medium text-gray-900 border-b border-gray-100 pb-3">
                2. Overview & Details
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Overview Description
                </label>
                <textarea
                  name="overview"
                  rows={4}
                  value={formData.overview}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800 focus:outline-none focus:border-cyan-600 transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Highlights Section Description
                </label>
                <textarea
                  name="highlightsDescription"
                  rows={3}
                  value={formData.highlightsDescription}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800 focus:outline-none focus:border-cyan-600 transition-colors resize-none"
                  required
                />
              </div>
            </div>

            {/* Section 3: Highlights List Items */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="text-xl font-medium text-gray-900">
                  3. Highlights Bullet Points
                </h2>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="flex items-center gap-1.5 text-xs font-semibold text-cyan-600 hover:text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-md transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Highlight
                </button>
              </div>

              <div className="space-y-3">
                {formData.highlightsList.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleHighlightChange(index, e.target.value)}
                      placeholder={`Highlight item #${index + 1}`}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-cyan-600 transition-colors"
                      required
                    />
                    {formData.highlightsList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Perks List Items */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="text-xl font-medium text-gray-900">
                  4. Included Perks
                </h2>
                <button
                  type="button"
                  onClick={addPerk}
                  className="flex items-center gap-1.5 text-xs font-semibold text-cyan-600 hover:text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-md transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Perk
                </button>
              </div>

              <div className="space-y-3">
                {formData.perks.map((perk, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={perk}
                      onChange={(e) => handlePerkChange(index, e.target.value)}
                      placeholder={`Perk item #${index + 1}`}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-cyan-600 transition-colors"
                      required
                    />
                    {formData.perks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePerk(index)}
                        className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                className="flex items-center gap-2 px-6 py-2.5 border border-rose-200 text-rose-500 hover:bg-rose-50 text-sm font-medium rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save Travel Package
              </button>
            </div>

          </form>
        </div>

      </main>
    </div>
  );
}