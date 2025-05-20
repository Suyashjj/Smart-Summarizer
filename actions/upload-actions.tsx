'use server'
import { getDbConnection } from '@/lib/db';
import { fetchAndExtractPdfText } from '@/lib/langchain'
import { generateSummaryFromOllama } from '@/lib/ollama';

interface PdfSummaryType {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}


export async function generatePdfSummary(
  uploadResponse: {
    url: string;
    name: string;
  }[]
) {
  if (!uploadResponse || !uploadResponse[0]) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  const { url: pdfUrl, name: fileName } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  try {
    // Extract text from the PDF
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ pdfText });

    // Truncate text to fit LLaMA 3's context length (8192 tokens, ~32,000 chars)
    const maxLength = 32000; // Rough estimate: 8192 tokens * 4 chars per token
    const truncatedText = pdfText.length > maxLength ? pdfText.substring(0, maxLength) : pdfText;

    // Generate summary using Ollama
    const summary = await generateSummaryFromOllama(truncatedText);
    console.log({ summary });

    return {
      success: true,
      message: 'Summary generated successfully',
      data: summary, // Return the actual summary instead of pdfText
    };
  } catch (err: any) {
    console.error('Error generating summary:', err);
    return {
      success: false,
      message: err.message || 'Error generating summary',
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  // sql inserting pdf summary
  try {
    const sql = await getDbConnection();
    await sql`INSERT INTO pdf_summaries (
      user_id,
      original_file_url,
      summary_text,
      title,
      file_name
    ) VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName}
    )`;
  } catch (error) {
    console.error('Error saving PDF summary, please try again later...', error);
    throw error;
  }
}


export async function storePdfSummaryAction({
  userId,
  fileUrl,
  summary,
  title,
  fileName
}: PdfSummaryType) {
  try {
    // We'll use the userId passed in directly from the component
    if (!userId) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName
    });
    
    return {
      success: true,
      message: 'PDF summary saved successfully',
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Error saving PDF summary',
    };
  }
}