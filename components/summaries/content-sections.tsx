import { cn } from '@/lib/utils';

function parsePoint(point: string) {
  // Remove any leading diamond symbols (◆, ◇, etc.)
  const cleanPoint = point.replace(/^[◆◇♦][\s]*/g, '');
  
  const isNumbered = /^\d+\./.test(cleanPoint);
  const isMainPoint = /^•/.test(cleanPoint);
  // Improved emoji detection regex - more comprehensive
  const emojiRegex = /[\p{Emoji}]/u;
  const hasEmoji = emojiRegex.test(cleanPoint);
  const isEmpty = !cleanPoint.trim();
  // Check if it's a special format like "📌 Something"
  const hasSpecialFormat = /^[^\w\s]/.test(cleanPoint);

  return { 
    isNumbered, 
    isMainPoint, 
    hasEmoji, 
    hasSpecialFormat, 
    isEmpty,
    cleanPoint 
  };
}

function parseEmojiPoint(content: string) {
  // Handle content that starts with an emoji
  const cleanContent = content.replace(/^[•\d.]+\s*/, '').trim();
  
  // More robust emoji detection at the beginning of text
  const emojiMatch = cleanContent.match(/^([^\w\s]+)(.+)$/);
  if (!emojiMatch) return { emoji: '💡', text: cleanContent }; // Default emoji if none found

  const [_, emoji, text] = emojiMatch;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}

const PointBox = ({ emoji, text, isNumbered, index }: { 
  emoji?: string, 
  text: string, 
  isNumbered?: boolean,
  index: number 
}) => {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/5 backdrop-blur-sm border border-rose-500/10 shadow-sm transition-all hover:border-rose-500/20 hover:bg-rose-500/10">
      {emoji && (
        <div className="flex-shrink-0 text-xl sm:text-2xl">
          {emoji}
        </div>
      )}
      <div className="flex-grow">
        {isNumbered ? (
          <p className="text-base sm:text-lg leading-relaxed">
            <span className="font-bold text-rose-500">{index + 1}.</span> {text}
          </p>
        ) : (
          <p className="text-base sm:text-lg leading-relaxed">{text}</p>
        )}
      </div>
    </div>
  );
};

export default function ContentSections({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  // Clean up points to remove diamond symbols
  const cleanedPoints = points.map(point => {
    // Remove leading diamond symbols and their space
    return point.replace(/^[◆◇♦][\s]*/g, '');
  });

  // If there are no points but we need to ensure content is displayed for sections like "Bottom Line"
  if (!cleanedPoints.length && title) {
    return (
      <div className="space-y-4 mb-8">
        <PointBox 
          key="default-point" 
          emoji="📌" 
          text={`The ${title.toLowerCase()} section appears to be empty.`}
          index={0} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-8">
      {cleanedPoints.map((point, index) => {
        const { isNumbered, isMainPoint, hasEmoji, hasSpecialFormat, isEmpty, cleanPoint } = parsePoint(point);

        if (isEmpty) return null;

        // For any point that starts with a special character (emoji, symbol, etc.)
        if (hasEmoji || hasSpecialFormat) {
          const { emoji, text } = parseEmojiPoint(cleanPoint);
          return (
            <PointBox 
              key={`point-${index}`} 
              emoji={emoji} 
              text={text} 
              index={index} 
            />
          );
        } else if (isMainPoint) {
          // For bullet points without emoji, use a default emoji
          const cleanText = cleanPoint.replace(/^•\s*/, '').trim();
          return (
            <PointBox 
              key={`point-${index}`} 
              emoji="•" 
              text={cleanText} 
              index={index} 
            />
          );
        } else if (isNumbered) {
          // For numbered points
          const cleanText = cleanPoint.replace(/^\d+\.\s*/, '').trim();
          return (
            <PointBox 
              key={`point-${index}`} 
              isNumbered={true} 
              text={cleanText} 
              index={index} 
            />
          );
        }

        // Regular text points
        return (
          <PointBox 
            key={`point-${index}`} 
            text={cleanPoint} 
            index={index} 
          />
        );
      })}
    </div>
  );
}
