# AI Web Searcher 🔍🤖

A React app that provides AI-powered web search with dynamic filters and smooth animations for a seamless user experience. Uses **GEMINI API** for AI filtering and tailored results, and **SerpAPI** for web search data.

---

## Tech Stack

- **Frontend:** React, Framer Motion for animations  
- **Backend:** Node.js (assumed from your fetch URLs)  
- **State Management:** React Hooks, react-use debounce  
- **Styling:** Tailwind CSS (utility classes in markup)  
- **APIs:**  
  - **GEMINI API** for AI filtering and customized result refinement  
  - **SerpAPI** for retrieving web search results  

---

## Methodology

- **Debounced input:** Avoids excessive API calls by waiting 800ms after user stops typing  
- **Separate data fetching:** Results and filters fetched independently for responsiveness  
- **Animated UI:** Smooth fades and transitions via Framer Motion for better UX  
- **Dynamic layout:** Filter panel toggles without causing layout shifts or jerks  
- **Error handling:** Shows user-friendly messages and loading spinners during fetches  

---

## Features

- Debounced real-time search  
- AI-powered filtering with GEMINI API
- Serves top 5 results combined both google and bing searches 
- Web search powered by SerpAPI  
- Filter panel to refine results  
- Animated transitions with Framer Motion  
- Loading and error handling states  
- Modular, reusable components  

---

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/ai-web-searcher.git
   cd ai-web-searcher

2. **Install the dependencies:**

   ```bash
   npm install

3. **Start the server**

   ```bash
   cd server
   npm start

4. **Run the front-end**

    Open another terminal

   ```bash
   cd client
   npm run dev

## DONE - http://localhost:5173/
   

