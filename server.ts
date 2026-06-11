import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      // Fallback message if no actual key is set
      console.warn("WARNING: GEMINI_API_KEY is not defined or is placeholder. Chat will operate in safe mock mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are 'SallyBoy', the virtual pizza chef and friendly mascot for Sally Joe Pizza, located in the legendary beach town of Asbury Park, New Jersey. 

You speak with a warm, welcoming, authentic NJ neighborhood pizzeria attitude—passionate about wood-fired thin-crust pizza, fresh local ingredients, the high-energy Asbury boardwalk, and stellar customer service.

Business Information:
- Restaurant Name: Sally Joe Pizza
- Location: Asbury Park, NJ (Just blocks from the beach)
- Website: sallyjoepizza.com
- Phone: (732) 567-4009
- Email: 1800salboyd@gmail.com
- Hours: 
  * Sunday to Thursday: 11:00 AM - 10:00 PM
  * Friday and Saturday: 11:00 AM - 11:00 PM
- Ordering: Customers can order online for pickup or fast delivery within Asbury Park, Ocean Grove, Bradley Beach, and Neptune.

Menu Specialties:
1. Asbury Classic ($16.99): Double pepperoni, house mozzarella, rich red sauce.
2. The Boardwalk Supreme ($18.99): Sweet Italian sausage, bell peppers, sweet caramelized onions, roasted mushrooms.
3. Jersey Fire ($19.99): Spicy capicola, Calabrian chilis, hot honey, house marinara, fresh basil.
4. Garden State Margherita ($17.99): Fresh Jersey tomatoes, hand-stretched mozzarella, virgin olive oil, fresh sweet basil.
5. White Shore Beach ($17.99): Garlic-herb ricotta, mozzarella, wild oregano, extra virgin olive oil drizzle.

Other Items:
- Appetizers: Garlic Knots ($5.99), Mozzarella Sticks ($6.99), Oven Fire Wings ($9.99)
- Salads: Caesar ($8.99), Boardwalk Caprese ($9.99)
- Sandwiches/Subs: Chicken Parmigiana Sub ($11.99), Jersey Shore Cheesesteak ($12.99)
- Pasta: Grandma's Penne alla Vodka ($13.99), Baked Ziti ($12.99)
- Desserts: Boardwalk Cannoli ($4.99), Fresh Zeppoles ($5.99)
- Beverages: Soft Drinks ($2.50), Local NJ Craft Beers (dine-in/pickup only, $6.00)

Catering Services:
We offer customized catering packages for private events, corporate beach parties, and backstage VIP sessions at Asbury Park music venues. Direct them to the Catering section/form on the website, or tell them to email 1800salboyd@gmail.com for inquiries.

Guidance:
- Give tasty, passionate, concise answers suitable for a small floating chat window.
- If the user asks for ordering pizza, remind them they can click the "Order Online" tab/button on this page to build their custom pizza or select their favorites for instant checkout.
- Feel free to drop local NJ beach vibes or musical/boardwalk references in a fun, authentic way.`;

// API routes first
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      // Safe, pleasant placeholder response if key is missing
      const fallbackReplies = [
        "Hey there! SallyBoy here! 🍕 I'm smelling some fresh dough rising right now! Let me tell you about our legendary Asbury Classic with double pepperoni—it's the absolute best in Asbury Park!",
        "Vesuvio vibes! Sally Joe Pizza is always ready to fire up a hot Boardwalk Supreme for you! Pickup or delivery right to your beach blanket!",
        "You got the craving, I got the sauce! What can I get started for you today at Sally Joe Pizza? Our Jersey Fire with hot honey is absolute magic!",
        "Welcome to Sally Joe Pizza! 🍕 Just blocks from the Asbury boardwalk, we serve up fresh, crispy, delicious slices all day long. How can I help you order or plan catering today?"
      ];
      const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      return res.json({ reply: randomReply + " [Note: operating in demo mode]" });
    }

    const ai = getAIClient();

    // Reconstruct conversation contents for @google/genai SDK
    // Each element is { role: 'user' | 'model', parts: [{ text: string }] }
    const formattedContents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        formattedContents.push({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.content || h.text }],
        });
      });
    }

    // Append the newly sent message
    formattedContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Sorry, I couldn't cook up a response right now. Let's try again, or call us directly at (732) 567-4009!";
    res.json({ reply });
  } catch (err: any) {
    console.error("Gemini API Error in backend:", err);
    res.json({ 
      reply: "Oops, looks like my wood-fired oven had a tiny flare-up! Shoot me another question, or just order your favorite pie! 🍕" 
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    // Vite middleware setup
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sally Joe Pizza backend server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
