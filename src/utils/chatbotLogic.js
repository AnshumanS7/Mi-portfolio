export const getBotResponse = (input, resume) => {
    const query = input.toLowerCase().trim();

    // 1. Basic Greetings & Small Talk
    const greetings = ['hi', 'hello', 'hey', 'greetings', 'sup', 'yo'];
    if (greetings.some(g => query === g || query.startsWith(g + ' '))) {
        return `Hello! I'm ${resume.name}'s AI assistant. Ask me about my Skills, Projects, Experience, or just say 'Contact' to reach out!`;
    }

    if (query.includes('who are you') || query.includes('what are you')) {
        return "I am a portfolio chatbot designed to answer questions about Anshuman's professional background. I run on simple NLP logic!";
    }

    if (query.includes('thank') || query.includes('thanks')) {
        return "You're welcome! Let me know if you need anything else.";
    }

    // 2. Extract Keywords from Resume for Matching
    // Flatten skills for searching
    const allSkills = [
        ...resume.skills.languages,
        ...resume.skills.frameworks,
        ...resume.skills.devops,
        ...resume.skills.databases,
        ...resume.skills.tools,
        ...resume.skills.styling
    ].map(s => s.toLowerCase());

    // Flatten projects
    const projects = resume.projects.map(p => ({
        name: p.name.toLowerCase(),
        stack: p.stack.map(s => s.toLowerCase()),
        desc: p.desc,
        url: p.url,
        originalName: p.name
    }));

    // 3. Project Specific Queries
    // Check if query contains a project name or "project" keyword combined with stack
    const matchedProject = projects.find(p => query.includes(p.name) || p.name.split(' ').some(word => word.length > 3 && query.includes(word)));

    if (matchedProject) {
        return `ah, the **${matchedProject.originalName}**! It's a ${matchedProject.stack.join(', ')} project. ${matchedProject.desc} You can check the code here: ${matchedProject.url}`;
    }

    // General Project Inquiry
    if (query.includes('project') || query.includes('work') || query.includes('built')) {
        const projectNames = resume.projects.map(p => p.name).join(', ');
        return `I've built several interesting things: ${projectNames}. Ask me about a specific one like "News Portal" or "Debatify"!`;
    }

    // 4. Skills & Tech Stack Queries
    // Check for specific skills
    const matchedSkill = allSkills.find(s => query.includes(s));
    if (matchedSkill) {
        // Find context for the skill (which category it belongs to)
        let category = '';
        if (resume.skills.languages.some(s => s.toLowerCase() === matchedSkill)) category = 'Language';
        else if (resume.skills.frameworks.some(s => s.toLowerCase() === matchedSkill)) category = 'Framework';
        else if (resume.skills.devops.some(s => s.toLowerCase() === matchedSkill)) category = 'DevOps Tool';
        else if (resume.skills.databases.some(s => s.toLowerCase() === matchedSkill)) category = 'Database';
        else category = 'Tool';

        return `Yes, I am proficient in **${matchedSkill.toUpperCase()}**! It's one of my key ${category} skills.`;
    }

    if (query.includes('skill') || query.includes('stack') || query.includes('tech') || query.includes('language')) {
        const topSkills = resume.skills.languages.slice(0, 3).join(', ') + ', ' + resume.skills.frameworks.slice(0, 3).join(', ');
        const devOps = resume.skills.devops.slice(0, 2).join(', ');
        return `My tech stack is broad! Core: ${topSkills}. I also know DevOps (${devOps}) and databases like MongoDB.`;
    }

    // 5. Experience & Internships
    if (query.includes('experience') || query.includes('intern') || query.includes('job') || query.includes('company')) {
        const exp = resume.experience[0];
        return `I have experience as a **${exp.role}** at **${exp.company}** (${exp.period}). I worked on ${exp.bullets[0].toLowerCase()}.`;
    }

    // 6. Education
    if (query.includes('education') || query.includes('college') || query.includes('school') || query.includes('university') || query.includes('degree')) {
        const edu = resume.education[0];
        return `I studied **${edu.degree}** at **${edu.school}** with a CGPA of ${edu.meta.split(' ')[1]}.`;
    }

    // 7. Contact
    if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('reach')) {
        return `Let's connect! Email me at **${resume.contact.email}** or finding me on LinkedIn (${resume.contact.links.linkedin}).`;
    }

    if (query.includes('resume') || query.includes('cv')) {
        return `You can view/download my resume here: ${resume.contact.links.resume}`;
    }

    // 8. Fallback / Fun
    if (query.includes('cool') || query.includes('awesome') || query.includes('wow')) {
        return "Glad you think so! 😎";
    }

    return "I'm mostly trained on Anshuman's portfolio data. Try asking about **Projects**, **Skills**, **Experience**, or specific tech like 'React' or 'AWS'.";
};
