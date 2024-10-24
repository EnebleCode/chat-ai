import { StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;
  const response = await fetch(
    "https://mintbase-wallet-git-ai-relayer-credits-mintbase.vercel.app/api/ai/v1/router/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MB_API_KEY || 'hey'}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4-1106-preview",
        messages: messages,
      }),
    }
  );

  return new StreamingTextResponse(response.body!);
}

export async function GET(req: Request) {
  try {
      // Puedes agregar parámetros de consulta si es necesario
      const url = new URL(req.url);
      const queryParam = url.searchParams.get("param"); // Ejemplo de parámetro de consulta

      const response = await fetch(
          "https://mintbase-wallet-git-ai-relayer-credits-mintbase.vercel.app/api/ai/v1/router/chat", // Cambia esto a la URL que necesites
          {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${process.env.MB_API_KEY || 'hey'}`,
              },
          }
      );

      if (!response.ok) {
          const errorData = await response.json();
          return new Response(JSON.stringify({ error: errorData.message || 'Error desconocido' }), {
              status: response.status,
              headers: { "Content-Type": "application/json" },
          });
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
          status: 200,
          headers: { "Content-Type": "application/json" },
      });
  } catch (error) {
      return new Response(JSON.stringify({ error: Error.arguments }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
      });
  }
}

