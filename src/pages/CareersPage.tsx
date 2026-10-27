import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight, UploadCloud, CheckCircle2, Building2, User, Mail, Phone, Clock } from "lucide-react";

const openRoles = [
  {
    id: "compliance-analyst",
    title: "Statutory Compliance Analyst",
    type: "Full-Time",
    location: "Chennai, India",
    department: "GRC Operations",
  },
  {
    id: "risk-consultant",
    title: "Enterprise Risk Consultant",
    type: "Full-Time",
    location: "Remote / Hybrid",
    department: "Risk Management",
  },
  {
    id: "cybersecurity-expert",
    title: "Cybersecurity & DPDP Expert",
    type: "Full-Time",
    location: "Chennai, India",
    department: "Cybersecurity",
  },
  {
    id: "esg-specialist",
    title: "ESG & Sustainability Specialist",
    type: "Full-Time",
    location: "Remote",
    department: "ESG Hub",
  }
];

export default function CareersPage() {
  useEffect(() => {
    document.title = "Careers at GOVENICS | Join Our GRC Advisory Team";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Build your career in governance, risk, compliance, cybersecurity, and ESG advisory. Explore open roles and career paths at GOVENICS GRC, an ISI Group company.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    linkedinUrl: "",
    message: "",
  });
  
  const [resumeFile, setResumeFile] = useState<{name: string, data: string, mime: string} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.position) newErrors.position = "Please select a position";
    if (!formData.experience) newErrors.experience = "Please select experience level";
    if (!resumeFile) newErrors.resume = "Please attach your resume (PDF/DOCX)";
    return newErrors;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({...prev, resume: "File size must be under 5MB"}));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setResumeFile({
          name: file.name,
          data: base64String,
          mime: file.type
        });
        setErrors(prev => ({...prev, resume: ""}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    
    setIsSubmitting(true);
    
    const payload = {
      sheetName: "Career_Applications",
      timestamp: new Date().toISOString(),
      ...formData,
      resumeFilename: resumeFile?.name,
      resumeData: resumeFile?.data,
      resumeMimeType: resumeFile?.mime
    };

    try {
      const webhookUrl = import.meta.env.VITE_TELEMETRY_WEBHOOK_URL;
      if (!webhookUrl) throw new Error("Webhook URL not found");

      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission failed", err);
      alert("Failed to submit application. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase = "w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-white";
  const labelBase = "block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5";
  const errClass = "mt-1 text-[10px] font-bold text-red-500";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-6">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            Join Our Team
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Build the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Compliance & Risk</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            At Govenics, we're on a mission to transform how enterprises navigate complex regulatory landscapes. We're looking for passionate experts to drive this evolution.
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Open Roles */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                Current Openings
              </h2>
              
              <div className="space-y-4">
                {openRoles.map((role) => (
                  <div key={role.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{role.title}</h3>
                        <p className="text-xs text-slate-500 font-semibold mt-1">{role.department}</p>
                      </div>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {role.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-slate-400" /> {role.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span>
                Apply Now
              </h2>

              {isSubmitted ? (
                 <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-white rounded-3xl p-10 text-center space-y-5 shadow-xl border border-slate-200"
               >
                 <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto">
                   <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900">
                   Application Received!
                 </h3>
                 <p className="text-slate-500 font-medium">
                   Thank you for applying to Govenics. Our talent acquisition team will review your profile and reach out to you shortly.
                 </p>
               </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelBase}>Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input name="name" value={formData.name} onChange={handleChange} type="text" className={`${inputBase} pl-10 ${errors.name ? 'border-red-300' : 'border-slate-200'}`} placeholder="John Doe" />
                      </div>
                      {errors.name && <p className={errClass}>{errors.name}</p>}
                    </div>
                    <div>
                      <label className={labelBase}>Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input name="email" value={formData.email} onChange={handleChange} type="email" className={`${inputBase} pl-10 ${errors.email ? 'border-red-300' : 'border-slate-200'}`} placeholder="john@example.com" />
                      </div>
                      {errors.email && <p className={errClass}>{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelBase}>Phone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className={`${inputBase} pl-10 ${errors.phone ? 'border-red-300' : 'border-slate-200'}`} placeholder="+91 98765 43210" />
                      </div>
                      {errors.phone && <p className={errClass}>{errors.phone}</p>}
                    </div>
                    <div>
                      <label className={labelBase}>Experience *</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <select name="experience" value={formData.experience} onChange={handleChange} className={`${inputBase} pl-10 appearance-none ${errors.experience ? 'border-red-300' : 'border-slate-200'}`}>
                          <option value="">Select Experience</option>
                          <option value="Fresher (0-1 yrs)">Fresher (0-1 yrs)</option>
                          <option value="Associate (1-3 yrs)">Associate (1-3 yrs)</option>
                          <option value="Mid-Level (3-7 yrs)">Mid-Level (3-7 yrs)</option>
                          <option value="Senior (7-12 yrs)">Senior (7-12 yrs)</option>
                          <option value="Lead/Director (12+ yrs)">Lead/Director (12+ yrs)</option>
                        </select>
                      </div>
                      {errors.experience && <p className={errClass}>{errors.experience}</p>}
                    </div>
                  </div>

                  <div>
                    <label className={labelBase}>Position Applying For *</label>
                    <select name="position" value={formData.position} onChange={handleChange} className={`${inputBase} ${errors.position ? 'border-red-300' : 'border-slate-200'}`}>
                      <option value="">Select a role...</option>
                      {openRoles.map(r => <option key={r.id} value={r.title}>{r.title}</option>)}
                      <option value="General Application">General Application (Other)</option>
                    </select>
                    {errors.position && <p className={errClass}>{errors.position}</p>}
                  </div>

                  <div>
                    <label className={labelBase}>LinkedIn Profile URL</label>
                    <input name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} type="url" className={`${inputBase} border-slate-200`} placeholder="https://linkedin.com/in/johndoe" />
                  </div>

                  <div>
                    <label className={labelBase}>Upload Resume (PDF/DOCX) *</label>
                    <div className={`relative border-2 border-dashed ${errors.resume ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'} rounded-2xl p-6 text-center transition-colors`}>
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <UploadCloud className={`w-8 h-8 mx-auto mb-2 ${resumeFile ? 'text-blue-500' : 'text-slate-400'}`} />
                      <p className="text-sm font-semibold text-slate-700">
                        {resumeFile ? resumeFile.name : "Click or drag file to upload"}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1">Max 5MB</p>
                    </div>
                    {errors.resume && <p className={errClass}>{errors.resume}</p>}
                  </div>

                  <div>
                    <label className={labelBase}>Cover Message (Optional)</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className={`${inputBase} border-slate-200 resize-none`} placeholder="Why do you want to join Govenics?" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-blue-500/20"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
