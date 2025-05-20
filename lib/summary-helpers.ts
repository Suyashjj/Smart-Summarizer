export const parseSection = (section: string): { title: string; points: string[] } => {
  const lines = section.split('\n');
  let title = '';
  const points: string[] = [];
  
  // Find the title (first non-empty line or line starting with title marker)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      title = line.startsWith('# ') ? line.substring(2).trim() : line.trim();
      break;
    }
  }

  // Clean up title if it has # marker at the beginning
  if (title.startsWith('#')) {
    title = title.substring(1).trim();
  }

  // Process all content after title line by line
  let currentPoint = '';
  let processingInProgress = false;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Check if this is a new bullet point or a numbered point
    const isBulletPoint = line.startsWith('•') || line.startsWith('📌') || 
                          line.startsWith('✅') || line.startsWith('🔍') ||
                          line.startsWith('💪') || line.startsWith('🎯') ||
                          line.startsWith('🛠️') || line.startsWith('💬') ||
                          line.startsWith('🧾') || line.startsWith('💻') ||
                          line.startsWith('🔥') || line.startsWith('📄') ||
                          line.startsWith('🎯') || line.startsWith('🧠') ||
                          line.startsWith('💰');
                          
    const isNumberedPoint = /^\d+\./.test(line);
    const startsWithEmoji = /^[\p{Emoji}]/u.test(line);
    
    if (isBulletPoint || isNumberedPoint || startsWithEmoji) {
      // If we were processing a previous point, save it
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      
      // Start a new point
      currentPoint = line;
      processingInProgress = true;
    } else if (processingInProgress) {
      // Continue with the current point
      currentPoint += ' ' + line;
    } else {
      // Start a new point if we haven't started yet
      currentPoint = line;
      processingInProgress = true;
    }
  }
  
  // Don't forget to add the last point being processed
  if (currentPoint) {
    points.push(currentPoint.trim());
  }
  
  // Filter out any points that are section headers or special instructions
  return {
    title,
    points: points.filter(
      (point) => 
        point && 
        !point.startsWith('#') && 
        !point.startsWith('Choose') &&
        !point.includes('Generated Summary') &&
        !point.includes('Generated on:')
    ),
  };
};