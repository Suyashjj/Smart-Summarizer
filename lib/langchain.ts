import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

export async function fetchAndExtractPdfText(fileUrl: string) {
  console.log('Starting PDF processing for URL:', fileUrl);
  
  const response = await fetch(fileUrl);
  const blob = await response.blob();
  console.log('PDF fetched, size:', blob.size, 'bytes');

  const arrayBuffer = await blob.arrayBuffer();
  console.log('Converted to ArrayBuffer');

  const loader = new PDFLoader(new Blob([arrayBuffer]));
  console.log('PDFLoader initialized');
  
  const docs = await loader.load();
  console.log(`PDF processed: ${docs.length} pages extracted`);
  
  // Log first 100 characters of each page
  docs.forEach((doc, index) => {
    console.log(`Page ${index + 1} preview:`, doc.pageContent.substring(0, 100) + '...');
  });

  const combinedText = docs.map((doc) => doc.pageContent).join('\n');
  console.log('Total extracted text length:', combinedText.length, 'characters');
  
  return combinedText;
}