
import { Student, ClassSession, CoCurricularActivity } from "../types";

// Helper to get API key from various sources
const getApiKey = (): string => {
  let apiKey = '';
  try {
    // Try Vite environment variable first
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
        apiKey = import.meta.env.VITE_API_KEY;
    }
    // Fallback to process.env (for shimmed environments)
    else if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        apiKey = process.env.API_KEY;
    }
    // Fallback to window.process.env (shimmed in index.html)
    else if (typeof window !== 'undefined' && (window as any).process && (window as any).process.env && (window as any).process.env.API_KEY) {
        apiKey = (window as any).process.env.API_KEY;
    }
  } catch (e) {
    console.warn("API key access failed:", e);
  }
  return apiKey || '';
};

// Helper to check if API key is valid
const isApiKeyValid = (apiKey: string): boolean => {
  return apiKey && apiKey.trim() !== '' && apiKey !== 'missing_api_key' && apiKey.length > 10;
};

// Helper to safely get the client only when needed using Dynamic Import
const getAiClient = async () => {
  try {
    // Check API key first before loading SDK
    const apiKey = getApiKey();
    if (!isApiKeyValid(apiKey)) {
      console.warn("API key not configured. AI features will not work.");
      return null;
    }

    // Dynamic import to prevent initial load crash
    const { GoogleGenAI } = await import("@google/genai");
    
    return new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("Failed to load Google GenAI SDK", error);
    // Don't throw - return null and let calling functions handle it
    return null;
  }
};

// Helper to format error messages from API calls - USER-FRIENDLY VERSION
const formatApiError = (error: any): string => {
  const errorMessage = error?.message || String(error) || 'Unknown error';
  const errorString = errorMessage.toLowerCase();
  
  // Check for API key issues - FRIENDLY MESSAGE
  if (errorString.includes('api_key') || errorString.includes('api key') || 
      errorString.includes('authentication') || errorString.includes('unauthorized') ||
      errorString.includes('invalid api key') || errorString.includes('missing api key') ||
      errorString.includes('403') || errorString.includes('forbidden')) {
    return "🔑 API Key Issue\n\n" +
           "Your API key is missing or invalid. Here's how to fix it:\n\n" +
           "1. Open the .env file in your project folder\n" +
           "2. Make sure it contains: VITE_API_KEY=your_actual_key_here\n" +
           "3. Replace 'your_actual_key_here' with your real Google Gemini API key\n" +
           "4. Save the file\n" +
           "5. Restart the development server (stop with Ctrl+C, then run 'npm run dev' again)\n\n" +
           "Get your API key from: https://makersuite.google.com/app/apikey";
  }
  
  // Check for connection/network issues - FRIENDLY MESSAGE
  if (errorString.includes('connection failed') || errorString.includes('network') || 
      errorString.includes('fetch') || errorString.includes('failed to fetch') ||
      errorString.includes('internet connection') || errorString.includes('vpn') ||
      errorString.includes('timeout') || errorString.includes('econnrefused') ||
      errorString.includes('networkerror') || errorString.includes('network error') ||
      errorString.includes('err_network') || errorString.includes('enotfound')) {
    return "🌐 Connection Problem\n\n" +
           "Unable to connect to the AI service. Please try these steps:\n\n" +
           "✓ Check your internet connection\n" +
           "✓ If using VPN, try disabling it temporarily\n" +
           "✓ Check firewall/antivirus settings\n" +
           "✓ Make sure your API key is set correctly in .env file\n" +
           "✓ Restart the development server after changing .env\n\n" +
           "If the problem continues, the issue might be with your network or VPN settings.";
  }
  
  // Check for rate limiting - FRIENDLY MESSAGE
  if (errorString.includes('rate limit') || errorString.includes('quota') || 
      errorString.includes('429') || errorString.includes('too many requests')) {
    return "⏱️ Too Many Requests\n\n" +
           "You've made too many requests too quickly. Please wait a moment and try again.\n\n" +
           "The AI service limits how many requests you can make per minute.";
  }
  
  // Check for timeout - FRIENDLY MESSAGE
  if (errorString.includes('timeout') || errorString.includes('timed out')) {
    return "⏰ Request Timeout\n\n" +
           "The AI service took too long to respond. This can happen if:\n\n" +
           "• Your internet connection is slow\n" +
           "• The AI service is busy\n" +
           "• There's a network issue\n\n" +
           "Please try again in a moment.";
  }
  
  // Generic error - FRIENDLY MESSAGE
  return "❌ Something Went Wrong\n\n" +
         "The AI service encountered an error. Here's what you can try:\n\n" +
         "1. Check your internet connection\n" +
         "2. Verify your API key is correct in the .env file\n" +
         "3. Restart the development server\n" +
         "4. Try again in a few moments\n\n" +
         `Technical details: ${errorMessage.substring(0, 100)}`;
};

export const generateSchoolNotice = async (
  topic: string,
  audience: string,
  tone: string = "Formal"
): Promise<string> => {
  try {
    // Validate inputs
    if (!topic || typeof topic !== 'string' || topic.trim() === '') {
      return "Error: Topic is required.";
    }
    if (!audience || typeof audience !== 'string') {
      return "Error: Audience is required.";
    }

    const ai = await getAiClient();
    if (!ai) {
      return "Error: AI service could not be initialized. Please check your API key configuration.";
    }

    const prompt = `
      You are an expert School Administrator for a prestigious CBSE school in New Delhi.
      Write a school notice/circular.
      
      Topic: ${topic.trim()}
      Audience: ${audience.trim()}
      Tone: ${tone || "Formal"}
      
      Requirements:
      1. Use professional, clear English suitable for an Indian academic context.
      2. Include placeholders for Date, Ref No, and Principal's Signature if necessary.
      3. If the topic involves holidays or timings, keep New Delhi weather/traffic context in mind implicitly if relevant.
      4. Format it clearly with a subject line.
      
      Return ONLY the content of the notice.
    `;

    // Add timeout protection
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout - the AI service took too long to respond. Please try again.')), 30000);
    });

    const apiPromise = ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const response = await Promise.race([apiPromise, timeoutPromise]) as any;

    if (!response || !response.text) {
      return "⚠️ The AI service returned an empty response. Please try again.";
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Never throw - always return a user-friendly message
    return formatApiError(error);
  }
};

export const analyzeStudentPerformance = async (studentName: string, marksData: string): Promise<string> => {
    try {
        // Validate inputs
        if (!studentName || typeof studentName !== 'string' || studentName.trim() === '') {
            return "Error: Student name is required.";
        }
        if (!marksData || typeof marksData !== 'string' || marksData.trim() === '') {
            return "Error: Marks data is required.";
        }

        const ai = await getAiClient();
        if (!ai) {
            return "Error: AI service could not be initialized. Please check your API key configuration.";
        }

        const prompt = `
          You are a senior academic coordinator. Analyze the following performance data for student ${studentName.trim()}.
          Data: ${marksData.trim()}
          
          Provide a 3-sentence summary for the Report Card remarks:
          1. A positive observation.
          2. An area of improvement.
          3. A specific suggestion for the parents.
        `;
    
        // Add timeout protection
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout - the AI service took too long to respond. Please try again.')), 30000);
        });

        const apiPromise = ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const response = await Promise.race([apiPromise, timeoutPromise]) as any;
    
        if (!response || !response.text) {
            return "⚠️ The AI service returned an empty response. Please try again.";
        }

        return response.text;
      } catch (error: any) {
        console.error("Gemini API Error:", error);
        // Never throw - always return a user-friendly message
        return formatApiError(error);
      }
}

export const analyzeStudentFactors = async (
  student: Student,
  missedSessions: ClassSession[],
  activities: CoCurricularActivity[]
): Promise<string> => {
  try {
    // Validate inputs
    if (!student || !student.id || !student.name) {
        return "Error: Valid student data is required.";
    }

    const ai = await getAiClient();
    if (!ai) {
        return "Error: AI service could not be initialized. Please check your API key configuration.";
    }

    // Safely process arrays with null checks
    const missedTopics = Array.isArray(missedSessions) 
        ? missedSessions.map(s => `${s?.subject || 'Unknown'}: ${s?.topic || 'Unknown'} (${s?.date || 'Unknown'})`).join(', ')
        : "None";
    
    const activitySummary = Array.isArray(activities)
        ? activities.map(a => `${a?.name || 'Activity'} (${a?.hoursSpent || 0} hrs) - ${a?.achievement || 'Participant'}`).join(', ')
        : "None";
    
    // Format Exam Results with null safety
    const examTrends = Array.isArray(student.examResults) && student.examResults.length > 0
        ? student.examResults.map(e => {
            const keyScores = Array.isArray(e.subjects) 
                ? e.subjects.filter(s => s && (s.score < 60 || s.score > 90)).map(s => `${s.subject}: ${s.score}`).join(', ')
                : '';
            return `${e.examName || 'Exam'}: ${e.totalPercentage || 0}%${keyScores ? ` (Key Scores: ${keyScores})` : ''}`;
          }).join(' | ')
        : "No Exam Data";

    const prompt = `
      Analyze the factors influencing the academic journey of student: ${student.name || 'Student'} (Class ${student.className || 'Unknown'}).
      
      DATA POINTS:
      1. Exam History: ${examTrends}
      2. Missed Topics (Absence): ${missedTopics || "None"}
      3. Co-Curricular Load: ${activitySummary || "None"}
      4. General Attendance: ${student.attendancePercentage || 0}%
      
      TASK:
      Provide a "Holistic Observation" report.
      
      GUIDELINES (IMPORTANT):
      1. Be supportive and constructive. Do NOT be diagnostic or judgmental.
      2. Use phrases like "may suggest", "could be related to", or "consider reviewing".
      3. Do NOT make definitive medical or psychological claims.
      4. Do NOT comment on financial status even if data implies it.
      
      STRUCTURE:
      1. Observations: Note any patterns (e.g., correlations between absence dates and specific topic performance).
      2. Balance Check: Is the student balancing academics and activities well?
      3. Suggestions: Constructive steps for the teacher/parent to support the student.
    `;

    // Add timeout protection
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout - the AI service took too long to respond. Please try again.')), 30000);
    });

    const apiPromise = ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const response = await Promise.race([apiPromise, timeoutPromise]) as any;

    if (!response || !response.text) {
        return "⚠️ The AI service returned an empty response. Please try again.";
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini Factor Analysis Error", error);
    // Never throw - always return a user-friendly message
    return formatApiError(error);
  }
};
