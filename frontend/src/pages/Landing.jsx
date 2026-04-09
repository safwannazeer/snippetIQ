import { Link } from "react-router-dom";
import { Code2, Tags, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const features = [
  {
    icon: Code2,
    title: "VS Code-Like Editor",
    desc: "Monaco-powered editor with syntax highlighting, auto-indentation, and formatting.",
  },
  {
    icon: Tags,
    title: "Automatic Tag Generation",
    desc: "Smart rule-based tagging to organize snippets instantly.",
  },
  {
    icon: Search,
    title: "Advanced Search & Filtering",
    desc: "Search snippets by title, tags, language, or code content.",
  },
  {
    icon: Sparkles,
    title: "AI Code Generation",
    desc: "Generate code instantly using natural language prompts.",
  },
];

export default function Landing({ isDark, toggleTheme }) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-theme">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-theme">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <button onclick="location.reload()">Snippet<span className="text-primary">IQ</span></button>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/5">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Organize Smarter.{" "}
            <span className="text-primary">Code Faster.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            SnippetIQ is an intelligent code snippet management system with
            automatic tagging and AI-assisted code generation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>

        {/* Editor mockup */}
        <div className="mt-16 overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-theme">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-destructive/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/60" />
            <span className="h-3 w-3 rounded-full bg-primary/60" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">snippet.js</span>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed text-muted-foreground">
            <div><span className="text-primary">const</span> snippetIQ = {'{'}</div>
            <div className="pl-6">organize: <span className="text-primary">"smarter"</span>,</div>
            <div className="pl-6">code: <span className="text-primary">"faster"</span>,</div>
            <div className="pl-6">tags: [<span className="text-primary">"auto-generated"</span>],</div>
            <div className="pl-6">ai: <span className="text-primary">true</span>,</div>
            <div>{'}'};</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/30 transition-theme">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Everything You Need
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
            A complete toolkit for managing, searching, and generating code snippets.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Start Managing Your Code Smarter Today.
        </h2>
        <Button size="lg" className="mt-8" asChild>
          <Link to="/signup">Create Account</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground transition-theme">
        © {new Date().getFullYear()} SnippetIQ. Built for developers.
      </footer>
    </div>
  );
}
