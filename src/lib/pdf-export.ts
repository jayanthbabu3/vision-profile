import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SampleResumeData } from './template-schemas';

export interface PDFExportOptions {
  filename?: string;
  format?: 'A4' | 'Letter';
  orientation?: 'portrait' | 'landscape';
  quality?: number;
}

export const exportResumeToPDF = async (
  resumeData: SampleResumeData,
  containerRef: React.RefObject<HTMLDivElement>,
  options: PDFExportOptions = {}
): Promise<void> => {
  const {
    filename = 'resume.pdf',
    format = 'A4',
    orientation = 'portrait',
    quality = 1.0
  } = options;

  if (!containerRef.current) {
    throw new Error('Resume container not found');
  }

  try {
    // Show loading state (optional)
    const loadingElement = document.createElement('div');
    loadingElement.style.position = 'fixed';
    loadingElement.style.top = '50%';
    loadingElement.style.left = '50%';
    loadingElement.style.transform = 'translate(-50%, -50%)';
    loadingElement.style.background = 'rgba(0,0,0,0.8)';
    loadingElement.style.color = 'white';
    loadingElement.style.padding = '20px';
    loadingElement.style.borderRadius = '8px';
    loadingElement.style.zIndex = '9999';
    loadingElement.textContent = 'Generating PDF...';
    document.body.appendChild(loadingElement);

    // Configure html2canvas options
    const canvasOptions = {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: containerRef.current.scrollWidth,
      height: containerRef.current.scrollHeight,
    };

    // Convert HTML to canvas
    const canvas = await html2canvas(containerRef.current, canvasOptions);
    
    // Create PDF
    const imgData = canvas.toDataURL('image/png', quality);
    
    // Calculate PDF dimensions
    const pdfWidth = format === 'A4' ? 210 : 216; // mm
    const pdfHeight = format === 'A4' ? 297 : 279; // mm
    
    let imgWidth = pdfWidth;
    let imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // If image height exceeds PDF height, scale down
    if (imgHeight > pdfHeight) {
      imgHeight = pdfHeight;
      imgWidth = (canvas.width * pdfHeight) / canvas.height;
    }
    
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: format,
    });
    
    // Calculate centering
    const xOffset = (pdfWidth - imgWidth) / 2;
    const yOffset = (pdfHeight - imgHeight) / 2;
    
    // Add image to PDF
    pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
    
    // Remove loading element
    document.body.removeChild(loadingElement);
    
    // Save PDF
    pdf.save(filename);
    
    console.log('PDF exported successfully:', filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Remove loading element if it exists
    const loadingElement = document.querySelector('div[style*="Generating PDF"]');
    if (loadingElement) {
      document.body.removeChild(loadingElement);
    }
    
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

// Alternative method using direct HTML to PDF conversion
export const exportResumeToPDFDirect = async (
  resumeData: SampleResumeData,
  containerRef: React.RefObject<HTMLDivElement>,
  options: PDFExportOptions = {}
): Promise<void> => {
  const {
    filename = 'resume.pdf',
    format = 'A4',
    orientation = 'portrait'
  } = options;

  if (!containerRef.current) {
    throw new Error('Resume container not found');
  }

  try {
    // Create a temporary container with optimized styling for PDF
    const tempContainer = containerRef.current.cloneNode(true) as HTMLElement;
    
    // Apply PDF-optimized styles
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = format === 'A4' ? '210mm' : '216mm';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.padding = '20px';
    tempContainer.style.fontSize = '12px';
    tempContainer.style.lineHeight = '1.4';
    
    document.body.appendChild(tempContainer);
    
    // Convert to canvas
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: tempContainer.offsetWidth,
      height: tempContainer.offsetHeight,
    });
    
    // Clean up temporary element
    document.body.removeChild(tempContainer);
    
    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: format,
    });
    
    const pdfWidth = format === 'A4' ? 210 : 216;
    const pdfHeight = format === 'A4' ? 297 : 279;
    
    const imgWidth = pdfWidth - 20; // Account for margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(filename);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

