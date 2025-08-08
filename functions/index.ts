export default {
  async fetch(request: Request, env: any): Promise<Response> {
    try {
      const url = new URL(request.url);
      const path = url.pathname === "/" ? "/index.html" : url.pathname;

      if (env.ASSETS) {
        const key = path.startsWith("/") ? path.slice(1) : path;
        const content = await env.ASSETS.get(key, { type: "text" });
        if (content) {
          return new Response(content, {
            headers: { "Content-Type": getContentType(key) },
          });
        }
      }
      return new Response("Hello from LaunchWing!", {
        headers: { "Content-Type": "text/plain" }
      });
    } catch (err) {
      return new Response("Internal Error", { status: 500 });
    }
  }
};

function getContentType(file: string): string {
  if (file.endsWith(".html")) return "text/html";
  if (file.endsWith(".css")) return "text/css";
  if (file.endsWith(".js")) return "application/javascript";
  if (file.endsWith(".json")) return "application/json";
  if (file.endsWith(".svg")) return "image/svg+xml";
  return "text/plain";
}