export const getBotResponse = (userInput: string): string => {
  const input = userInput.toLowerCase()
  
  if (input.includes('deadline') || input.includes('assignment')) {
    return "I can help you track your deadlines! Here are your upcoming assignments:\n\n1. Math Assignment - Due: Nov 12\n2. Physics Lab Report - Due: Nov 15\n3. English Essay - Due: Nov 18\n\nWould you like me to set reminders for any of these?"
  } else if (input.includes('event') || input.includes('calendar')) {
    return "Here are the upcoming campus events:\n\n🎓 Guest Lecture on AI - Nov 10, 3 PM\n🎨 Art Exhibition - Nov 13, 10 AM\n⚽ Sports Day - Nov 16, All Day\n\nWould you like more details about any event?"
  } else if (input.includes('syllabus') || input.includes('course')) {
    return "I can help you access your course syllabi. Which subject are you interested in?\n\n• Mathematics\n• Physics\n• Computer Science\n• English Literature\n• Chemistry"
  } else if (input.includes('exam') || input.includes('test')) {
    return "Your upcoming exams:\n\n📚 Midterm Math - Nov 20\n🧪 Chemistry Test - Nov 22\n💻 CS Practical - Nov 25\n\nWould you like study tips or resources for any of these?"
  } else if (input.includes('help') || input.includes('what can you do')) {
    return "I can assist you with:\n\n✅ Tracking deadlines and assignments\n✅ Campus event information\n✅ Course syllabus access\n✅ Exam schedules and reminders\n✅ Study resources and tips\n✅ General campus queries\n\nWhat would you like to know more about?"
  } else {
    return "I'm here to help! You can ask me about:\n• Deadlines and assignments\n• Campus events\n• Course syllabi\n• Exam schedules\n• Study resources\n\nWhat would you like to know?"
  }
}
