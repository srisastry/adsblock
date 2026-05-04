export async function onRequest() {
  const url = "https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/adware-malware-only/hosts";

  const res = await fetch(url);
  const text = await res.text();

  const domains = new Set();

  text.split("\n").forEach(line => {
    line = line.trim();

    if (line.startsWith("0.0.0.0")) {
      const parts = line.split(/\s+/);
      const domain = parts[1];

      if (domain && domain !== "localhost") {
        domains.add(domain);
      }
    }
  });

  return new Response(
    Array.from(domains).join("\n"),
    { headers: { "content-type": "text/plain" } }
  );
}
