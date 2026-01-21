import { useState } from "react";
import { supabase } from "../supabaseClient";
import { 
  BookOpen, 
  Video, 
  FileText, 
  PenTool, 
  UploadCloud, 
  CheckCircle,
  Loader2
} from "lucide-react";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
    pdf_url: "",     // Google Drive link for PDF
    notes_url: "",   // Google Drive link for Notes
    grade: "1",      // Default Grade
    subject: "Mathematics"
  });

  // Handle Input Changes
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Upload Logic
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("courses").insert([
        {
          title: formData.title,
          description: formData.description,
          video_url: formData.video_url,
          pdf_url: formData.pdf_url,
          notes_url: formData.notes_url,
          grade: formData.grade, // Make sure 'grade' column exists in Supabase
          // subject: formData.subject // Uncomment if you added 'subject' column
        },
      ]);

      if (error) throw error;
      
      alert("✅ Class Uploaded Successfully!");
      // Reset Form
      setFormData({ 
        title: "", description: "", video_url: "", 
        pdf_url: "", notes_url: "", grade: "1", subject: "Mathematics" 
      });

    } catch (error: any) {
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl border-t-4 border-[#FF9933] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#000080] p-6 text-white text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <UploadCloud size={28} className="text-[#FF9933]" />
            Teacher's Upload Panel
          </h1>
          <p className="text-blue-200 text-sm mt-1">Upload Videos, Notes & Assignments</p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpload} className="p-8 space-y-6">
          
          {/* 1. Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Grade / Class</label>
              <select 
                name="grade" 
                value={formData.grade} 
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(g => (
                  <option key={g} value={g}>Class {g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
              <select 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] outline-none"
              >
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
                <option>Hindi</option>
                <option>History</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Topic / Title</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Newton's Laws of Motion"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] outline-none"
                required
              />
            </div>
          </div>

          {/* 2. Video Section */}
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <h3 className="text-[#FF9933] font-bold text-sm mb-3 flex items-center gap-2">
              <Video size={16} /> Video Content
            </h3>
            <input
              type="text"
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              placeholder="Paste YouTube Link here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF9933] outline-none bg-white"
              required
            />
          </div>

          {/* 3. Materials Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="text-[#000080] font-bold text-sm mb-3 flex items-center gap-2">
                <FileText size={16} /> PDF Document
              </h3>
              <input
                type="text"
                name="pdf_url"
                value={formData.pdf_url}
                onChange={handleChange}
                placeholder="Google Drive PDF Link"
                className="w-full p-2 text-sm border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="text-[#000080] font-bold text-sm mb-3 flex items-center gap-2">
                <PenTool size={16} /> Handwritten Notes
              </h3>
              <input
                type="text"
                name="notes_url"
                value={formData.notes_url}
                onChange={handleChange}
                placeholder="Google Drive Notes Link"
                className="w-full p-2 text-sm border border-gray-300 rounded-lg outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Short summary of the class..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#000080] hover:bg-blue-900 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <CheckCircle /> Publish Class
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Admin;