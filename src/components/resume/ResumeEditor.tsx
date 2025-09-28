import React, { useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Download, Eye, Save, FileText } from "lucide-react";
import { TemplateSchema, SampleResumeData } from "@/lib/template-schemas";
import TemplateRenderer from "./TemplateRenderer";
import { exportResumeToPDF } from "@/lib/pdf-export";

interface ResumeEditorProps {
  template: TemplateSchema;
  initialData?: Partial<SampleResumeData>;
  onSave?: (data: SampleResumeData) => void;
  onExport?: (data: SampleResumeData) => void;
}

const defaultResumeData: SampleResumeData = {
  basics: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    links: [{ label: "LinkedIn", url: "" }],
  },
  summary: "",
  experience: [
    {
      company: "",
      role: "",
      location: "",
      start: "",
      end: "Present",
      bullets: [""],
    },
  ],
  education: [
    {
      school: "",
      degree: "",
      start: "",
      end: "",
      details: "",
    },
  ],
  projects: [
    {
      name: "",
      link: "",
      bullets: [""],
    },
  ],
  skills: [],
};

export default function ResumeEditor({ 
  template, 
  initialData = {}, 
  onSave, 
  onExport 
}: ResumeEditorProps) {
  const [resumeData, setResumeData] = useState<SampleResumeData>({
    ...defaultResumeData,
    ...initialData,
  });
  
  const resumeContainerRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const [activeTab, setActiveTab] = useState("basics");

  // PDF Export function
  const handleExportPDF = async () => {
    if (!resumeContainerRef.current) {
      console.error('Resume container not found');
      return;
    }

    try {
      setIsExporting(true);
      
      const filename = `${resumeData.basics.fullName || 'Resume'}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      await exportResumeToPDF(resumeData, resumeContainerRef, {
        filename,
        format: 'A4',
        orientation: 'portrait',
        quality: 1.0
      });
      
      // Call the onExport callback if provided
      if (onExport) {
        onExport(resumeData);
      }
      
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Helper functions
  const updateBasics = (key: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      basics: { ...prev.basics, [key]: value }
    }));
  };

  const updateLink = (index: number, key: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      basics: {
        ...prev.basics,
        links: prev.basics.links.map((link, i) => 
          i === index ? { ...link, [key]: value } : link
        )
      }
    }));
  };

  const addLink = () => {
    setResumeData(prev => ({
      ...prev,
      basics: {
        ...prev.basics,
        links: [...prev.basics.links, { label: "", url: "" }]
      }
    }));
  };

  const removeLink = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      basics: {
        ...prev.basics,
        links: prev.basics.links.filter((_, i) => i !== index)
      }
    }));
  };

  const updateExperience = (index: number, key: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [key]: value } : exp
      )
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        company: "",
        role: "",
        location: "",
        start: "",
        end: "Present",
        bullets: [""],
      }]
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const updateBullet = (expIndex: number, bulletIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex 
          ? { 
              ...exp, 
              bullets: exp.bullets.map((bullet, j) => 
                j === bulletIndex ? value : bullet
              )
            } 
          : exp
      )
    }));
  };

  const addBullet = (expIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex 
          ? { ...exp, bullets: [...exp.bullets, ""] }
          : exp
      )
    }));
  };

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex 
          ? { ...exp, bullets: exp.bullets.filter((_, j) => j !== bulletIndex) }
          : exp
      )
    }));
  };

  const updateEducation = (index: number, key: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [key]: value } : edu
      )
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        school: "",
        degree: "",
        start: "",
        end: "",
        details: "",
      }]
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const updateProject = (index: number, key: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects?.map((proj, i) => 
        i === index ? { ...proj, [key]: value } : proj
      ) || []
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...(prev.projects || []), {
        name: "",
        link: "",
        bullets: [""],
      }]
    }));
  };

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects?.filter((_, i) => i !== index) || []
    }));
  };

  const updateProjectBullet = (projIndex: number, bulletIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects?.map((proj, i) => 
        i === projIndex 
          ? { 
              ...proj, 
              bullets: proj.bullets.map((bullet, j) => 
                j === bulletIndex ? value : bullet
              )
            } 
          : proj
      ) || []
    }));
  };

  const addProjectBullet = (projIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects?.map((proj, i) => 
        i === projIndex 
          ? { ...proj, bullets: [...proj.bullets, ""] }
          : proj
      ) || []
    }));
  };

  const removeProjectBullet = (projIndex: number, bulletIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects?.map((proj, i) => 
        i === projIndex 
          ? { ...proj, bullets: proj.bullets.filter((_, j) => j !== bulletIndex) }
          : proj
      ) || []
    }));
  };

  const skillsCSV = useMemo(() => resumeData.skills.join(", "), [resumeData.skills]);
  const setSkillsCSV = (csv: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: csv.split(",").map(s => s.trim()).filter(Boolean)
    }));
  };

  const handleSave = () => {
    if (onSave) onSave(resumeData);
  };

  const handleExport = () => {
    if (onExport) onExport(resumeData);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resume Editor</h1>
            <p className="text-slate-600">Using {template.name} Template</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handleExportPDF} disabled={isExporting}>
              {isExporting ? (
                <>
                  <FileText className="w-4 h-4 mr-2 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Form */}
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basics">Basics</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="basics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium">Full Name</label>
                        <Input
                          value={resumeData.basics.fullName}
                          onChange={(e) => updateBasics("fullName", e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">Job Title</label>
                        <Input
                          value={resumeData.basics.title}
                          onChange={(e) => updateBasics("title", e.target.value)}
                          placeholder="Software Engineer"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium">Email</label>
                        <Input
                          type="email"
                          value={resumeData.basics.email}
                          onChange={(e) => updateBasics("email", e.target.value)}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">Phone</label>
                        <Input
                          value={resumeData.basics.phone}
                          onChange={(e) => updateBasics("phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">Location</label>
                      <Input
                        value={resumeData.basics.location}
                        onChange={(e) => updateBasics("location", e.target.value)}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    
                    {/* Links */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">Links</label>
                      <div className="space-y-2">
                        {resumeData.basics.links.map((link, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={link.label}
                              onChange={(e) => updateLink(index, "label", e.target.value)}
                              placeholder="Label"
                              className="w-32"
                            />
                            <Input
                              value={link.url}
                              onChange={(e) => updateLink(index, "url", e.target.value)}
                              placeholder="URL"
                              className="flex-1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeLink(index)}
                              disabled={resumeData.basics.links.length === 1}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={addLink}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Link
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Professional Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={resumeData.summary}
                      onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                      placeholder="Write a brief summary of your professional background and key achievements..."
                      className="min-h-[100px]"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Work Experience</CardTitle>
                      <Button variant="outline" size="sm" onClick={addExperience}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="rounded-lg border bg-white p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="font-medium">Experience {index + 1}</h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeExperience(index)}
                            disabled={resumeData.experience.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="mb-2 block text-sm font-medium">Company</label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(index, "company", e.target.value)}
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">Role</label>
                            <Input
                              value={exp.role}
                              onChange={(e) => updateExperience(index, "role", e.target.value)}
                              placeholder="Job Title"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <label className="mb-2 block text-sm font-medium">Location</label>
                            <Input
                              value={exp.location}
                              onChange={(e) => updateExperience(index, "location", e.target.value)}
                              placeholder="City, State"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">Start Date</label>
                            <Input
                              value={exp.start}
                              onChange={(e) => updateExperience(index, "start", e.target.value)}
                              placeholder="Jan 2020"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">End Date</label>
                            <Input
                              value={exp.end}
                              onChange={(e) => updateExperience(index, "end", e.target.value)}
                              placeholder="Present"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="mb-2 block text-sm font-medium">Achievements & Responsibilities</label>
                          <div className="space-y-2">
                            {exp.bullets.map((bullet, bulletIndex) => (
                              <div key={bulletIndex} className="flex gap-2">
                                <Textarea
                                  value={bullet}
                                  onChange={(e) => updateBullet(index, bulletIndex, e.target.value)}
                                  placeholder="Describe your key achievements..."
                                  className="min-h-[60px]"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeBullet(index, bulletIndex)}
                                  disabled={exp.bullets.length === 1}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addBullet(index)}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Achievement
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Education</CardTitle>
                      <Button variant="outline" size="sm" onClick={addEducation}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="rounded-lg border bg-white p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="font-medium">Education {index + 1}</h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeEducation(index)}
                            disabled={resumeData.education.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="mb-2 block text-sm font-medium">School/University</label>
                            <Input
                              value={edu.school}
                              onChange={(e) => updateEducation(index, "school", e.target.value)}
                              placeholder="University Name"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">Degree</label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, "degree", e.target.value)}
                              placeholder="Bachelor of Science"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="mb-2 block text-sm font-medium">Start Date</label>
                            <Input
                              value={edu.start}
                              onChange={(e) => updateEducation(index, "start", e.target.value)}
                              placeholder="2016"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">End Date</label>
                            <Input
                              value={edu.end}
                              onChange={(e) => updateEducation(index, "end", e.target.value)}
                              placeholder="2020"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="mb-2 block text-sm font-medium">Details (Optional)</label>
                          <Input
                            value={edu.details || ""}
                            onChange={(e) => updateEducation(index, "details", e.target.value)}
                            placeholder="GPA, honors, relevant coursework..."
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <label className="mb-2 block text-sm font-medium">Technical Skills</label>
                      <Textarea
                        value={skillsCSV}
                        onChange={(e) => setSkillsCSV(e.target.value)}
                        placeholder="React, TypeScript, Node.js, Python, AWS..."
                        className="min-h-[100px]"
                      />
                      <p className="mt-2 text-sm text-slate-500">
                        Enter skills separated by commas
                      </p>
                    </div>
                    
                    {resumeData.skills.length > 0 && (
                      <div className="mt-4">
                        <p className="mb-2 text-sm font-medium">Preview:</p>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Live Preview */}
          <div className="lg:sticky lg:top-4">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Live Preview</h3>
                <Badge variant="outline">{template.name}</Badge>
              </div>
              <div className="overflow-auto" ref={resumeContainerRef}>
                <TemplateRenderer template={template} data={resumeData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
